
let lastBgOpacity = 1;
let lastTop = 0;
const maxVal = 200;

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function onUpdate() {
  requestAnimationFrame(onUpdate);

  const top = window.pageYOffset || document.documentElement.scrollTop;
  const newVal = 1 - (Math.max(0, Math.min(maxVal, top)) / maxVal);
  if (newVal !== lastBgOpacity)
  {
    const bgElm = document.getElementById('bg');
    bgElm.style.opacity = newVal;

    const tipping = 200;
    const shouldToggleOnTopbar = top >= tipping && lastTop < tipping;
    const shouldToggleOffTopbar = top < tipping && lastTop >= tipping;

    if (shouldToggleOnTopbar) {
      console.log('toggling on');
      const topbarElm = document.getElementById('topbar');
      topbarElm.classList.add('visible');
    }

    if (shouldToggleOffTopbar) {
      console.log('toggling off');

      const topbarElm = document.getElementById('topbar');
      topbarElm.classList.remove('visible');
    }

    lastBgOpacity = newVal;
    lastTop = top;
  }
}

requestAnimationFrame(onUpdate);
