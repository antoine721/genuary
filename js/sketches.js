/* ============================================================
   31 GENUARY SKETCHES — p5.js instance mode
   Each entry: { n, title, prompt, fav, build(p, o) }
   o = { w, h, animate }   animate=false -> freeze after a few frames
   Palette: neon on black (brutalist glitch)
   ============================================================ */

// Y2K / vaporwave palette on deep-purple void
const PAL = {
  bg:"#16002e", green:"#05ffa1", cyan:"#01cdfe",
  magenta:"#ff71ce", yellow:"#fffb96", white:"#b967ff"
};
const NEON = [PAL.green, PAL.cyan, PAL.magenta, PAL.yellow, PAL.white];

// helper: stop after N frames for static thumbnails
function freezer(p, o, n){ if(!o.animate && p.frameCount>n) p.noLoop(); }

const SKETCHES = [
{ n:1, title:"Lines only", prompt:"Vertical / horizontal lines, nothing else.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.strokeWeight(2);};
    p.draw=()=>{ let v=p.random()<.5; let c=p.random(NEON); p.stroke(c);
      if(v){let x=p.random(o.w);p.line(x,0,x,o.h);} else {let y=p.random(o.h);p.line(0,y,o.w,y);}
      freezer(p,o,260);};}},

{ n:2, title:"Layers", prompt:"Layers upon layers upon layers.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noFill();};
    p.draw=()=>{ p.stroke(p.random(NEON)); p.strokeWeight(p.random(.5,2));
      let y=p.random(o.h); p.beginShape();
      for(let x=0;x<=o.w;x+=12)p.vertex(x, y+p.sin(x*.05+p.frameCount*.03)*p.random(8,40));
      p.endShape(); freezer(p,o,300);};}},

{ n:3, title:"Flow field", prompt:"Exquisitely tiny flow-field particles.", fav:true,
  build(p,o){ let pts=[]; p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);
      for(let i=0;i<260;i++)pts.push({x:p.random(o.w),y:p.random(o.h),c:p.random(NEON)});};
    p.draw=()=>{ for(let a of pts){ let n=p.noise(a.x*.005,a.y*.005)*p.TWO_PI*2;
      p.stroke(a.c);p.point(a.x,a.y); a.x+=p.cos(n);a.y+=p.sin(n);
      if(a.x<0||a.x>o.w||a.y<0||a.y>o.h){a.x=p.random(o.w);a.y=p.random(o.h);}}
      freezer(p,o,500);};}},

{ n:4, title:"Black on black", prompt:"Black on black — here neon ghosts on void.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noFill();};
    p.draw=()=>{ p.stroke(p.lerpColor(p.color(PAL.bg),p.color(p.random(NEON)),.25));
      p.strokeWeight(1); p.rect(p.random(o.w),p.random(o.h),p.random(20,o.w*.4),p.random(20,o.h*.4));
      freezer(p,o,280);};}},

{ n:5, title:"Isometric", prompt:"Isometric perspective / cubes.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);};
    let a=0; p.draw=()=>{ p.background(PAL.bg); p.translate(o.w/2,o.h/2); a+=.01;
      let s=Math.min(o.w,o.h)/14;
      for(let gx=-3;gx<=3;gx++)for(let gy=-3;gy<=3;gy++){
        let px=(gx-gy)*s, py=(gx+gy)*s*.5+p.sin(a+gx+gy)*s;
        p.stroke(NEON[(gx+gy+9)%5]);p.noFill();
        p.quad(px,py, px+s,py+s*.5, px,py+s, px-s,py+s*.5);}
      freezer(p,o,300);};}},

{ n:6, title:"Circles only", prompt:"You can only use circles.", fav:true,
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noFill();};
    p.draw=()=>{ let x=p.random(o.w),y=p.random(o.h),r=p.random(4,o.w*.3);
      p.stroke(p.random(NEON));p.strokeWeight(p.random(1,3));p.circle(x,y,r);
      freezer(p,o,240);};}},

{ n:7, title:"Grid + noise", prompt:"Use a grid as a physical reference.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);};
    p.draw=()=>{ p.background(PAL.bg); let s=o.w/14;
      for(let x=0;x<o.w;x+=s)for(let y=0;y<o.h;y+=s){
        let n=p.noise(x*.02,y*.02,p.frameCount*.01);
        p.fill(NEON[Math.floor(n*5)%5]);p.noStroke();
        p.rect(x+s*.15,y+s*.15,s*.7*n+2,s*.7*n+2);}
      freezer(p,o,200);};}},

{ n:8, title:"Palette", prompt:"Draw with a generated 5-color palette.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noStroke();};
    p.draw=()=>{ let i=Math.floor(p.random(5)); p.fill(NEON[i]);
      p.rect(p.random(o.w),p.random(o.h),p.random(6,40),p.random(6,40));
      freezer(p,o,260);};}},

{ n:9, title:"Random walk", prompt:"Single random walker, neon trail.", fav:true,
  build(p,o){ let x,y,c; p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);
      x=o.w/2;y=o.h/2;c=p.random(NEON);p.strokeWeight(2);};
    p.draw=()=>{ for(let i=0;i<6;i++){ p.stroke(c); let px=x,py=y;
      x+=p.random(-8,8);y+=p.random(-8,8);
      x=p.constrain(x,0,o.w);y=p.constrain(y,0,o.h);p.line(px,py,x,y);
      if(p.random()<.03)c=p.random(NEON);} freezer(p,o,500);};}},

{ n:10, title:"Truchet", prompt:"Truchet tiles.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noFill();p.strokeWeight(2);};
    p.draw=()=>{ let s=o.w/8; p.stroke(p.random(NEON));
      let gx=Math.floor(p.random(8))*s, gy=Math.floor(p.random(8))*s;
      if(p.random()<.5){p.arc(gx,gy,s,s,0,p.HALF_PI);p.arc(gx+s,gy+s,s,s,p.PI,p.PI+p.HALF_PI);}
      else{p.arc(gx+s,gy,s,s,p.HALF_PI,p.PI);p.arc(gx,gy+s,s,s,p.PI+p.HALF_PI,p.TWO_PI);}
      freezer(p,o,200);};}},

{ n:11, title:"Glitch", prompt:"An impossible day — datamosh / glitch.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);};
    p.draw=()=>{ let y=p.random(o.h),h=p.random(2,18);
      p.noStroke();p.fill(p.random(NEON));p.rect(0,y,o.w,h);
      p.fill(PAL.bg);p.rect(p.random(o.w*.6),y,p.random(o.w*.4),h);
      freezer(p,o,160);};}},

{ n:12, title:"Subdivision", prompt:"Recursively subdivide a square.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noFill();p.strokeWeight(1);
      const div=(x,y,w,h,d)=>{ p.stroke(NEON[d%5]); p.rect(x,y,w,h);
        if(d<5 && p.random()<.8){ if(p.random()<.5){let m=p.random(.3,.7);
            div(x,y,w*m,h,d+1);div(x+w*m,y,w*(1-m),h,d+1);}
          else{let m=p.random(.3,.7);div(x,y,w,h*m,d+1);div(x,y+h*m,w,h*(1-m),d+1);} } };
      p.div=div;};
    p.draw=()=>{ p.background(PAL.bg); p.div(6,6,o.w-12,o.h-12,0); p.noLoop(); };}},

{ n:13, title:"8x8", prompt:"Constrained to an 8x8 grid.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);};
    p.draw=()=>{ p.background(PAL.bg);let s=o.w/8;p.noStroke();
      for(let i=0;i<8;i++)for(let j=0;j<8;j++){ if(p.noise(i,j,p.frameCount*.02)>.5){
        p.fill(NEON[(i+j)%5]);p.rect(i*s+2,j*s+2,s-4,s-4);}}
      freezer(p,o,200);};}},

{ n:14, title:"Pixel sort", prompt:"Simulated pixel sorting in bands.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);};
    p.draw=()=>{ let y=p.random(o.h); let cols=[PAL.green,PAL.cyan,PAL.magenta,PAL.yellow];
      let x=0; while(x<o.w){ let w=p.random(2,30); p.noStroke();
        p.fill(cols[Math.floor(p.map(x,0,o.w,0,4))%4]); p.rect(x,y,w,p.random(2,8)); x+=w;}
      freezer(p,o,160);};}},

{ n:15, title:"Rule 30", prompt:"Cellular automaton (Rule 30).", fav:true,
  build(p,o){ let cells,row; p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);
      let n=80; cells=new Array(n).fill(0); cells[Math.floor(n/2)]=1; row=0;p.cell=n;};
    p.draw=()=>{ let s=o.w/p.cell; p.noStroke();
      for(let i=0;i<p.cell;i++) if(cells[i]){p.fill(NEON[row%5]);p.rect(i*s,row*s,s,s);}
      let nx=cells.map((_,i)=>{let l=cells[(i-1+p.cell)%p.cell],c=cells[i],r=cells[(i+1)%p.cell];
        return l^(c|r);}); cells=nx; row++;
      if(row*s>o.h){if(o.animate){p.background(PAL.bg);row=0;cells=new Array(p.cell).fill(0);cells[40]=1;}else p.noLoop();}};}},

{ n:16, title:"Symmetry", prompt:"Reflection / kaleidoscope.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);};
    p.draw=()=>{ p.translate(o.w/2,o.h/2); let c=p.random(NEON);p.stroke(c);p.strokeWeight(1.5);
      let x=p.random(o.w/2),y=p.random(o.h/2);
      for(let k=0;k<6;k++){p.push();p.rotate(k*p.TWO_PI/6);p.line(0,0,x,y);p.point(x,y);p.pop();}
      freezer(p,o,260);};}},

{ n:17, title:"Recursion", prompt:"A recursive fractal tree.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);};
    let a=0; const branch=(p,len,d)=>{ if(len<6)return; p.stroke(NEON[d%5]);
        p.strokeWeight(p.map(len,6,o.h*.3,.5,3)); p.line(0,0,0,-len); p.translate(0,-len);
        let ang=0.35+p.sin(a)*0.25;
        p.push();p.rotate(ang);branch(p,len*.72,d+1);p.pop();
        p.push();p.rotate(-ang);branch(p,len*.72,d+1);p.pop(); };
    p.draw=()=>{ p.background(PAL.bg);a+=.01;p.translate(o.w/2,o.h);branch(p,o.h*.3,0);freezer(p,o,300);};}},

{ n:18, title:"Pi = 4", prompt:"What if pi was 4? Wonky circles.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noFill();};
    p.draw=()=>{ p.stroke(p.random(NEON)); let cx=p.random(o.w),cy=p.random(o.h),r=p.random(8,o.w*.25);
      let steps=Math.floor(p.random(3,9)); p.beginShape();
      for(let i=0;i<steps;i++){let ang=i/steps*p.TWO_PI;p.vertex(cx+p.cos(ang)*r,cy+p.sin(ang)*r);}
      p.endShape(p.CLOSE); freezer(p,o,240);};}},

{ n:19, title:"Op-art", prompt:"Op-art / moiré interference.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);};
    p.draw=()=>{ p.background(PAL.bg);p.noFill();p.stroke(PAL.cyan);p.strokeWeight(1.4);
      let off=p.frameCount*.4;
      for(let r=4;r<o.w;r+=8)p.circle(o.w*.4,o.h*.5,r);
      p.stroke(PAL.magenta);
      for(let r=4;r<o.w;r+=8)p.circle(o.w*.6+p.sin(off*.02)*10,o.h*.5,r);
      freezer(p,o,200);};}},

{ n:20, title:"Type", prompt:"Generative typography (glyph storm).",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.textFont("monospace");};
    let g="01<>/\\#@*+=ABXZ"; p.draw=()=>{ p.fill(p.random(NEON));p.noStroke();
      p.textSize(p.random(10,46)); p.text(g[Math.floor(p.random(g.length))],p.random(o.w),p.random(o.h));
      freezer(p,o,260);};}},

{ n:21, title:"Contrast", prompt:"Complementary high-contrast bars.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noStroke();};
    p.draw=()=>{ let pairs=[[PAL.magenta,PAL.green],[PAL.cyan,PAL.yellow]];
      let pr=p.random(pairs); let x=p.random(o.w); p.fill(pr[0]);p.rect(x,0,12,o.h);
      p.fill(pr[1]);p.rect(x+12,0,12,o.h); freezer(p,o,160);};}},

{ n:22, title:"Gradient steps", prompt:"Gradients without gradients (banding).",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);};
    p.draw=()=>{ p.noStroke(); let steps=14;
      for(let i=0;i<steps;i++){ let t=i/steps;
        p.fill(p.lerpColor(p.color(PAL.magenta),p.color(PAL.cyan),t));
        p.rect(0,i*o.h/steps,o.w,o.h/steps);} p.noLoop();};}},

{ n:23, title:"Vanishing pt", prompt:"Perspective lines to a vanishing point.",
  build(p,o){ let vx,vy; p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);vx=o.w/2;vy=o.h/2;};
    p.draw=()=>{ p.background(PAL.bg);vx=o.w/2+p.sin(p.frameCount*.02)*o.w*.2;p.strokeWeight(1);
      for(let i=0;i<48;i++){p.stroke(NEON[i%5]);let a=i/48*p.TWO_PI;
        p.line(vx,vy,vx+p.cos(a)*o.w,vy+p.sin(a)*o.w);} freezer(p,o,200);};}},

{ n:24, title:"Tiling", prompt:"Geometric tiling pattern.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);};
    p.draw=()=>{ let s=o.w/10;p.stroke(p.random(NEON));p.noFill();p.strokeWeight(1.5);
      let gx=Math.floor(p.random(10))*s,gy=Math.floor(p.random(10))*s;
      p.push();p.translate(gx+s/2,gy+s/2);p.rotate(Math.floor(p.random(4))*p.HALF_PI);
      p.triangle(-s/2,-s/2,s/2,-s/2,-s/2,s/2);p.pop(); freezer(p,o,260);};}},

{ n:25, title:"Harmonograph", prompt:"Harmonograph / spirograph curves.", fav:true,
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noFill();};
    let t=0,c; p.setup2=()=>{}; p.draw=()=>{ if(t===0)c=p.random(NEON);
      p.stroke(c);p.strokeWeight(1);p.beginShape();
      for(let i=0;i<400;i++){let a=t+i*.02;
        let x=o.w/2+p.sin(a*2)*o.w*.3*p.exp(-a*.002)+p.sin(a*3.1)*o.w*.1;
        let y=o.h/2+p.sin(a*2.7)*o.h*.3*p.exp(-a*.002);p.vertex(x,y);}
      p.endShape(); t+=8; freezer(p,o,300);};}},

{ n:26, title:"Boids", prompt:"Flocking particles (boids).",
  build(p,o){ let b=[]; p.setup=()=>{p.createCanvas(o.w,o.h);
      for(let i=0;i<70;i++)b.push({x:p.random(o.w),y:p.random(o.h),vx:p.random(-1,1),vy:p.random(-1,1)});};
    p.draw=()=>{ p.background(PAL.bg);
      for(let a of b){ let ax=0,ay=0,n=0;
        for(let o2 of b){let d=p.dist(a.x,a.y,o2.x,o2.y);if(d>0&&d<40){ax+=o2.vx;ay+=o2.vy;n++;}}
        if(n){a.vx+=(ax/n-a.vx)*.05;a.vy+=(ay/n-a.vy)*.05;}
        a.x=(a.x+a.vx+o.w)%o.w;a.y=(a.y+a.vy+o.h)%o.h;
        p.stroke(PAL.green);p.point(a.x,a.y);}
      freezer(p,o,400);};}},

{ n:27, title:"Wallpaper", prompt:"A seamless wallpaper motif.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noFill();p.strokeWeight(1.2);};
    p.draw=()=>{ let s=o.w/6; for(let x=0;x<o.w;x+=s)for(let y=0;y<o.h;y+=s){
        p.stroke(NEON[(x/s+y/s)%5]); p.push();p.translate(x+s/2,y+s/2);
        for(let k=0;k<4;k++){p.rotate(p.HALF_PI);p.arc(0,0,s*.7,s*.7,0,p.HALF_PI);}p.pop();}
      p.noLoop();};}},

{ n:28, title:"Loop", prompt:"A perfectly seamless animated loop.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);};
    p.draw=()=>{ p.background(PAL.bg);p.noStroke();let t=p.frameCount%120/120;
      for(let i=0;i<24;i++){let a=i/24*p.TWO_PI+t*p.TWO_PI;
        let r=o.w*.3+p.sin(t*p.TWO_PI*2+i)*o.w*.08;
        p.fill(NEON[i%5]);p.circle(o.w/2+p.cos(a)*r,o.h/2+p.sin(a)*r,8);}
      freezer(p,o,200);};}},

{ n:29, title:"Dots", prompt:"A grid of breathing dots.",
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);};
    p.draw=()=>{ p.background(PAL.bg);p.noStroke();let s=o.w/16;
      for(let x=0;x<o.w;x+=s)for(let y=0;y<o.h;y+=s){
        let d=p.dist(x,y,o.w/2,o.h/2); let r=p.map(p.sin(d*.05-p.frameCount*.06),-1,1,2,s*.8);
        p.fill(NEON[Math.floor(d/s)%5]);p.circle(x,y,r);} freezer(p,o,200);};}},

{ n:30, title:"Contours", prompt:"Topographic noise contours.", fav:true,
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);p.noFill();};
    p.draw=()=>{ p.background(PAL.bg);p.strokeWeight(1);
      for(let lvl=0;lvl<8;lvl++){ p.stroke(NEON[lvl%5]); p.beginShape();
        for(let x=0;x<=o.w;x+=8){let y=o.h/2+p.noise(x*.01,lvl*.4,p.frameCount*.01)*o.h*.5-o.h*.25+lvl*8;
          p.vertex(x,y);} p.endShape();} freezer(p,o,200);};}},

{ n:31, title:"31", prompt:"Celebrate — the number 31!", fav:true,
  build(p,o){ p.setup=()=>{p.createCanvas(o.w,o.h);p.background(PAL.bg);
      p.textAlign(p.CENTER,p.CENTER);p.textFont("monospace");p.textStyle(p.BOLD);};
    p.draw=()=>{ p.background(PAL.bg);
      for(let i=0;i<31;i++){ p.push();p.translate(o.w/2,o.h/2);
        p.rotate(p.frameCount*.01+i*p.TWO_PI/31); p.translate(0,o.h*.32);
        p.fill(NEON[i%5]);p.textSize(o.w/14);p.text("31",0,0);p.pop();}
      p.fill(PAL.white);p.textSize(o.w/8);p.text("31",o.w/2,o.h/2); freezer(p,o,260);};}}
];

window.SKETCHES = SKETCHES;
window.PAL = PAL;
