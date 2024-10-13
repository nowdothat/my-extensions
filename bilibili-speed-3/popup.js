// popup.js
// 获取按钮容器元素
const buttonContainer = document.getElementById('button-container');

// 循环生成 1 到 10 的按钮
for (let i = 1; i <= 10; i++) {
    // 创建一个新的按钮元素
    const button = document.createElement('button');

    // 设置按钮的类名和值
    button.className = 'c-button';
    button.value = i.toString(); // 将数字转换为字符串
    button.textContent = i; // 设置按钮的文本内容

    // 将按钮添加到容器中
    buttonContainer.appendChild(button);
}


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
