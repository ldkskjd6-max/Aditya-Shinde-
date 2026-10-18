console.log("JS is running - Final Pro UI Version with AI Doubt");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");

    // ===== RENDER BACKEND API URL =====
    const API_URL = "https://aditya-shinde.onrender.com/ask";

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
            description: "All the students are hereby informed that as per the University Academic calendar, your semester session started from 26 December 2025. It is mandatory to attend the classes of Theory and Practical for Internal Assessment and Examination Procedure. Please attend classes regularly."
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
                        <h3><i class="fas fa-thumbtack" style="color: #fbbf24; margin-right: 6px;"></i> ${n.title}</h3>
                        <small><i class="far fa-calendar-alt"></i> ${new Date(n.date).toDateString()}</small>
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
        { title: "1. Fundamentals of Surface Tension", videoId: "gBWfxWdOaCk" },
        { title: "2. Surface Tension — Concept & Examples", videoId: "I8xFVGdkkUU" },
        { title: "3. Molecular Theory of Surface Tension", videoId: "1nsOVNIiyLA" },
        { title: "4. Surface Film & Potential Energy", videoId: "M8wsuln-6Og" },
        { title: "5. Surface Energy & Relation with Tension", videoId: "FLXURvhLxiY" },
        { title: "6. Excess Pressure Inside Soap Bubble & Liquid Drop", videoId: "95Jomq0lvBg" },
        { title: "7. Angle of Contact & Wetting Properties", videoId: "fLPGkw2rz1o" },
        { title: "8. Rise of Liquid in a Capillary Tube", videoId: "HBjc80Zbi7o" },
        { title: "9. Viscosity & Coefficient of Viscosity", videoId: "sY8hV46aIps" },
        { title: "10. Reynolds Number (R) & Critical Velocity", videoId: "RZ3rLK4bIQ4" },
        { title: "11. Stokes' Law & Derivation", videoId: "2odVI4Vc5UE" },
        { title: "12. Terminal Velocity Expression", videoId: "yXqeagd9PTQ" },
        { title: "13. Poiseuille's Equation for Liquid Flow", videoId: "xwyssfQ6oVc" }
    ];

    // ===== RENDER VIDEO CARDS =====
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
                        loading="lazy"
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

    // ===== PAPERS FETCHING WITH SEARCH AND FILTER =====
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
        if (filter !== 'all') {
            filtered = filtered.filter(paper => paper.subject === filter);
        }
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
        filteredPapers.sort((a, b) => b.year - a.year);

        if (statsContainer) {
            const totalPapers = allPapers.length;
            const showingPapers = filteredPapers.length;
            statsContainer.innerHTML = `📄 Showing <strong>${showingPapers}</strong> of <strong>${totalPapers}</strong> question papers`;
        }

        if (filteredPapers.length === 0) {
            papersContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No Matching Papers Found</h3>
                    <p>Try clearing your search filter or selecting 'All Subjects'.</p>
                </div>
            `;
            return;
        }

        papersContainer.innerHTML = '';
        filteredPapers.forEach(paper => {
            const card = document.createElement('div');
            card.className = 'paper-card';
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
                        <i class="fas fa-graduation-cap"></i>
                        <span>B.Sc. Semester ${paper.semester}</span>
                    </div>
                    <div class="paper-actions">
                        <a href="${filePath}" target="_blank" class="paper-download">
                            <i class="fas fa-download"></i> Download PDF
                        </a>
                        <a href="${filePath}" target="_blank" class="paper-preview" title="View in Browser">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            `;
            papersContainer.appendChild(card);
        });
    }

    const papersContainer = document.getElementById('papersContainer');
    if (papersContainer) {
        papersContainer.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner"></i> Loading question papers...</div>';
        fetchPapers().then(papers => {
            allPapers = papers;
            renderPapers();
        });
    }

    const searchInput = document.getElementById('searchPapers');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            renderPapers();
        });
    }

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

    function activateSection(targetId) {
        sections.forEach(section => {
            section.classList.remove("active-section");
        });
        const activeSection = document.getElementById(targetId);
        if (activeSection) {
            activeSection.classList.add("active-section");
        }
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${targetId}`) {
                link.classList.add("active");
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = link.getAttribute("href");
            if (href) {
                const targetId = href.substring(1);
                activateSection(targetId);
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    const hash = window.location.hash.substring(1);
    if (hash && ["home", "papers", "physics", "ai-doubt"].includes(hash)) {
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

    unitTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const unit = tab.getAttribute("data-unit");
            unitTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            Object.keys(unitContents).forEach(key => {
                if (unitContents[key]) {
                    unitContents[key].classList.remove("active-unit");
                }
            });
            if (unitContents[unit]) {
                unitContents[unit].classList.add("active-unit");
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

    // ============================================================
    // ===== AI DOUBT SOLVER – CHAT FUNCTIONALITY =====
    // ============================================================

    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    function scrollChatToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function formatText(line) {
        const safeLine = line
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        return safeLine
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/`(.*?)`/g, "<code style='background:#f1f5f9;padding:2px 5px;border-radius:4px;font-size:0.88em;'>$1</code>");
    }

    function appendMessage(text, sender = 'user', isError = false) {
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        if (isError) msgDiv.classList.add('error');

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        const paragraphs = text.split('\n').filter(p => p.trim() !== '');
        if (paragraphs.length === 0) {
            const p = document.createElement('p');
            p.innerHTML = formatText(text);
            bubble.appendChild(p);
        } else {
            paragraphs.forEach(para => {
                const p = document.createElement('p');
                p.innerHTML = formatText(para);
                bubble.appendChild(p);
            });
        }

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);
        scrollChatToBottom();
    }

    let processingMsg = null;
    function showProcessing() {
        if (!chatMessages) return;
        removeProcessing();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message ai processing';
        msgDiv.id = 'processingMessage';
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking... (Server wake-up may take a few seconds)';
        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);
        scrollChatToBottom();
        processingMsg = msgDiv;
    }

    function removeProcessing() {
        if (processingMsg && processingMsg.parentNode) {
            processingMsg.remove();
            processingMsg = null;
        }
        const old = document.getElementById('processingMessage');
        if (old) old.remove();
    }

    async function sendQuestion() {
        const question = chatInput.value.trim();
        if (!question) return;

        chatInput.disabled = true;
        chatSendBtn.disabled = true;

        appendMessage(question, 'user');
        chatInput.value = '';
        showProcessing();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: question })
            });

            removeProcessing();

            if (!response.ok) {
                let errorText = `Server error (${response.status})`;
                try {
                    const errData = await response.json();
                    if (errData && errData.error) {
                        errorText = typeof errData.error === 'object'
                            ? (errData.error.message || JSON.stringify(errData.error))
                            : errData.error;
                    }
                } catch (_) {}
                appendMessage(`❌ ${errorText}`, 'ai', true);
                return;
            }

            const data = await response.json();
            const answer = data.answer || data.message || 'No answer provided.';
            appendMessage(answer, 'ai');

        } catch (error) {
            removeProcessing();
            console.error('AI Doubt Solver Error:', error);
            appendMessage('❌ Network error: Could not reach the AI service. Please wait 30 seconds for the free Render server to wake up and try again.', 'ai', true);
        } finally {
            chatInput.disabled = false;
            chatSendBtn.disabled = false;
            chatInput.focus();
        }
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendQuestion);
    }
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendQuestion();
            }
        });
    }
});
