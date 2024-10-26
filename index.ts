// Import classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// Explicitly define the vehicles array type
const vehicles: (Truck | Car | Motorbike)[] = [];

// Create instances of Truck, Car, and Motorbike
const truck1 = new Truck(
  Cli.generateVin(),
  "red",
  "Ford",
  "F-150",
  2021,
  5000,
  120,
  [],
  10000
);

const car1 = new Car(
  Cli.generateVin(),
  "blue",
  "Toyota",
  "Camry",
  2021,
  3000,
  130,
  []
);

const motorbike1 = new Motorbike(
  Cli.generateVin(),
  "black",
  "Harley Davidson",
  "Sportster",
  2021,
  500,
  125,
  [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")]
);

// Push instances to the vehicles array
vehicles.push(truck1, car1, motorbike1);

// Create a new instance of the Cli class with the vehicles array
const cli = new Cli(vehicles);

// Start the CLI
cli.startCli();