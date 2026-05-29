/* Runs one Genuary sketch fullscreen on genuary.html */
(function(){
  const params = new URLSearchParams(location.search);
  let n = parseInt(params.get("n")||"1",10);
  let idx = SKETCHES.findIndex(s=>s.n===n);
  if(idx<0) idx=0;

  let instance = null;
  const stage = document.getElementById("stage");

  function size(){
    const pad = 40;
    const s = Math.min(window.innerWidth-pad, window.innerHeight-160, 700);
    return Math.max(280, s);
  }

  function load(i){
    idx = (i+SKETCHES.length)%SKETCHES.length;
    const def = SKETCHES[idx];
    if(instance){ instance.remove(); }
    stage.innerHTML = "";
    const s = size();
    instance = new p5(p=>def.build(p,{w:s,h:s,animate:true}), stage);

    document.getElementById("vnum").textContent = "#"+String(def.n).padStart(2,"0");
    document.getElementById("vtitle").textContent = def.title;
    document.getElementById("vprompt").textContent = def.prompt;
    history.replaceState({},"","genuary.html?n="+def.n);
    // tell the chatbot which sketch we're on
    window.CURRENT_SKETCH = def;
  }

  document.getElementById("prev").onclick = ()=>load(idx-1);
  document.getElementById("next").onclick = ()=>load(idx+1);
  document.getElementById("restart").onclick = ()=>load(idx);
  document.getElementById("save").onclick = ()=>{ if(instance) instance.saveCanvas("genuary_"+SKETCHES[idx].n,"png"); };

  window.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft")load(idx-1);
    if(e.key==="ArrowRight")load(idx+1);
  });

  load(idx);
})();
