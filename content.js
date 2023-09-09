// chrome.runtime.onMessage.addListener((message) => {
//   if (message.type == "change-color") {
//     document.body.style.backgroundColor = message.value;
      
//       // A list of selectors for main containers you'd like to target.
//       // You'll need to adjust this list depending on the website structure.
//       const mainContainers = ['#content', 'header', 'footer', '.sidebar'];

//       mainContainers.forEach((selector) => {
//           const elements = document.querySelectorAll(selector);
//           elements.forEach((element) => {
//               element.style.backgroundColor = message.value;

//               // Ensure child images and videos aren't affected
//               const childMedia = element.querySelectorAll('img, video');
//               childMedia.forEach((mediaElement) => {
//                   mediaElement.style.backgroundColor = 'initial'; // Or any default value
//               });
//           });
//       });
//   }
// });

let currentColor = '#ffffff';
let selectionMode = false;
let mainContainers = ['#content', 'header', 'footer', '.sidebar'];

// Function to change background color
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    currentColor = color;
    mainContainers.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            element.style.backgroundColor = color;

            // Ensure child images and videos aren't affected
            const childMedia = element.querySelectorAll('img, video');
            childMedia.forEach((mediaElement) => {
                mediaElement.style.backgroundColor = 'initial'; // Or any default value
            });
        });
    });
}

// Function to handle selection
function handleElementSelection(event) {
    if (!selectionMode) return;

    const clickedElement = event.target;

    // Generate a simple selector for the clicked element
    let selector;
    if (clickedElement.id) {
        selector = `#${clickedElement.id}`;
    } else if (clickedElement.className) {
        selector = `.${clickedElement.className.split(' ')[0]}`; // use the first class
    } else {
        selector = clickedElement.tagName.toLowerCase();
    }

    if (!mainContainers.includes(selector)) {
        mainContainers.push(selector);
        changeBackgroundColor(currentColor); // Assumes you've stored the current color in this variable
    }

    event.stopPropagation(); // Prevents the event from bubbling up
}

function changeFont(font) {
    document.body.style.fontFamily = font;
}

// Add a click event listener for the entire document
document.addEventListener('click', handleElementSelection);

// Respond to messages from the popup
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'toggle-selection-mode') {
        console.log('Received toggle-selection-mode message'); // debug
        selectionMode = !selectionMode;
    } else if (message.type === 'change-color') {
        changeBackgroundColor(message.value);
    } else if (message.type == 'font-selector') {
        changeFont(message.value);
    }
});

