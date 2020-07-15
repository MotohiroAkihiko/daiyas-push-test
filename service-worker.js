!function(e){var t={};function n(s){if(t[s])return t[s].exports;var c=t[s]={i:s,l:!1,exports:{}};return e[s].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(s,c,function(t){return e[t]}.bind(null,c));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";try{self["workbox:precaching:5.1.2"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:core:5.1.2"]&&_()}catch(e){}},function(e,t,n){"use strict";n.r(t);n(1);const s=(e,...t)=>{let n=e;return t.length>0&&(n+=` :: ${JSON.stringify(t)}`),n};class c extends Error{constructor(e,t){super(s(e,t)),this.name=e,this.details=t}}n(0);const r=[],a={get:()=>r,add(e){r.push(...e)}};const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},o=e=>[i.prefix,e,i.suffix].filter(e=>e&&e.length>0).join("-"),l=e=>e||o(i.precache),h=new Set;const u=(e,t)=>e.filter(e=>t in e),f=async({request:e,mode:t,plugins:n=[]})=>{const s=u(n,"cacheKeyWillBeUsed");let c=e;for(const e of s)c=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:c}),"string"==typeof c&&(c=new Request(c));return c},d=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:c=[]})=>{const r=await self.caches.open(e),a=await f({plugins:c,request:t,mode:"read"});let i=await r.match(a,s);for(const t of c)if("cachedResponseWillBeUsed"in t){const c=t.cachedResponseWillBeUsed;i=await c.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:i,request:a})}return i},p=async({cacheName:e,request:t,response:n,event:s,plugins:r=[],matchOptions:a})=>{const i=await f({plugins:r,request:t,mode:"write"});if(!n)throw new c("cache-put-with-no-response",{url:(o=i.url,new URL(String(o),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var o;const l=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let c=t,r=!1;for(const t of s)if("cacheWillUpdate"in t){r=!0;const s=t.cacheWillUpdate;if(c=await s.call(t,{request:e,response:c,event:n}),!c)break}return r||(c=c&&200===c.status?c:void 0),c||null})({event:s,plugins:r,response:n,request:i});if(!l)return void 0;const p=await self.caches.open(e),y=u(r,"cacheDidUpdate"),w=y.length>0?await d({cacheName:e,matchOptions:a,request:i}):null;try{await p.put(i,l)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of h)await e()}(),e}for(const t of y)await t.cacheDidUpdate.call(t,{cacheName:e,event:s,oldResponse:w,newResponse:l,request:i})},y=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=u(s,"fetchDidFail"),a=r.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,c=e.clone();e=await s.call(t,{request:c,event:n})}}catch(e){throw new c("plugin-error-request-will-fetch",{thrownError:e})}const i=e.clone();try{let c;c="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(c=await e.fetchDidSucceed.call(e,{event:n,request:i,response:c}));return c}catch(e){0;for(const t of r)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:i.clone()});throw e}};let w;async function g(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},c=t?t(s):s,r=function(){if(void 0===w){const e=new Response("");if("body"in e)try{new Response(e.body),w=!0}catch(e){w=!1}w=!1}return w}()?n.body:await n.blob();return new Response(r,c)}function m(e){if(!e)throw new c("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new c("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),r=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:r.href}}class v{constructor(e){this._cacheName=l(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=m(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new c("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new c("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,r),t.length>0){const e="Workbox is precaching URLs without revision "+`info: ${t.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],c=await self.caches.open(this._cacheName),r=await c.keys(),a=new Set(r.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)a.has(t)?s.push(e):n.push({cacheKey:t,url:e});const i=n.map(({cacheKey:n,url:s})=>{const c=this._cacheKeysToIntegrities.get(n),r=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:r,event:e,integrity:c,plugins:t,url:s})});return await Promise.all(i),{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const c of t)n.has(c.url)||(await e.delete(c),s.push(c.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:r,integrity:a}){const i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});let o,l=await y({event:s,plugins:r,request:i});for(const e of r||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:s,request:i,response:l}):l.status<400))throw new c("bad-precaching-response",{url:t,status:l.status});l.redirected&&(l=await g(l)),await p({event:s,plugins:r,response:l,request:e===t?i:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new c("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new c("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let R;const U=()=>(R||(R=new v),R);const _=(e,t)=>{const n=U().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:c}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const a=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(r,t);if(yield a.href,n&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=n,yield e.href}if(s){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(c){const e=c({url:r});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let L=!1;function q(e){L||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const c=l();self.addEventListener("fetch",r=>{const a=_(r.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!a)return void 0;let i=self.caches.open(c).then(e=>e.match(a)).then(e=>e||fetch(a));r.respondWith(i)})})(e),L=!0)}const T=e=>{const t=U(),n=a.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},K=e=>{const t=U();e.waitUntil(t.activate())};var b;(function(e){U().addToCacheList(e),e.length>0&&(self.addEventListener("install",T),self.addEventListener("activate",K))})([{'revision':'5124532075b99be0c8cb37232e6fae74','url':'./index.html'},{'revision':'d95359c4de81dabb5e1f45a4fb26520a','url':'css/app.css'},{'revision':'9ee96e3a07dec6235d3f1a86787a92b7','url':'fonts/Framework7Icons-Regular.eot'},{'revision':'3b973a05c0e1544f7ee8fa23c2a9315a','url':'fonts/Framework7Icons-Regular.ttf'},{'revision':'535bcf7dd3feb41ec20507c3c5b81efb','url':'fonts/Framework7Icons-Regular.woff'},{'revision':'1dfb73e22b9119f547fb880568f56ea2','url':'fonts/Framework7Icons-Regular.woff2'},{'revision':'e79bfd88537def476913f3ed52f4f4b3','url':'fonts/MaterialIcons-Regular.eot'},{'revision':'a37b0c01c0baf1888ca812cc0508f6e2','url':'fonts/MaterialIcons-Regular.ttf'},{'revision':'012cf6a10129e2275d79d6adac7f3b02','url':'fonts/MaterialIcons-Regular.woff'},{'revision':'570eb83859dc23dd0eec423a49e147fe','url':'fonts/MaterialIcons-Regular.woff2'},{'revision':'d2f7863ac081d581c730d0c64967689f','url':'images/top_menu_logo.png'},{'revision':'9886bf95ff0b8d965cbbf2f8f79c5ec1','url':'js/app.js'},{'revision':'3e0e82f8432af8123667c1295e1f74ca','url':'js/app.js.LICENSE.txt'},{'revision':'a9c03cfcbb39e89f2735792cc2e58591','url':'manifest.json'},{'revision':'26120cc813288bcb63604f8813acc315','url':'static/icons/icon-144x144.png'},{'revision':'26120cc813288bcb63604f8813acc315','url':'static/icons/icon-152x152.png'},{'revision':'26120cc813288bcb63604f8813acc315','url':'static/icons/icon-192x192.png'},{'revision':'26120cc813288bcb63604f8813acc315','url':'static/icons/icon-384x384.png'},{'revision':'26120cc813288bcb63604f8813acc315','url':'static/icons/icon-512x512.png'},{'revision':'d2f7863ac081d581c730d0c64967689f','url':'static/icons/top_menu_logo.png'},{'revision':'d31a15c28f4cb95fe20521378dab4a99','url':'static/img/fukidashi.9.png'},{'revision':'0266acf0f5d5fdd47dc9594787e065c8','url':'static/img/progress_step_01.png'},{'revision':'4db64d8a2927dd72e0d6cf3dc7935af4','url':'static/img/progress_step_02.png'},{'revision':'02f8a4721eedea050c641f61404a1b64','url':'static/img/progress_step_03.png'},{'revision':'f42f3b2ce6b2e9914ce3f86a12bf9f60','url':'static/img/progress_step_04.png'}]||[]),q(b),self.addEventListener("install",(function(e){console.log("[ServiceWorker] Install")})),self.addEventListener("activate",(function(e){console.log("[ServiceWorker] Activate")})),self.addEventListener("push",(function(e){var t=e.data.json();console.log("push",t),t&&self.clients.matchAll().then((function(e){return e.forEach((function(e){e.postMessage(t)}))})),t.notification&&e.waitUntil(self.registration.showNotification(t.notification.title,{body:t.notification.body,icon:"./static/icons/icon-512x512.png",tag:"notification"}))})),self.addEventListener("notificationclick",(function(e){e.notification.close();var t="/";e.notification.data.url&&(t=e.notification.data.url),e.waitUntil(clients.matchAll({type:"window"}).then((function(){if(clients.openWindow)return clients.openWindow(t)})))})),self.addEventListener("fetch",(function(e){console.log("fetch notification",e)}))}]);
//# sourceMappingURL=service-worker.js.map