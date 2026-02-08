const openSettings = document.getElementById("open-settings");
const closeSettings = document.getElementById("close-settings");
const settingsModal = document.getElementById("settings-modal");

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
