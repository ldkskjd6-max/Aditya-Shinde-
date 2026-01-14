console.log("JS is running");

/* =====================
   SAFE INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {

    /* ===== YEAR ===== */
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ===== NOTICES DATA (GitHub Controlled) ===== */
    const notices = [
        {
            date: "2026-01-15",
            title: "Welcome Friends",
            description: "Welcome to Shri Dr. R. G. Rathod Arts and Science College.Friends, I’ve built a Student Information Portal for our college to share updates and study resources.It’s student-managed and made for learning.Do check it out and tell me how it feels — Aditya Shinde"
        },
        {
            date: "2026-01-12",
            title: "Department of Physics",
            description: "All the students are hereby informed that As per the University Academic calendar, your semester session started from 26 December 2025,  it is mandatory to attend the classes of Theory and Practical for Internal Assessment and Examination Procedure, attend the classes regularly "
       }
    ];

    /* ===== RENDER NOTICES ===== */
    const noticesContainer = document.getElementById("noticesContainer");

    if (noticesContainer) {
        noticesContainer.innerHTML = "";

        if (notices.length === 0) {
            noticesContainer.innerHTML = "<p>No notices available.</p>";
        } else {
            // newest first
            notices
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
    }

    /* ===== HEADER SCROLL EFFECT ===== */
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

/* =====================
   UTIL
===================== */
function formatDate(date) {
    return new Date(date).toDateString();
}
