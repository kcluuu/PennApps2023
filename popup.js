document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("changeColorRed");
    button.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "change-color-red" });
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("changeColorBlue");
    button.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "change-color-blue" });
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("changeColorGreen");
    button.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "change-color-green" });
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("changeColorYellow");
    button.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "change-color-yellow" });
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("changeFont");
    button.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "changeFont" });
      });
    });
  });