const ignore = ["chrome://", "brave://"];

function startMouseListener() {
  console.log("aoijsdgjhoiadsj");
  console.log(document);
  document.addEventListener("mousedown", (e) => {
    if (e.button !== 1) {
      return;
    }
    console.log("middle mouse down");
  });

  document.addEventListener("mouseup", (e) => {
    if (e.button !== 1) {
      return;
    }

    console.log("middle mouse up");
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("completed");
});

chrome.webNavigation.onCompleted.addListener((e) => {
  const includes = ignore.some((el) => {
    if (e.url.includes(el)) {
      return true;
    }

    return false;
  });

  if (includes) {
    return;
  }

  console.log(e.tabId);

  chrome.scripting.executeScript({
    target: { tabId: e.tabId },
    function: startMouseListener,
  });

  console.log("done");
});

// chrome.action.onClicked.addListener((details) => {
//   if (!tab.url.includes("brave://")) {
//     return;
//   }
//   chrome.tabs.executeScript({
//     target: { tabId: tab.id },
//     function: startMouseListener,
//   });
// });
