// Import the Vehicle, Motorbike, Car, Wheel classes, and AbleToTow interface
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// Truck class that extends Vehicle and implements AbleToTow
class Truck extends Vehicle implements AbleToTow {
  // Declare properties
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  // Constructor for Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    // Call the Vehicle parent constructor
    super();

    // Initialize properties
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;

    // Ensure wheels array has exactly 4 elements, otherwise create default wheels
    this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }

  // Implement the tow method from AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    const { make, model, weight } = vehicle;

    // Check if the vehicle's weight is within the truck's towing capacity
    if (weight <= this.towingCapacity) {
      console.log(`Towing ${make} ${model}...`);
    } else {
      console.log(`${make} ${model} is too heavy to be towed by this truck.`);
    }
  }

  // Override the printDetails method from Vehicle
  override printDetails(): void {
    super.printDetails(); // Call parent method to print basic vehicle details

    // Log Truck-specific details
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);

    // Log details for each wheel
    console.log(
      `Front Left Wheel: ${this.wheels[0].diameter} inch with a ${this.wheels[0].tireBrand} tire`
    );
    console.log(
      `Front Right Wheel: ${this.wheels[1].diameter} inch with a ${this.wheels[1].tireBrand} tire`
    );
    console.log(
      `Rear Left Wheel: ${this.wheels[2].diameter} inch with a ${this.wheels[2].tireBrand} tire`
    );
    console.log(
      `Rear Right Wheel: ${this.wheels[3].diameter} inch with a ${this.wheels[3].tireBrand} tire`
    );
  }
}

// Export the Truck class as the default export
export default Truck;