async function loadPartial(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const resp = await fetch(path, { cache: "no-store" });
    el.innerHTML = await resp.text();
  } catch (e) {
    console.warn("Failed to load partial:", path, e);
  }
}

async function boot() {
  await Promise.all([
    loadPartial("site-header", "partials/header.html"),
    loadPartial("site-footer", "partials/footer.html"),
    loadPartial("site-modal", "partials/modal.html"),
  ]);

  // Now that partials are injected, run the main app
  if (typeof window.__initPortfolio === "function") {
    window.__initPortfolio();
  }
}
const API_URL = "https://script.google.com/macros/s/AKfycbxS3mEFbPYUM5BASaohwi5ctgItuXl-LDe-5MZwb-R3t2whbeAKtuHH6rgV5Q73AquZ/exec";

async function loadProjects() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.projects; // same shape as your array
}



window.__initPortfolio = async  function() {
  // ✅ Edit your projects here (data-driven, easy to maintain)
  
    const projects = await loadProjects();

      const gridTekla = document.getElementById("grid-tekla");
      const gridWeb   = document.getElementById("grid-web");

      // Modal elements
      const backdrop = document.getElementById("modalBackdrop");
      const closeBtn = document.getElementById("modalClose");
      const modalMiniTitle = document.getElementById("modalMiniTitle");
      const modalImage = document.getElementById("modalImage");
      const modalTags  = document.getElementById("modalTags");
      const modalTitle = document.getElementById("modalTitle");
      const modalDesc  = document.getElementById("modalDesc");
      const modalTech  = document.getElementById("modalTech");
      const modalCategory = document.getElementById("modalCategory");
      const modalBullets  = document.getElementById("modalBullets");

      function makeCard(p){
        const el = document.createElement("article");
        el.className = "card";
        el.tabIndex = 0;
        el.setAttribute("role","button");
        el.setAttribute("aria-label", "Open project: " + p.title);

        el.innerHTML = `
          <div class="thumb">
            <img src="${p.image}" alt="${p.title} thumbnail" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="tags">
              ${p.tags.map(t => `<span class="tag ${t === "SQL" || t === "DRAWINGS" ? "gray" : ""}">${t}</span>`).join("")}
            </div>
            <h3>${p.title}</h3>
            <p>${p.short}</p>
          </div>
        `;

        el.addEventListener("click", () => openModal(p));
        el.addEventListener("keydown", (e) => {
          if(e.key === "Enter" || e.key === " "){
            e.preventDefault();
            openModal(p);
          }
        });

        return el;
      }

      function render(){
        gridTekla.innerHTML = "";
        gridWeb.innerHTML = "";

        projects.forEach(p => {
          const card = makeCard(p);
          if(p.group === "tekla") gridTekla.appendChild(card);
          else gridWeb.appendChild(card);
        });

        document.getElementById("year").textContent = new Date().getFullYear();
      }

      function openModal(p){
        modalMiniTitle.textContent = p.title;
        modalImage.src = p.image;
        modalImage.alt = p.title + " image";
        modalTags.innerHTML = p.tags.map(t => `<span class="tag ${t === "SQL" || t === "DRAWINGS" ? "gray" : ""}">${t}</span>`).join("");
        modalTitle.textContent = p.title;
        modalDesc.textContent = p.full;
        modalCategory.textContent = p.category;

        modalTech.innerHTML = "";
        p.tech.forEach(b => {
          const li = document.createElement("li");
          li.textContent = b;
          modalTech.appendChild(li);
        });


        modalBullets.innerHTML = "";
        p.bullets.forEach(b => {
          const li = document.createElement("li");
          li.textContent = b;
          modalBullets.appendChild(li);
        });


        backdrop.classList.add("open");
        backdrop.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }

      function closeModal(){
        backdrop.classList.remove("open");
        backdrop.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }

      closeBtn.addEventListener("click", closeModal);
      backdrop.addEventListener("click", (e) => {
        if(e.target === backdrop) closeModal();
      });
      window.addEventListener("keydown", (e) => {
        if(e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
      });

      // Filter chips (simple behavior: scroll to section + highlight)
      document.querySelectorAll(".chip[data-filter]").forEach(btn => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".chip[data-filter]").forEach(b => b.classList.remove("primary"));
          btn.classList.add("primary");

          const f = btn.getAttribute("data-filter");
          // Simple UX: just scroll to the relevant group
          if(f === "web"){
            document.getElementById("grid-web").scrollIntoView({behavior:"smooth", block:"start"});
          }else{
            document.getElementById("grid-tekla").scrollIntoView({behavior:"smooth", block:"start"});
          }
        });
      });

      render();
};

document.addEventListener("DOMContentLoaded", boot);
