(function() {
  // Avoid duplicates if included multiple times
  if (document.getElementById("collage-background")) return;

  const container = document.createElement('div');
  container.id = 'collage-background';
  document.body.appendChild(container);

  function getRandomUniqueNumbers(count, max) {
    const numbers = new Set();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(numbers);
  }

  const randomNums = getRandomUniqueNumbers(18, 150);
  const images = randomNums.map(n => `/static/imgs/${n}.jpg`);

  function randomSize() {
    const widths = [150, 200, 250, 300];
    const heights = [100, 150, 180, 220];
    return {
      width: widths[Math.floor(Math.random() * widths.length)],
      height: heights[Math.floor(Math.random() * heights.length)],
    };
  }

  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'collage-img';

    const size = randomSize();
    img.style.width = `${size.width}px`;
    img.style.height = `${size.height}px`;

    container.appendChild(img);
  });
})();
