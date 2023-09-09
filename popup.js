document.addEventListener("DOMContentLoaded", () => {
  const buttonContainer = document.getElementById("buttonContainer");
  const colorSelector = document.getElementById("colorSelector");
  const selectedColorText = document.getElementById("selectedColor");

  // Handle button clicks and color selection
  buttonContainer.addEventListener("click", (event) => {
    const button = event.target;
    if (button.tagName === "BUTTON") {
      const color = button.getAttribute("data-color");
      if (color) {
        // Update the selected color text
        selectedColorText.textContent = `Selected Color: ${color}`;

        // Set the color selector's value
        colorSelector.value = `#${color}`;

        // Update the color selector's appearance
        colorSelector.style.background = `#${color}`;

        // Send the color change message to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { type: `change-color-${color}` });
        });
      }
    }
  });

  // Handle color selection
  colorSelector.addEventListener("input", () => {
    const selectedColor = colorSelector.value;
    selectedColorText.textContent = `Selected Color: ${selectedColor}`;
  });

  // Initialize the selected color text with the initial value
  selectedColorText.textContent = `Selected Color: ${colorSelector.value}`;
});



  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("changeFont");
    button.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "changeFont" });
      });
    });
  });