const plank = document.getElementById("plank");

plank.addEventListener("click", (event) => {
  const rect = plank.getBoundingClientRect();

  // Click'in plank üzerindeki X pozisyonu
  const clickX = event.clientX - rect.left;

  // Pivot merkezde : plank genişliğinin yarısı
  const pivotX = rect.width / 2;

  // Distance: sola negatif, sağa pozitif
  const distanceFromPivot = clickX - pivotX;

  console.log("Click distance from pivot:", distanceFromPivot);
});
