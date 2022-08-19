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
  carElement.className = 'car';

  carElement.style.backgroundColor = color;
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

const random = () => Math.floor(Math.random() * 10) + 2;

const createOpposingCars = () => {
  const opposingCars = [];
  opposingCars.push(new Car('car-1', { x: 5, y: 0 }, { height: 120, width: 70 }, random(), 'yellow'));
  opposingCars.push(new Car('car-2', { x: 86, y: 0 }, { height: 120, width: 70 }, random(), 'blue'));
  opposingCars.push(new Car('car-3', { x: 167, y: 0 }, { height: 120, width: 70 }, random(), 'green'));
  opposingCars.push(new Car('car-4', { x: 249, y: 0 }, { height: 120, width: 70 }, random(), 'magenta'));
  opposingCars.push(new Car('car-5', { x: 330, y: 0 }, { height: 120, width: 70 }, random(), 'cyan'));
  return opposingCars;
};

const isGameOver = (road, playerCar, opposingCar) =>
  playerCar.isCollided(opposingCar) || road.isOutOfBoundary(playerCar);

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
  const road = new Road(0, 900, 405, 0);
  const playerCar = new Car('car',
    { x: 167, y: 700 },
    { height: 120, width: 70 },
    80,
    'red');

  const opposingCars = createOpposingCars();
  startGame(road, playerCar, opposingCars);

  document.addEventListener('keydown', ({ code }) => {
    const direction = getLaneDirection(code);
    playerCar.move(direction);
  });
};

window.onload = main;
