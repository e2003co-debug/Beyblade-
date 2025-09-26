const CACHE_NAME = "beyblade-pwa-v1";
const ASSETS = ["./","./index.html","./manifest.webmanifest"];
self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
});
self.addEventListener("activate", e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=> k===CACHE_NAME? null : caches.delete(k)))));
});
self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).then(n=>{
      return caches.open(CACHE_NAME).then(c=>{ c.put(e.request, n.clone()); return n; });
    }).catch(()=> caches.match("./index.html")))
  );
});
function resetTournament(){
  if(confirm("¿Seguro que quieres reiniciar el campeonato?")){
    state = structuredClone(defaultState);
    save();
    initUI();
    alert("🏁 Campeonato reiniciado");
  }
}
