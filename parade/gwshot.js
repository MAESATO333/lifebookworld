/* LIFE BOOK：Gateway の海辺の街で撮った写真（小さなメモ）を、絵にもどす部品。ゲームの中のアルバムや、届いた写真に使う。
   GWShot.render(メモ, 箱) … 箱（ページの中の要素）に写真の絵を入れる。Promise。 メモは文字（JSON）でも、そのままでもよい。
   GWShot.album() … このブラウザの Gateway アルバム（新しい順）。 GWShot.get(t) … t（撮った時刻）の写真。 */
(function(){
var BASE=(function(){ try{ return document.currentScript.src.replace(/[^\/]*$/,''); }catch(e){ return 'parade/'; } })();

var PP=(function(){
var R=Math.random, pk=function(a){ return a[Math.floor(R()*a.length)]; }, f1=function(v){ return (+v).toFixed(1); };
function rng(sd){ var a=(sd>>>0)||1; return function(){ a=(a+0x6D2B79F5)>>>0; var t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
var SKJ=['#FFE3CF','#F6D2B4','#F6D2B4','#F1CDA8','#F1CDA8','#E8BE98'], SKA=['#FFE3CF','#F6D2B4','#F1CDA8','#E8BE98','#D9A77E','#C99470','#A9764F','#8B5A3C','#6B4430'];
var HJ=['#1E1A1C','#2B2320','#2B2320','#3A2A22','#4A3326','#4A3326','#7A5236','#B07A4A'], HW=['#2B2320','#3A2A22','#4A3326','#7A5236','#B07A4A','#E8C77A','#F3E3B5','#B8452F','#D9C08A','#1E1A1C'], HFUN=['#5A3A6E','#F49AB5','#7FB8E0','#B8452F','#9B6BD6','#E8C77A'], HOLD=['#D9D6D2','#BDB8B2','#E9E6E2','#8E8A86','#C9C4BE'];
var SHIRTS=['#6C3483','#1ABC9C','#D35400','#F7DC6F','#AED6F1','#F5B7B1','#82E0AA','#E85D75','#4E8FD9','#3FA66B','#F2C230','#F08A24','#7E57C2','#46A6E0','#FFFFFF','#34363C','#C8283A','#8CCB7E','#F49AB5','#B07A4A','#2F4F8F','#9AA1AA','#E9D9A6','#FF8FA3','#5BC0BE','#FFD166','#A0C4FF'];
var PANTS=['#5B4B8A','#8A3B4A','#2E6B5E','#2F3E5C','#3D5A80','#34363C','#C9B48A','#6B717A','#6E4630','#4A5A3C','#E6E1D6','#F49AB5','#FFFFFF'];
var HELM=['#FFFFFF','#E85D75','#2F4F8F','#F2C230','#34363C','#3FA66B','#F08A24','#9AA1AA','#46A6E0','#C8283A','#F49AB5','#7E57C2'];
var HATC=['#E85D75','#2F4F8F','#F2C230','#34363C','#3FA66B','#FFFFFF','#F08A24','#7FB8E0','#F49AB5'];
var HSF=[0,1,1,2,2,3,7,7,8,4,9,11,12,13,14,15,18,19,21,22,12,13,1,7,24], LONGH=[1,2,3,7,8,9,11,12,13,14,15,19,21,22,24], HSM=[0,0,5,6,6,23,4,10,10,16,17,18,20,20,10,23,17,0,25];
var LONG={0:1,7:1,8:1,13:1,15:1,19:1,21:1,22:1,2:1,12:1};
function shade(h,f){ var n=parseInt(h.slice(1),16); var r=Math.min(255,Math.round((n>>16)*f)), g=Math.min(255,Math.round(((n>>8)&255)*f)), b=Math.min(255,Math.round((n&255)*f)); return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1); }
var PAT=['s','v','d','c']; // 服のがら：よこじま・たてじま・水玉・チェック（色はSHIRTSの先頭16色）
function pdefs(){ var o='<defs>'; for(var i=0;i<16;i++){ var c=SHIRTS[i], d=shade(c,c==='#FFFFFF'?.7:.62), l=shade(c,1.35);
  o+='<pattern id="pdPs'+i+'" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="'+c+'"/><rect width="3" height="1.2" fill="'+d+'"/></pattern>'
   +'<pattern id="pdPv'+i+'" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="'+c+'"/><rect width="1.1" height="3" fill="'+l+'"/></pattern>'
   +'<pattern id="pdPd'+i+'" width="3.4" height="3.4" patternUnits="userSpaceOnUse"><rect width="3.4" height="3.4" fill="'+c+'"/><circle cx="1.7" cy="1.7" r=".7" fill="'+(c==='#FFFFFF'?'#E85D75':'#FFFFFF')+'"/></pattern>'
   +'<pattern id="pdPc'+i+'" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="'+c+'"/><rect width="2" height="2" fill="'+d+'" opacity=".55"/><rect x="2" y="2" width="2" height="2" fill="'+d+'" opacity=".55"/></pattern>'; }
  return o+'</defs>'; }
var ALS=['#9BE58A','#B7A6F2','#8FD8F0','#F7A8D0','#C8F07A','#7FE0C8'];
function look(){ if(R()<0) return { al:1, f:R()<.5, st:'adult', skin:pk(ALS), hair:'#000', hs:0, shirt:pk(['#C0C8D8','#E9E6F7','#A9B8D9','#FFFFFF','#D7F0FF']), pants:pk(['#8E95A8','#6C7389','#B9C0D2']), hat:'', hatc:'#fff', gl:'', beard:0, must:0, ear:0, earc:'#fff', band:'#fff', anc:pk(['#F2C230','#E85D75','#7FB8E0','#FFFFFF']) };
  var f=R()<.6, jp=R()<.6, u=R(), st=u<.8?'adult':u<.94?'elder':'teen';
  var hair=st==='elder'?(R()<.25?pk(HJ):pk(HOLD)):jp?(R()<.1?pk(['#7A5236','#B07A4A','#9B6BD6','#F49AB5']):pk(HJ)):(R()<.12?pk(HFUN):pk(HW));
  var hs=f?pk(HSF):pk(HSM); if(st==='elder'&&!f&&R()<.3) hs=6;
  var hv=R(), hat=hv<.07?'cap':hv<.12?'beanie':hv<.16&&f?'sun':hv<.2?'brim':'';
  var si=Math.floor(R()*SHIRTS.length), sh=SHIRTS[si]; if(si<16&&R()<.38) sh='url(#pdP'+pk(PAT)+si+')';
  return { f:f, st:st, skin:jp?pk(SKJ):pk(SKA), hair:hair, hs:hs, shirt:sh, pants:pk(PANTS), hat:hat, hatc:pk(HATC), gl:R()<.18?pk(['#34363C','#8A5A3C','#C9A23A','#E85D75','#2F4F8F']):'',
    beard:!f&&st!=='teen'&&R()<(jp?.08:.22)&&LONGH.indexOf(hs)<0, must:!f&&R()<.08&&LONGH.indexOf(hs)<0, /* 髪が長い人は女性。ヒゲは付けない */ ear:f&&R()<.35, earc:pk(['#F2C230','#FFFFFF','#E85D75','#7FB8E0']), band:pk(['#E85D75','#FFFFFF','#F2C230','#7FB8E0','#3FA66B']) }; }
function base(hx,hy,hr,k,len,c,ex){ return '<path d="M'+f1(hx-hr)+' '+f1(hy+len)+' Q'+f1(hx-hr-1.4*k)+' '+f1(hy-hr-1.5*k)+' '+f1(hx+2*k)+' '+f1(hy-hr-.6*k)+' Q'+f1(hx+hr+.6*k)+' '+f1(hy-hr*.5)+' '+f1(hx+hr*.55)+' '+f1(hy-hr*.42)+' Q'+f1(hx)+' '+f1(hy-hr*.55)+' '+f1(hx-hr*.25)+' '+f1(hy-hr*.1)+' Q'+f1(hx-hr*.5)+' '+f1(hy+hr*.4)+' '+f1(hx-hr*.45)+' '+f1(hy+len)+'Z" fill="'+c+'"'+(ex||'')+'/>'; }
function C(x,y,r,c,ex){ return '<circle cx="'+f1(x)+'" cy="'+f1(y)+'" r="'+f1(r)+'" fill="'+c+'"'+(ex||'')+'/>'; }
function P(d,c,ex){ return '<path d="'+d+'" fill="'+c+'"'+(ex||'')+'/>'; }
function Ln(x1,y1,x2,y2,c,w,ex){ return '<line x1="'+f1(x1)+'" y1="'+f1(y1)+'" x2="'+f1(x2)+'" y2="'+f1(y2)+'" stroke="'+c+'" stroke-width="'+f1(w)+'" stroke-linecap="round"'+(ex||'')+'/>'; }
function hair(L,hx,hy,hr){ var k=hr/9, c=L.hair, hs=L.hs, s='', X=function(a){ return f1(hx+hr*a); }, Y=function(b){ return f1(hy+hr*b); };
  var len={1:.85,9:.85,11:.85,7:1.7,8:1.7,2:.5,3:.5,12:.5,14:.5,13:.4,15:1.5,19:1.4,21:1.4,22:1.7,24:1.0,18:.4,20:.35,16:.2,23:.35,25:.3}[hs]; if(len==null) len=hs===0?(L.f?1.25:.35):.35; len*=hr;
  if(hs===4){ [[-.7,-.7],[-.1,-1],[.5,-.85],[-1,-.1],[-.95,.45]].forEach(function(p){ s+=C(hx+hr*p[0],hy+hr*p[1],hr*.48,c); }); return s; }
  if(hs===17){ [[-.95,.2],[-.9,-.4],[-.55,-.85],[0,-1.02],[.5,-.85],[-1.0,.65]].forEach(function(p){ s+=C(hx+hr*p[0],hy+hr*p[1],hr*.36,c); }); return s; }
  if(hs===6) return P('M'+X(-.98)+' '+Y(-.05)+' Q'+X(-.9)+' '+Y(-1.05)+' '+X(.3)+' '+Y(-.98)+' Q'+X(.7)+' '+Y(-.85)+' '+X(.5)+' '+Y(-.6)+' Q'+X(-.2)+' '+Y(-.75)+' '+X(-.6)+' '+Y(-.1)+'Z',c,' opacity=".85"');
  // うしろ側に出る毛（先に描く）
  if(hs===2) s+=P('M'+X(-.7)+' '+Y(-.5)+' Q'+X(-2)+' '+Y(-.1)+' '+X(-1.6)+' '+Y(1.3)+' Q'+X(-1.1)+' '+Y(.2)+' '+X(-.6)+' '+Y(-.1)+'Z',c);
  if(hs===12){ s+=P('M'+X(-.8)+' '+Y(-.2)+' Q'+X(-1.9)+' '+Y(.3)+' '+X(-1.5)+' '+Y(1.6)+' Q'+X(-1.15)+' '+Y(.5)+' '+X(-.6)+' '+Y(.2)+'Z',shade(c,.85))+P('M'+X(-.6)+' '+Y(-.6)+' Q'+X(-1.6)+' '+Y(-.4)+' '+X(-1.35)+' '+Y(1.2)+' Q'+X(-1.0)+' '+Y(0)+' '+X(-.45)+' '+Y(-.2)+'Z',c); }
  if(hs===13) s+=P('M'+X(-.5)+' '+Y(-.95)+' Q'+X(-1.8)+' '+Y(-1.3)+' '+X(-1.95)+' '+Y(.9)+' Q'+X(-1.5)+' '+Y(-.3)+' '+X(-.6)+' '+Y(-.55)+'Z',c);
  if(hs===24) s+=P('M'+X(-.9)+' '+Y(.1)+' Q'+X(-1.5)+' '+Y(1.2)+' '+X(-1.0)+' '+Y(2.0)+' Q'+X(-.7)+' '+Y(1.1)+' '+X(-.55)+' '+Y(.4)+'Z',c);
  s+=base(hx,hy,hr,k,len,c);
  if(hs===2) s+=C(hx-hr*.85,hy-hr*.42,1.3*k,'#E85D75');
  if(hs===12) s+=C(hx-hr*.78,hy-hr*.05,1.3*k,'#E85D75');
  if(hs===13) s+=C(hx-hr*.62,hy-hr*.8,1.3*k,'#F2C230');
  if(hs===24) s+=C(hx-hr*.8,hy+hr*.25,1.2*k,'#7FB8E0');
  if(hs===3) s+=C(hx-hr*.55,hy-hr*.95,hr*.42,c);
  if(hs===21) s+=C(hx-hr*.75,hy-hr*.75,hr*.32,c);
  if(hs===14) s+=C(hx-hr*.25,hy-hr*1.05,hr*.36,c)+C(hx-hr*.95,hy-hr*.5,hr*.36,c);
  if(hs===8) s+=Ln(hx-hr*.7,hy,hx-hr*.9,hy+hr*1.9,c,2.6*k,' stroke-dasharray="'+f1(1.6*k)+' '+f1(.5*k)+'"');
  if(hs===9) s+='<path d="M'+X(-1.05)+' '+Y(.8)+' q'+f1(-3*k)+' '+f1(2*k)+' '+f1(-4*k)+' '+f1(-1*k)+' M'+X(-.5)+' '+Y(.95)+' q'+f1(1*k)+' '+f1(2.6*k)+' '+f1(-1.6*k)+' '+f1(2.6*k)+'" stroke="'+c+'" stroke-width="'+f1(2.2*k)+'" fill="none" stroke-linecap="round"/>';
  if(hs===15) [.3,.75,1.2].forEach(function(b){ s+=C(hx-hr*1.0,hy+hr*b,hr*.28,c); });
  if(hs===10) s+=Ln(hx-hr*.1,hy-hr*.95,hx+hr*.2,hy-hr*.55,shade(c,1.6),.8*k);
  if(hs===11||hs===22) s+=P('M'+X(-.2)+' '+Y(-.9)+' Q'+X(.8)+' '+Y(-.9)+' '+X(.85)+' '+Y(-.2)+' L'+X(.2)+' '+Y(-.35)+'Z',c);
  if(hs===18) s+=P('M'+X(-1.05)+' '+Y(.25)+' Q'+X(-1.12)+' '+Y(-1.25)+' '+X(.2)+' '+Y(-1.12)+' Q'+X(1.02)+' '+Y(-.92)+' '+X(.95)+' '+Y(-.28)+' L'+X(-.3)+' '+Y(-.3)+' L'+X(-.5)+' '+Y(.25)+'Z',c);
  if(hs===19) s+='<path d="M'+X(-1.02)+' '+Y(-.15)+' Q'+X(-.6)+' '+Y(-1.2)+' '+X(.62)+' '+Y(-.62)+'" stroke="'+L.band+'" stroke-width="'+f1(2*k)+'" fill="none" stroke-linecap="round"/>';
  if(hs===16) s+=P('M'+X(-.85)+' '+Y(-.55)+' L'+X(-.45)+' '+Y(-1.65)+' L'+X(.05)+' '+Y(-1.35)+' L'+X(.3)+' '+Y(-1.6)+' L'+X(.55)+' '+Y(-.75)+'Z',c);
  if(hs===20) s+=C(hx+hr*.15,hy-hr*.98,hr*.42,c);
  if(hs===23) s+=P('M'+X(-.6)+' '+Y(-.85)+' Q'+X(.3)+' '+Y(-1.45)+' '+X(.95)+' '+Y(-.55)+' Q'+X(.3)+' '+Y(-.9)+' '+X(-.6)+' '+Y(-.55)+'Z',shade(c,1.25));
  if(hs===25) s+=P('M'+X(-1.0)+' '+Y(-.1)+' Q'+X(-1.2)+' '+Y(-1.1)+' '+X(-.2)+' '+Y(-1.25)+' Q'+X(-.6)+' '+Y(-.8)+' '+X(-.7)+' '+Y(-.1)+'Z',c);
  if(hs===5) s+='<path d="M'+X(-.8)+' '+Y(-.8)+' l'+f1(1*k)+' '+f1(-4*k)+' l'+f1(2*k)+' '+f1(3.4*k)+' l'+f1(2*k)+' '+f1(-4.2*k)+' l'+f1(2*k)+' '+f1(3.8*k)+' l'+f1(2.2*k)+' '+f1(-3.6*k)+' l'+f1(1.4*k)+' '+f1(4.4*k)+'Z" fill="'+c+'"/>';
  return s; }
function hat(L,hx,hy,hr){ var k=hr/9, c=L.hatc, X=function(a){ return f1(hx+hr*a); }, Y=function(b){ return f1(hy+hr*b); };
  if(L.hat==='cap') return P('M'+X(-1.05)+' '+Y(-.25)+' Q'+X(-.95)+' '+Y(-1.4)+' '+X(.15)+' '+Y(-1.28)+' Q'+X(.95)+' '+Y(-1.08)+' '+X(.9)+' '+Y(-.4)+'Z',c)+P('M'+X(.5)+' '+Y(-.52)+' L'+X(1.75)+' '+Y(-.4)+' Q'+X(1.65)+' '+Y(-.18)+' '+X(.5)+' '+Y(-.28)+'Z',shade(c,.8))+C(hx-hr*.2,hy-hr*1.26,.9*k,shade(c,.8));
  if(L.hat==='beanie') return P('M'+X(-1.1)+' '+Y(-.1)+' Q'+X(-1.08)+' '+Y(-1.5)+' '+X(0)+' '+Y(-1.38)+' Q'+X(1.02)+' '+Y(-1.28)+' '+X(.97)+' '+Y(-.32)+'Z',c)+Ln(hx-hr*1.08,hy-hr*.22,hx+hr*.97,hy-hr*.42,shade(c,.82),3*k)+C(hx-hr*.15,hy-hr*1.48,2.3*k,c===('#FFFFFF')?'#E85D75':'#FFFFFF');
  if(L.hat==='sun') return '<ellipse cx="'+X(0)+'" cy="'+Y(-.62)+'" rx="'+f1(hr*1.85)+'" ry="'+f1(hr*.3)+'" fill="#E9D9A6"/>'+P('M'+X(-.85)+' '+Y(-.6)+' Q'+X(-.8)+' '+Y(-1.5)+' '+X(0)+' '+Y(-1.45)+' Q'+X(.8)+' '+Y(-1.45)+' '+X(.82)+' '+Y(-.66)+'Z','#E9D9A6')+Ln(hx-hr*.84,hy-hr*.8,hx+hr*.82,hy-hr*.82,c,2*k);
  if(L.hat==='brim') return P('M'+X(-1.06)+' '+Y(-.25)+' Q'+X(-.9)+' '+Y(-1.35)+' '+X(.2)+' '+Y(-1.25)+' Q'+X(.95)+' '+Y(-1.05)+' '+X(.9)+' '+Y(-.35)+'Z',c)+'<rect x="'+X(.3)+'" y="'+Y(-.48)+'" width="'+f1(hr*.95)+'" height="'+f1(2*k)+'" rx="'+f1(k)+'" fill="'+shade(c,.8)+'"/>';
  return ''; }
function face(L,hx,hy,hr,helm){ var k=hr/9, s='';
  if(L.beard&&!helm) s+=P('M'+f1(hx-hr*.35)+' '+f1(hy+hr*.35)+' Q'+f1(hx+hr*.1)+' '+f1(hy+hr*1.15)+' '+f1(hx+hr*.85)+' '+f1(hy+hr*.55)+' Q'+f1(hx+hr*.4)+' '+f1(hy+hr*.75)+' '+f1(hx-hr*.2)+' '+f1(hy+hr*.3)+'Z',L.st==='elder'?'#D9D6D2':L.hair);
  if(L.must&&!L.beard) s+='<path d="M'+f1(hx+4.4*k)+' '+f1(hy+3.4*k)+' q'+f1(2.2*k)+' '+f1(-1.4*k)+' '+f1(4.6*k)+' '+f1(.2*k)+'" stroke="'+(L.st==='elder'?'#BDB8B2':L.hair)+'" stroke-width="'+f1(1.4*k)+'" fill="none" stroke-linecap="round"/>';
  if(L.ear&&!helm) s+=C(hx-hr*.25,hy+hr*.4,1*k,L.earc);
  if(L.f) s+=Ln(hx+5.4*k,hy-1.6*k,hx+7*k,hy-2.6*k,'#3B2A24',.7*k)+C(hx+6.6*k,hy+4.4*k,.9*k,'#E8607A');
  if(L.gl) s+=C(hx+4.9*k,hy-.8*k,2.3*k,'none',' stroke="'+L.gl+'" stroke-width="'+f1(.8*k)+'"')+Ln(hx+2.6*k,hy-1.2*k,hx-hr*.3,hy-1.6*k,L.gl,.7*k);
  return s; }
function alien(L,hx,hy,hr){ var k=hr/9; return Ln(hx-hr*.35,hy-hr*.85,hx-hr*.8,hy-hr*1.8,L.skin,1.1*k)+Ln(hx+hr*.3,hy-hr*.9,hx+hr*.55,hy-hr*1.85,L.skin,1.1*k)+C(hx-hr*.8,hy-hr*1.85,1.6*k,L.anc)+C(hx+hr*.55,hy-hr*1.9,1.6*k,L.anc)
  +'<ellipse cx="'+f1(hx+hr*.42)+'" cy="'+f1(hy-hr*.05)+'" rx="'+f1(2.2*k)+'" ry="'+f1(3*k)+'" fill="#1E1A2E"/>'+C(hx+hr*.5,hy-hr*.22,.8*k,'#FFFFFF')+(L.f?C(hx+hr*.7,hy+hr*.5,1*k,'#F49AB5'):''); }
function tail(L,hx,hy,hr){ return P('M'+f1(hx-hr*.7)+' '+f1(hy+hr*.1)+' Q'+f1(hx-hr*1.9)+' '+f1(hy+hr*.4)+' '+f1(hx-hr*1.5)+' '+f1(hy+hr*1.6)+' Q'+f1(hx-hr*1.1)+' '+f1(hy+hr*.7)+' '+f1(hx-hr*.5)+' '+f1(hy+hr*.5)+'Z',L.hair); }
var fn=function(str,seed){ var R0=R; if(seed!=null) R=rng(seed); try{ return str.replace(/<g class="rv-rider"([^>]*)>([\s\S]*?)<\/g>/g,function(m,at,body){ var h=/data-h="([^"]*)"/.exec(at); if(!h) return m; var a=h[1].split(',').map(Number), hx=a[0], hy=a[1], hr=a[2], helm=a[3], L=look();
    var hc=pk(HELM); body=body.split('#010101').join(L.skin).split('#030303').join(L.shirt).split('#040404').join(L.pants).split('#050505').join(hc);
    body=body.replace('<!--H-->',L.al?alien(L,hx,hy,hr):helm?face(L,hx,hy,hr,1):hair(L,hx,hy,hr)+hat(L,hx,hy,hr)+face(L,hx,hy,hr,0)).replace('<!--P-->',!L.al&&helm&&L.f&&LONG[L.hs]?tail(L,hx,hy,hr):'');
    return '<g class="rv-rider"'+at+(L.al?' data-al="1"':'')+'>'+body+'</g>'; }); } finally { R=R0; } }; fn.defs=pdefs(); return fn;
})(); var PDEFS=PP.defs;

/* Higher Self の名前：見ている人と、その友だち（このブラウザでLIFE BOOKを遊んでいるとき）。なければ、運営者ページが届けた本当の友だちのつながり。どちらもないときは名前を出さない */
var HS=(function(){
var R=Math.random, pk=function(a){ return a[Math.floor(R()*a.length)]; };
var N=[], F=[], ME=-1, ON={}; // ON＝いま画面のどこかに乗っている人（同じ人が2か所に出ないように）
function free(i){ return !ON[i]; }
function link(a,b){ if(a!==b&&F[a]&&F[b]){ F[a][b]=1; F[b][a]=1; } }
function fr(i){ return Object.keys(F[i]).map(Number); }
function fof(i){ var s={}; fr(i).forEach(function(b){ fr(b).forEach(function(c){ if(c!==i&&!F[i][c]&&free(c)) s[c]=1; }); }); return Object.keys(s).map(Number); }
function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(R()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function ls(k){ try{ var v=localStorage.getItem(k); if(v==null) return null; try{ return JSON.parse(v); }catch(e){ return v; } }catch(e){ return null; } }
// 1) このブラウザの自分と友だち
(function(){ var me=ls('hitotsu.myname'), L=ls('hitotsu.friends'), fof=ls('hitotsu.fof')||{}; var ids={};
  if(typeof me==='string'&&me.trim()){ ME=N.length; N.push(me.trim().slice(0,20)); F.push({}); }
  if(Array.isArray(L)) L.forEach(function(x){ if(!x||!x.id||!x.by||ids[x.id]!=null) return; ids[x.id]=N.length; N.push(String(x.by).slice(0,20)); F.push({}); if(ME>=0) link(ME,ids[x.id]); });
  try{ Object.keys(fof).forEach(function(a){ var o=fof[a]; if(ids[a]==null||!o||!Array.isArray(o.fr)) return; o.fr.forEach(function(y){ if(y&&ids[y.i]!=null) link(ids[a],ids[y.i]); }); }); }catch(e){} })();
var LOCAL=N.length>0;
// 2) 本当の友だちのつながり（運営者ページが os/parade に、Higher Self名と「だれとだれが友だちか」だけを書く）
if(!LOCAL) try{ fetch('https://firestore.googleapis.com/v1/projects/lifebook-dcae9/databases/(default)/documents/os/parade').then(function(r){ return r.ok?r.json():null; }).then(function(d){ try{ var j=JSON.parse(d.fields.j.stringValue); if(N.length||!j.n||!j.e) return; var n=j.n.map(function(x){ return String(x).slice(0,20); }); var f=n.map(function(){ return {}; }); N=n; F=f; j.e.forEach(function(q){ if(N[q[0]]!=null&&N[q[1]]!=null) link(q[0],q[1]); }); }catch(er){} }).catch(function(){}); }catch(er){}
function group(k){ if(!N.length) return null;
  if(LOCAL){ // 自分ひとり・友だちひとり・自分と友だち・友だち同士
    var others=[]; for(var i=0;i<N.length;i++) if(i!==ME&&free(i)) others.push(i); var meOk=ME>=0&&free(ME);
    if(!others.length&&!meOk) return null;
    if(k<=1||!others.length) return [meOk&&(R()<.4||!others.length)?ME:pk(others)];
    var m=[]; if(meOk&&R()<.55) m.push(ME); var a=pk(others); if(m.indexOf(a)<0) m.push(a);
    shuffle(fr(a).filter(function(b){ return b!==ME&&free(b); })).forEach(function(b){ if(m.length<k&&m.indexOf(b)<0) m.push(b); });
    shuffle(others).forEach(function(b){ if(m.length<k&&m.indexOf(b)<0&&R()<.5) m.push(b); }); return shuffle(m); }
  var c=[]; for(var i2=0;i2<N.length;i2++) if(Object.keys(F[i2]).length&&free(i2)) c.push(i2); if(!c.length) return null; var a2=pk(c);
  if(k<=1) return [a2]; if(R()<.3){ var o2=fof(a2); if(o2.length) return [a2,pk(o2)]; } var m2=[a2]; shuffle(fr(a2)).forEach(function(b){ if(m2.length<k&&free(b)&&m2.every(function(x){ return F[x][b]; })) m2.push(b); });
  if(m2.length<k) shuffle(fr(a2)).forEach(function(b){ if(m2.length<k&&free(b)&&m2.indexOf(b)<0) m2.push(b); }); return m2; }
var NS='http://www.w3.org/2000/svg';
function esc(t){ return String(t).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function tw(t,fs){ return t.length*fs*(/^[\x00-\x7F]+$/.test(t)?.62:1)+fs*1.1; }
function pill(x,y,t,fs){ var w=tw(t,fs), h=fs*1.45;
  return '<g class="hs-tag"><rect x="'+(x-w/2).toFixed(1)+'" y="'+(y-h).toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="'+(h/2).toFixed(1)+'" fill="#FFFFFF" fill-opacity=".92" stroke="#F06C9B" stroke-width="'+(fs*.12).toFixed(2)+'"/><text x="'+x.toFixed(1)+'" y="'+(y-h*.3).toFixed(1)+'" font-size="'+fs.toFixed(1)+'" text-anchor="middle" fill="#4A3B47" font-weight="700">'+esc(t)+'</text></g>'; }
// 乗り物 e（ページに入れたあと）に、名前のふだを付ける
var tag=function(e,fs,force,want){ if(!force&&!N.length) return; var rs=e.querySelectorAll('.rv-rider'); if(!rs.length||(!force&&!want&&R()<.12)) return; if(!force&&!want){ var fc=0; for(var z=0;z<N.length;z++) if(free(z)) fc++; if(fc<=2&&(N.length>=4||R()<.6)) return; } /* 歩道で話すふたりのために、少しだけ空けておく */ var inv=e.getCTM(); if(!inv) return; inv=inv.inverse(); var H=[];
  for(var q=0;q<rs.length;q++){ var r=rs[q], c=null; if(r.getAttribute('data-al')) continue; for(var i=0;i<r.children.length;i++){ var ch=r.children[i]; if(ch.tagName==='circle'&&+ch.getAttribute('r')>5){ c=ch; break; } } if(!c) continue; var M=c.getCTM(); if(!M) continue; M=inv.multiply(M);
    var cx=+c.getAttribute('cx'), cy=+c.getAttribute('cy'), rr=+c.getAttribute('r'); H.push({x:M.a*cx+M.c*cy+M.e, y:M.b*cx+M.d*cy+M.f, r:Math.abs(M.d)*rr}); }
  if(!H.length) return; H.sort(function(a,b){ return a.x-b.x; });
  var G, st, NM, LB=0, seats;
  if(force){ st=force[0]; NM=force[1]; LB=force[2]; seats=H.slice(st,st+NM.length); if(!seats.length) return; NM=NM.slice(0,seats.length); }
  else { var k=H.length<=2?H.length:Math.min(H.length,pk([1,2,2,3,3,4])); G=want||group(k); if(!G||!G.length) return; k=Math.min(k,G.length);
  st=Math.floor(R()*(H.length-k+1)); seats=H.slice(st,st+k); NM=G.slice(0,seats.length).map(function(i){ return N[i]; }); }
  var s='', lv=[], top=1e9, base=Math.min.apply(null,seats.map(function(h){ return h.y-h.r*1.35-fs*.3; }));
  seats.forEach(function(h,i){ var t=NM[i], w=tw(t,fs), L=0; // ふだが重ならないよう、段をずらす
    while((lv[L]||[]).some(function(o){ return Math.abs(o.x-h.x)<(o.w+w)/2+fs*.3; })) L++; (lv[L]=lv[L]||[]).push({x:h.x,w:w});
    var yy=(seats.length>1?base:h.y-h.r*1.35-fs*.3)-L*fs*1.7; s+=pill(h.x,yy,t,fs); top=Math.min(top,yy-fs*1.45); });
  if(seats.length>=2){ var all; if(force) all=LB!==2; else { var mm=G.slice(0,seats.length); all=true; for(var x=0;x<mm.length;x++) for(var y=x+1;y<mm.length;y++) if(!F[mm[x]][mm[y]]) all=false; } LB=all?1:2;
    var minx=Math.min.apply(null,seats.map(function(h){ return h.x; })), maxx=Math.max.apply(null,seats.map(function(h){ return h.x; }));
    s+='<text x="'+((minx+maxx)/2).toFixed(1)+'" y="'+(top-fs*.35).toFixed(1)+'" font-size="'+(fs*.9).toFixed(1)+'" text-anchor="middle" fill="#E0457B" font-weight="700" stroke="#FFFFFF" stroke-width="'+(fs*.28).toFixed(2)+'" paint-order="stroke">'+(all?'♡ 友だち':'友だちの友だち')+'</text>'; }
  var g=document.createElementNS(NS,'g'); g.innerHTML=s; e.appendChild(g); e._tag=[st,NM,seats.length>=2?LB:0]; if(!force){ var used=G.slice(0,seats.length); used.forEach(function(i){ ON[i]=1; }); e._hs=used; } };
tag.on=ON; tag.nm=function(i){ return N[i]; };
// ---- 友だちのペット（ゲームが 'hitotsu.gwPets' に、名前・種類・飼い主のHigher Self名だけを入れている）。乗り物に、だれかと一緒に乗る ----
var PETS=[], PON={};
(function(){ var L=ls('hitotsu.gwPets'); if(Array.isArray(L)) L.forEach(function(p){ if(p&&p.n&&p.s&&!/fish|whale|gold/.test(p.s)) PETS.push({n:String(p.n).slice(0,12),s:String(p.s),o:String(p.o||'').slice(0,20)}); }); })();
tag.pets=function(){ return PETS.filter(function(p){ return !PON[p.n+'|'+p.o]; }); };
tag.find=function(nm){ var i=N.indexOf(nm); return i>=0&&free(i)?i:-1; };
tag.petFree=function(e){ if(e&&e._pk) delete PON[e._pk]; };
function hsh(t){ var h=0; for(var i=0;i<t.length;i++) h=(h*31+t.charCodeAt(i))>>>0; return h; }
function petSVG(sp,nm,body){ var h=hsh(nm), q=function(a){ return a[h%a.length]; }, o='', E='<circle cx="3.6" cy="-2.6" r="1.4" fill="#1E1A1C"/><circle cx="4" cy="-3" r=".45" fill="#fff"/>';
  var c={dog:q(['#C98A4B','#FFFFFF','#E8C77A','#34363C','#B07A4A']),cat:q(['#F2A65A','#FFFFFF','#9AA1AA','#34363C','#E8C77A']),rabbit:q(['#FFFFFF','#B8A089','#E9E6E2']),hamster:q(['#F2C08A','#FFFFFF','#E8C77A']),bird:q(['#7FB8E0','#F2C230','#8CCB7E','#FFFFFF']),panda:'#FFFFFF',polarbear:'#F7F3EA',goat:'#F2EEE6',sheep:'#FFF8EC',lion:'#E8B04A',cheetah:'#E9B85A',giraffe:'#F2C45A',elephant:'#A9B0BA',eagle:'#FFFFFF',hawk:'#9A6B45',kangaroo:'#B9835A',dino:'#7CCB6E'}[sp]||'#C98A4B';
  var dk=c==='#FFFFFF'||c==='#F7F3EA'||c==='#FFF8EC'?'#C9BFB2':'rgba(0,0,0,.25)';
  if(body) o+='<ellipse cx="-9" cy="12" rx="11" ry="8" fill="'+c+'"/><ellipse cx="-9" cy="12" rx="11" ry="8" fill="none" stroke="'+dk+'" stroke-width=".8"/>';
  if(sp==='lion') o+='<circle cx="-1" cy="0" r="14.5" fill="#B5652B"/>';
  if(sp==='elephant') o+='<ellipse cx="-5" cy="1" rx="7.5" ry="10" fill="#8E96A2"/>';
  if(sp==='dog') o+='<ellipse cx="-6" cy="-1" rx="3.6" ry="7.5" fill="'+(c==='#FFFFFF'?'#E9D9A6':'#7A5236')+'" transform="rotate(18 -6 -1)"/>';
  if(sp==='cat') o+='<path d="M-9 -4 L-6 -15 L-1 -8 Z M1 -8 L6 -15 L8 -4 Z" fill="'+c+'"/><path d="M-7 -6 L-5.6 -12 L-3 -8 Z" fill="#F7B2C4"/>';
  if(sp==='rabbit'||sp==='kangaroo') o+='<ellipse cx="-4" cy="-13" rx="2.8" ry="8" fill="'+c+'"/><ellipse cx="1.5" cy="-14" rx="2.8" ry="8" fill="'+c+'"/><ellipse cx="1.5" cy="-14" rx="1.2" ry="5.5" fill="#F7B2C4"/>';
  if(sp==='hamster'||sp==='polarbear') o+='<circle cx="-6" cy="-8" r="3.4" fill="'+c+'"/><circle cx="4" cy="-9" r="3.4" fill="'+c+'"/><circle cx="4" cy="-9" r="1.6" fill="'+dk+'"/>';
  if(sp==='panda') o+='<circle cx="-6" cy="-8" r="3.6" fill="#1E1A1C"/><circle cx="4" cy="-9" r="3.6" fill="#1E1A1C"/>';
  if(sp==='goat') o+='<path d="M-3 -8 q-6 -10 -12 -6 q6 -1 9 7 Z M2 -9 q-2 -10 -8 -10 q5 3 5 10 Z" fill="#8E8A86"/>';
  if(sp==='giraffe') o+='<line x1="-3" y1="-8" x2="-4" y2="-15" stroke="#C9A23A" stroke-width="1.8"/><line x1="2" y1="-8" x2="2" y2="-15" stroke="#C9A23A" stroke-width="1.8"/><circle cx="-4" cy="-15.5" r="1.8" fill="#8B5A3C"/><circle cx="2" cy="-15.5" r="1.8" fill="#8B5A3C"/>';
  if(sp==='dino') o+='<path d="M-12 -2 l-2 -6 l4 2 l0 -7 l4 4 l2 -7 l3 6 Z" fill="#4E9C46"/>';
  if(sp==='cheetah'||sp==='bird'||sp==='eagle'||sp==='hawk') o+='';
  o+=(sp==='dino'?'<ellipse cx="2" cy="0" rx="12" ry="8.5" fill="'+c+'"/>':'<circle cx="0" cy="0" r="10" fill="'+c+'"/>')+'<circle cx="0" cy="0" r="10" fill="none" stroke="'+dk+'" stroke-width=".7"'+(sp==='dino'?' opacity="0"':'')+'/>';
  if(sp==='sheep') o+=[[-7,-7],[-2,-10],[4,-9],[-9,-1],[8,-5]].map(function(p){ return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.2" fill="#FFFFFF" stroke="#E9DFCF" stroke-width=".6"/>'; }).join('')+'<ellipse cx="4" cy="1" rx="5.5" ry="6" fill="#5A4A42"/>';
  if(sp==='panda') o+='<ellipse cx="3.8" cy="-2.2" rx="3" ry="3.8" fill="#1E1A1C"/>';
  if(sp==='giraffe') o+='<circle cx="-5" cy="2" r="2.4" fill="#B5652B"/><circle cx="-1" cy="-5" r="1.8" fill="#B5652B"/><circle cx="-6" cy="-5" r="1.4" fill="#B5652B"/>';
  if(sp==='cheetah') o+=[[-6,-3],[-3,-7],[-7,3],[-2,5],[1,-6]].map(function(p){ return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="1" fill="#5A3A22"/>'; }).join('')+'<path d="M3.4 -1 Q4 4 7 6" stroke="#1E1A1C" stroke-width=".9" fill="none"/>';
  o+=sp==='sheep'?'<circle cx="5.6" cy="-1" r="1.1" fill="#fff"/>':sp==='panda'?'<circle cx="4" cy="-2.6" r="1.1" fill="#fff"/>':E;
  if(sp==='bird'||sp==='eagle'||sp==='hawk'){ o+='<path d="M8 -3 L'+(sp==='bird'?'15 0':'15 1 Q14 5 11 3')+' L8 3 Z" fill="'+(sp==='hawk'?'#3A3340':'#F2B02E')+'"/>'; if(sp==='hawk') o+='<path d="M0 -3 q5 -3 9 1 q-2 6 -8 6 Z" fill="#F3E3B5" opacity=".9"/>'+E; }
  else if(sp==='elephant') o+='<path d="M8 0 q6 4 4 12 q-1 2 -3 0 q1 -6 -4 -8 Z" fill="'+c+'"/>';
  else if(sp==='dino') o+='<path d="M7 4 q4 2 7 -1" stroke="#2E5E2A" stroke-width="1" fill="none"/>';
  else if(sp!=='sheep'){ o+='<ellipse cx="7" cy="3" rx="5" ry="3.8" fill="'+(sp==='lion'||sp==='cheetah'||sp==='giraffe'||sp==='kangaroo'?'#F7E3B5':'rgba(255,255,255,.55)')+'"/><circle cx="10.6" cy="2" r="1.7" fill="'+(sp==='cat'||sp==='rabbit'||sp==='hamster'?'#E8607A':'#1E1A1C')+'"/>'; if(sp==='cat') o+='<path d="M9 5 l6 1 M9 6 l6 3" stroke="#8E8A86" stroke-width=".5"/>'; if(sp==='goat') o+='<path d="M6 8 l2 7 l3 -7 Z" fill="#D9D6D2"/>'; }
  if(sp==='polarbear'||sp==='lion'||sp==='hamster'||sp==='panda'||sp==='dog'||sp==='rabbit'||sp==='cat') o+='<circle cx="-1" cy="4" r="2" fill="#F7B2C4" opacity=".55"/>';
  return o; }
// 歩く人が、友だちのペットをつれて散歩する（ペットは前を歩く）
tag.walkPet=function(e,fs,p,force,sw){ var fc=e.firstChild, flip=!!(fc&&fc.getAttribute&&/scale\(-1/.test(fc.getAttribute('transform')||'')), sg=flip?-1:1;
  var sp=force?force[1]:p.s, nm=force?force[2]:p.n, big=/elephant|giraffe|lion|polarbear|dino|kangaroo/.test(sp), r=big?4.2:3, k=r/10, hx=flip?-5-r:sw+5+r, hy=-20*k, handX=flip?sw-7.9:7.9;
  var s='<line x1="'+handX.toFixed(1)+'" y1="-12.4" x2="'+(hx-sg*r*.6).toFixed(1)+'" y2="'+(hy+r*.6).toFixed(1)+'" stroke="#E85D75" stroke-width=".5"/><g transform="translate('+hx.toFixed(1)+' '+hy.toFixed(1)+') scale('+(sg*k).toFixed(3)+' '+k.toFixed(3)+')">'+petSVG(sp,nm,true)+'</g>'+pill(hx,hy-r*1.6-fs*.2,'🐾 '+nm,fs*.8);
  var g=document.createElementNS(NS,'g'); g.innerHTML=s; e.appendChild(g); e._pet=[-2,sp,nm]; if(!force){ e._pk=p.n+'|'+p.o; PON[e._pk]=1; } };
// ペット e（乗り物）に乗せる。force＝写真から作り直す時の [席, 種類, 名前]
tag.pet=function(e,fs,p,force,behind){ var rs=e.querySelectorAll('.rv-rider'); if(!rs.length) return; var inv=e.getCTM(); if(!inv) return; inv=inv.inverse(); var H=[];
  for(var q=0;q<rs.length;q++){ var r=rs[q], c=null; if(r.getAttribute('data-al')) continue; for(var i=0;i<r.children.length;i++){ var ch=r.children[i]; if(ch.tagName==='circle'&&+ch.getAttribute('r')>5){ c=ch; break; } } if(!c) continue; var M=c.getCTM(); if(!M) continue; M=inv.multiply(M);
    var cx=+c.getAttribute('cx'), cy=+c.getAttribute('cy'), rr=+c.getAttribute('r'); H.push({el:r,x:M.a*cx+M.c*cy+M.e, y:M.b*cx+M.d*cy+M.f, r:Math.abs(M.d)*rr}); }
  if(!H.length) return; H.sort(function(a,b){ return a.x-b.x; }); var fc=e.firstChild, flip=!!(fc&&fc.getAttribute&&/scale\(-1/.test(fc.getAttribute('transform')||'')), sg=flip?-1:1, front=flip?0:H.length-1, s0;
  if(force) s0=force[0]; else { var used={}; if(e._tag) for(var u=e._tag[0];u<e._tag[0]+e._tag[1].length;u++) used[u]=1; var cand=[]; H.forEach(function(h,i){ if(!used[i]&&i!==front) cand.push(i); }); s0=cand.length?pk(cand):-1; if(s0<0&&!behind) return; }
  var h, body=false, cx2, cy2, rr2; if(s0>=0&&H[s0]){ h=H[s0]; h.el.style.display='none'; cx2=h.x; cy2=h.y; rr2=h.r*1.05; } else { h=H[front]; cx2=h.x-sg*h.r*2.1; cy2=h.y+h.r*2.0; rr2=h.r*.95; body=true; s0=-1; }
  var sp=force?force[1]:p.s, nm=force?force[2]:p.n, k=rr2/10;
  var t='🐾 '+nm, s=(s0>=0?'':'<g transform="translate('+cx2.toFixed(1)+' '+cy2.toFixed(1)+') scale('+(sg*k).toFixed(3)+' '+k.toFixed(3)+')">'+petSVG(sp,nm,body)+'</g>')+pill(cx2,cy2-rr2*(sp==='rabbit'||sp==='kangaroo'||sp==='giraffe'?2.4:1.5)-fs*.3-(body?h.r*.85:0),t,fs*.92);
  if(s0>=0){ /* 窓の中の席：その人の代わりに、窓の中（窓の形で切りぬかれる所）にペットの顔を入れる */ var rd=h.el, dh=(rd.getAttribute('data-h')||'').split(',').map(Number), w2=document.createElementNS(NS,'g'); if(rd.getAttribute('transform')) w2.setAttribute('transform',rd.getAttribute('transform')); var kk=dh[2]*.95/10;
    var open=!rd.closest('[clip-path]'); /* 窓のない席（自転車・バイクなど）は、体ごとすわらせる */ w2.innerHTML='<g transform="translate('+dh[0]+' '+(open?dh[1]+dh[2]*1.8:dh[1])+') scale('+kk.toFixed(3)+')">'+petSVG(sp,nm,open)+'</g>'; rd.parentNode.insertBefore(w2,rd.nextSibling); }
  var g=document.createElementNS(NS,'g'); g.innerHTML=s; e.appendChild(g); e._pet=[s0,sp,nm]; if(!force){ e._pk=p.n+'|'+p.o; PON[e._pk]=1; } };
// 歩いて話すふたり：友だち同士（1）か、友だちの友だち（2）
tag.pair=function(){ var c=[]; for(var i=0;i<N.length;i++) if(free(i)&&Object.keys(F[i]).length) c.push(i); if(!c.length) return null; var a=pk(c), f=fr(a).filter(free), o=fof(a);
  if(f.length&&(R()<.65||!o.length)) return [a,pk(f),1]; if(o.length) return [a,pk(o),2]; return null; };
return tag;
})();
function hsFree(e){ try{ (e._hs||[]).forEach(function(i){ delete HS.on[i]; }); HS.petFree(e); }catch(er){} }
// 人や乗り物の絵の入れもの（向きを変えたり、すわったりできるように）
function bodyWrap(g,w,dir){ return '<g class="pd-bd"'+(dir<0?' transform="translate('+w+' 0) scale(-1 1)"':'')+'><g class="pd-up">'+g+'</g></g>'; }
function pdPose(e,w,face,sit){ var bd=e.querySelector('.pd-bd'), up=e.querySelector('.pd-up'); if(!bd||!up) return; if(face<0) bd.setAttribute('transform','translate('+w+' 0) scale(-1 1)'); else bd.removeAttribute('transform');
  var old=bd.querySelector('.pd-seat'); if(old) old.remove(); var cl=(e.getAttribute('class')||'').replace(/ ?pd-sit/g,'');
  if(sit){ e.setAttribute('class',cl+' pd-sit'); up.setAttribute('transform','translate(0 4.7)'); var ln=up.querySelector('.pd-sa'), col=ln?ln.getAttribute('stroke'):'#2F3E5C', g=document.createElementNS('http://www.w3.org/2000/svg','g'); g.setAttribute('class','pd-seat');
    g.innerHTML='<path d="M5 -6 L10.4 -6 L10.4 -0.6" stroke="'+col+'" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="10.4" y1="-0.4" x2="12.4" y2="-0.4" stroke="#3A3340" stroke-width="1.9" stroke-linecap="round"/>'; bd.appendChild(g); }
  else { e.setAttribute('class',cl); up.removeAttribute('transform'); } }
// 吹き出し（cx＝頭のまん中、by＝吹き出しの下のはし）
function sayG(cx,by,tx,fs){ function e2(t){ return String(t).replace(/[&<>]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; }); } var w=tx.length*fs+fs*1.6, h=fs*1.7, y0=by-h, sw=(fs*.1).toFixed(2);
  return '<path d="M'+(cx-fs*.5).toFixed(1)+' '+by.toFixed(1)+' L'+cx.toFixed(1)+' '+(by+fs*.6).toFixed(1)+' L'+(cx+fs*.5).toFixed(1)+' '+by.toFixed(1)+'Z" fill="#FFF7FB" stroke="#F06C9B" stroke-width="'+sw+'"/><rect x="'+(cx-w/2).toFixed(1)+'" y="'+y0.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="'+(h*.45).toFixed(1)+'" fill="#FFF7FB" stroke="#F06C9B" stroke-width="'+sw+'"/><text x="'+cx.toFixed(1)+'" y="'+(y0+h*.68).toFixed(1)+'" font-size="'+fs.toFixed(1)+'" text-anchor="middle" fill="#4A3B47" font-weight="700">'+e2(tx)+'</text>'; }
// 写真（小さなメモ）から、その場面の絵をもう一度つくる。host はページの中にある箱（名前のふだの位置を測るため）
function gwRender(rec,D,host){ var wide=!!rec.w, bg=wide?D.bgW:D.bgN, v=bg.vb.split(' ').map(Number), X0=v[0], W=v[2];
  var tr='<rect x="'+X0+'" y="118" width="'+W+'" height="4" fill="#9AA3AE"/>'; for(var px=X0+14;px<X0+W;px+=46) tr+='<rect x="'+px+'" y="122" width="5" height="48" fill="#B4BCC6" opacity=".85"/>';
  var cars=''; rec.c.forEach(function(c){ var sp=D.spr[c[0]]; if(!sp) return; var g=PP(sp.g,c[4]); cars+='<g class="gw-car" transform="translate('+c[1]+' '+c[2]+')'+(c[6]?' scale('+c[6]+')':'')+'">'+bodyWrap(g,sp.w,c[3])+'</g>'; });
  host.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="gw-photo" viewBox="'+(rec.z?rec.z.join(' '):bg.vb)+'" preserveAspectRatio="xMidYMid slice" role="img" aria-label="海辺の街の写真">'+PDEFS+'<g>'+PP(bg.inner,rec.b)+'</g>'+tr+cars+'</svg>';
  var gs=host.querySelectorAll('.gw-car'), j=0; rec.c.forEach(function(c){ if(!D.spr[c[0]]) return; var e=gs[j++]; if(c[8]&&e) try{ pdPose(e,D.spr[c[0]].w,(c[8]&1)?-c[3]:c[3],c[8]&2); }catch(er){} if(c[5]&&e) try{ HS(e,wide?4.4:6.6,c[5]); }catch(er){} if(c[7]&&e) try{ c[7][0]===-2?HS.walkPet(e,wide?4.4:6.6,null,c[7],D.spr[c[0]].w):HS.pet(e,wide?4.4:6.6,null,c[7]); }catch(er){} });
  if(rec.q&&gs[rec.q[1]]) try{ var se=gs[rec.q[1]], bb=se.getBBox(), fs=rec.z?Math.max(3,rec.z[3]/22):(wide?4.6:6.8), g=document.createElementNS('http://www.w3.org/2000/svg','g'); g.innerHTML=sayG(bb.x+bb.width/2,bb.y-fs*.7,String(rec.q[0]).slice(0,24),fs); se.appendChild(g); }catch(er){}
  return host.firstChild; }

var DD=null, Q=null; function data(){ if(DD) return Promise.resolve(DD); if(!Q) Q=fetch(BASE+'parade.json').then(function(r){ return r.json(); }).then(function(d){ DD=d; return d; }); return Q; }
try{ var st=document.createElement('style'); st.textContent='.gw-photo{display:block;width:100%;height:auto}.gw-photo .pd-sb{display:none}'; document.head.appendChild(st); }catch(e){}
function alb(){ try{ var a=JSON.parse(localStorage.getItem('hitotsu.gwAlbum')||'[]'); return Array.isArray(a)?a:[]; }catch(e){ return []; } }
window.GWShot={ render:function(rec,host){ return data().then(function(d){ return gwRender(typeof rec==='string'?JSON.parse(rec):rec,d,host); }); },
  album:alb, get:function(t){ return alb().filter(function(r){ return String(r.t)===String(t); })[0]||null; } };
})();
