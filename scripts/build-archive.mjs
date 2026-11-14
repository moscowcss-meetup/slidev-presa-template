#!/usr/bin/env node
// Сборка прошлых митапов для сайта: каждый пересобирается из СВОЕГО коммита (archive/meetups.json),
// со своими layout'ами, темой и lockfile — поэтому история выглядит ровно как на том митапе.
// Кладёт dist/<N>/{open,close}; лендинг потом допишет `pnpm build` текущего митапа.
//
//   node scripts/build-archive.mjs        → все митапы из archive/meetups.json
//   node scripts/build-archive.mjs 31     → только 31
//
// Нужна полная история git (в CI — actions/checkout с fetch-depth: 0).

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(readFileSync(resolve(ROOT, 'archive/meetups.json'), 'utf8'))
const current = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8')).meetup
const only = process.argv[2]

const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: 'inherit' })
// pnpm запускаем через node + его же js (npm_execpath при `pnpm build:archive`): без shell,
// иначе на Windows pnpm.cmd не стартует из execFileSync
const pnpm = (args, cwd) => process.env.npm_execpath
  ? run(process.execPath, [process.env.npm_execpath, ...args], cwd)
  : run('pnpm', args, cwd)

for (const [meetup, ref] of Object.entries(manifest)) {
  if (only && meetup !== only) continue
  if (meetup === current) {
    console.warn(`⚠ митап ${meetup} — текущий, его собирает pnpm build; пропускаю`)
    continue
  }
  const dir = join(mkdtempSync(join(tmpdir(), `meetup-${meetup}-`)), 'src')
  console.log(`\n▶ Митап ${meetup} из ${ref.slice(0, 7)}`)
  try {
    run('git', ['worktree', 'add', '--detach', dir, ref], ROOT)
    pnpm(['install', '--frozen-lockfile'], dir)
    run(process.execPath, ['scripts/build.mjs', meetup], dir)
    const out = join(dir, 'dist', meetup)
    if (!existsSync(out)) throw new Error(`сборка не создала dist/${meetup}`)
    cpSync(out, resolve(ROOT, 'dist', meetup), { recursive: true })
    console.log(`✓ dist/${meetup}`)
  } catch (e) {
    console.error(`✗ митап ${meetup}: ${e.message}`)
    process.exitCode = 1
  } finally {
    // worktree удаляем всегда, даже после падения, чтобы не копились в .git/worktrees
    // на Windows remove иногда не может удалить node_modules — тогда rmSync + prune
    try { run('git', ['worktree', 'remove', '--force', dir], ROOT) } catch {}
    rmSync(dirname(dir), { recursive: true, force: true })
    run('git', ['worktree', 'prune'], ROOT)
  }
}
