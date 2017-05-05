
let lastBgOpacity = 1;
const maxVal = 200;

function onUpdate() {
  requestAnimationFrame(onUpdate);

  const top = window.pageYOffset || document.documentElement.scrollTop;
  const newVal = 1 - (Math.max(0, Math.min(maxVal, top)) / maxVal);
  if (newVal !== lastBgOpacity)
  {
    lastBgOpacity = newVal;
    const bgElm = document.getElementById('bg');
    bgElm.style.opacity = newVal;
  }
}

requestAnimationFrame(onUpdate);
