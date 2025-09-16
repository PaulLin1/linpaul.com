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

  
  function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  function insertRandomValues(arr, value, count) {
    const result = [...arr];
    for (let i = 0; i < count; i++) {
      const pos = Math.floor(Math.random() * (result.length + 1)); // random position
      result.splice(pos, 0, value);
    }
    return result;
  }

  function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  const randomNums = insertRandomValues(range(1, 15), 200, 3);
  const images = shuffle(randomNums).map(n => `/imgs/${n}.jpg`);

  console.log(images);


  

  function randomSize() {
    const widths = [200, 250, 300, 350];
    const heights = [150, 180, 220, 270];
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
