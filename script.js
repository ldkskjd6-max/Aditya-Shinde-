console.log("JS is running");

// YEAR
document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// NOTICES
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
    }
];

const noticesContainer = document.getElementById("noticesContainer");

notices.forEach(n => {
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

// HEADER SCROLL EFFECT
const header = document.querySelector(".main-header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});
