console.log("JS is running");

// YEAR
document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// NOTICES
const notices = [
    {
        date: "2026-01-12",
        title: "Welcome Friends",
        description: "Welcome to Shri Dr. R. G. Rathod Arts and Science College."
    },
    {
        date: "",
        title: "Department of Physics",
        description: "All the students are hereby informed that As per the University Academic calendar, your semester session started from 26 December 2025,  it is mandatory to attend the classes of Theory and Practical for Internal Assessment and Examination Procedure, attend the classes regularly 
."
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
