document.addEventListener("DOMContentLoaded", () => {
  const buttonContainer = document.getElementById("buttonContainer");
  const colorSelector = document.getElementById("colorSelector");
  const selectedColorText = document.getElementById("selectedColor");
  const fontSelector = document.getElementById("fontSelector")
  const fontColorSelector = document.getElementById("fontColorSelector")
  const fontSelectedColorText = document.getElementById("fontColorSelected")

  // Handle button clicks and color selection
  buttonContainer.addEventListener("click", (event) => {
    const button = event.target;
    if (button.tagName === "BUTTON") {
      const backgroundColor = button.getAttribute("background-color");
      const fontColor = button.getAttribute("font-color")
      if (backgroundColor && fontColor) {
        // Update the selected color text
        selectedColorText.textContent = `Selected Color: ${backgroundColor}`;
        fontSelectedColorText.textContent = `Selected Color: ${fontColor}`

        // Set the color selector's value
        colorSelector.value = backgroundColor;
        fontColorSelector.value = fontColor;

        // Send the color change message to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { type: "change-color", value: backgroundColor });
          chrome.tabs.sendMessage(tabs[0].id, { type: "change-font-color", value: fontColor });
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
  selectedColorText.textContent = `Selected Background Color: ${colorSelector.value}`;


  // Handle color selection from color picker for font
  fontColorSelector.addEventListener("input", () => {
    const fontSelectedColor = fontColorSelector.value;
    fontSelectedColorText.textContent = `Selected Color: ${fontSelectedColor}`;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "change-font-color", value: fontSelectedColor });
    });
  });
  fontSelectedColorText.textContent = `Selected Font Color: ${fontColorSelector.value}`;

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

  const API_ENDPOINT = "https://api.metaphor.systems/search";
  const API_KEY = "87efd511-2e2e-4d02-8c5b-b8f81b129f5b";
  const searchButton = document.getElementById("searchButton");

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
    
    // Convert data to a formatted JSON string and display it.
    let jsonString = JSON.stringify(data, null, 2);
    resultsDiv.textContent = jsonString;
    
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

const API_ENDPOINT_SIMILAR = "https://api.metaphor.systems/findSimilar";

// Utility function to extract domain from a URL
function getDomain(url) {
    const a = document.createElement('a');
    a.href = url;
    return a.hostname;
}

document.getElementById('findSimilarButton').addEventListener('click', function() {
    
    // First, get the current tab's URL.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let currentTabURL = tabs[0].url;
        let currentDomain = getDomain(currentTabURL);
        
        fetch(API_ENDPOINT_SIMILAR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify({
                url: currentTabURL,
                excludeDomains: [currentDomain] // exclude the current domain
            }) 
        })
        .then(response => response.json())
        // .then(data => {
        //     let resultsDiv = document.getElementById('similarLinksResults');
            
        //     // Display the filtered results
        //     resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        // })

        .then(data => {
          let resultsDiv = document.getElementById('similarLinksResults');
          
          if (data && data.results) {
              // Create an unordered list element
              let ulElement = document.createElement('ul');
      
              // Loop through the results and create a list item for each
              data.results.forEach(item => {
                  let liElement = document.createElement('li');
                  let aElement = document.createElement('a');
      
                  aElement.href = item.url;
                  aElement.target = "_blank"; // to open in a new tab
                  aElement.innerText = item.title;
      
                  liElement.appendChild(aElement);
                  ulElement.appendChild(liElement);
              });
      
              resultsDiv.innerHTML = ''; // clear previous results
              resultsDiv.appendChild(ulElement);
          } else {
              console.error("Unexpected API response structure. 'results' key not found.");
              resultsDiv.innerHTML = '<p>No results found.</p>';
          }
      })      

        .catch(error => {
            console.error('Error:', error);
        });
    });
});

