console.log("JS is running in browser");
// Website created and maintained by Aditya Shinde

/* =====================
   CONFIG
===================== */

const OWNER_PASSWORD = "Adi@1177";
const STORAGE_KEY = "collegeNotices";

/* =====================
   STATE
===================== */

let currentSection = "home";
let isOwnerLoggedIn = false;

/* =====================
   INITIAL DATA
===================== */

const defaultNotices = [
    {
        id: 1,
        date: "2023-11-15",
        title: "welcome Aryan",
        description: "The annual sports day will be held next week. All students are encouraged to participate."
    },
    {
        id: 2,
        date: "2023-11-10",
        title: "Library Timings Extended",
        description: "Library will remain open till 8 PM during examination period."
    },
    {
        id: 3,
        date: "2023-11-05",
        title: "Submission Deadline Reminder",
        description: "Last date for project submission is November 25th."
    }
];

/* =====================
   LOAD DATA SAFELY
===================== */

let notices = [];

function loadNotices() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
        notices = JSON.parse(stored);
    } else {
        notices = defaultNotices;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotices));
    }
}

/* =====================
   DOM ELEMENTS
===================== */

const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

const ownerLoginBtn = document.getElementById("ownerLoginBtn");
const ownerPanel = document.getElementById("ownerPanel");

const noticesContainer = document.getElementById("noticesContainer");
const ownerNoticesList = document.getElementById("ownerNoticesList");

const addNoticeBtn = document.getElementById("addNoticeBtn");
const noticeTitle = document.getElementById("noticeTitle");
const noticeDesc = document.getElementById("noticeDesc");

/* =====================
   INIT
===================== */

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    loadNotices();
    setupNavigation();
    setupOwnerLogin();
    setupNoticeManagement();
    renderNotices();
});

/* =====================
   NAVIGATION
===================== */

function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = link.getAttribute("href").substring(1);

            navLinks.forEach(n => n.classList.remove("active"));
            link.classList.add("active");

            showSection(target);
        });
    });
}

function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active-section"));
    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active-section");
        currentSection = id;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =====================
   OWNER LOGIN / LOGOUT
===================== */

function setupOwnerLogin() {
    ownerLoginBtn.addEventListener("click", () => {
        if (isOwnerLoggedIn) {
            // Logout
            isOwnerLoggedIn = false;
            ownerPanel.style.display = "none";
            ownerLoginBtn.innerHTML = `<i class="fas fa-lock"></i> Owner Login`;
            showSection("home");
            return;
        }

        const pass = prompt("Enter owner password");

        if (pass === OWNER_PASSWORD) {
            isOwnerLoggedIn = true;
            ownerPanel.style.display = "block";
            ownerLoginBtn.innerHTML = `<i class="fas fa-unlock"></i> Logout`;
            showSection("ownerPanel");
            renderOwnerNotices();
        } else if (pass !== null) {
            alert("Incorrect password!");
        }
    });
}

/* =====================
   RENDER PUBLIC NOTICES
===================== */

function renderNotices() {
    if (!noticesContainer) return;

    noticesContainer.innerHTML = "";

    if (notices.length === 0) {
        noticesContainer.innerHTML = "<p>No notices available.</p>";
        return;
    }

    [...notices]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(n => {
            const card = document.createElement("div");
            card.className = "notice-card";

            card.innerHTML = `
                <div class="notice-header">
                    <h3>${n.title}</h3>
                    <small>${formatDate(n.date)}</small>
                </div>
                <div class="notice-body">
                    <p>${n.description}</p>
                </div>
            `;

            noticesContainer.appendChild(card);
        });
}

/* =====================
   OWNER PANEL NOTICES
===================== */

function renderOwnerNotices() {
    if (!ownerNoticesList) return;

    ownerNoticesList.innerHTML = "";

    notices.forEach(n => {
        const item = document.createElement("div");
        item.className = "owner-notice-item";

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.className = "delete-notice";
        btn.addEventListener("click", () => deleteNotice(n.id));

        item.innerHTML = `
            <strong>${n.title}</strong>
            <p>${n.description}</p>
        `;

        item.appendChild(btn);
        ownerNoticesList.appendChild(item);
    });
}

/* =====================
   ADD / DELETE NOTICE
===================== */

function setupNoticeManagement() {
    if (!addNoticeBtn) return;

    addNoticeBtn.addEventListener("click", () => {
        const title = noticeTitle.value.trim();
        const desc = noticeDesc.value.trim();

        if (!title || !desc) {
            alert("Please fill all fields");
            return;
        }

        const newNotice = {
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            title,
            description: desc
        };

        notices.push(newNotice);
        saveNotices();

        noticeTitle.value = "";
        noticeDesc.value = "";

        renderNotices();
        renderOwnerNotices();
        alert("Notice added successfully");
    });
}

function deleteNotice(id) {
    if (!confirm("Delete this notice permanently?")) return;

    notices = notices.filter(n => n.id !== id);
    saveNotices();

    renderNotices();
    renderOwnerNotices();
}

/* =====================
   STORAGE
===================== */

function saveNotices() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
}

/* =====================
   UTIL
===================== */

function formatDate(date) {
    return new Date(date).toDateString();
}
