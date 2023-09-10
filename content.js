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

function changeFontColor(color) {
    document.body.style.color = color;
    mainContainers.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            element.style.color = color;
            // const childMedia = element.querySelectorAll('img, video');
            // childMedia.forEach((mediaElement) => {
            //     mediaElement.style.backgroundColor = 'initial'; // Or any default value
            // });
        });
    });
}

// Add a click event listener for the entire document
document.addEventListener('click', handleElementSelection);

// Respond to messages from the popup
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'toggle-selection-mode') {
        selectionMode = !selectionMode;
    } else if (message.type === 'change-color') {
        changeBackgroundColor(message.value);
    } else if (message.type == 'font-selector') {
        document.body.style.fontFamily = message.value;
    } else if (message.type == 'change-font-color') {
        document.body.style.color = message.value;
        const links = document.querySelectorAll('a');
        links.forEach(function (link) {
            link.style.color = message.value;
          });
    }
});

// function transcribeAudio(audioBlob) {
//   const apiKey = "YOUR_API_KEY";
//   const uri = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;
//   const data = {
//       config: {
//           encoding: "LINEAR16",
//           sampleRateHertz: 16000,
//           languageCode: "en-US",
//       },
//       audio: {
//           content: audioBlob // This should be base64 encoded data.
//       }
//   };

//   fetch(uri, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//           "Content-Type": "application/json"
//       }
//   }).then(response => response.json()).then(data => {
//       // Process the results here.
//       const transcription = data.results[0].alternatives[0].transcript;
//       console.log(transcription);
//   }).catch(error => {
//       console.error("There was an error transcribing the audio:", error);
//   });
// }
