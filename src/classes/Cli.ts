// Importing required classes and modules
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Define interfaces for answers to improve type safety
interface VehicleSelectionAnswers {
  selectedVehicleVin: string;
}

interface VehicleTypeAnswers {
  vehicleType: string;
}

interface CarAnswers {
  color: string;
  make: string;
  model: string;
  year: string;
  weight: string;
  topSpeed: string;
}

interface TruckAnswers extends CarAnswers {
  towingCapacity: string;
}

interface MotorbikeAnswers extends CarAnswers {}

interface ActionAnswers {
  action: string;
}

interface CreateOrSelectAnswers {
  CreateOrSelect: string;
}

interface TowAnswers {
  vehicleToTow: any;
}

// Define the Cli class
class Cli {
  // Updated vehicles property to accept Car, Truck, and Motorbike objects
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // Updated constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // Static method to generate a random VIN
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers: VehicleSelectionAnswers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // Method to create a new vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers: VehicleTypeAnswers) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

  // Method to create a car
  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers: CarAnswers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  // Method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "towingCapacity", message: "Enter Towing Capacity" },
      ])
      .then((answers: TruckAnswers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  // Method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers: MotorbikeAnswers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel()]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  // Method to perform actions on a selected vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Tow a vehicle",
            "Do a wheelie",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers: ActionAnswers) => {
        const vehicle = this.vehicles.find((v) => v.vin === this.selectedVehicleVin);
        if (!vehicle) {
          console.log("Vehicle not found.");
          return;
        }

        // Process selected action
        switch (answers.action) {
          case "Print details":
            vehicle.printDetails();
            break;
          case "Start vehicle":
            vehicle.start();
            break;
          case "Accelerate 5 MPH":
            vehicle.accelerate(5);
            break;
          case "Decelerate 5 MPH":
            vehicle.decelerate(5);
            break;
          case "Stop vehicle":
            vehicle.stop();
            break;
          case "Turn right":
            vehicle.turn("right");
            break;
          case "Turn left":
            vehicle.turn("left");
            break;
          case "Reverse":
            vehicle.reverse();
            break;
          case "Tow a vehicle":
            if (vehicle instanceof Truck) {
              this.findVehicleToTow(vehicle);
            } else {
              console.log("This action is only available for trucks.");
            }
            break;
          case "Do a wheelie":
            if (vehicle instanceof Motorbike) {
              vehicle.wheelie();
            } else {
              console.log("This action is only available for motorbikes.");
            }
            break;
          case "Select or create another vehicle":
            this.startCli();
            return;
          case "Exit":
            this.exit = true;
            break;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // Method to select a vehicle for towing by a truck
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles
            .filter((v) => v !== truck)
            .map((vehicle) => ({
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            })),
        },
      ])
      .then((answers: TowAnswers) => {
        const vehicleToTow = answers.vehicleToTow;
        if (truck.towingCapacity >= vehicleToTow.weight) {
          truck.tow(vehicleToTow);
        } else {
          console.log("Selected vehicle is too heavy to be towed.");
        }
        this.performActions();
      });
  }

  // Method to start the CLI
  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message:
            "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers: CreateOrSelectAnswers) => {
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// Export the Cli class
export default Cli;