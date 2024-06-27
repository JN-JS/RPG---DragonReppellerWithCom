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
const monsterHealthText = document.querySelector("#monsterHealth")


function goStore() {
    console.log("Going to store.");
}

function goCave() {
    console.log("Going to cave.");
}

function fightDragon() {
    console.log("Fighting dragon.");
}
