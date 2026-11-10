// The back links of a reading card: to the Arabic hub it was opened from (?g=3 or ?g=4 on its address),
// else to the last one used on this device (Grade 3 the first time). Load it before the card's data file.
(function () {
  const HUB = {
    3: "../grade-3/term-1/arabic/index.html#reading",
    4: "../grade-4/term-1/arabic/index.html#reading",
  };
  let g = (location.search.match(/[?&]g=(\d)/) || [])[1];
  try {
    if (HUB[g]) localStorage.setItem("ar-reading-g", g);
    else g = localStorage.getItem("ar-reading-g");
  } catch (e) {}
  if (!HUB[g]) g = "3";
  window.READING_LINKS = [
    ["../index.html", "← All games"],
    [HUB[g], "Arabic · Grade " + g],
  ];
})();
