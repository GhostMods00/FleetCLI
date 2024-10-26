// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Car class that extends Vehicle class
class Car extends Vehicle {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];

  // Constructor for the Car class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    super();
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    super.printDetails();

    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);

    // Print details of the wheels
    console.log(
      `Wheel 1: ${this.wheels[0].diameter} inch with a ${this.wheels[0].tireBrand} tire`
    );
    console.log(
      `Wheel 2: ${this.wheels[1].diameter} inch with a ${this.wheels[1].tireBrand} tire`
    );
    console.log(
      `Wheel 3: ${this.wheels[2].diameter} inch with a ${this.wheels[2].tireBrand} tire`
    );
    console.log(
      `Wheel 4: ${this.wheels[3].diameter} inch with a ${this.wheels[3].tireBrand} tire`
    );
  }
}

// Export the Car class as the default export
export default Car;
