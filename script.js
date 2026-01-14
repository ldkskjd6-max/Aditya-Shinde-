console.log("JS is running in browser");
// Website created and maintained by Aditya Shinde

/* =====================
   STATE
===================== */

let currentSection = "home";

/* =====================
   NOTICES (GITHUB CONTROLLED)
   👉 Update ONLY from GitHub
===================== */

const notices = [
    {
        date: "2026-01-15",
        title: "Welcome Aryan",
        description: "Welcome to Shri Dr. R. G. Rathod Arts and Science College."
    },
    {
        date: "2026-01-12",
        title: "Library Timings Extended",
        description: "Library will remain open till 8 PM during examination period."
    },
    {
        date: "2026-01-10",
        title: "Submission Deadline Reminder",
        description: "Last date for project submission is January 25th."
    }
];

/* =====================
   DOM ELEMENTS
===================== */

const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");
const noticesContainer = document.getElementById("noticesContainer");

/* =====================
   INIT
===================== */

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

    setupNavigation();
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
    sections.forEach(sec =>
        sec.classList.remove("active-section")
    );

    const target = document.getElementById(id);
    if (target) {
        target.classList.add("active-section");
        currentSection = id;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =====================
   RENDER NOTICES (PUBLIC)
===================== */

function renderNotices() {
    if (!noticesContainer) return;

    noticesContainer.innerHTML = "";

    if (notices.length === 0) {
        noticesContainer.innerHTML =
            "<p>No notices available.</p>";
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
   UTIL
===================== */

function formatDate(date) {
    return new Date(date).toDateString();
}
