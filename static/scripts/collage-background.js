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

  const randomNums = getRandomUniqueNumbers(18, 173);
  const images = randomNums.map(n => `/static/imgs/${n}.jpg`);

  function randomSize() {
    const widths = [150, 200, 250, 300];
    const heights = [100, 150, 180, 220];
    return {
      width: widths[Math.floor(Math.random() * widths.length)],
      height: heights[Math.floor(Math.random() * heights.length)],
    };
  }

  // 1. Preload images into browser cache ASAP
  images.forEach(src => {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = src;
    document.head.appendChild(preload);
  });

  // 2. Create collage images (lazy load + fixed size)
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src; // will instantly load from preload/cache
    img.className = 'collage-img';
    img.loading = 'lazy'; // don't block initial render

    const size = randomSize();
    img.style.width = `${size.width}px`;
    img.style.height = `${size.height}px`;

    container.appendChild(img);
  });
})();
