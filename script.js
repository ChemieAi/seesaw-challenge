const plank = document.getElementById("plank");

const STORAGE_KEY = "seesaw_objects";
const leftWeightEl = document.getElementById("leftWeight");
const rightWeightEl = document.getElementById("rightWeight");
const leftTorqueEl = document.getElementById("leftTorque");
const rightTorqueEl = document.getElementById("rightTorque");
const resetBtn = document.getElementById("resetBtn");
const logEl = document.getElementById("log");

// State
let objects = loadState();
let nextWeight = getRandomWeight();
let previewEl = null;

renderAllObjects();
updateSeesaw();

plank.addEventListener("click", (event) => {
    const rect = plank.getBoundingClientRect();

    const clickX = event.clientX - rect.left;   // Click'in plank üzerindeki X pozisyonu
    const pivotX = rect.width / 2;              // Pivot merkezde : plank genişliğinin yarısı
    const distanceFromPivot = clickX - pivotX;  // Distance: sola negatif, sağa pozitif
    const side = distanceFromPivot < 0 ? "left" : "right";

    // 1–10 kg arası random weight
    const weight = nextWeight;
    nextWeight = getRandomWeight();

    const newObject = {
        weight,
        distance: distanceFromPivot,
    };

    objects.push(newObject);

    saveState();
    renderObject(newObject);
    updateSeesaw();
    console.log(objects);
    addLog(`${weight}kg dropped on ${side} at ${Math.round(Math.abs(distanceFromPivot))}px`);

});

function addLog(text) {
    const item = document.createElement("div");
    item.textContent = text;
    logEl.prepend(item);
}

plank.addEventListener("mousemove", (e) => {
    const rect = plank.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const distance = clickX - rect.width / 2;

    if (!previewEl) {
        previewEl = document.createElement("div");
        previewEl.className = "weight preview";
        plank.appendChild(previewEl);
    }

    previewEl.style.left = `calc(50% + ${distance}px)`;
    previewEl.textContent = nextWeight;
});

plank.addEventListener("mouseleave", () => {
    if (previewEl) previewEl.remove();
    previewEl = null;
});

function renderAllObjects() {
    objects.forEach(renderObject);
}

function getRandomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

function renderObject(obj) {
    const el = document.createElement("div");
    el.className = "weight";
    el.style.left = `calc(50% + ${obj.distance}px)`;     // Plank ortasına göre konumlandırma
    el.textContent = obj.weight;     // Weight label

    plank.appendChild(el);

    requestAnimationFrame(() => {
        el.classList.remove("falling");
    });
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
