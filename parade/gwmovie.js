/* LIFE BOOK：Gateway の海辺の街の「🎬 動く写真」。
   動く写真は、動画のファイルではなく、写真と同じ「小さなメモ」（どの乗り物がどこに・どっち向きに・どの速さで）。だから軽い。
   メモの s＝乗り物ごとの速さ（1秒に進む長さ）、m＝長さ（秒）。
   GWMovie.play(svg, メモ) … アルバムの中で、その場面を動かして、くり返し再生する。
   GWMovie.open(svg, メモ) … SNS にシェア／携帯に保存する時だけ、その場で動画のファイルを作る（作る間だけ、少し時間がかかる）。 */
(function(){
if(window.GWMovie) return;
var PROPS=['fill','fill-opacity','fill-rule','stroke','stroke-width','stroke-opacity','stroke-linecap','stroke-linejoin','stroke-dasharray','stroke-dashoffset','opacity','display','visibility','font-family','font-size','font-weight','font-style','text-anchor','dominant-baseline','letter-spacing','transform','transform-origin','transform-box','clip-path','mask','stop-color','stop-opacity','paint-order'];
var SKIP=/^(defs|style|script|title|desc|metadata|animate|animateTransform|animateMotion|set|linearGradient|radialGradient|clipPath|mask|pattern|filter|symbol)$/i;
function dur(rec){ return Math.max(3,Math.min(12,+rec.m||8)); }
function isMovie(rec){ return !!(rec&&Array.isArray(rec.s)&&rec.s.length); }
function info(svg,rec){ var gs=svg.querySelectorAll('.gw-car'), out=[]; for(var j=0;j<gs.length;j++){ var e=gs[j], i=e.hasAttribute('data-i')?+e.getAttribute('data-i'):j, c=rec.c[i]; if(!c) continue; out.push({ e:e, x:+c[1], y:+c[2], dir:+c[3]||1, k:+c[6]||0, v:+(rec.s&&rec.s[i])||0 }); } return out; }
function setT(L,t){ for(var i=0;i<L.length;i++){ var o=L[i]; o.e.setAttribute('transform','translate('+(o.x+o.dir*o.v*t).toFixed(1)+' '+o.y+')'+(o.k?' scale('+o.k+')':'')); } }
try{ var st=document.createElement('style'); st.textContent='.gw-photo.gw-mv .pd-sb{display:inline;opacity:0}.gw-photo.gw-mv.gw-b .pd-sb{opacity:1}.gw-photo.gw-mv.gw-b .pd-sa{opacity:0}.gw-photo.gw-mv .pd-stop .pd-sa{opacity:1!important}.gw-photo.gw-mv .pd-stop .pd-sb{opacity:0!important}'
  +'.gw-mvb{position:absolute;left:6px;top:6px;z-index:2;font-size:11px;font-weight:700;line-height:1;color:#fff;background:rgba(40,25,40,.55);border-radius:999px;padding:4px 8px;pointer-events:none}'
  +'.gwm{position:fixed;inset:0;z-index:9700;background:rgba(40,25,40,.6);display:flex;align-items:center;justify-content:center;padding:16px}.gwm-in{box-sizing:border-box;width:min(560px,100%);max-height:92vh;overflow:auto;background:#FFFDFE;color:#3A2E38;border-radius:22px;padding:14px 16px 18px;box-shadow:0 10px 30px rgba(0,0,0,.3);text-align:center;font-size:15px;line-height:1.7}.gwm-h{margin:4px 0 10px;font-size:18px;color:#C2476B}.gwm-pv{border-radius:14px;overflow:hidden;background:#F6EEF2;min-height:80px;display:grid;place-items:center}.gwm-pv video,.gwm-pv canvas{display:block;width:100%;height:auto}.gwm-wait{margin:0;padding:22px 12px;font-size:14px;color:#6F626B}.gwm-b{display:grid;gap:10px;margin:12px 0 6px}.gwm-go,.gwm-sv,.gwm-x{box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:100%;min-height:46px;padding:0 14px;border-radius:999px;font:inherit;font-size:15px;font-weight:700;text-decoration:none;cursor:pointer;border:2px solid #E86A88;background:#FF8FAA;color:#fff;box-shadow:0 3px 0 #D85878}.gwm-n{margin:6px 2px 10px;font-size:12.5px;line-height:1.6;color:#6F626B;min-height:1em}.gwm-x{margin-top:4px}.gwm-ot{border:0;background:none;padding:2px 0;font:inherit;font-size:12px;color:#8A6A78;text-decoration:underline;cursor:pointer}.gwm-sl{margin:6px 0 0;font-size:13px;font-weight:700;color:#C2476B;text-align:left}.gwm-sns{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.gwm-sb{box-sizing:border-box;width:100%;min-height:42px;padding:0 4px;border-radius:999px;font:inherit;font-size:13px;font-weight:700;cursor:pointer;border:2px solid #E86A88;background:#FF8FAA;color:#fff;box-shadow:0 3px 0 #D85878;white-space:nowrap}.gwm-op{box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:100%;min-height:46px;margin:0 0 10px;padding:0 14px;border-radius:999px;font-size:15px;font-weight:700;text-decoration:none;border:2px solid #E86A88;background:#fff;color:#D9467A;box-shadow:0 3px 0 #FFD6E1}.gwm-fl{display:block;margin:0 0 10px;font-size:12px;color:#8A6A78;text-decoration:underline}';
  document.head.appendChild(st); }catch(e){}

/* ---- アルバムの中で動かす（見えている時だけ） ---- */
var PLAYING=[], raf=0;
function frame(now){ raf=0; var any=false; for(var i=PLAYING.length-1;i>=0;i--){ var p=PLAYING[i]; if(!p.svg.isConnected){ PLAYING.splice(i,1); continue; } if(p.hold||!p.vis||document.hidden) continue; any=true; if(!p.t0) p.t0=now; var D=p.d, t=((now-p.t0)/1000)%(D+.8); setT(p.L,Math.min(t,D)); var b=((t*4)|0)%2===1; if(b!==p.b){ p.b=b; p.svg.classList.toggle('gw-b',b); } }
  if(PLAYING.length&&any) raf=requestAnimationFrame(frame); else if(PLAYING.length) setTimeout(kick,400); }
function kick(){ if(!raf&&PLAYING.length) raf=requestAnimationFrame(frame); }
function play(svg,rec){ if(!svg||!isMovie(rec)) return null; for(var i=0;i<PLAYING.length;i++) if(PLAYING[i].svg===svg) return PLAYING[i];
  svg.classList.add('gw-mv'); var p={ svg:svg, rec:rec, L:info(svg,rec), d:dur(rec), t0:0, vis:true, hold:false, b:false };
  try{ var host=svg.parentNode; if(host&&!host.querySelector('.gw-mvb')){ if(getComputedStyle(host).position==='static') host.style.position='relative'; var s=document.createElement('span'); s.className='gw-mvb'; s.textContent='🎬 動く写真'; host.appendChild(s); host.setAttribute('data-gwmv','1'); host._gwRec=rec; } }catch(e){}
  try{ if(window.IntersectionObserver){ var io=new IntersectionObserver(function(es){ p.vis=es[es.length-1].isIntersecting; if(p.vis) kick(); },{ rootMargin:'60px' }); io.observe(svg); } }catch(e){}
  PLAYING.push(p); kick(); return p; }
function find(svg){ for(var i=0;i<PLAYING.length;i++) if(PLAYING[i].svg===svg) return PLAYING[i]; return null; }

/* ---- 絵（SVG）を、画像にする ---- */
function blobURL(b){ return new Promise(function(ok,ng){ var r=new FileReader(); r.onload=function(){ ok(r.result); }; r.onerror=ng; r.readAsDataURL(b); }); }
function loadImg(src){ return new Promise(function(ok,ng){ var im=new Image(); im.onload=function(){ ok(im); }; im.onerror=function(){ ng(new Error('img')); }; im.src=src; }); }
async function ras(svg,pxW){ var vb=svg.viewBox.baseVal, w=vb.width, h=vb.height; var c=svg.cloneNode(true), A=svg.querySelectorAll('*'), B=c.querySelectorAll('*');
  if(A.length===B.length) for(var i=0;i<A.length;i++){ if(SKIP.test(A[i].tagName)) continue; try{ var cs=getComputedStyle(A[i]); for(var q=0;q<PROPS.length;q++){ var p=PROPS[q], v=cs.getPropertyValue(p); if(!v) continue; if((p==='transform'||p==='clip-path'||p==='mask')&&v==='none') continue; B[i].style.setProperty(p,v); } B[i].style.setProperty('animation','none'); }catch(e){} }
  var ims=c.querySelectorAll('image'); for(var j=0;j<ims.length;j++){ var hr=ims[j].getAttribute('href')||ims[j].getAttributeNS('http://www.w3.org/1999/xlink','href'); if(!hr||/^data:/.test(hr)) continue; try{ var bl=await (await fetch(hr)).blob(); ims[j].setAttribute('href',await blobURL(bl)); ims[j].removeAttribute('xlink:href'); }catch(e){} }
  c.setAttribute('xmlns','http://www.w3.org/2000/svg'); c.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink'); var W=Math.max(2,Math.round(pxW)), H=Math.max(2,Math.round(pxW*h/w)); c.setAttribute('width',W); c.setAttribute('height',H); c.setAttribute('preserveAspectRatio','none'); c.removeAttribute('class'); c.style.cssText='';
  return loadImg('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(c))); }
function mark(x,W,H){ var fs=Math.max(13,Math.round(W/46)); x.save(); x.font='700 '+fs+'px "Zen Maru Gothic","Hiragino Maru Gothic ProN","Hiragino Sans",sans-serif'; x.textAlign='right'; x.textBaseline='alphabetic'; x.globalAlpha=.55; x.shadowColor='rgba(30,20,40,.55)'; x.shadowBlur=Math.round(fs/3); x.fillStyle='#FFFFFF'; x.fillText('LIFE BOOK',W-Math.round(fs*.8),H-Math.round(fs*.7)); x.restore(); }

/* ---- 動画のファイルを作る（シェア・保存する時だけ） ---- */
function mime(){ var c=['video/mp4;codecs=avc1.42E01E','video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm']; if(!window.MediaRecorder) return ''; for(var i=0;i<c.length;i++){ try{ if(MediaRecorder.isTypeSupported(c[i])) return c[i]; }catch(e){} } return ''; }
function canMake(){ try{ return !!(mime()&&HTMLCanvasElement.prototype.captureStream); }catch(e){ return false; } }
async function make(svg,rec,say){ say=say||function(){}; var mt=mime(); if(!canMake()) throw new Error('nosupport');
  var p=find(svg), vb=svg.viewBox.baseVal, D=dur(rec), L=info(svg,rec); if(p) p.hold=true;
  try{ var W=960, H=Math.round(W*vb.height/vb.width); if(H%2) H++; var sc=W/vb.width; setT(L,0); svg.classList.remove('gw-b');
    say('絵を用意しています…'); L.forEach(function(o){ o.e.style.display='none'; }); var mb=svg.parentNode&&svg.parentNode.querySelector('.gw-mvb'); var bg=await ras(svg,W); L.forEach(function(o){ o.e.style.display=''; });
    // 乗り物・人は、1つずつ小さな絵にしておく（足が動く人は2まい）。あとは、位置をずらして重ねるだけなので、録画は軽い
    var box=document.createElement('div'); box.style.cssText='position:fixed;left:-99999px;top:0;width:10px;height:10px;overflow:hidden;opacity:0;pointer-events:none'; document.body.appendChild(box); var defs=svg.querySelector('defs');
    for(var i=0;i<L.length;i++){ var o=L[i]; say('絵を用意しています…（'+(i+1)+'/'+L.length+'）'); var bb; try{ bb=o.e.getBBox(); }catch(e){ bb=null; } if(!bb||!bb.width||!bb.height){ o.im=[]; continue; } var k=o.k||1, pad=3; o.bx=bb.x*k-pad; o.by=bb.y*k-pad; o.bw=bb.width*k+pad*2; o.bh=bb.height*k+pad*2; o.im=[];
      var two=!!o.e.querySelector('.pd-sb')&&!/pd-stop/.test(o.e.getAttribute('class')||'')&&o.v>0;
      for(var f=0;f<(two?2:1);f++){ var s=document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('class','gw-photo gw-mv'+(f?' gw-b':'')); s.setAttribute('viewBox',o.bx+' '+o.by+' '+o.bw+' '+o.bh); s.style.cssText='width:'+o.bw+'px;height:'+o.bh+'px'; if(defs) s.appendChild(defs.cloneNode(true)); var g=o.e.cloneNode(true); g.removeAttribute('data-i'); if(o.k) g.setAttribute('transform','scale('+o.k+')'); else g.removeAttribute('transform'); s.appendChild(g); box.appendChild(s); try{ o.im.push(await ras(s,o.bw*sc)); }catch(e){} s.remove(); } }
    box.remove();
    var cv=document.createElement('canvas'); cv.width=W; cv.height=H; var x=cv.getContext('2d');
    var draw=function(t){ x.drawImage(bg,0,0,W,H); var ph=((t*4)|0)%2; for(var i=0;i<L.length;i++){ var o=L[i]; if(!o.im||!o.im.length) continue; var im=o.im[o.im.length>1?ph:0]; var X=(o.x+o.dir*o.v*t+o.bx-vb.x)*sc, Y=(o.y+o.by-vb.y)*sc, w=o.bw*sc; if(X>W||X+w<0) continue; x.drawImage(im,X,Y,w,o.bh*sc); } mark(x,W,H); };
    draw(0); say('録画しています…'); var stream=cv.captureStream(30), chunks=[], mr=new MediaRecorder(stream,{ mimeType:mt, videoBitsPerSecond:2500000 });
    var done=new Promise(function(ok,ng){ mr.ondataavailable=function(e){ if(e.data&&e.data.size) chunks.push(e.data); }; mr.onstop=function(){ ok(); }; mr.onerror=function(e){ ng(e.error||new Error('rec')); }; });
    mr.start(200); await new Promise(function(ok){ var t0=0, last=-1; var step=function(now){ if(!t0) t0=now; var t=(now-t0)/1000; if(t>=D){ draw(D); ok(); return; } draw(t); var sec=Math.floor(D-t); if(sec!==last){ last=sec; say('録画しています…（あと'+(sec+1)+'秒）'); } requestAnimationFrame(step); }; requestAnimationFrame(step); });
    await new Promise(function(r){ setTimeout(r,250); }); try{ mr.stop(); }catch(e){} await done; try{ stream.getTracks().forEach(function(t){ t.stop(); }); }catch(e){}
    var blob=new Blob(chunks,{ type:mt.split(';')[0] }); if(!blob.size) throw new Error('empty'); return blob;
  } finally { if(p){ p.hold=false; p.t0=0; kick(); } } }

/* ---- シェア・保存の画面 ---- */
function close(){ var d=document.getElementById('gwMovie'); if(d){ try{ if(d._url) URL.revokeObjectURL(d._url); }catch(e){} d.remove(); } }
function open(svg,rec){ close(); var d=document.createElement('div'); d.id='gwMovie'; d.className='gwm'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-label','動く写真を、シェア・保存');
  d.innerHTML='<div class="gwm-in"><h3 class="gwm-h">🎬 動く写真を、シェア・保存</h3><div class="gwm-pv"><p class="gwm-wait">動画を作っています…</p></div><div class="gwm-b"></div><p class="gwm-n">動画を作る間（10秒ほど）、この画面のままでお待ちください。</p><button type="button" class="gwm-x">← もどる</button></div>'; document.body.appendChild(d);
  d.addEventListener('click',function(e){ if(e.target===d||e.target.closest('.gwm-x')) close(); });
  var pv=d.querySelector('.gwm-pv'), nt=d.querySelector('.gwm-n'), bx=d.querySelector('.gwm-b'), wait=d.querySelector('.gwm-wait');
  if(!canMake()){ wait.textContent='この端末・ブラウザでは、動画のファイルを作れません。'; nt.textContent='アルバムの中では、そのまま動かして見られます。SNS には、携帯の「画面収録」で撮った動画をのせてね。'; return; }
  make(svg,rec,function(t){ if(wait.isConnected) wait.textContent=t; }).then(function(blob){ if(!document.getElementById('gwMovie')) return; var mp4=/mp4/.test(blob.type), dt=new Date(), z=function(n){ return (n<10?'0':'')+n; }, name='lifebook-'+dt.getFullYear()+z(dt.getMonth()+1)+z(dt.getDate())+'-'+z(dt.getHours())+z(dt.getMinutes())+z(dt.getSeconds())+(mp4?'.mp4':'.webm');
    var file=null; try{ file=new File([blob],name,{ type:blob.type }); }catch(e){} var url=URL.createObjectURL(blob); d._url=url; pv.innerHTML='<video src="'+url+'" controls loop muted playsinline autoplay></video>';
    var can=false; try{ can=!!(file&&navigator.canShare&&navigator.canShare({ files:[file] })&&navigator.share); }catch(e){}
    // 携帯の「写真」アプリに入れられるのは、携帯の「共有」の画面の「ビデオを保存」だけ（Web のページからは、直接は入れられない）。だから、保存もシェアも、共有の画面を開く
    var sh=function(msg){ return function(){ nt.textContent=msg; try{ navigator.share({ files:[file], title:'LIFE BOOK' }).catch(function(err){ if(err&&err.name!=='AbortError') nt.textContent='うまく開けませんでした。もう一度押してみてね。'; }); }catch(err){ nt.textContent='うまく開けませんでした。もう一度押してみてね。'; } }; };
    if(can){ var b1=document.createElement('button'); b1.type='button'; b1.className='gwm-go'; b1.textContent='📱 携帯の写真に保存'; b1.addEventListener('click',sh('出てきた画面で「ビデオを保存」を押すと、携帯の写真アプリに入ります。')); bx.appendChild(b1);
      nt.textContent='「携帯の写真に保存」を押して、出てきた画面の「ビデオを保存」をえらぶと、いつもの写真アプリに入ります。';
      var a2=document.createElement('a'); a2.className='gwm-fl'; a2.href=url; a2.download=name; a2.textContent='うまくいかない時は、ファイルとして保存'; d.querySelector('.gwm-in').insertBefore(a2,d.querySelector('.gwm-x')); }
    else { var a=document.createElement('a'); a.className='gwm-sv'; a.href=url; a.download=name; a.textContent='💾 動画を保存'; bx.appendChild(a); nt.textContent='「動画を保存」で、この端末に保存できます。SNS には、保存した動画をえらんで投稿してね。'; }

    // SNS ごとのボタン。どの SNS も、①先に携帯の写真に保存 → ②その SNS のアプリを開いて、保存した動画をえらんで投稿する（Web のページから、SNS のアプリへ直接わたすことは、携帯の決まりでできない）。「○○ を開く」で、そのアプリが開く
    var SNS=[['LINE','app','https://line.me/R/'],['Instagram','app','https://www.instagram.com/'],['X','app','https://x.com/intent/post?text='+encodeURIComponent('LIFE BOOK #LIFEBOOK')],['TikTok','app','https://www.tiktok.com/upload'],['YouTube','app','https://www.youtube.com/upload'],['note','app','https://note.com/']];
    var gr=document.createElement('div'); gr.className='gwm-sns'; var lb=document.createElement('p'); lb.className='gwm-sl'; lb.textContent='📤 SNS にシェア'; bx.appendChild(lb);
    SNS.forEach(function(q){ var b=document.createElement('button'); b.type='button'; b.className='gwm-sb'; b.textContent=q[0]; b.addEventListener('click',function(){ var old=d.querySelector('.gwm-op'); if(old) old.remove();
      if(q[1]==='sheet'&&can){ nt.textContent='出てきた画面で「'+q[0]+'」をえらんでね。見つからない時は、アプリの列の右はしの「その他」から。'; try{ navigator.share({ files:[file], title:'LIFE BOOK' }).catch(function(err){ if(err&&err.name!=='AbortError') nt.textContent='うまく開けませんでした。もう一度押してみてね。'; }); }catch(err){ nt.textContent='うまく開けませんでした。もう一度押してみてね。'; } return; }
      nt.textContent=(can?'①「携帯の写真に保存」で、写真アプリに入れる　→　':'①「動画を保存」で保存する　→　')+'②「'+q[0]+'」を開いて、保存した動画をえらんで投稿してね。'; if(q[2]){ var a=document.createElement('a'); a.className='gwm-op'; a.href=q[2]; a.target='_blank'; a.rel='noopener'; a.textContent='② '+q[0]+' を開く'; nt.insertAdjacentElement('afterend',a); } }); gr.appendChild(b); }); bx.appendChild(gr); if(can){ var ot=document.createElement('button'); ot.type='button'; ot.className='gwm-ot'; ot.textContent='ほかのアプリにシェア（携帯の共有の画面を開く）'; ot.addEventListener('click',sh('出てきた画面で、アプリをえらんでね。')); bx.appendChild(ot); }
  }).catch(function(err){ try{ console.warn('[gwmovie]',err); }catch(_){} if(wait.isConnected) wait.textContent='動画を作れませんでした。'; nt.textContent='アルバムの中では、そのまま動かして見られます。SNS には、携帯の「画面収録」で撮った動画をのせてね。'; }); }
document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&document.getElementById('gwMovie')) close(); });
/* 「📤 SNS にシェア」などのボタン：data-gwmovie="（動く写真をふくむ親の CSS セレクタ）" */
document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('[data-gwmovie]'); if(!b) return; var root=null; try{ root=b.closest(b.getAttribute('data-gwmovie')||'li'); }catch(_){} root=root||b.parentElement; var host=root&&root.querySelector('[data-gwmv]'); if(!host||!host._gwRec) return; e.preventDefault(); e.stopPropagation(); var svg=host.querySelector('svg.gw-photo'); if(svg) open(svg,host._gwRec); },true);
window.GWMovie={ play:play, open:open, make:make, isMovie:isMovie, canMake:canMake, mark:mark };
})();
