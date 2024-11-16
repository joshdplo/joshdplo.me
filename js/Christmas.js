import '../css/christmas.css';

export const Christmas = () => {
  const container = document.getElementById('christmas-snow');
  const toggle = document.getElementById('snowflakes-toggle');

  let stylesheet = document.createElement('style');
  document.head.appendChild(stylesheet);

  let isSnowing = true;
  const totalSnowflakes = 120;
  const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Generate snowflakes
  // JS port of alphardex's SCSS code: https://codepen.io/alphardex/pen/dyPorwJ
  const generateSnowflakes = () => {
    for (let i = 0; i < totalSnowflakes; i++) {
      const snowflake = document.createElement('i');
      const randomScaleValue = Math.random();

      const randomX = Math.random() * 100;
      const randomOffset = randomRange(-100, 100);
      const randomXEnd = randomX + randomOffset;
      const randomXEndYoyo = randomX + randomOffset / 2;
      const randomYoyoTime = randomRange(30, 80) * 100;
      const randomYoyoY = randomYoyoTime * 100;
      const randomScale = randomScaleValue > .35 ? .35 : randomScaleValue;
      const fallDuration = randomRange(10, 30);
      const fallDelay = randomRange(0, 30) * -1;

      snowflake.style.opacity = Math.random().toFixed(2);
      snowflake.style.transform = `translate(${randomX}vw, -10px) scale(${randomScale})`;

      container.appendChild(snowflake);

      const keyframes = `
        @keyframes f${i} {
          ${randomYoyoTime * 100}% {
            transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
          } to {
           transform: translate(${randomXEndYoyo}vw, 100vh) scale(${randomScale});
          }
        }
      `;

      stylesheet.sheet.insertRule(keyframes, stylesheet.length);
      snowflake.style.animation = `f${i} ${fallDuration}s ${fallDelay}s linear infinite`;
    }
  };

  const onToggle = () => {
    if (isSnowing) {
      container.innerHTML = '';
      stylesheet.remove();
    } else {
      stylesheet = document.createElement('style');
      document.head.appendChild(stylesheet);
      generateSnowflakes();
    }

    isSnowing = !isSnowing;
    toggle.classList[isSnowing ? 'add' : 'remove']('active');
  }

  // Init
  const init = () => {
    console.log('-> Christmas initialized 🎄');
    generateSnowflakes();

    toggle.addEventListener('click', onToggle);
  };

  init();
}