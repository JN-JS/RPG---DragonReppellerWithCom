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

const weapons = [
	{
		name: "stick",
		power: 5
	},
	{
		name: "dagger",
		power: 30
	},
	{
		name: "claw hammer",
		power: 50
	},
	{
		name: "sword",
		power: 100
	}
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];

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
	},
	{
		name: "fight",
		"button text": ["Attack", "Dodge", "Run"],
		"button functions": [attack, dodge, goTown],
		text: "You are fighting a monster." 
	},
	{
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    "text": 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
	{
		name: "lose",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You die. &#x2620;"
	},
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
  }
];

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
	// Hides monster's stat after defeat
	monsterStats.style.display = 'none';
	// innerText controls the text that appears in an HTML element
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
	text.innerHTML = location.text;
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
    // weapons.length - 1 ->the index in a array is 1 less than the length
	if(currentWeaponIndex < weapons.length - 1) {
		if(gold >= 30) {
		gold -= 30
		// cWI correspond to an index in weapons array
		currentWeaponIndex++;
		goldText.innerText = gold;
		// Access the name of the current weapon(cWI + 1)
		let newWeapon = weapons[currentWeaponIndex].name
		text.innerText = "You now have a " + newWeapon + "."
		// add new weapon to inventory
		inventory.push(newWeapon)
		// add to the existing text
		text.innerText += " In your inventory you have: " + inventory.name
		} else {
			text.innerText = "You do not have enough gold to buy a weapon."
		} 
	} else {
		text.innerText = "You already have the most powerful weapon!";
		button2.innerText = "Sell weapon for 15 gold";
		button2.onclick = sellWeapon;
	}
}

function sellWeapon() {
	if(inventory.length > 1) {
		gold += 15;
    goldText.innerText = gold
		// takes 1st element in inventory to assign it to currentWeapon
		let currentWeapon = inventory.shift();
		text.innerText = "You sold a " + currentWeapon + "."
		text.innerText += " In your inventory you have: " + inventory
  } else {
		text.innerText = "Don't sell your only weapon!"
	}
}

// fighting differnet monster use similar logic, goFight manage that logic
function goFight() {
	update(locations[3]);
	monsterHealth = monsters[fighting].health;
	// was hidden by CSS
	monsterStats.style.display = 'block';
	// update text for current monster's stat
	monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
	if (health <= 0) {
    lose();
  } else if(monsterHealth <= 0) {
    defeatMonster();
  }
}

function fightSlime() {
	// slime is index 0
	fighting = 0
  goFight()
}

function fightBeast() {
  // fanged beast is index 1
	fighting = 1
  goFight()
}

function fightDragon() {
	// Dragon is index 2
	fighting = 2
  goFight()
}

function attack() {
	text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";
	healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth

  // gives a dynamic atk value
  // sets health - getMonsterAttackValue which passes level as arg
  // health -= getMonsterAttackValue(monsters[fighting].level);
  if(isMonsterHit()) {
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss."
  }
  // health -= monsters[fighting].level;


	// Add to weapon power a random number from 1 to 5
	monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;

	// condition for win or lose
	if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    // if fighting Dragon -> winGame func
    if (fighting === 2) {
		winGame()
	} else {
		defeatMonster();
	}
  }
  // Add possibility of weapon break
  if(Math.random() <= .1) {
    // .pop() remove and return last item in array
	text.innerText += " Your " + inventory.pop() + " breaks."
	currentWeaponIndex--;
  }
}

function getMonsterAttackValue(level) {
  const hit =  (level * 5) - (Math.floor(Math.random() * xp));
  // prevent the return of a negativ numb
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
	text.innerText = "You dodge the attack from the " + monsters[fighting].name
}

function lose() {
	update(locations[5])
}

function winGame() {
  update(locations[6])
}

function defeatMonster() {
	gold += Math.floor(monsters[fighting].level * 6.7);
	xp += monsters[fighting].level;
	goldText.innerText = gold;
  xpText.innerText = xp;
	update(locations[4]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown()
}
