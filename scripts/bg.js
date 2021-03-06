


let lastTopPosition = -1;
const ANIMATION = 200;

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function lerp(v1, v2, amount) {
  return v1 + (v2 - v1) * clamp(amount, 0, 1);
}


function onUpdate() {
  requestAnimationFrame(onUpdate);

  let topPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (window.fixedTopbar)
    topPosition = 1000

  if (topPosition !== lastTopPosition)
  {
    lastTopPosition = topPosition;

    const topX2 = topPosition * 2;
    const windowWidth = window.innerWidth;

    const bgElm = document.getElementById('bg');
    const topbarElm = document.getElementById('topbar');
    const logoElm = document.getElementById('topbar-logo');
    const nameElm = document.getElementById('topbar-name');

    const HEADER_HEIGHT = 350;
    const logoAnim = clamp(topX2, 0, HEADER_HEIGHT) / HEADER_HEIGHT;
    const textAnim = clamp(topX2, 0, HEADER_HEIGHT) / HEADER_HEIGHT;
    const textColorAnim = clamp(topX2 - 150, 0, 200) / 200;

    const bigLogoSize = 256;
    const smallLogoSize = 45;
    const logoSize = lerp(bigLogoSize, smallLogoSize, logoAnim);
    logoElm.style.width = logoSize + 'px';
    logoElm.style.height = logoSize + 'px';

    const bigLogoLeft = windowWidth / 2 - logoSize / 2;
    const smallLogoLeft = 16;
    logoElm.style.left = lerp(bigLogoLeft, smallLogoLeft, logoAnim) + 'px';
    logoElm.style.top = lerp(30, 7, logoAnim) + 'px';

    const bigTextSize = 44;
    const smallTextSize = 20;
    const textSize = lerp(bigTextSize, smallTextSize, textAnim);

    nameElm.style.fontSize = textSize + 'px';
    nameElm.style.top = lerp(-15 + logoSize, 1, textAnim) + 'px';
    const nameWidth2 = nameElm.clientWidth / 2;
    nameElm.style.right = lerp(windowWidth / 2 - nameWidth2, 16, textAnim) + 'px';

    // const lightness = Math.floor(lerp(255, 50, textColorAnim));
    // nameElm.style.color = `rgb(${lightness},${lightness},${lightness})`;

    bgElm.style.opacity = 1 - clamp(topPosition, 0, 200) / 200;
    topbarElm.style.opacity = clamp(topX2 - 200, 0, 200) / 200;
  }
}

requestAnimationFrame(onUpdate);
window.onresize = function() {
  lastTopPosition = -1;
};

document.addEventListener("DOMContentLoaded", function(event) {
  const topbar = document.getElementById('topbar-mobile')
  const arrow = document.getElementById('topbar-mobile-arrow')

  arrow.addEventListener('click', function(e){
    e.preventDefault();
    topbar.classList.toggle('active');
 });
});
