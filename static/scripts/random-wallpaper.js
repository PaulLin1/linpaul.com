(function() {
  const wallpaperCount = 11; // total number of wallpapers available
  const randomIndex = Math.floor(Math.random() * wallpaperCount) + 1;
  const wallpaperPath = `/static/wallpapers/${randomIndex}.jpg`;

  document.body.style.backgroundImage = `url('${wallpaperPath}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
})();

// (function() {
//   const wallpaperCount = 1; // total number of wallpapers available
//   const randomIndex = Math.floor(Math.random() * wallpaperCount) + 1;
//   const wallpaperPath = `/static/wallpapers/${randomIndex}.jpg`;

//   document.body.style.backgroundImage = `url('${wallpaperPath}')`;
//   document.body.style.backgroundRepeat = 'repeat';
//   document.body.style.backgroundPosition = 'top left';
//   document.body.style.backgroundSize = '700px'; // proportional scaling
// })();
