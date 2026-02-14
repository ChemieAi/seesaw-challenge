const plank = document.getElementById("plank");

const STORAGE_KEY = "seesaw_objects";
const leftWeightEl = document.getElementById("leftWeight");
const rightWeightEl = document.getElementById("rightWeight");
const leftTorqueEl = document.getElementById("leftTorque");
const rightTorqueEl = document.getElementById("rightTorque");
const resetBtn = document.getElementById("resetBtn");

// State
let objects = loadState();

renderAllObjects();
updateSeesaw();

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

    saveState();
    renderObject(newObject);
    updateSeesaw();
    console.log(objects);
});

function renderAllObjects() {
    objects.forEach(renderObject);
}

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

    let leftWeight = 0;
    let rightWeight = 0;

    objects.forEach((obj) => {
        const torque = obj.weight * Math.abs(obj.distance);

        if (obj.distance < 0) {
            leftTorque += torque;
            leftWeight += obj.weight;
        } else {
            rightTorque += torque;
            rightWeight += obj.weight;
        }
    });

    const angle = clamp((rightTorque - leftTorque) / 10, -30, 30);

    plank.style.transform = `translateX(-50%) rotate(${angle}deg)`;

    // UI güncelle
    leftWeightEl.textContent = leftWeight;
    rightWeightEl.textContent = rightWeight;
    leftTorqueEl.textContent = Math.round(leftTorque);
    rightTorqueEl.textContent = Math.round(rightTorque);

}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objects));
}

function loadState() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

resetBtn.addEventListener("click", resetSeesaw);

function resetSeesaw() {
  objects = [];
  saveState();

  // DOM temizle
  plank.querySelectorAll(".weight").forEach(el => el.remove());

  updateSeesaw();
}
