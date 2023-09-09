chrome.runtime.onMessage.addListener((message) => {
    if (message.type == "change-color-red") {
      document.body.style.backgroundColor = "red";
    }
    if (message.type == "change-color-blue") {
        document.body.style.backgroundColor = "blue";
    }
    if (message.type == "change-color-green") {
        document.body.style.backgroundColor = "green";
    }
    if (message.type == "change-color-yellow") {
        document.body.style.backgroundColor = "yellow";
    }
});