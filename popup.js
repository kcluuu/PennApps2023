document.addEventListener("DOMContentLoaded", () => {
  const buttonContainer = document.getElementById("buttonContainer");
  const colorSelector = document.getElementById("colorSelector");
  const selectedColorText = document.getElementById("selectedColor");
  const fontSelector = document.getElementById("fontSelector")
  const fontColorSelector = document.getElementById("fontColorSelector")

  // Handle button clicks and color selection
  buttonContainer.addEventListener("click", (event) => {
    const button = event.target;
    if (button.tagName === "BUTTON") {
      const color = button.getAttribute("data-color");
      if (color) {
        // Update the selected color text
        selectedColorText.textContent = `Selected Color: ${color}`;

        // Set the color selector's value
        colorSelector.value = color;

        // Send the color change message to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { type: "change-color", value: color });
        });
      }
    }
  });

  // Handle color selection from color picker
  colorSelector.addEventListener("input", () => {
    const selectedColor = colorSelector.value;
    selectedColorText.textContent = `Selected Color: ${selectedColor}`;

    // Send the color change message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "change-color", value: selectedColor });
    });
  });

  // Initialize the selected color text with the initial value
  selectedColorText.textContent = `Selected Color: ${colorSelector.value}`;


  // Handle color selection from color picker for font
  fontColorSelector.addEventListener("input", () => {
    const fontSelectedColor = fontColorSelector.value;
    // fontSelecterColor.textContent = `Selected Color: ${selectedColor}`;

    // Send the color change message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "change-font-color", value: fontSelectedColor });
    });
  });
  // fontSelectedColorText.textContent = `Selected Color: ${colorSelector.value}`;

// Add an event listener for the 'change' event
fontSelector.addEventListener('change', function () {
  const selectedFont = fontSelector.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "font-selector", value: selectedFont });
  });
});
});


  // Toggling selection mode
  document.getElementById('toggleSelectionMode').addEventListener('change', (event) => {
  console.log('Sending toggle-selection-mode message'); // debug
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "toggle-selection-mode", value: event.target.checked });
    });
  });
