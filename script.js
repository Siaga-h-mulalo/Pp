document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Projects Data Injection ---
    const projectsData = [
        {
            title: "Kha Ri Gude",
            desc: "An educational web application inspired by the importance of literacy. The platform is designed to promote access to knowledge through a simple, user-friendly interface.",
            tech: ["HTML", "CSS", "JS"],
            url: "[https://25002460.github.io/Up-We-Go-/](https://25002460.github.io/Up-We-Go-/)",
            img: "[https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop](https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop)"
        },
        {
            title: "Dragon PicStore",
            desc: "A visually driven web platform designed for browsing and showcasing images. Highlights front-end development skills such as layout structuring and CSS Grid optimization.",
            tech: ["HTML", "CSS", "JS"],
            url: "[https://siaga-h-mulalo.github.io/SMH/](https://siaga-h-mulalo.github.io/SMH/)",
            img: "[https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=400&fit=crop](https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=400&fit=crop)"
        },
        {
            title: "Dragon Tactics",
            desc: "A browser-based strategy game project that showcases logic building and interactive design. Allows users to engage with structured decision-making elements.",
            tech: ["JS", "HTML", "CSS"],
            url: "[https://siaga-h-mulalo.github.io/DT/](https://siaga-h-mulalo.github.io/DT/)",
            img: "[https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop](https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop)"
        }
    ];

    const container = document.getElementById("projectsContainer");
    if (container) {
        container.innerHTML = projectsData.map(p => `
            <div class="project-card stagger-item" onclick="window.open('${p.url}', '_blank')">
                <div class="project-img-wrapper">
                    <img src="${p.img}" alt="${p.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <div class="project-title">
                        <span>${p.title}</span> 
                        <span class="live-badge">Live</span>
                    </div>
                    <p style="margin:0.5rem 0 1.2rem 0; font-size:0.95rem; color:var(--text-secondary); flex: 1;">${p.desc}</p>
                    <div>${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
                </div>
            </div>
        `).join("");
    }

    // --- 2. Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    // Only run cursor logic if pointers are fine (not mobile touch)
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorDot) {
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
            }
        });

        const renderCursor = () => {
            ringX += (mouseX - ringX) * 0.15; // Smooth trailing physics
            ringY += (mouseY - ringY) * 0.15;
            if (cursorRing) {
                cursorRing.style.left = `${ringX}px`;
                cursorRing.style.top = `${ringY}px`;
            }
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Add hover states to interactables
        const interactables = document.querySelectorAll('a, button, .project-card, .viewable-img, .service-row');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing?.classList.add('hover-state'));
            el.addEventListener('mouseleave', () => cursorRing?.classList.remove('hover-state'));
        });
    }

    // --- 3. Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- 4. Typing Effect ---
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
            typeEl.textContent = current.substring(0, ch - 1);
            ch--;
            setTimeout(typeLoop, 40);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) idx = (idx + 1) % roles.length;
            setTimeout(typeLoop, isDeleting ? 1500 : 400); 
        }
    }
    typeLoop();

    // --- 5. Image Modal Logic ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.getElementById("closeModalBtn");

    function openModal(src) {
        if (modalImg && modal) {
            modalImg.src = src;
            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            if(cursorRing) cursorRing.style.display = "none"; // Hide cursor ring in modal
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

    // --- 6. Dark Mode Toggle ---
    const themeToggles = document.querySelectorAll(".theme-toggle");
    
    function updateThemeUI(isDark) {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector("i");
            const text = btn.querySelector("span");
            if (icon) icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
            if (text) text.textContent = isDark ? "Light Mode" : "Dark Mode";
        });
    }

    themeToggles.forEach(btn => {
        btn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            const isDark = document.body.classList.contains("dark");
            updateThemeUI(isDark);
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    });

    if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.body.classList.add("dark");
        updateThemeUI(true);
    }

    // --- 7. Scroll Reveal & Stagger Animation ---
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); 
                // Handle staggered children elements
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 120); // 120ms stagger delay
                });
                observer.unobserve(entry.target); // Unobserve after animating once
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    reveals.forEach(r => observer.observe(r));

    // --- 8. Active Nav Highlight ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a, .mobile-nav a:not(.theme-toggle)");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollY = window.scrollY;

        sections.forEach(sec => {
            const secTop = sec.offsetTop - 200;
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

});
