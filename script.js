console.log("JS is running - Final Version with Search");

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

    // ===== PHYSICS VIDEOS DATA (Unit 4) =====
    const videos = [
        { title: "Fundamentals of surface tension", videoId: "gBWfxWdOaCk" },
        { title: "Surface tension", videoId: "I8xFVGdkkUU" },
        { title: "Molecular theory of surface tension", videoId: "1nsOVNIiyLA" },
        { title: "Surface film", videoId: "M8wsuln-6Og" },
        { title: "Surface energy", videoId: "FLXURvhLxiY" },
        { title: "Access pressure inside soap bubble and liquid drop in air", videoId: "95Jomq0lvBg" },
        { title: "Angle of contact", videoId: "fLPGkw2rz1o" },
        { title: "Rise of Liquid Capillary Tube", videoId: "HBjc80Zbi7o" },
        { title: "Viscosity", videoId: "sY8hV46aIps" },
        { title: "Reynolds Number 'R'", videoId: "RZ3rLK4bIQ4" },
        { title: "Stokes' law", videoId: "2odVI4Vc5UE" },
        { title: "Terminal Velocity", videoId: "yXqeagd9PTQ" },
        { title: "Poiseuille's equation", videoId: "xwyssfQ6oVc" }
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
                        height="100%" 
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

    // ===== IMPROVED PAPERS FETCHING WITH SEARCH =====
    let allPapers = [];
    let currentFilter = 'all';
    let searchTerm = '';

    async function fetchPapers() {
        try {
            const response = await fetch('papers.json');
            if (!response.ok) {
                throw new Error('Failed to fetch papers');
            }
            const data = await response.json();
            return data.papers;
        } catch (error) {
            console.error('Error fetching papers:', error);
            return [];
        }
    }

    function filterPapers(papers, filter, search) {
        let filtered = papers;
        
        // Apply subject filter
        if (filter !== 'all') {
            filtered = filtered.filter(paper => paper.subject === filter);
        }
        
        // Apply search
        if (search.trim() !== '') {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(paper => 
                paper.title.toLowerCase().includes(searchLower) ||
                paper.subject.toLowerCase().includes(searchLower) ||
                paper.year.toString().includes(searchLower)
            );
        }
        
        return filtered;
    }

    function renderPapers() {
        const papersContainer = document.getElementById('papersContainer');
        const statsContainer = document.getElementById('papersStats');
        if (!papersContainer) return;

        const filteredPapers = filterPapers(allPapers, currentFilter, searchTerm);
        
        // Sort by year (newest first)
        filteredPapers.sort((a, b) => b.year - a.year);

        // Update stats
        if (statsContainer) {
            const totalPapers = allPapers.length;
            const showingPapers = filteredPapers.length;
            statsContainer.innerHTML = `📄 Showing ${showingPapers} of ${totalPapers} papers`;
        }

        if (filteredPapers.length === 0) {
            papersContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>No papers found matching your criteria.</p>
                </div>
            `;
            return;
        }

        papersContainer.innerHTML = '';
        
        filteredPapers.forEach(paper => {
            const card = document.createElement('div');
            card.className = 'paper-card';
            
            // Handle spaces in filename
            const filePath = paper.file.replace(/ /g, '%20');
            
            card.innerHTML = `
                <div class="paper-header">
                    <h3>${paper.title}</h3>
                    <div class="paper-meta">
                        <span class="paper-subject-tag">${paper.subject}</span>
                    </div>
                    <span class="paper-year-badge">${paper.year}</span>
                </div>
                <div class="paper-body">
                    <div class="paper-details">
                        <i class="fas fa-book"></i>
                        <span>Semester ${paper.semester}</span>
                    </div>
                    <div class="paper-actions">
                        <a href="${filePath}" target="_blank" class="paper-download">
                            <i class="fas fa-download"></i> Download
                        </a>
                        <a href="${filePath}" target="_blank" class="paper-preview" title="Preview">
                            <i class="fas fa-eye"></i>
                        </a>
                    </div>
                </div>
            `;
            papersContainer.appendChild(card);
        });
    }

    // Load papers
    const papersContainer = document.getElementById('papersContainer');
    if (papersContainer) {
        papersContainer.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner"></i> Loading papers...</div>';
        
        fetchPapers().then(papers => {
            allPapers = papers;
            renderPapers();
        });
    }

    // Search input
    const searchInput = document.getElementById('searchPapers');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            renderPapers();
        });
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderPapers();
        });
    });

    // ===== TAB SWITCHING (Main Navigation) =====
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    console.log("Nav links found:", navLinks.length);
    console.log("Sections found:", sections.length);

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

    // On page load, check URL hash
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