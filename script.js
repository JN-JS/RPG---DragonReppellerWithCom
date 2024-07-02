// Initialise In-Game variables ####
// ######################
let xp = 0;
let health = 100;
let gold = 50;
currentWeaponIndex = 0;
// fighting used for monster index
let fighting;
let monsterHealth;
let inventory = ["stick"];
// ###########################

// Creating variable from HTML with (CSS)selectors for querySelector 
// init reusable game variables
// ###########################
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
// because the variable monsterHealth has already been used, i need to create a new
const monsterHealthText = document.querySelector("#monsterHealth");

// need to create a data structure for the different locations, to use in update()
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store." 
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters." 
    }
];

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    // innerText controls the text that appears in an HTML element
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function fightDragon() {
    console.log("Fighting dragon.");
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        // display health and gold variables on the game screen
        goldText.innerText = gold;
        healthText.innerText = health;
      } else {
        text.innerText = "You do not have enough gold to buy health."
      }
}

function buyWeapon() {

}

function fightSlime() {

}

function fightBeast() {
  
}
