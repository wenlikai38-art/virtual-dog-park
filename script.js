// Virtual Dog Park - script.js
//
// How the JavaScript is organized (explained simply):
//  - "pet" is the dog we are looking after. It is just an object that remembers
//    the dog's name, breed, day number and happiness.
//  - Functions like adoptPet(), feed(), play(), nextDay() change that object.
//  - renderPet() reads the object and shows its values on the page.
//  - We always use textContent (never innerHTML) to show the dog's name, so a
//    name like "<b>Buddy</b>" is displayed as plain text, not as code.
//  - The dog is saved in the browser's localStorage under one fixed key, so it
//    survives a page refresh on the same browser and device.

// ----- Constants -----
// IMPORTANT: the same key is used for both saving and loading. If they ever
// disagree, the saved dog would not come back after a refresh.
const STORAGE_KEY = "virtualDogParkPetV1";

// ----- State -----
let pet = null; // becomes { name, breed, day, happiness } after adoption

// ----- Element references -----
const adoptForm = document.getElementById("adopt-form");
const breedSelect = document.getElementById("breed-select");
const nameInput = document.getElementById("name-input");
const petMessage = document.getElementById("pet-message");
const petCard = document.getElementById("pet-card");
const petName = document.getElementById("pet-name");
const petBreed = document.getElementById("pet-breed");
const petDay = document.getElementById("pet-day");
const petStage = document.getElementById("pet-stage");
const petHappiness = document.getElementById("pet-happiness");
const growthFill = document.getElementById("growth-fill");
const feedButton = document.getElementById("feed-button");
const playButton = document.getElementById("play-button");
const nextDayButton = document.getElementById("next-day-button");
const startOverButton = document.getElementById("start-over-button");

// ----- Helpers -----
// Returns the growth stage for a given day number.
// Day 1 = Puppy, Days 2-3 = Young Dog, Day 4+ = Adult Dog.
function stageForDay(day) {
  if (day === 1) return "Puppy";
  if (day <= 3) return "Young Dog";
  return "Adult Dog";
}

// Returns a bar width (as a percentage) so the three stages look clearly
// different: Puppy 33%, Young Dog 66%, Adult Dog 100%.
function growthPercentForDay(day) {
  if (day === 1) return 33;
  if (day <= 3) return 66;
  return 100;
}

// Shows the current pet on the page using textContent (safe for any name).
function renderPet() {
  if (!pet) {
    petCard.hidden = true;
    return;
  }
  petCard.hidden = false;
  petName.textContent = pet.name;          // textContent keeps the name as text
  petBreed.textContent = pet.breed;
  petDay.textContent = pet.day;
  petStage.textContent = stageForDay(pet.day);
  petHappiness.textContent = pet.happiness;
  growthFill.style.width = growthPercentForDay(pet.day) + "%";
}

// Saves the current pet to localStorage. We only ever store one dog.
function savePet() {
  if (!pet) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
}

// Reads a previously saved dog (if any) and shows it again.
function loadPet() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    pet = JSON.parse(saved);
    renderPet();
  } catch (e) {
    // If the saved data is broken, ignore it rather than crashing.
    localStorage.removeItem(STORAGE_KEY);
  }
}

// ----- Actions -----
// Adopt: validate the name, then create a new starting dog.
function adoptPet(event) {
  event.preventDefault();

  const name = nameInput.value.trim(); // remove leading/trailing spaces
  if (name === "") {
    petMessage.textContent = "Please enter a name for your dog.";
    return;
  }
  if (name.length > 20) {
    petMessage.textContent = "The name must be 20 characters or fewer.";
    return;
  }

  pet = {
    name: name,
    breed: breedSelect.value,
    day: 1,          // a new dog always starts on Day 1
    happiness: 50,   // and starts at 50 happiness
  };

  petMessage.textContent = ""; // clear any old error
  nameInput.value = "";
  renderPet();
  savePet();           // keep the adopted dog even after a refresh
}

// Feed and Play both raise happiness by 10, but never above 100.
function changeHappiness(amount) {
  if (!pet) return;
  pet.happiness = Math.min(100, pet.happiness + amount);
  renderPet();
  savePet();
}

function feed() {
  changeHappiness(10);
}

function play() {
  changeHappiness(10);
}

// Next Day: time moves forward one day. Happiness drops by 5, never below 0.
function nextDay() {
  if (!pet) return;
  pet.day = pet.day + 1;
  pet.happiness = Math.max(0, pet.happiness - 5);
  renderPet();
  savePet();
}

// Start Over: ask for confirmation. Cancel keeps the dog; Confirm deletes it.
function startOver() {
  if (!pet) return;
  const ok = window.confirm("Start over? This will delete your saved dog.");
  if (!ok) return; // cancelled: keep the dog
  localStorage.removeItem(STORAGE_KEY);
  pet = null;
  petMessage.textContent = "";
  renderPet();
}

// ----- Wire up the buttons -----
adoptForm.addEventListener("submit", adoptPet);
feedButton.addEventListener("click", feed);
playButton.addEventListener("click", play);
nextDayButton.addEventListener("click", nextDay);
startOverButton.addEventListener("click", startOver);

// When the page loads, bring back any dog saved in this browser.
loadPet();
