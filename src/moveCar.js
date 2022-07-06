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

const createCar = (id, road) => {
  const element = document.createElement('div');
  element.id = id;
  road.appendChild(element);
  return element;
};

const drawCar = (car, road) => {
  const { id, position, color, size } = car.getInfo();

  const carElement = document.getElementById(id) || createCar(id, road);
  carElement.style.backgroundColor = color;
  carElement.className = 'car';
  carElement.style.height = size.height + 'px';
  carElement.style.width = size.width + 'px';
  carElement.style.top = position.y;
  carElement.style.left = position.x;
};

const drawRoad = (road) => {
  const roadElement = document.getElementById('road');
  roadElement.style.width = road.right + 'px';
  roadElement.style.height = road.bottom + 'px';
  return roadElement;
};

const getLaneDirection = (keyCode) => {
  if (keyCode === 'ArrowRight') {
    return 'right';
  }

  if (keyCode === 'ArrowLeft') {
    return 'left';
  };
};

const createOpposingCars = () => {
  const opposingCars = [];
  opposingCars.push(new Car('car-1', { x: 70, y: 0 }, { height: 100, width: 70 }, 5, 'yellow'));
  opposingCars.push(new Car('car-2', { x: 210, y: 0 }, { height: 100, width: 70 }, 9, 'blue'));
  opposingCars.push(new Car('car-3', { x: 350, y: 0 }, { height: 100, width: 70 }, 7, 'green'));
  return opposingCars;
};

const isGameOver = (road, playerCar, opposingCar) => {
  return playerCar.isCollided(opposingCar) ||
    isOutOfRoadBoundary(road, playerCar);
};

const startGame = (road, playerCar, opposingCars) => {
  const roadElement = drawRoad(road);

  const intervalId = setInterval(() => {
    opposingCars.forEach((opposingCar) => {
      opposingCar.move('down', road);

      if (isGameOver(road, playerCar, opposingCar)) {
        clearInterval(intervalId);
      }
    });

    opposingCars.forEach((opposingCar) => {
      drawCar(opposingCar, roadElement);
    });

    drawCar(playerCar, roadElement);
  }, 30);
};

const isOutOfRoadBoundary = (road, playerCar) => {
  const { position: playerCarPosition, size: playerCarSize } = playerCar.getInfo();
  return road.left >= playerCarPosition.x ||
    road.right <= playerCarSize.width + playerCarPosition.x;
};

const main = () => {
  const road = { top: 0, bottom: 900, right: 500, left: 0 };
  const playerCar = new Car('car',
    { x: 210, y: 700 },
    { height: 100, width: 70 },
    140,
    'red');
  const opposingCars = createOpposingCars();

  startGame(road, playerCar, opposingCars);

  document.addEventListener('keydown', ({ code }) => {
    const direction = getLaneDirection(code);
    playerCar.move(direction);
  });
};

window.onload = main;
