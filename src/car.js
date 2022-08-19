class Car {
  #id;
  #position;
  #delta;
  #color;
  #size;

  constructor(id, position, size, delta, color) {
    this.#id = id;
    this.#position = position;
    this.#size = size;
    this.#delta = delta;
    this.#color = color;
  }

  #isCrossedRoad({ bottom }) {
    return this.#position.y >= bottom - this.#size.height;
  }

  #moveDown(road) {
    if (this.#isCrossedRoad(road)) {
      this.#position.y = 0;
    }
    this.#position.y += this.#delta;
  }

  move(direction, road) {
    if (direction === 'right') {
      this.#position.x += this.#delta;
    }

    if (direction === 'left') {
      this.#position.x -= this.#delta;
    }

    if (direction === 'down') {
      this.#moveDown(road);
    }
  }

  getInfo() {
    const { x, y } = this.#position;
    const { height, width } = this.#size;

    return {
      id: this.#id,
      position: { x, y },
      color: this.#color,
      size: { height, width }
    };
  }

  isCollided(opposingCar) {
    const { position, size } = opposingCar.getInfo();

    const opposingCarLeft = position.x;
    const opposingCarBottom = position.y + size.height;
    const opposingCarRight = position.x + size.width;
    const playerCarsRight = this.#position.x + this.#size.width;
    const playersCarLeft = this.#position.x;
    const playersCarsTop = this.#position.y;

    return opposingCarBottom >= playersCarsTop &&
      opposingCarRight > playersCarLeft &&
      playerCarsRight > opposingCarLeft;
  }
}
