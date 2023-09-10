document.addEventListener("DOMContentLoaded", () => {
  const buttonContainer = document.getElementById("buttonContainer");
  const colorSelector = document.getElementById("colorSelector");
  const selectedColorText = document.getElementById("selectedColor");
  const changeFont = document.getElementById("changeFont");
  const fontSelector = document.getElementById("fontSelector")

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

  changeFont.addEventListener("click", (event) => {
    const font = "cursive"
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "change-font", value: font });
    });
  })

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

  const API_ENDPOINT = "https://metaphor.systems/search";
  const API_KEY = "87efd511-2e2e-4d02-8c5b-b8f81b129f5b";
  const searchButton = document.getElementById("searchButton");

function displayResults(results) {
  // Convert results into DOM elements and display in the popup.
  // For debugging, you might just do:
  console.log(results);
}

  document.getElementById('searchButton').addEventListener('click', function() {
    let query = document.getElementById('searchTextbox').value;
    
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => {
      let resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // clear previous results
      
      data.forEach(item => {
        resultsDiv.innerHTML += `<p><a href="${item.url}" target="_blank">${item.title}</a></p>`;
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });