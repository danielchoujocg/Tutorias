document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const grid = document.getElementById("topicGrid");
  if (grid && typeof topics !== "undefined") {
    const search = document.getElementById("topicSearch");
    const empty = document.getElementById("emptyState");
    const render = (query = "") => {
      const filtered = topics.filter(t => (t.title + " " + t.desc + " " + t.week).toLowerCase().includes(query.toLowerCase()));
      grid.innerHTML = filtered.map((t, i) => `<a class="topic-card" href="tema.html?tema=${encodeURIComponent(t.id)}"><div class="topic-card-top"><span class="topic-number">${String(topics.indexOf(t)+1).padStart(2,"0")}</span><span class="topic-week">${t.week}</span></div><div class="topic-symbol">${["◉","◌","△","◇","∠","∿","≡","〰","∩","↗","ƒ","±","×","＝","△","∠","⌁"][topics.indexOf(t)]}</div><h3>${t.title}</h3><p>${t.desc}</p><span class="topic-link">Explorar tema <b>→</b></span></a>`).join("");
      empty.hidden = filtered.length > 0;
    };
    render();
    search?.addEventListener("input", e => render(e.target.value.trim()));
  }

  const lesson = document.getElementById("lessonContent");
  if (lesson && typeof topics !== "undefined") {
    const id = new URLSearchParams(location.search).get("tema");
    const index = topics.findIndex(t => t.id === id);
    if (index < 0) {
      lesson.innerHTML = `<div class="not-found"><h1>Tema no encontrado</h1><p>Selecciona un tema desde el módulo de Trigonometría.</p><a class="button primary" href="trigonometria.html">Ver temas</a></div>`;
      document.getElementById("prevTopic").hidden = true;
      document.getElementById("nextTopic").hidden = true;
      return;
    }
    const t = topics[index];
    document.title = `${t.title} | Tutorías de Precálculo`;
    lesson.innerHTML = `<p class="eyebrow">${t.week.toUpperCase()} · MÓDULO 4</p><h1>${t.title}<em>.</em></h1><p class="lesson-lead">${t.desc}</p><article class="lesson-block"><p class="block-label">IDEA PRINCIPAL</p><p>${t.overview}</p></article><article class="lesson-block"><p class="block-label">FÓRMULAS IMPORTANTES</p><div class="formula-list">${t.formulas.map(f=>`<div class="formula-item">${f}</div>`).join("")}</div></article><article class="lesson-block example-block"><p class="block-label">EJEMPLO</p><p>${t.example}</p></article><div class="lesson-tip"><span>✦</span><p><b>Consejo de estudio</b><br>Repasa las definiciones y practica aplicando las fórmulas. Asegúrate de identificar qué datos tienes y qué necesitas encontrar.</p></div>`;
    const prev = document.getElementById("prevTopic"), next = document.getElementById("nextTopic");
    if (index === 0) prev.hidden = true; else prev.href = `tema.html?tema=${topics[index-1].id}`;
    if (index === topics.length-1) { next.textContent = "Volver al módulo →"; next.href = "trigonometria.html"; }
    else next.href = `tema.html?tema=${topics[index+1].id}`;
  }
});