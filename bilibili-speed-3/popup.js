// popup.js
document.addEventListener('DOMContentLoaded', function() {
  var buttonElements = document.querySelectorAll('.c-button');

  // 使用 forEach 遍历按钮元素并为每个按钮添加事件处理程序
  buttonElements.forEach(function(buttonElement) {
    buttonElement.addEventListener('click', function(e) {
      let value = e.target.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { speed: value });
        chrome.storage.local.set({ speed: value }).then(() => {
          console.log("Value is set");
        });
      });
    });
  });
});
