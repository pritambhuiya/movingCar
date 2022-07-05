(function () {
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

    isCollided(crossingCar) {
      const { position, size } = crossingCar.getInfo();
      const crossingCarBottom = position.y + size.height;
      const crossingCarRight = position.x + size.width;
      const crossingCarLeft = position.x;
      const carRight = this.#position.x + this.#size.width;
      const carLeft = this.#position.x;
      const carTop = this.#position.y;

      return crossingCarBottom >= carTop &&
        crossingCarRight > carLeft &&
        carRight > crossingCarLeft;
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

  const getLaneDirection = (keyCode) => {
    if (keyCode === 'ArrowRight') {
      return 'right';
    }

    if (keyCode === 'ArrowLeft') {
      return 'left';
    };
  };

  const drawRoad = (road) => {
    const roadElement = document.getElementById('road');
    roadElement.style.width = road.right + 'px';
    roadElement.style.height = road.bottom + 'px';
    return roadElement;
  };

  const createCrossingCars = () => {
    const crossingCars = [];
    crossingCars.push(new Car('car-1', { x: 70, y: 0 }, { height: 100, width: 70 }, 5, 'yellow'));
    crossingCars.push(new Car('car-2', { x: 210, y: 0 }, { height: 100, width: 70 }, 9, 'blue'));
    crossingCars.push(new Car('car-3', { x: 350, y: 0 }, { height: 100, width: 70 }, 7, 'green'));
    return crossingCars;
  };

  const start = () => {
    const road = { top: 0, bottom: 900, right: 500, left: 0 };
    const roadElement = drawRoad(road);

    const car = new Car('car', { x: 210, y: 700 }, { height: 100, width: 70 }, 140, 'red');
    drawCar(car, roadElement);
    document.addEventListener('keydown', ({ code }) => {
      const direction = getLaneDirection(code);

      car.move(direction);
      drawCar(car, roadElement);
    });

    const obstacleCars = createCrossingCars();
    const intervalId = setInterval(() => {
      obstacleCars.forEach((obstacleCar) => {
        obstacleCar.move('down', road);
      });
      obstacleCars.forEach((obstacleCar) => {
        drawCar(obstacleCar, roadElement);
        if (car.isCollided(obstacleCar)) {
          clearInterval(intervalId);
          alert('Car collided');
        }
      });
    }, 30);
  };

  window.onload = start;
})()
