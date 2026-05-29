/* Builds the 31-thumbnail gallery on index.html */
(function(){
  const grid = document.getElementById("gallery");
  if(!grid) return;

  SKETCHES.forEach(def=>{
    const card = document.createElement("a");
    card.className = "card";
    card.href = "genuary.html?n=" + def.n;

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    card.appendChild(thumb);

    const label = document.createElement("div");
    label.className = "label";
    label.innerHTML = `<span class="num">#${String(def.n).padStart(2,"0")}</span>`+
                      `<span class="name">${def.title}</span>`;
    card.appendChild(label);
    grid.appendChild(card);

    // run a small static preview (freezes after a few frames)
    new p5(p=>def.build(p,{w:188,h:188,animate:false}), thumb);
  });
})();
