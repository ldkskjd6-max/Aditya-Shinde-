console.log("JS is running");

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
    } else {
        console.warn("noticesContainer not found");
    }

    // ===== PHYSICS VIDEOS DATA (Unit 4) =====
    const videos = [
        { title: "Fundamentals of surface tension", url: "https://youtu.be/gBWfxWdOaCk" },
        { title: "Surface tension", url: "https://youtu.be/I8xFVGdkkUU" },
        { title: "Molecular theory of surface tension", url: "https://youtu.be/1nsOVNIiyLA" },
        { title: "Surface film", url: "https://youtu.be/M8wsuln-6Og" },
        { title: "Surface energy", url: "https://youtu.be/FLXURvhLxiY" },
        { title: "Access pressure inside soap bubble and liquid drop in air", url: "https://youtu.be/95Jomq0lvBg" },
        { title: "Angle of contact", url: "https://youtu.be/fLPGkw2rz1o" },
        { title: "Rise of Liquid Capillary Tube", url: "https://youtu.be/HBjc80Zbi7o" },
        { title: "Viscosity", url: "https://youtu.be/sY8hV46aIps" },
        { title: "Reynolds Number 'R'", url: "https://youtu.be/RZ3rLK4bIQ4" },
        { title: "Stokes' law", url: "https://youtu.be/2odVI4Vc5UE" },
        { title: "Terminal Velocity", url: "https://youtu.be/yXqeagd9PTQ" },
        { title: "Poiseuille's equation", url: "https://youtu.be/xwyssfQ6oVc" }
    ];

    function getYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    const videosGrid = document.getElementById("videosGrid");
    if (videosGrid) {
        videosGrid.innerHTML = "";
        videos.forEach(video => {
            const videoId = getYouTubeId(video.url);
            const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

            const card = document.createElement("div");
            card.className = "video-card";
            card.innerHTML = `
                <div class="video-thumbnail">
                    ${thumbnail ? `<img src="${thumbnail}" alt="${video.title}">` : '<i class="fas fa-video" style="font-size:3rem; color:#aaa;"></i>'}
                </div>
                <div class="video-info">
                    <div class="video-title">${video.title}</div>
                    <a href="${video.url}" target="_blank" class="video-btn">
                        <i class="fab fa-youtube"></i> Watch on YouTube
                    </a>
                </div>
            `;
            videosGrid.appendChild(card);
        });
    } else {
        console.warn("videosGrid not found");
    }

    // ===== TAB SWITCHING (Main Navigation) =====
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    console.log("Nav links found:", navLinks.length);
    console.log("Sections found:", sections.length);

    if (navLinks.length === 0) {
        console.error("No navigation links found! Check your HTML.");
    }

    function activateSection(targetId) {
        console.log("Activating section:", targetId);
        sections.forEach(section => {
            section.classList.remove("active-section");
        });
        const activeSection = document.getElementById(targetId);
        if (activeSection) {
            activeSection.classList.add("active-section");
            console.log("Section activated:", targetId);
        } else {
            console.error("Section with id '" + targetId + "' not found!");
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
            const targetId = link.getAttribute("href").substring(1); // remove #
            console.log("Nav link clicked, target:", targetId);
            activateSection(targetId);
            history.pushState(null, null, `#${targetId}`);
        });
    });

    // On page load, check hash
    const hash = window.location.hash.substring(1);
    console.log("Initial hash:", hash);
    if (hash && ["home", "files", "physics"].includes(hash)) {
        activateSection(hash);
    } else {
        activateSection("home"); // default
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
            } else {
                console.warn("Unit content for unit", unit, "not found");
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
    } else {
        console.warn("Header not found");
    }
});