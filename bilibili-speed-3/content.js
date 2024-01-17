
// content.js
console.log("Content script is running!");


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  getSpeeds(request.speed)
});

function getStoreKey(key){
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key]).then((result) => {
      resolve(result[key])
    });
  })
}

let speeds
function getSpeeds(speed){
  getStoreKey('speed').then((res) => {
    const targetValue = speed || res || 3
    document.querySelector('video').playbackRate = targetValue;

    let speedsVideo = document.querySelectorAll(
      'li.bpx-player-ctrl-playbackrate-menu-item'
    )
    let speedsBangumi = document.querySelectorAll(
      'ul.squirtle-speed-select-list li'
    )
    speeds = speedsVideo.length == 0 ? speedsBangumi : speedsVideo
  })

}


async function registerVideoChangeHandler () {
  const observer = new MutationObserver(e => {
    if (e[0].target.src) {
      getSpeeds()
      // init()
    }
  })
  observer.observe(document.querySelector('#bilibili-player video'), {
    attributes: true
  })
}


let timer = setInterval(() => {
  getSpeeds()
  if (speeds.length != 0) {
    clearInterval(timer)
    init()
    registerVideoChangeHandler()
  }
}, 300)

const init = () => {

}
