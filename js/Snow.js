import '../css/snow.css';

export const Snow = () => {
  const canvas = document.getElementById('snow-canvas');
  const ctx = canvas.getContext('2d');

  const snowflakes = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    speedY: Math.random() * 1 + .05,
    drift: Math.random() * 2 - 1
  }));

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const drawSnowflakes = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();

      snowflake.y += snowflake.speedY;
      snowflake.x += snowflake.drift;

      // reset snowflake to top if it falls out of view
      if (snowflake.y > canvas.height) {
        snowflake.y = -snowflake.radius;
        snowflake.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawSnowflakes);
  };

  const init = () => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    drawSnowflakes();
  };

  init();
}