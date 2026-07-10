#!/bin/bash
# 生成管理员密码哈希
# 使用 Node.js 计算 PBKDF2 密码哈希

node << 'EOF'
const crypto = require('crypto');

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  const hashBytes = new Uint8Array(derived);
  const saltBase64 = salt.toString('base64');
  const hashBase64 = Buffer.from(hashBytes).toString('base64');
  return `$pbkdf2-sha256$100000$${saltBase64}$${hashBase64}`;
}

hashPassword('Awm235858.').then(hash => {
  console.log('INSERT INTO "AdminUser" (id, name, email, "passwordHash", role, "createdAt", "updatedAt") VALUES (');
  console.log(`  gen_random_uuid(),`);
  console.log(`  '管理员',`);
  console.log(`  'a1105452110@gmail.com',`);
  console.log(`  '${hash}',`);
  console.log(`  'admin',`);
  console.log(`  now(),`);
  console.log(`  now()`);
  console.log(`);`);
});
EOF
