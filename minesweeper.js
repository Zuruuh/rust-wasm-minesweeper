import init, { getState, openField, toggleFlag } from './pkg/rust_minesweeper.js';

async function main() {
  await init();

  render();
}

function render() {
  const root = document.getElementById('root');
  const data = getState().split('\n').map((row) => row.trim().split(/\s+/));

  root.innerHTML = '';
  root.style.gridTemplate = `repeat(${data.length}, auto) / repeat(${data[0].length}, auto)`;

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      let element = document.createElement('a');

      element.classList.add('field');
      element.href = '#';
      element.innerText = data[y][x];

      element.addEventListener('click', (event) => handleLeftClick(event, x, y))
      element.addEventListener('contextmenu', (event) => handleRightClick(event, x, y))

      root.appendChild(element);
    }
  }
}

/**
 * @param {MouseEvent} event 
 * @param {number} x
 * @param {number} y
 */
function handleLeftClick(event, x, y) {
    event.preventDefault();
    openField(x, y);
    render();
}

/**
 * @param {MouseEvent} event
 * @param {number} x
 * @param {number} y
 */
function handleRightClick(event, x, y) {
    event.preventDefault();
    toggleFlag(x, y)
    render();
}

main();
