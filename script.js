// Projects Data
const projectsData = [
    { 
        title: "Kha Ri Gude", 
        desc: "Kha Ri Gude is an educational web application inspired by the importance of literacy and learning. The platform is designed to promote access to knowledge through a simple, user-friendly interface. It demonstrates strong foundational skills in web development, with a focus on clarity, accessibility, and meaningful content delivery. This project reflects a passion for using technology to support education and community development.", 
        tech: ["HTML" , "CSS" ,"JS"], 
        url: "https://25002460.github.io/Up-We-Go-/", 
        img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=240&fit=crop" 
    },
    { 
        title: "Dragon PicStore", 
        desc: "Dragon PicStore is a visually driven web platform designed for browsing and showcasing images in an organized and engaging way. It highlights front-end development skills such as layout structuring, responsive design, and user experience optimization. The project demonstrates the ability to manage and present media content effectively while maintaining a clean and modern interface.", 
        tech: ["HTML" ,"CSS" , "JS"], 
        url: "https://siaga-h-mulalo.github.io/SMH/", 
        img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=240&fit=crop" 
    },
    { 
        title: "Dragon Tactics", 
        desc: "Dragon Tactics is a strategy-based game project that showcases creativity, logic building, and interactive design. The application focuses on tactical gameplay concepts, allowing users to engage with structured decision-making elements. It reflects strong problem-solving skills and serves as a foundation toward more advanced game development projects, aligning with long-term goals in building engaging and dynamic games.", 
        tech: ["JS","HTML" , "CSS"], 
        url: "https://siaga-h-mulalo.github.io/DT/", 
        img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=240&fit=crop" 
    }
];

function renderAllProjects() {
    const container = document.getElementById("projectsContainer");
    if (!container) return;
    container.innerHTML = projectsData.map(p => `
        <div class="project-card" onclick="window.open('${p.url}', '_blank')">
            <img src="${p.img}" alt="${p.title}" loading="lazy">
            <div class="project-info">
                <div class="project-title"><span>${p.title}</span> <span style="background:var(--accent-blue); color:white; padding:0.2rem 0.6rem; border-radius:2rem; font-size:0.7rem;">Live</span></div>
                <p style="margin:0.75rem 0; font-size:0.95rem; line-height:1.5; color:var(--text-secondary);">${p.desc}</p>
                <div>${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
            </div>
        </div>
    `).join("");
}

// Typing effect
const roles = ["BSc Computer Science Student", "Java/C++ Tutor", "Tech Consultant"];
let idx = 0, ch = 0, isDeleting = false;
const typeEl = document.getElementById("typewriter");
function typeLoop() {
    if (!typeEl) return;
    const current = roles[idx];
    if (!isDeleting && ch <= current.length) {
        typeEl.textContent = current.substring(0, ch);
        ch++;
        setTimeout(typeLoop, 110);
    } else if (isDeleting && ch >= 0) {
        typeEl.textContent = current.substring(0, ch);
        ch--;
        setTimeout(typeLoop, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) idx = (idx + 1) % roles.length;
        setTimeout(typeLoop, 600);
    }
}

// Modal logic
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
function openModal(src) { 
    if (modalImg && modal) {
        modalImg.src = src; 
        modal.classList.add("open"); 
    }
}
window.closeModal = function() { 
    if (modal) modal.classList.remove("open"); 
};

// Dark mode toggle
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const icon = themeBtn.querySelector("i");
        if (icon) icon.className = document.body.classList.contains("dark") ? "fas fa-sun" : "fas fa-moon";
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
}
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// Active nav highlight
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 100) current = sec.getAttribute("id");
    });
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
    });
});

// Smooth scroll for nav links
document.querySelectorAll(".nav-menu a, .mobile-nav a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const hash = this.getAttribute("href");
        if (hash && hash !== "#" && hash.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(hash);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Image modal trigger for all .viewable-img
document.querySelectorAll(".viewable-img").forEach(el => {
    el.addEventListener("click", (e) => {
        e.stopPropagation();
        const src = el.getAttribute("data-src") || el.src;
        if (src && src !== "#") openModal(src);
    });
});

// Certificate button modal
const hackCertBtn = document.getElementById("hackCertBtn");
if (hackCertBtn) {
    hackCertBtn.addEventListener("click", () => {
        const certImg = document.querySelector("#hackCertBtn img");
        if (certImg) openModal(certImg.src);
    });
}

// Close modal when clicking background
if (modal) {
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
}

// Initialize everything
renderAllProjects();
typeLoop();
