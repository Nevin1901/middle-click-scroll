const ignore = ["chrome://", "brave://"];

function startMouseListener() {
  console.log("aoijsdgjhoiadsj");
  console.log(document);

  const scrollIcon = `<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
`;

  let container = document.createElement("div");
  container.setAttribute("id", "click_window__ext");
  document.body.appendChild(container);

  let cursor = document.createElement("div");
  cursor.setAttribute("id", "middle_click_cursor__ext");
  cursor.innerHTML = scrollIcon;
  container.appendChild(cursor);

  document.addEventListener("mousedown", (e) => {
    if (e.button !== 1) {
      return;
    }
    cursor.style.opacity = "1";
    console.log(`${e.pageX}px`);
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    console.log(e.clientX);
    console.log("middle mouse down");
  });

  document.addEventListener("mouseup", (e) => {
    if (e.button !== 1) {
      return;
    }

    cursor.style.opacity = "0";
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
