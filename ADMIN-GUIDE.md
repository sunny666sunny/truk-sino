# SINOTRUK 閸氬骸褰存担璺ㄦ暏閹稿洤宕?
## 瑜版挸澧犻悩鑸碘偓?
- Supabase 妞ゅ湱娲伴敍姝歴inotruk`
- Project ref閿涙瓪zbjxejlzzsazyofhadnr`
- 閸氬骸褰撮弫鐗堝祦鎼存捁绺肩粔璇插嚒鎼存梻鏁ら敍姝歩nit_admin_schema`
- 閺堫剙婀村鑼晸閹?`AUTH_SECRET`
- 鏉╂﹢娓剁憰浣告躬 `.env.local` 婵夘偄鍙嗛惇鐔风杽 `DATABASE_URL`閿涘本鏆熼幑顔肩氨鐎靛棛鐖滈棁鈧禒?Supabase Dashboard 閼惧嘲褰?
## 1. 闁板秶鐤嗛弫鐗堝祦鎼存捁绻涢幒?
鏉╂稑鍙?Supabase Dashboard閿?
1. 閹垫挸绱戞い鍦窗 `sinotruk`
2. 鏉╂稑鍙?`Settings -> Database -> Connection string`
3. 婢跺秴鍩?Postgres 鏉╃偞甯存稉?4. 鐏?`.env.local` 娑擃厾娈戝▔銊╁櫞缁€杞扮伐閺€瑙勫灇閻喎鐤勯崐纭风窗

```bash
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.zbjxejlzzsazyofhadnr.supabase.co:5432/postgres"
```

`AUTH_SECRET` 瀹歌尙绮￠崷銊︽拱閸︽壆鏁撻幋鎰剁礉娑撳秹娓剁憰渚€鍣告径宥囨晸閹存劑鈧?
## 2. 閻㈢喐鍨?Prisma Client

```bash
npm run db:generate
```

## 3. 鐎电厧鍙嗛崚婵嗩潗閺佺増宓?
```bash
npm run db:seed
```

鏉╂瑤绱伴幎濠侀獓閸濅礁鍨庣猾姹団偓浣烽獓閸濅降鈧焦鏌婇梻鑽ょ搼閸掓繂顫愰崘鍛啇鐎电厧鍙嗛弫鐗堝祦鎼存挶鈧?
## 4. 閸氼垰濮╂い鍦窗

```bash
npm run dev
```

鐠佸潡妫堕敍?
- 閸撳秴褰撮敍姝歨ttp://localhost:3000`
- 閸氬骸褰撮惂璇茬秿閿涙瓪http://localhost:3000/admin/login`
- 閸掓繂顫愰崠鏍吀閻炲棗鎲抽敍姝歨ttp://localhost:3000/admin/init`

## 5. 閸掓稑缂撶粻锛勬倞閸?
1. 閹垫挸绱?`http://localhost:3000/admin/init`
2. 婵夘偄鍟撴慨鎾虫倳閵嗕線鍋栫粻渚库偓浣哥槕閻?3. 閸掓稑缂撻幋鎰閸氬海閮寸紒鐔剁窗閼奉亜濮╅惂璇茬秿楠炴儼绻橀崗?`/admin`

婵″倹鐏夊鑼病鐎涙ê婀粻锛勬倞閸涙﹫绱濋崚婵嗩潗閸栨牗甯撮崣锝勭窗閹锋帞绮烽柌宥咁槻閸掓稑缂撻妴?
## 閸氬骸褰撮崝鐔诲厴

| 妞ょ敻娼?| 鐠侯垰绶?| 閸旂喕鍏?|
| --- | --- | --- |
| Dashboard | `/admin` | 缂佺喕顓稿鍌濐潔閵嗕焦娓堕弬鎷岊嚄閻╂ǜ鈧礁鎻╅幑宄板弳閸?|
| Products | `/admin/products` | 娴溠冩惂閸掓銆冮妴浣稿灡瀵ゆ亽鈧胶绱潏鎴欌偓浣稿灩闂?|
| News | `/admin/news` | 閺備即妞堥崚妤勩€冮妴浣稿灡瀵ゆ亽鈧胶绱潏鎴欌偓浣稿灩闂?|
| Inquiries | `/admin/inquiries` | 鐠囥垻娲忛崚妤勩€冮妴浣哄Ц閹焦绁︽潪顑锯偓浣割槵濞?|
| Settings | `/admin/settings` | 缁旀瑧鍋ｇ拋鍓х枂鐠囪鍟?|

## API

| 閺傝纭?| 鐠侯垰绶?| 鐠囧瓨妲?|
| --- | --- | --- |
| POST | `/api/auth/login` | 缁狅紕鎮婇崨妯兼瑜?|
| POST | `/api/auth/logout` | 闁偓閸戣櫣娅ヨぐ?|
| POST | `/api/admin/init` | 妫ｆ牗顐奸崚娑樼紦缁狅紕鎮婇崨?|
| GET | `/api/admin/stats` | 閸氬骸褰寸紒鐔活吀 |
| GET/POST | `/api/admin/products` | 娴溠冩惂閸掓銆?/ 閸掓稑缂?|
| GET/PUT/DELETE | `/api/admin/products/:id` | 閸楁洑閲滄禍褍鎼ч幙宥勭稊 |
| GET/POST | `/api/admin/news` | 閺備即妞堥崚妤勩€?/ 閸掓稑缂?|
| GET/PUT/DELETE | `/api/admin/news/:id` | 閸楁洑閲滈弬浼存閹垮秳缍?|
| GET/PATCH | `/api/admin/inquiries` | 鐠囥垻娲忛崚妤勩€?/ 閹靛綊鍣洪弴瀛樻煀 |
| GET/PUT | `/api/admin/inquiries/:id` | 閸楁洑閲滅拠銏㈡磸閹垮秳缍?|
| GET/PUT | `/api/admin/settings` | 缁旀瑧鍋ｇ拋鍓х枂 |

## 妤犲矁鐦夐崨鎴掓姢

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```

## 濞夈劍鍓版禍瀣€?
- 娑撳秷顩﹂幎?Supabase 閺佺増宓佹惔鎾崇槕閻焦褰佹禍銈呭煂娴犳挸绨遍妴?- `.env.local` 閸欘亙绻氶悾娆忔躬閺堫剙婀撮幋鏍劥缂冩彃閽╅崣鎵箚婢у啫褰夐柌蹇庤厬閵?- Supabase 鐞涖劌鍑￠崥顖滄暏 RLS閿涘苯澧犻崣棰佺瑝闁俺绻?Data API 閻╃绻涢弫鐗堝祦鎼存搫绱漀ext.js 閺堝秴濮熺粩顖炩偓姘崇箖 Prisma 鐠佸潡妫堕妴?- 閼辨梻閮寸悰銊ュ礋閸滃矁顓归梼鍛复閸欙絿骞囬崷銊ュ晸閸忋儲鏆熼幑顔肩氨閿涙稒婀柊宥囩枂 `DATABASE_URL` 閺冭绱濇潻娆庤⒈閺夛繝鎽肩捄顖欑瑝娴兼碍鍨氶崝鐔粹偓