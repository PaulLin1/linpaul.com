(function() {
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

  // Preload images
  images.forEach(src => {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = src;
    document.head.appendChild(preload);
  });

  images.forEach(src => {
    const size = randomSize();

    const img = document.createElement('img');
    img.src = src;
    img.className = 'collage-img';
    img.loading = 'lazy';
    img.style.width = `${size.width}px`;
    img.style.height = `${size.height}px`;

    // On error, replace img with a blank box div of the same size
    img.onerror = function() {
      const blankBox = document.createElement('div');
      blankBox.style.width = img.style.width;
      blankBox.style.height = img.style.height;
      blankBox.style.backgroundColor = 'transparent'; // transparent background
      blankBox.style.display = 'inline-block';
      // no border, fully transparent box

      img.replaceWith(blankBox);
    };


    container.appendChild(img);
  });
})();
