const plank = document.getElementById("plank");

// Tüm objeleri tutacağım state
const objects = [];

plank.addEventListener("click", (event) => {
  const rect = plank.getBoundingClientRect();

  const clickX = event.clientX - rect.left;   // Click'in plank üzerindeki X pozisyonu
  const pivotX = rect.width / 2;              // Pivot merkezde : plank genişliğinin yarısı
  const distanceFromPivot = clickX - pivotX;  // Distance: sola negatif, sağa pozitif

  // 1–10 kg arası random weight
  const weight = Math.floor(Math.random() * 10) + 1;

  const newObject = {
    weight,
    distance: distanceFromPivot,
  };

  objects.push(newObject);

  renderObject(newObject);
  updateSeesaw();
  console.log(objects);
});

function renderObject(obj) {
  const el = document.createElement("div");
  el.className = "weight";

  // Plank ortasına göre konumlandırma
  el.style.left = `calc(50% + ${obj.distance}px)`;

  // Weight label
  el.textContent = obj.weight;

  plank.appendChild(el);
}

function updateSeesaw() {
  let leftTorque = 0;
  let rightTorque = 0;

  objects.forEach((obj) => {
    const torque = obj.weight * Math.abs(obj.distance);

    if (obj.distance < 0) {
      leftTorque += torque;
    } else {
      rightTorque += torque;
    }
  });

  // Açı hesabı (+-30 sınır)
  const angle = clamp((rightTorque - leftTorque) / 10, -30, 30);

  plank.style.transform = `translateX(-50%) rotate(${angle}deg)`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}