// ============================================================
// AI DOUBT SOLVER – CHAT FUNCTIONALITY
// ============================================================

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

// Helper to scroll to bottom of chat
function scrollChatToBottom() {
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Append a message to the chat
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
    // Support multiline text
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    if (paragraphs.length === 0) {
        const p = document.createElement('p');
        p.textContent = text;
        bubble.appendChild(p);
    } else {
        paragraphs.forEach(para => {
            const p = document.createElement('p');
            p.textContent = para;
            bubble.appendChild(p);
        });
    }

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    chatMessages.appendChild(msgDiv);
    scrollChatToBottom();
}

// Show a "processing" temporary message
let processingMsg = null;
function showProcessing() {
    if (!chatMessages) return;
    // Remove any existing processing message
    removeProcessing();

    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ai processing';
    msgDiv.id = 'processingMessage';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = '<i class="fas fa-spinner"></i> Processing...';

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
    // Also remove any other processing message by id
    const old = document.getElementById('processingMessage');
    if (old) old.remove();
}

// Main function to send user question
async function sendQuestion() {
    const question = chatInput.value.trim();
    if (!question) return;

    // Disable input and button
    chatInput.disabled = true;
    chatSendBtn.disabled = true;

    // Append user message
    appendMessage(question, 'user');

    // Clear input
    chatInput.value = '';

    // Show processing
    showProcessing();

    try {
        const response = await fetch('https://Aditya7.pythonanywhere.com/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: question })
        });

        // Remove processing indicator
        removeProcessing();

        if (!response.ok) {
            // Try to get error message from response
            let errorText = `Server error (${response.status})`;
            try {
                const errData = await response.json();
                if (errData && errData.error) errorText = errData.error;
            } catch (_) {
                // ignore
            }
            appendMessage(`❌ ${errorText}`, 'ai', true);
            return;
        }

        const data = await response.json();
        // The answer is expected in data.answer
        const answer = data.answer || data.message || 'No answer provided.';
        appendMessage(answer, 'ai');

    } catch (error) {
        removeProcessing();
        console.error('AI Doubt Solver Error:', error);
        appendMessage('❌ Network error: Could not reach the AI service. Please check your connection and try again.', 'ai', true);
    } finally {
        // Re-enable input and button
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatInput.focus();
    }
}

// Event listeners
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

// Optional: initial focus
if (chatInput) chatInput.focus();
