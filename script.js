// Virtual Dog Park - script.js
//
// How the JavaScript is organized (explained simply):
//  - "pet" is the dog we are looking after. It is just an object that remembers
//    the dog's name, breed, day number and happiness.
//  - Functions like adoptPet(), feed(), play() change that object.
//  - renderPet() reads the object and shows its values on the page.
//  - We always use textContent (never innerHTML) to show the dog's name, so a
//    name like "<b>Buddy</b>" is displayed as plain text, not as code.

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
const feedButton = document.getElementById("feed-button");
const playButton = document.getElementById("play-button");

// ----- Helpers -----
// Returns the growth stage for a given day number.
// Day 1 = Puppy, Days 2-3 = Young Dog, Day 4+ = Adult Dog.
function stageForDay(day) {
  if (day === 1) return "Puppy";
  if (day <= 3) return "Young Dog";
  return "Adult Dog";
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
}

// Feed and Play both raise happiness by 10, but never above 100.
function changeHappiness(amount) {
  if (!pet) return;
  pet.happiness = Math.min(100, pet.happiness + amount);
  renderPet();
}

function feed() {
  changeHappiness(10);
}

function play() {
  changeHappiness(10);
}

// ----- Wire up the buttons -----
adoptForm.addEventListener("submit", adoptPet);
feedButton.addEventListener("click", feed);
playButton.addEventListener("click", play);

// (Round 3 will add Next Day, growth display, saved progress and Start Over.)
