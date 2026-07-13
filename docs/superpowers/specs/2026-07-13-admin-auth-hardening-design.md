# Admin Authentication Hardening Design

## Context

The production deployment at `sinotrukteam.com` uses a custom administrator table, PBKDF2 password hashes, and an HS256 JWT stored in the `admin_session` cookie. Production testing confirmed that `src/lib/auth.ts` caches the last authenticated user in module-global state for 50 milliseconds. Unauthenticated requests can reuse that cached identity: five of eight controlled requests reached a protected endpoint with HTTP 200.

The deployed GitHub revision `aa02daa9ba632255fb46ceb223a38db4c75fdef8` also exposes unauthenticated `/api/admin/setup` and `/api/admin/init` endpoints. Supabase reports that `public.rls_auto_enable()` is a `SECURITY DEFINER` event-trigger function executable by `anon` and `authenticated`.

## Goal

Eliminate confirmed cross-request administrator impersonation, remove public bootstrap surfaces, invalidate old administrator sessions, and preserve the current custom-auth architecture with the smallest durable change.

## Application Design

`getAuth()` will read and verify the request's own cookie on every invocation. It will not keep request-derived identity in module-global state. After JWT verification, it will query `AdminUser` by the token subject and return the current database values for `name`, `email`, and `role`. A deleted account or token whose subject no longer exists will be rejected.

The HTTP bootstrap routes `/api/admin/setup` and `/api/admin/init` will be removed. Password hashing remains available only through trusted local scripts or direct database administration. No public endpoint will return plaintext passwords, password hashes, or SQL statements.

## Database and Session Design

Revoke `EXECUTE` on `public.rls_auto_enable()` from `PUBLIC`, `anon`, and `authenticated`. The event trigger itself remains installed for automatic RLS enablement during trusted DDL.

Generate a new 32-byte `AUTH_SECRET`, update Hostinger's protected production environment file, and restart the application. This invalidates every JWT issued with the previous secret, including any unknown sessions that survived the password reset.

## Tests

Add regression tests that prove:

- authentication is evaluated independently for each request and no module-global identity cache exists;
- a valid JWT is accepted only while its `AdminUser` subject exists;
- invalid or absent cookies remain unauthorized after an authenticated request;
- the public `setup` and `init` route source files no longer exist;
- the production build and existing unit suite still pass.

After deployment, run black-box tests against production: valid login returns 200, `/api/admin/me` with the new session returns the expected administrator, unauthenticated protected requests return 401 in every concurrent attempt, and `/api/admin/setup` plus `/api/admin/init` return 404.

## Delivery

Implement on `codex/security-hardening`, commit only the security patch and tests, push to GitHub, open a focused pull request, merge after checks, observe Hostinger's deployment, restore the protected runtime environment if the deployment replaces it, rotate `AUTH_SECRET`, and repeat the production checks.

## Non-goals

- migrating to Supabase Auth;
- redesigning the admin UI;
- changing the administrator password format;
- unrelated rate-limit or content-management refactors.
