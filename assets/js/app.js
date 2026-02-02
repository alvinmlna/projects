// ✅ Edit your projects here (data-driven, easy to maintain)
    const projects = [
      // Tekla / Engineering
      {
        id: "tekla-auto-modeler",
        group: "tekla",
        tags: ["TEKLA API", "C#"],
        title: "Tekla Auto-Modeler",
        short: "Automated modeling plugin reducing repetitive tasks by 40% for steel connection details.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
        full: "A Tekla Open API extension that automates repetitive modeling operations and standardizes connection detailing. Designed to speed up production work and reduce manual mistakes.",
        tech: "C#, .NET, Tekla Open API",
        category: "Tekla Open API & Engineering",
        bullets: [
          "Batch-create standardized connection components",
          "Smart rules for naming, numbering, and attributes",
          "Report-friendly outputs for fabrication workflows"
        ],
        links: { primary: "#", secondary: "#" }
      },
      {
        id: "bim-data-bridge",
        group: "tekla",
        tags: ["API", "SQL"],
        title: "BIM Data Bridge",
        short: "Synchronizes Tekla Structures model data with external ERP systems in real-time.",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
        full: "A lightweight integration layer that extracts key Tekla model data and pushes it to external systems. Useful for tracking production, material planning, and progress visibility.",
        tech: "REST API, SQL Server, Integration Patterns",
        category: "Tekla Open API & Engineering",
        bullets: [
          "Incremental sync to avoid heavy transfers",
          "Mapping rules per project/client requirements",
          "Audit logs and error handling for reliability"
        ],
        links: { primary: "#", secondary: "#" }
      },
      {
        id: "rebar-detailing",
        group: "tekla",
        tags: ["TEKLA API", "WPF"],
        title: "Rebar Detailing Tool",
        short: "Custom visual interface for complex reinforcement placement and scheduling.",
        image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=80",
        full: "A UI-driven tool that accelerates reinforcement detailing using preset rules and quick selection workflows. Focused on clarity, speed, and consistent output.",
        tech: "WPF, C#, Tekla Open API",
        category: "Tekla Open API & Engineering",
        bullets: [
          "Preset libraries for bar shapes and attributes",
          "Fast placement and editing workflows",
          "Schedule-friendly outputs and checks"
        ],
        links: { primary: "#", secondary: "#" }
      },

      // Web / Application
      {
        id: "load-analysis-script",
        group: "web",
        tags: ["PYTHON", "AUTOMATION"],
        title: "Load Analysis Script",
        short: "Automated load calculation script integrating Excel data directly into analysis models.",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
        full: "Automation scripts that transform spreadsheet inputs into consistent calculation outputs, reducing manual work and improving repeatability across projects.",
        tech: "Python, Excel Automation",
        category: "Web & Application Development",
        bullets: [
          "Input validation and error summaries",
          "Template-driven calculations",
          "Export to reports (CSV/Excel/PDF-ready)"
        ],
        links: { primary: "#", secondary: "#" }
      },
      {
        id: "drawing-generator",
        group: "web",
        tags: ["C#", "DRAWINGS"],
        title: "Drawing Generator",
        short: "Batch creation of fabrication drawings with intelligent view placement algorithms.",
        image: "https://images.unsplash.com/photo-1529421306631-5d7c4bcd5325?auto=format&fit=crop&w=1600&q=80",
        full: "A utility that generates drawings in bulk using preset rules for views, dimensions, and annotations. Helps standardize drawing outputs and reduce drafting time.",
        tech: "C#, Automation, Drawing Workflows",
        category: "Web & Application Development",
        bullets: [
          "Batch generation + consistent layouts",
          "Rule-based view placement",
          "Reduced manual drafting steps"
        ],
        links: { primary: "#", secondary: "#" }
      },
      {
        id: "material-optimizer",
        group: "web",
        tags: ["ALGORITHM", "OPTIMIZATION"],
        title: "Material Optimizer",
        short: "Nesting algorithm implementation to minimize steel waste during fabrication.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=80",
        full: "An optimization tool that proposes cutting/nesting layouts to reduce scrap. Useful for improving material efficiency and cost.",
        tech: "Algorithms, Optimization, Data Modeling",
        category: "Web & Application Development",
        bullets: [
          "Waste reduction strategies",
          "Constraint-based layout generation",
          "Exportable plans and summaries"
        ],
        links: { primary: "#", secondary: "#" }
      }
    ];


// --- HTML partial loader (header/footer/modal) ---
async function loadPartial(targetId, url) {
  const host = document.getElementById(targetId);
  if (!host) return;
  const resp = await fetch(url, { cache: "no-cache" });
  if (!resp.ok) {
    host.innerHTML = `<!-- Failed to load ${url}: ${resp.status} -->`;
    return;
  }
  host.innerHTML = await resp.text();
}

function initPortfolio() {

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
    const modalPrimaryBtn = document.getElementById("modalPrimaryBtn");
    const modalSecondaryBtn = document.getElementById("modalSecondaryBtn");

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
      modalTech.textContent = p.tech;
      modalCategory.textContent = p.category;

      modalBullets.innerHTML = "";
      p.bullets.forEach(b => {
        const li = document.createElement("li");
        li.textContent = b;
        modalBullets.appendChild(li);
      });

      modalPrimaryBtn.onclick = () => window.location.href = p.links.primary || "#";
      modalSecondaryBtn.onclick = () => window.location.href = p.links.secondary || "#";

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
}

window.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadPartial('site-header', 'partials/header.html'),
    loadPartial('site-footer', 'partials/footer.html'),
    loadPartial('site-modal', 'partials/modal.html'),
  ]);
  initPortfolio();
});
