console.log("JS is running - Debug Mode");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");

    // ===== CURRENT YEAR =====
    const yearEl = document.getElementById("currentYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== NOTICES DATA =====
    const notices = [
        {
            date: "2026-01-15",
            title: "Welcome Friends",
            description: "Welcome to Shri Dr. R. G. Rathod Arts and Science College. Friends, I’ve built a Student Information Portal for our college to share updates and study resources. It’s student-managed and made for learning. Do check it out and tell me how it feels — Aditya Shinde"
        },
        {
            date: "2026-01-12",
            title: "Department of Physics",
            description: "All the students are hereby informed that As per the University Academic calendar, your semester session started from 26 December 2025, it is mandatory to attend the classes of Theory and Practical for Internal Assessment and Examination Procedure, attend the classes regularly."
        }
    ];

    // ===== RENDER NOTICES =====
    const noticesContainer = document.getElementById("noticesContainer");
    if (noticesContainer) {
        noticesContainer.innerHTML = "";
        if (notices.length === 0) {
            noticesContainer.innerHTML = "<p>No notices available.</p>";
        } else {
            notices.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(n => {
                const card = document.createElement("div");
                card.className = "notice-card";
                card.innerHTML = `
                    <div class="notice-header">
                        <h3>${n.title}</h3>
                        <small>${new Date(n.date).toDateString()}</small>
                    </div>
                    <div class="notice-body">
                        <p>${n.description}</p>
                    </div>
                `;
                noticesContainer.appendChild(card);
            });
        }
    }

    // ===== PHYSICS VIDEOS DATA (Unit 4) - AB YEH USE KARO =====
    const videos = [
        { 
            title: "Fundamentals of surface tension", 
            videoId: "gBWfxWdOaCk" 
        },
        { 
            title: "Surface tension", 
            videoId: "I8xFVGdkkUU"
        },
        { 
            title: "Molecular theory of surface tension", 
            videoId: "1nsOVNIiyLA"
        },
        { 
            title: "Surface film", 
            videoId: "M8wsuln-6Og"
        },
        { 
            title: "Surface energy", 
            videoId: "FLXURvhLxiY"
        },
        { 
            title: "Access pressure inside soap bubble and liquid drop in air", 
            videoId: "95Jomq0lvBg"
        },
        { 
            title: "Angle of contact", 
            videoId: "fLPGkw2rz1o"
        },
        { 
            title: "Rise of Liquid Capillary Tube", 
            videoId: "HBjc80Zbi7o"
        },
        { 
            title: "Viscosity", 
            videoId: "sY8hV46aIps"
        },
        { 
            title: "Reynolds Number 'R'", 
            videoId: "RZ3rLK4bIQ4"
        },
        { 
            title: "Stokes' law", 
            videoId: "2odVI4Vc5UE"
        },
        { 
            title: "Terminal Velocity", 
            videoId: "yXqeagd9PTQ"
        },
        { 
            title: "Poiseuille's equation", 
            videoId: "xwyssfQ6oVc"
        }
    ];

    // ===== RENDER VIDEO CARDS (EMBEDDED YOUTUBE) =====
    const videosGrid = document.getElementById("videosGrid");
    if (videosGrid) {
        videosGrid.innerHTML = "";
        videos.forEach(video => {
            const card = document.createElement("div");
            card.className = "video-card";
            card.innerHTML = `
                <div class="video-container">
                    <iframe 
                        width="100%" 
                        height="200" 
                        src="https://www.youtube.com/embed/${video.videoId}" 
                        title="${video.title}"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <div class="video-title">${video.title}</div>
                </div>
            `;
            videosGrid.appendChild(card);
        });
    }

    // ===== TAB SWITCHING (Main Navigation) =====
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    console.log("Nav links found:", navLinks.length);
    console.log("Sections found:", sections.length);

    sections.forEach(section => {
        console.log("Section ID:", section.id);
    });

    function activateSection(targetId) {
        console.log("Activating section:", targetId);
        
        sections.forEach(section => {
            section.classList.remove("active-section");
        });
        
        const activeSection = document.getElementById(targetId);
        if (activeSection) {
            activeSection.classList.add("active-section");
            console.log("✅ Section activated:", targetId);
        } else {
            console.error("❌ Section with id '" + targetId + "' not found!");
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${targetId}`) {
                link.classList.add("active");
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = link.getAttribute("href");
            if (href) {
                const targetId = href.substring(1);
                console.log("🔹 Nav link clicked:", targetId);
                activateSection(targetId);
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    const hash = window.location.hash.substring(1);
    console.log("Initial hash:", hash);
    
    if (hash && ["home", "files", "physics"].includes(hash)) {
        activateSection(hash);
    } else {
        activateSection("home");
    }

    // ===== UNIT TABS (Physics) =====
    const unitTabs = document.querySelectorAll(".unit-tab");
    const unitContents = {
        1: document.getElementById("unit1Content"),
        2: document.getElementById("unit2Content"),
        3: document.getElementById("unit3Content"),
        4: document.getElementById("unit4Content")
    };

    console.log("Unit tabs found:", unitTabs.length);

    unitTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const unit = tab.getAttribute("data-unit");
            console.log("Unit tab clicked:", unit);
            
            unitTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            Object.keys(unitContents).forEach(key => {
                if (unitContents[key]) {
                    unitContents[key].classList.remove("active-unit");
                }
            });
            
            if (unitContents[unit]) {
                unitContents[unit].classList.add("active-unit");
                console.log("✅ Unit", unit, "activated");
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector(".main-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                header.classList.add("shrink");
            } else {
                header.classList.remove("shrink");
            }
        });
    }
});