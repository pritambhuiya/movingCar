class Road {
  constructor(top, bottom, right, left) {
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.left = left;
  }

  isOutOfBoundary(car) {
    const { position: carPosition, size: carSize } = car.getInfo();
    return this.left >= carPosition.x ||
      this.right <= carSize.width + carPosition.x;
  }

  get info() {
    return {
      top: this.top,
      bottom: this.bottom,
      left: this.left,
      right: this.right
    }
  }
}