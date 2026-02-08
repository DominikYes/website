const openSettings = document.getElementById("open-settings");
const closeSettings = document.getElementById("close-settings");
const settingsModal = document.getElementById("settings-modal");
const chatThread = document.getElementById("chat-thread");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

const toggleModal = (shouldOpen) => {
  if (shouldOpen) {
    settingsModal.classList.add("active");
    settingsModal.setAttribute("aria-hidden", "false");
  } else {
    settingsModal.classList.remove("active");
    settingsModal.setAttribute("aria-hidden", "true");
  }
};

openSettings?.addEventListener("click", () => toggleModal(true));
closeSettings?.addEventListener("click", () => toggleModal(false));
settingsModal?.addEventListener("click", (event) => {
  if (event.target === settingsModal) {
    toggleModal(false);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleModal(false);
  }
});

const getTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const appendMessage = (text, role) => {
  if (!chatThread || !text.trim()) {
    return;
  }

  const message = document.createElement("div");
  message.className = `message ${role}`;

  if (role === "bot") {
    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = "🤖";
    message.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  const content = document.createElement("p");
  content.textContent = text;
  const meta = document.createElement("p");
  meta.className = "message-meta";
  meta.textContent = `${getTimestamp()} · ${role === "user" ? "You" : "Assistant"}`;
  bubble.appendChild(content);
  bubble.appendChild(meta);
  message.appendChild(bubble);
  chatThread.appendChild(message);
  chatThread.scrollTop = chatThread.scrollHeight;
};

const sendMessage = () => {
  if (!chatInput) {
    return;
  }
  const text = chatInput.value.trim();
  if (!text) {
    return;
  }
  appendMessage(text, "user");
  chatInput.value = "";
  window.setTimeout(() => {
    appendMessage("Got it. Want me to draft the next iOS 26 layout or motion spec?", "bot");
  }, 450);
};

sendButton?.addEventListener("click", sendMessage);
chatInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});
