// content.js

let speeds
function getSpeeds(speed){
  document.querySelector('video').playbackRate = speed || 3;

  let speedsVideo = document.querySelectorAll(
    'li.bpx-player-ctrl-playbackrate-menu-item'
  )
  let speedsBangumi = document.querySelectorAll(
    'ul.squirtle-speed-select-list li'
  )
  speeds = speedsVideo.length == 0 ? speedsBangumi : speedsVideo

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


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  getSpeeds(request.speed)
});
