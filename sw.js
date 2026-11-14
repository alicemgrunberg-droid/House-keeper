self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
self.addEventListener('push',e=>{
 let d={};try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'Carnet du foyer',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:'taches',renotify:true,data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{
 e.notification.close();const u=(e.notification.data&&e.notification.data.url)||'./';
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
  for(const c of cs){if('focus' in c){c.navigate&&c.navigate(u).catch(()=>{});return c.focus()}}
  return self.clients.openWindow(u)}))});
