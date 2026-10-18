// AI Doubt Solver API Call
async function askAI(studentQuestion) {
    // Aapka naya Render backend URL jismein /ask route laga hai
    const apiUrl = "https://aditya-shinde.onrender.com/ask"; 

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Student ka sawal JSON format mein bhej rahe hain
            body: JSON.stringify({ question: studentQuestion })
        });

        const data = await response.json();

        // Agar response sahi hai, toh answer return karo
        if (response.ok) {
            return data.answer; 
        } else {
            console.error("API Error:", data.error);
            return "Sorry, abhi server mein thodi problem hai. Kripya thodi der baad try karein.";
        }
    } catch (error) {
        console.error("Network Error:", error);
        return "Network error! Kripya apna internet connection check karein.";
    }
}
