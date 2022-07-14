const createCar = (id, road) => {
  const element = document.createElement('div');
  element.id = id;
  road.appendChild(element);
  return element;
};

const px = value => value + 'px';

const drawCar = (car, road) => {
  const { id, position, color, size } = car.getInfo();

  const carElement = document.getElementById(id) || createCar(id, road);
  carElement.style.backgroundColor = color;
  carElement.className = 'car';
  carElement.style.height = px(size.height);
  carElement.style.width = px(size.width);
  carElement.style.top = position.y;
  carElement.style.left = position.x;
};

const drawRoad = (road) => {
  const roadElement = document.getElementById('road');

  roadElement.style.width = px(road.right);
  roadElement.style.height = px(road.bottom);

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
    road.isOutOfBoundary(playerCar);
};

const createScoreBoard = (id) => {
  const view = document.getElementById('view');
  const scoreBoard = document.createElement('div');
  scoreBoard.id = id;
  scoreBoard.className = 'score-board';
  view.appendChild(scoreBoard);
  return scoreBoard;
};

const drawScoreBoard = (score) => {
  const scoreBoard = document.getElementById('score-board') ||
    createScoreBoard('score-board');
  scoreBoard.innerText = 'Score:' + score;
};

const startGame = (road, playerCar, opposingCars) => {
  const roadElement = drawRoad(road);
  let score = 0;

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
    drawScoreBoard(score);
    score += 1;
  }, 30);
};

const main = () => {
  const road = new Road(0, 900, 500, 0);
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
