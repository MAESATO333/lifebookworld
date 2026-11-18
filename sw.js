// LIFE BOOK：ホーム画面アプリ用。いつも新しい版をネットから読み（ブラウザの一時保存も毎回サーバーに確かめる）、つながらないときだけ前に読んだものを出す。
const C='lifebook-v2';
self.addEventListener('install',e=>{ self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin) return;
  e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{ if(res&&res.ok){ const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp)); } return res; }).catch(()=>caches.match(r,{ignoreSearch:true}))); });
