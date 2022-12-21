// Define an array of planets with their coordinates
const planets = [
  {
    name: "Alderaan",
    x: 0,
    y: 0,
    z: 0
  },
  {
    name: "Bespin",
    x: 100,
    y: 50,
    z: 0
  },
  {
    name: "Coruscant",
    x: 0,
    y: 0,
    z: 100
  },
  // Add additional planets with their coordinates
];

// Define a function to calculate the distance between two planets
function calcDistance(startPlanet, endPlanet) {
  // Calculate the distance using the Pythagorean theorem
  const distance = Math.sqrt(
    Math.pow(endPlanet.x - startPlanet.x, 2) +
    Math.pow(endPlanet.y - startPlanet.y, 2) +
    Math.pow(endPlanet.z - startPlanet.z, 2)
  );
  
  // Return the distance
  return distance;
}

// Define a function to request a skill roll from a player
async function requestSkillRoll(skill) {
  // Use the game.dice3d.roll method to request a skill roll from the player
  const roll = await game.dice3d.roll(`Pilot ${skill}`);
  
  // Extract the roll result from the returned object
  const result = roll.total;
  
  // Return the roll result
  return result;
}

// Define a function to handle the jump calculation
async function handleJumpCalc() {
  // Get the start and end planets from the dropdown menus
  const startPlanet = planets.find(planet => planet.name === document.getElementById("start-planet").value);
  const endPlanet = planets.find(planet => planet.name === document.getElementById("end-planet").value);
  
  // Request a piloting skill roll from the player
  const skillRoll = await requestSkillRoll("check");
  
  // Calculate the jump time and fuel based on the skill roll
  const jumpTime = calcJumpTime(startPlanet, endPlanet, skillRoll);
  const jumpFuel = calcJumpFuel(startPlanet, endPlanet, skillRoll);
  
  // Display the jump time and fuel in the output fields
  document.getElementById("jump-time").innerHTML = `Jump Time: ${jumpTime} hours`;
  document.getElementById("jump-fuel").innerHTML = `Jump Fuel: ${jumpFuel} tons`;
}

// Define a function to calculate the jump time
function calcJumpTime(startPlanet, endPlanet, skillRoll) {
  // Calculate the distance between the planets
  const distance = calcDistance(startPlanet, endPlanet);
  
  // Calculate the jump time based on the skill roll
  const jumpTime = distance / (skillRoll / 2);
  
  // Return the jump time
  return jumpTime;
}

// Define a function to calculate the jump fuel
function calcJumpFuel(startPlanet, endPlanet, skillRoll) {
  // Calculate the distance between the planets
  const distance = calcDistance(startPlanet, endPlanet);
  
  // Calculate the jump fuel based on the skill roll
  const jumpFuel = distance / (skillRoll / 4);
  
  // Return the jump fuel
  return jumpFuel;
}

// Define a function to create the UI elements
function createUI() {
  // Create the dropdown menus for the start and end planets
  const startPlanetSelect = document.createElement("select");
  startPlanetSelect.id = "start-planet";
  const endPlanetSelect = document.createElement("select");
  endPlanetSelect.id = "end-planet";
  
  // Add options for each planet to the dropdown menus
  planets.forEach(planet => {
    const startOption = document.createElement("option");
    startOption.value = planet.name;
    startOption.textContent = planet.name;
    startPlanetSelect.appendChild(startOption);
    
    const endOption = document.createElement("option");
    endOption.value = planet.name;
    endOption.textContent = planet.name;
    endplanetSelect.appendChild(endOption);
  });
  
  // Create the button to trigger the jump calculation
  const calcButton = document.createElement("button");
  calcButton.textContent = game.i18n.localize("calculate-jump");
  calcButton.addEventListener("click", handleJumpCalc);
  
  // Create the output fields for the jump time and fuel
  const jumpTimeOutput = document.createElement("div");
  jumpTimeOutput.id = "jump-time";
  const jumpFuelOutput = document.createElement("div");
  jumpFuelOutput.id = "jump-fuel";
  
  // Add the UI elements to the page
  document.body.appendChild(startPlanetSelect);
  document.body.appendChild(endPlanetSelect);
  document.body.appendChild(calcButton);
  document.body.appendChild(jumpTimeOutput);
  document.body.appendChild(jumpFuelOutput);
}

// Call the createUI function when the page loads
window.addEventListener("load", createUI);


