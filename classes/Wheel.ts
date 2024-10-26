// Wheel class that defines the properties of a wheel
class Wheel {
  // Private properties with underscore prefixes to avoid naming conflicts
  private _diameter: number;
  private _tireBrand: string;

  // Constructor with default values for diameter and tireBrand
  constructor(diameter: number = 18, tireBrand: string = "GoodYear") {
    this._diameter = diameter;
    this._tireBrand = tireBrand;
  }

  // Getter for diameter
  get diameter(): number {
    return this._diameter;
  }

  // Getter for tireBrand
  get tireBrand(): string {
    return this._tireBrand;
  }
}

// Export the Wheel class
export default Wheel;