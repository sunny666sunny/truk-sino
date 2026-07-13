# Admin Authentication Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate confirmed cross-request administrator impersonation, remove public bootstrap endpoints, revoke unsafe database function grants, invalidate old sessions, and verify the production deployment.

**Architecture:** Keep the existing PBKDF2 plus signed-JWT design, but make authentication request-local and authoritative against `AdminUser` on every protected request. Remove HTTP bootstrap routes entirely, retain trusted maintenance through scripts/database administration, and rotate the production signing secret after deployment.

**Tech Stack:** Next.js 16.2.9 App Router, TypeScript, `jose`, Prisma 7.8, Vitest 4.1.9, Supabase Postgres, Hostinger standalone Node deployment.

## Global Constraints

- Read relevant Next.js 16.2.9 guides from `node_modules/next/dist/docs/` before code changes.
- Do not migrate to Supabase Auth or add dependencies.
- Do not expose passwords, password hashes, database URLs, or signing secrets in commits or logs.
- Every behavior change follows red-green TDD and the full test/build suite must pass before publishing.
- Production unauthenticated requests to protected admin APIs must return 401 in every concurrent attempt.

---

### Task 1: Establish a clean latest-main baseline

**Files:**
- Inspect: `package.json`
- Inspect: `package-lock.json`
- Inspect: `node_modules/next/dist/docs/01-app/02-guides/authentication.md`
- Inspect: `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`

**Interfaces:**
- Consumes: GitHub `main` at `aa02daa9ba632255fb46ceb223a38db4c75fdef8`.
- Produces: An installed, testable worktree on `codex/security-hardening`.

- [ ] **Step 1: Install locked dependencies**

Run: `npm ci`

Expected: exit 0 and both root and `apps/admin` dependencies installed through `postinstall`.

- [ ] **Step 2: Run the baseline unit suite**

Run: `npm test`

Expected: all existing tests pass before security changes.

- [ ] **Step 3: Record baseline source state**

Run: `git status --short`

Expected: no changes beyond the committed design and plan documents.

### Task 2: Reproduce and remove cross-request identity reuse

**Files:**
- Create: `tests/unit/auth.test.ts`
- Modify: `src/lib/auth.ts`

**Interfaces:**
- Consumes: `getAuth(): Promise<AuthUser | null>`, `admin_session` cookie, `AUTH_SECRET`, and `prisma.adminUser.findUnique`.
- Produces: Request-local `getAuth()` that returns current database identity for the verified JWT subject.

- [ ] **Step 1: Write failing authentication regression tests**

Create `tests/unit/auth.test.ts` with tests that use a real `jose` JWT and mocked request cookie/database boundaries:

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SignJWT } from 'jose'

const state = vi.hoisted(() => ({ cookie: undefined as string | undefined }))
const findUnique = vi.hoisted(() => vi.fn())

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    get: () => state.cookie ? { value: state.cookie } : undefined,
  })),
}))

vi.mock('@/lib/prisma-client', () => ({
  prisma: { adminUser: { findUnique } },
}))

async function tokenFor(subject: string) {
  return new SignJWT({ email: 'stale@example.com', role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(subject)
    .setExpirationTime('5m')
    .sign(new TextEncoder().encode(process.env.AUTH_SECRET))
}

async function loadGetAuth() {
  vi.resetModules()
  return (await import('@/lib/auth')).getAuth
}

describe('admin request authentication', () => {
  beforeEach(() => {
    process.env.AUTH_SECRET = 'test-auth-secret-with-at-least-32-bytes'
    state.cookie = undefined
    findUnique.mockReset()
  })

  it('does not reuse an authenticated identity for a request without a cookie', async () => {
    const getAuth = await loadGetAuth()
    state.cookie = await tokenFor('admin-1')
    findUnique.mockResolvedValue({ id: 'admin-1', name: 'Lucien', email: 'admin@example.com', role: 'admin' })

    await expect(getAuth()).resolves.toMatchObject({ id: 'admin-1' })
    state.cookie = undefined
    await expect(getAuth()).resolves.toBeNull()
  })

  it('rejects a valid token when its administrator no longer exists', async () => {
    const getAuth = await loadGetAuth()
    state.cookie = await tokenFor('deleted-admin')
    findUnique.mockResolvedValue(null)

    await expect(getAuth()).resolves.toBeNull()
  })

  it('returns current database identity instead of stale token profile fields', async () => {
    const getAuth = await loadGetAuth()
    state.cookie = await tokenFor('admin-1')
    findUnique.mockResolvedValue({ id: 'admin-1', name: 'Current Name', email: 'current@example.com', role: 'editor' })

    await expect(getAuth()).resolves.toEqual({ id: 'admin-1', name: 'Current Name', email: 'current@example.com', role: 'editor' })
  })
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/unit/auth.test.ts`

Expected: failures show that the second request receives the cached user, deleted subjects are accepted, or current DB identity is not used.

- [ ] **Step 3: Implement request-local authentication**

In `src/lib/auth.ts`, delete `cachedUser`, `cacheTime`, and all cache branches. After `jwtVerify`, require a string `payload.sub`, query the administrator by ID, and return only selected database fields:

```ts
const user = await prisma.adminUser.findUnique({
  where: { id: payload.sub },
  select: { id: true, name: true, email: true, role: true },
})
return user
```

Return `null` for absent cookies, absent `AUTH_SECRET`, invalid JWTs, missing subjects, missing users, and database verification errors.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/unit/auth.test.ts`

Expected: 3 tests pass, 0 fail.

- [ ] **Step 5: Commit the isolated authentication fix**

Run: `git add tests/unit/auth.test.ts src/lib/auth.ts`

Run: `git commit -m "fix: isolate admin authentication per request"`

Expected: a commit containing only the regression test and auth implementation.

### Task 3: Remove public administrator bootstrap routes

**Files:**
- Modify: `tests/unit/adminDeployment.test.ts`
- Delete: `src/app/api/admin/setup/route.ts`
- Delete: `src/app/api/admin/init/route.ts`

**Interfaces:**
- Consumes: public Next.js route discovery from filesystem paths.
- Produces: no HTTP route at `/api/admin/setup` or `/api/admin/init`.

- [ ] **Step 1: Add a failing route-absence test**

Append to the existing `admin deployment` suite:

```ts
it('does not expose administrator bootstrap endpoints', () => {
  expect(fs.existsSync(path.join(root, 'src/app/api/admin/setup/route.ts'))).toBe(false)
  expect(fs.existsSync(path.join(root, 'src/app/api/admin/init/route.ts'))).toBe(false)
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/unit/adminDeployment.test.ts`

Expected: failure because both route files exist.

- [ ] **Step 3: Delete both public route files**

Delete `src/app/api/admin/setup/route.ts` and `src/app/api/admin/init/route.ts`. Do not replace them with another HTTP endpoint.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/unit/adminDeployment.test.ts`

Expected: all admin deployment tests pass.

- [ ] **Step 5: Commit the route removal**

Run: `git add tests/unit/adminDeployment.test.ts src/app/api/admin/setup/route.ts src/app/api/admin/init/route.ts`

Run: `git commit -m "fix: remove public admin bootstrap routes"`

Expected: a commit containing the test and two deletions.

### Task 4: Verify the application patch

**Files:**
- Verify: all tracked source and tests.

**Interfaces:**
- Consumes: Tasks 2 and 3.
- Produces: a branch proven by unit, type, lint, and production-build checks.

- [ ] **Step 1: Run all unit tests**

Run: `npm test`

Expected: all tests pass with 0 failures.

- [ ] **Step 2: Run TypeScript validation**

Run: `npx tsc --noEmit`

Expected: exit 0.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: exit 0 with no errors.

- [ ] **Step 4: Run the full production build**

Run: `npm run build`

Expected: admin Vite build, Prisma generation, and Next.js production build all exit 0.

- [ ] **Step 5: Inspect the final diff**

Run: `git diff origin/main...HEAD --check`

Run: `git status --short`

Expected: no whitespace errors and no uncommitted implementation files.

### Task 5: Harden Supabase and publish the code

**Files:**
- Modify remotely: Supabase function privileges.
- Publish: Git branch `codex/security-hardening`.

**Interfaces:**
- Consumes: verified Git commits and Supabase project `zbjxejlzzsazyofhadnr`.
- Produces: revoked public function privileges and a reviewable GitHub change.

- [ ] **Step 1: Revoke unsafe function grants**

Execute through the Supabase SQL connector:

```sql
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
```

Expected: command succeeds without changing the event trigger definition.

- [ ] **Step 2: Verify function privileges**

Query `has_function_privilege` for `anon` and `authenticated`.

Expected: both values are `false`.

- [ ] **Step 3: Push the verified branch**

Run: `git push -u origin codex/security-hardening`

Expected: branch is available on GitHub.

- [ ] **Step 4: Open and merge the focused pull request**

Create a PR from `codex/security-hardening` to `main` with the confirmed root cause, changes, and verification results. Merge only after the branch checks are green.

Expected: GitHub `main` advances to the security-fix commit.

### Task 6: Deploy, rotate sessions, and perform production regression

**Files:**
- Modify remotely: `/home/u269860597/domains/sinotrukteam.com/nodejs/.env.production`.
- Observe remotely: Hostinger build source and application logs.

**Interfaces:**
- Consumes: merged GitHub `main`, local protected `DATABASE_URL`, newly generated 32-byte `AUTH_SECRET`.
- Produces: deployed patch, invalidated legacy sessions, and production evidence.

- [ ] **Step 1: Wait for Hostinger to deploy the merged commit**

Poll the Hostinger build source Git HEAD until it equals the merged security commit. Do not use fixed long sleeps.

Expected: `/home/u269860597/domains/sinotrukteam.com/public_html/.builds/last-source` reports the merged commit.

- [ ] **Step 2: Restore protected runtime configuration and rotate the signing key**

Generate a cryptographically random 32-byte `AUTH_SECRET`. Write only `DATABASE_URL` and the new `AUTH_SECRET` to `.env.production` with mode `600`, then touch `tmp/restart.txt` and request the site to trigger startup.

Expected: the process starts without Prisma or signing-key errors; old cookies fail.

- [ ] **Step 3: Verify valid login and current identity**

POST the temporary administrator credentials to `/api/auth/login`, retain the returned cookie, then GET `/api/admin/me`.

Expected: login 200 and current administrator identity 200.

- [ ] **Step 4: Verify the confirmed race is closed**

Run at least 8 concurrent pairs of authenticated `/api/admin/me` and unauthenticated `/api/admin/stats` requests.

Expected: every authenticated request is 200 and every unauthenticated request is 401.

- [ ] **Step 5: Verify bootstrap routes are gone**

Request `/api/admin/setup` and `/api/admin/init`.

Expected: both return 404.

- [ ] **Step 6: Re-run Supabase security advisors**

Expected: no warning that `rls_auto_enable()` is executable by `anon` or `authenticated`.
