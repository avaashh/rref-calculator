class Fraction {
  constructor(numerator, denominator = 1) {
    if (denominator === 0)
      throw new Error("Denominator Zero: Undefined Number");

    if (
      Math.abs(numerator - parseInt(numerator)) > 0 &&
      Math.abs(numerator - parseInt(numerator)) < 1
    ) {
      denominator *= 1 / numerator;
      numerator = 1;
    }

    this.numerator = numerator;
    this.denominator = denominator;

    this.reduce();
  }

  // fraction operations
  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  reduce() {
    const common = this.gcd(this.numerator, this.denominator);
    this.numerator /= common;
    this.denominator /= common;
  }

  isInt() {
    return this.value() === parseInt(this.value());
  }

  value() {
    return this.numerator / this.denominator;
  }

  // arithmetic operations
  add(otherFraction) {
    const newNumerator =
      this.numerator * otherFraction.denominator +
      otherFraction.numerator * this.denominator;
    const newDenominator = this.denominator * otherFraction.denominator;
    return new Fraction(newNumerator, newDenominator);
  }

  multiply(otherFraction) {
    const newNumerator = this.numerator * otherFraction.numerator;
    const newDenominator = this.denominator * otherFraction.denominator;

    return new Fraction(newNumerator, newDenominator);
  }

  divide(otherFraction) {
    return this.multiply(
      new Fraction(otherFraction.denominator, otherFraction.numerator)
    );
  }

  abs() {
    return new Fraction(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  // inequalities
  lessThan(otherFraction) {
    return this.value() < otherFraction.numerator / otherFraction.denominator;
  }

  equalTo(otherFraction) {
    return (
      this.numerator === otherFraction.numerator &&
      this.denominator === otherFraction.denominator
    );
  }

  lessThanEqualTo(otherFraction) {
    return this.lessThan(otherFraction) || this.equalTo(otherFraction);
  }

  greaterThan(otherFraction) {
    return !this.lessThanEqualTo(otherFraction);
  }

  greaterThanEqualTo(otherFraction) {
    return !this.lessThan(otherFraction);
  }

  // visual outputs
  toString() {
    if (this.isInt()) return `${parseInt(this.value())}`;

    const ret = `${Math.abs(this.numerator)}/${Math.abs(this.denominator)}`;
    if (this.value() < 0) return "-" + ret;
    return ret;
  }

  toTex() {
    if (this.isInt()) return `${parseInt(this.value())}`;

    const ret = `\\frac{${Math.abs(this.numerator)}}{${Math.abs(
      this.denominator
    )}}`;
    if (this.value() < 0) return "-" + ret;
    return ret;
  }
}
