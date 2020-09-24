let firstName = true;
let str = `My name is ${firstName ? "Preeti" : "Sahani"}`;
console.log(str);
const isEmpty = (value) => {
  if (!value || !value.trim()) return true;
  return false;
};
const createBoard = (dim) => {
  let ele = document.getElementById("game-grid");
  for (let i = 0; i < dim; i++) {
    let row = document.createElement("div");
    row.setAttribute("id", i.toString());
    row.classList.add("row");
    for (let j = 0; j < dim; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", i.toString() + j.toString());
      cell.setAttribute("value", "0");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    ele.appendChild(row);
  }
};
let x = 1;
const startGame = () => {
  if (x === 1) {
    let input1 = document.getElementById("p1");
    let input2 = document.getElementById("p2");
    let input3 = document.getElementById("dim");

    let player1 = input1.value;
    let player2 = input2.value;

    if (isEmpty(player1) === true || isEmpty(player2) === true) {
      alert("Player name is required");
      return;
    }
    input1.setAttribute("disabled", true);
    input2.setAttribute("disabled", true);
    input3.setAttribute("disabled", true);

    let dim = document.getElementById("dim").value;
    console.log(dim);
    createBoard(dim);
    let game = document.getElementById("container");
    game.classList.remove("hide");
    let count = 0;
    startCheck(dim, player1, player2, count);
  }
  x = 0;
};
const startCheck = (dim, player1, player2, count) => {
  let isum = 0;
  let jsum = 0;
  let dlsum = 0;
  let drsum = 0;
  const statusDiv = document.querySelector(".status");
  const resetDiv = document.querySelector(".reset");
  const cellDivs = document.querySelectorAll(".cell");

  // game constants
  const xSymbol = "x";
  const oSymbol = "○";

  // game variables
  let gameIsLive = true;
  let xIsNext = true;

  // functions

  const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === "x") {
      statusDiv.innerHTML = `<h4 style="color:green; font-weight:bold">${player1} has won!!!</h4>`;
    } else {
      statusDiv.innerHTML = `<h4 style="color:green; font-weight:bold">${player2} has won!!!</h4>`;
    }
  };

  const checkGameStatus = (idd) => {
    let ii = parseInt(idd[0], 10);
    let jj = parseInt(idd[1], 10);
    isum = 0;
    jsum = 0;
    dlsum = 0;
    drsum = 0;

    for (let i = 0; i < cellDivs.length; i++) {
      let ele1 = cellDivs[i].getAttribute("id");
      let ele2 = cellDivs[i].getAttribute("value");
      let k = parseInt(ele1[0], 10);
      let l = parseInt(ele1[1], 10);
      if (k === ii) {
        isum = isum + parseInt(ele2, 10);
      }
      if (l === jj) {
        jsum = jsum + parseInt(ele2, 10);
      }
      if (ii === jj) {
        if (k === l) {
          dlsum = dlsum + parseInt(ele2, 10);
        }
      }
      if (ii + jj === dim - 1) {
        if (k + l === dim - 1) {
          drsum = drsum + parseInt(ele2, 10);
        }
      }
    }
    console.log("isum " + isum);
    console.log("jsum " + jsum);
    console.log("dlsum " + dlsum);
    console.log("drsum " + drsum);
    if (isum == dim || jsum == dim || dlsum == dim || drsum == dim) {
      handleWin("x");
      confetti.start(10000, 200, 300);
      console.log("x has won");
    } else if (
      isum === -dim ||
      jsum === -dim ||
      dlsum === -dim ||
      drsum === -dim
    ) {
      handleWin("o");
      confetti.start(10000, 200, 300);
      console.log("o has won");
    } else if (count === dim * dim) {
      gameIsLive = false;
      statusDiv.innerHTML = `GAME IS TIED`;
    } else {
      xIsNext = !xIsNext;
      if (xIsNext) {
        statusDiv.innerHTML = `${xSymbol} is next`;
      } else {
        statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
      }
    }
  };

  // event Handlers
  const handleReset = () => {
    confetti.stop();
    xIsNext = true;
    count = 0;
    statusDiv.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of cellDivs) {
      cellDiv.classList.remove("x");
      cellDiv.classList.remove("o");
      cellDiv.classList.remove("won");
      cellDiv.setAttribute("value", "0");
    }
    gameIsLive = true;
  };

  const handleCellClick = (e) => {
    const classList = e.target.classList;

    if (!gameIsLive || classList[1] === "x" || classList[1] === "o") {
      return;
    }
    count++;
    let idd = e.target.getAttribute("id");
    if (xIsNext) {
      //e.target.innerHTML = "X";
      classList.add("x");
      e.target.setAttribute("value", "1");
      checkGameStatus(idd);
    } else {
      e.target.setAttribute("value", "-1");
      classList.add("o");
      //e.target.innerHTML = "O";
      checkGameStatus(idd);
    }
  };

  // event listeners
  resetDiv.addEventListener("click", handleReset);

  for (const cellDiv of cellDivs) {
    //console.log("yo");
    //console.log(cellDiv.getAttribute("id"));
    cellDiv.addEventListener("click", handleCellClick);
  }
};
