/* ============================================================
   NON-AI CHATBOT  (no LLM, no API — pure rules)
   It talks about Antoine's Genuary code. Required by the brief:
   "a non-AI chatbot that chats about your Genuary26 code".
   How it works: keyword matching over a small knowledge base.
   ============================================================ */
(function(){
  const ME = {
    name:"Antoine Brachet",
    pseudo:"antoine721",
    github:"https://github.com/antoine721",
    mail:"antoine.bbrachet@gmail.com",
    site:"https://antoine721.github.io/genuary",
    fav:[3,6,9,15,25,30,31]
  };

  const el = document.getElementById("chatbot");
  if(!el) return;
  const body = el.querySelector(".chat-body");
  const input = el.querySelector("input");

  function add(text,who){
    const m=document.createElement("div");
    m.className="msg "+who; m.innerHTML=text;
    body.appendChild(m); body.scrollTop=body.scrollHeight;
  }

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  // ---- rule engine ----
  function answer(qRaw){
    const q = qRaw.toLowerCase();
    const cur = window.CURRENT_SKETCH;
    const has = (...ws)=>ws.some(w=>q.includes(w));

    // about the current sketch
    if(has("this","ce sketch","current","celui","ici","montre","screen") && cur)
      return `Right now you're looking at <b>#${cur.n} — ${cur.title}</b>.<br>Prompt: <i>"${cur.prompt}"</i>. It's coded in p5.js, instance mode. Use ← → to browse the other 30.`;

    // favourite project
    if(has("favori","favorite","prefer","best","meilleur","préféré")){
      const f = SKETCHES.find(s=>s.fav) || SKETCHES[2];
      return `My favourite is <b>#${f.n} — ${f.title}</b> 🌀<br><i>"${f.prompt}"</i><br>I love it because the rule is dead simple but the output never repeats. That's the whole magic of generative art.`;
    }

    // ask about a number e.g. "tell me about 15" or "#15"
    const num = q.match(/\b(\d{1,2})\b/);
    if(num){ const s=SKETCHES.find(x=>x.n==parseInt(num[1],10));
      if(s) return `<b>#${s.n} — ${s.title}</b><br><i>"${s.prompt}"</i><br>Open it from the gallery to watch it run live!`;}

    if(has("how many","combien","number of","total"))
      return `There are <b>31 Genuary sketches</b> — one for each day of January. All written from scratch in p5.js.`;

    if(has("genuary","what is gen","c'est quoi"))
      return `<b>Genuary</b> is a yearly challenge: 31 days, 31 prompts, you make one generative-art piece per day with code. This site is my Genuary26, all done in p5.js.`;

    if(has("p5","library","librairie","tech","code","langage","language"))
      return `Everything here is plain <b>JavaScript + p5.js</b> (no frameworks). Each sketch is an isolated p5 instance so they can run side-by-side in the gallery. Source: <a href="${ME.github}" target="_blank">${ME.github}</a>.`;

    if(has("flow"))   return `#3 Flow field — particles follow Perlin-noise angles. Tiny rule, organic result.`;
    if(has("automat","rule 30","cellular")) return `#15 Rule 30 — a 1-D cellular automaton. Each row is computed from the one above with one XOR rule. Chaos from order!`;
    if(has("circle","cercle")) return `#6 Circles only — the constraint was "circles and nothing else". Limitation breeds creativity.`;
    if(has("recursio","tree","fractal","arbre")) return `#17 Recursion — a fractal tree that splits at every branch. Classic but hypnotic.`;

    if(has("who","qui es","name","ton nom","about you","bio","toi"))
      return `I'm the bot for <b>${ME.name}</b> (${ME.pseudo}), a B3 student at IIM exploring generative art & creative coding. This is my Genuary project.`;

    if(has("contact","mail","email","reach","joindre"))
      return `📧 <a href="mailto:${ME.mail}">${ME.mail}</a><br>🐙 <a href="${ME.github}" target="_blank">${ME.github}</a>`;

    if(has("github","git","source","repo","code source"))
      return `All the source code lives here → <a href="${ME.github}" target="_blank">${ME.github}</a>`;

    if(has("ai","ia","gpt","chatgpt","llm","intelligence"))
      return `Funny you ask — I'm a <b>NON-AI</b> chatbot 🤖❌. No GPT, no API, just good old keyword rules in <code>chatbot.js</code>. That was the point of the assignment.`;

    if(has("hello","hi","salut","bonjour","yo","hey","coucou"))
      return pick([`Hey! Ask me about any of the 31 sketches, or type "favourite".`,
                   `Salut 👋 Try: "tell me about 15" or "what is genuary?"`]);

    if(has("help","aide","commands","what can"))
      return `Try asking: <i>"favourite"</i>, <i>"this sketch"</i>, <i>"about 9"</i>, <i>"what is genuary"</i>, <i>"contact"</i>, <i>"are you an AI?"</i>`;

    if(has("thank","merci")) return `You're welcome! Stay vapor ✨🌴`;

    return pick([
      `I'm a simple rule-based bot — I only know about my 31 Genuaries. Try "favourite" or "about 15".`,
      `Hmm, didn't catch that. Ask me about a sketch number, or type "help".`
    ]);
  }

  function send(q){ if(!q.trim())return; add(q,"user"); setTimeout(()=>add(answer(q),"bot"),180); input.value=""; }

  // wire up UI
  el.querySelector(".chat-head").onclick = ()=>el.classList.toggle("collapsed");
  el.querySelector(".chat-input button").onclick = ()=>send(input.value);
  input.addEventListener("keydown",e=>{if(e.key==="Enter")send(input.value);});
  el.querySelectorAll(".chat-quick button").forEach(b=>b.onclick=()=>send(b.textContent));

  add(`Hi! I'm the <b>non-AI bot</b> for ${ME.name}'s Genuary. Ask me anything about the code. Type <i>"help"</i>.`,"bot");
})();
