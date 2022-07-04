(function () {
  class Car {
    #id;
    #position;
    #delta;
    constructor(id, position, delta) {
      this.#id = id;
      this.#position = position;
      this.#delta = delta;
    }

    move(direction) {
      if (direction === 'right') {
        this.#position.x += this.#delta;
      }
      if (direction === 'left') {
        this.#position.x -= this.#delta;
      }
    }

    getInfo() {
      const { x, y } = this.#position;
      return { id: this.#id, position: { x, y } };
    }
  }

  const createDiv = (id, road) => {
    const element = document.createElement('div');
    element.id = id;
    road.appendChild(element);
    return element;
  };

  const drawCar = (car, road) => {
    const { id, position } = car.getInfo();

    const carElement = document.getElementById(id) || createDiv(id, road);
    carElement.style.backgroundColor = 'red';
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

  const start = () => {
    const road = document.getElementById('road');

    const car = new Car('car', { x: 450, y: 700 }, 10);
    drawCar(car, road);

    document.addEventListener('keydown', ({ code }) => {
      const direction = getLaneDirection(code);

      car.move(direction);
      drawCar(car, road);
    });
  };

  const main = () => {
    window.onload = start;
  };
  main();
})()
