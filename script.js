(function(){
  "use strict";
  
  // ---------- PROJECTS INJECTION ----------
  const projectsData = [
    {
      title: "Kha Ri Gude",
      desc: "Educational web app promoting literacy through a simple, user-friendly interface.",
      tech: ["HTML", "CSS", "JS"],
      url: "https://25002460.github.io/Up-We-Go-/",
      img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop"
    },
    {
      title: "Dragon PicStore",
      desc: "Image browsing platform showcasing CSS Grid optimization and layout structuring.",
      tech: ["HTML", "CSS", "JS"],
      url: "https://siaga-h-mulalo.github.io/SMH/",
      img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=400&fit=crop"
    },
    {
      title: "Dragon Tactics",
      desc: "Browser-based strategy game with interactive logic and decision-making elements.",
      tech: ["JS", "HTML", "CSS"],
      url: "https://siaga-h-mulalo.github.io/DT/",
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop"
    }
  ];

  const container = document.getElementById("projectsContainer");
  if (container) {
    container.innerHTML = projectsData.map(p => `
      <div class="project-card stagger-item" onclick="window.open('${p.url}', '_blank')">
        <div class="project-img-wrapper"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
        <div class="project-info">
          <div class="project-title"><span>${p.title}</span> <span class="live-badge">Live</span></div>
          <p>${p.desc}</p>
          <div>${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
        </div>
      </div>
    `).join("");
  }

  // ---------- FALLING NAME ANIMATION (VERY SLOW CASCADE) WITH SPACE FIX ----------
  function initFallingName() {
    const nameElement = document.getElementById('fallingName');
    if (!nameElement) return;
    
    const text = nameElement.textContent.trim();
    nameElement.textContent = '';
    
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.classList.add('falling-letter');
      if (char === ' ') {
        span.classList.add('space');
      }
      span.style.animationDelay = `${index * 0.12}s`; // Very slow stagger
      nameElement.appendChild(span);
    });
  }
  
  setTimeout(initFallingName, 100);

  // ---------- CUSTOM CURSOR ----------
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      }
    });
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);
    
    const interactables = document.querySelectorAll('a, button, .project-card, .viewable-img, .service-card, .contact-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing?.classList.add('hover-state'));
      el.addEventListener('mouseleave', () => cursorRing?.classList.remove('hover-state'));
    });
  }

  // ---------- MAGNETIC BUTTONS ----------
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      btn.style.transform = `translate(${x*0.3}px, ${y*0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0px,0px)');
  });

  // ---------- TYPING EFFECT ----------
  const roles = ["BSc Computer Science Student", "Java & C++ Tutor", "Tech Consultant", "Problem Solver"];
  let idx = 0, ch = 0, isDeleting = false;
  const typeEl = document.getElementById("typewriter");
  function typeLoop() {
    if (!typeEl) return;
    const current = roles[idx];
    if (!isDeleting && ch <= current.length) {
      typeEl.textContent = current.substring(0, ch);
      ch++;
      setTimeout(typeLoop, 80);
    } else if (isDeleting && ch > 0) {
      typeEl.textContent = current.substring(0, ch-1);
      ch--;
      setTimeout(typeLoop, 40);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) idx = (idx + 1) % roles.length;
      setTimeout(typeLoop, isDeleting ? 1500 : 400);
    }
  }
  typeLoop();

  // ---------- IMAGE MODAL ----------
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.getElementById("closeModalBtn");

  function openModal(src) {
    if (modalImg && modal) {
      modalImg.src = src;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if(cursorRing) cursorRing.style.display = "none";
    }
  }
  function closeModal() {
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "auto";
      if(cursorRing && window.matchMedia("(pointer: fine)").matches) cursorRing.style.display = "block";
    }
  }

  document.body.addEventListener("click", (e) => {
    const viewable = e.target.closest('.viewable-img');
    if (viewable) {
      e.stopPropagation();
      const src = viewable.getAttribute("data-src") || (viewable.tagName === 'IMG' ? viewable.src : null);
      if (src) openModal(src);
    }
  });
  
  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // ---------- SCROLL REVEAL + STAGGER ----------
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const staggerItems = entry.target.querySelectorAll('.stagger-item');
        staggerItems.forEach((item, index) => {
          setTimeout(() => item.classList.add('visible'), index * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });
  
  reveals.forEach(r => observer.observe(r));

  // ---------- ACTIVE NAV HIGHLIGHT ----------
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");
  
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.scrollY;
    
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 150;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        current = sec.getAttribute("id");
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });

  window.dispatchEvent(new Event('scroll'));
})();
