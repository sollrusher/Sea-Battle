function tableCreate() {
  let body = document.body,
    tbl = document.createElement("table");
  tbl.className = "tablica";
  for (let i = 0; i < 10; i++) {
    let tr = tbl.insertRow();
    for (let j = 0; j < 10; j++) {
      let td = tr.insertCell();
    }
  }
  body.append(tbl);
}
tableCreate();
let table = document.querySelector("table");

tableCreate();
let table2 = document.querySelectorAll("table")[1];

function getRandomInt(max = 10) {
  return Math.floor(Math.random() * max);
}

function shipyard(palub, x, y, r) {
  console.log("palub -", palub, "y -", y + 1, "x- ", x + 1);

  if (r >= 5) {
    //horizontal
    for (let i = 0; i < palub; i++) {
      if (
        x + palub > 10 ||
        !table.rows[y].cells[x + i] ||
        table.rows[y].cells[x + i].classList.contains("ship") ||
        table.rows[y].cells[x + i].classList.contains("close")
      ) {
        return console.log("no");
      }
    }

    for (let i = 1; i <= palub; i++, x++) {
      table.rows[y].cells[x].classList.add("ship");

      if (y + 1 < 10) table.rows[y + 1].cells[x].classList.add("close");
      if (y - 1 >= 0) table.rows[y - 1].cells[x].classList.add("close");

      if (i == 1) {
        if (x - 1 >= 0) table.rows[y].cells[x - 1].classList.add("close");
        if (y - 1 >= 0 && x - 1 >= 0)
          table.rows[y - 1].cells[x - 1].classList.add("close");
        if (y + 1 < 10 && x - 1 >= 0)
          table.rows[y + 1].cells[x - 1].classList.add("close");
      }
      if (i == palub) {
        if (x + 1 < 10) table.rows[y].cells[x + 1].classList.add("close");
        if (y - 1 >= 0 && x + 1 < 10)
          table.rows[y - 1].cells[x + 1].classList.add("close");
        if (y + 1 < 10 && x + 1 < 10)
          table.rows[y + 1].cells[x + 1].classList.add("close");
      }
    }
  } else {
    //vertical

    for (let i = 0; i < palub; i++) {
      if (
        y + palub > 10 ||
        !table.rows[y + i].cells[x] ||
        table.rows[y + i].cells[x].classList.contains("ship") ||
        table.rows[y + i].cells[x].classList.contains("close")
      ) {
        return console.log("no");
      }
    }

    for (let i = 1; i <= palub; i++, y++) {
      table.rows[y].cells[x].classList.add("ship");

      if (table.rows[y].cells[x - 1])
        table.rows[y].cells[x - 1].classList.add("close");
      if (table.rows[y].cells[x + 1])
        table.rows[y].cells[x + 1].classList.add("close");

      if (i == 1) {
        if (y - 1 >= 0) table.rows[y - 1].cells[x].classList.add("close");
        if (y - 1 >= 0 && x - 1 >= 0)
          table.rows[y - 1].cells[x - 1].classList.add("close");
        if (y - 1 >= 0 && x + 1 < 10)
          table.rows[y - 1].cells[x + 1].classList.add("close");
      }
      if (i == palub) {
        if (y + 1 < 10) table.rows[y + 1].cells[x].classList.add("close");
        if (y + 1 < 10 && x - 1 >= 0)
          table.rows[y + 1].cells[x - 1].classList.add("close");
        if (y + 1 < 10 && x + 1 < 10)
          table.rows[y + 1].cells[x + 1].classList.add("close");
      }
    }
  }
  return true;
}

let arrOfShips = [];

let myonepalub = document.querySelector(".onepalub");
let mytwopalub = document.querySelector(".twopalub");
let mythreepalub = document.querySelector(".threepalub");
let myfourpalub = document.querySelector(".fourpalub");

class Ship {
  constructor(palub, y, x, r) {
    (this.palub = palub),
      (this.y = y),
      (this.x = x),
      (this.r = r),
      (this.startPalub = palub);
  }
  sayDead() {
    if (this.palub == 0) {
      console.log("Меня убили");
      if (this.startPalub == 1) {
        let temp = myonepalub.innerHTML;
        temp--;
        myonepalub.innerHTML = temp;
      }
      if (this.startPalub == 2) {
        let temp = mytwopalub.innerHTML;
        temp--;
        mytwopalub.innerHTML = temp;
      }
      if (this.startPalub == 3) {
        let temp = mythreepalub.innerHTML;
        temp--;
        mythreepalub.innerHTML = temp;
      }
      if (this.startPalub == 4) {
        let temp = myfourpalub.innerHTML;
        temp--;
        myfourpalub.innerHTML = temp;
      }
      closeAround(this.x, this.y, this.r, this.startPalub, table);
    }
  }
}

for (let i = 1; i <= 10; i++) {
  let y = getRandomInt(),
    x = getRandomInt(),
    r = getRandomInt(),
    p;

  if (i == 1) p = 4;
  if (i == 2 || i == 3) p = 3;
  if (i == 4 || i == 5 || i == 6) p = 2;
  if (i == 7 || i == 8 || i == 9 || i == 10) p = 1;

  if (!shipyard(p, x, y, r, table)) {
    i--;
  } else {
    arrOfShips.push(new Ship(p, y, x, r));
  }
}
// console.log(arrOfShips);

let cels = table2.querySelectorAll("td");
cels.forEach((cell) => {
  cell.addEventListener(
    "click",
    () => {
      cell.innerHTML = `<div class="hit">&#9773</div>`;
      console.log(cell.parentNode.rowIndex, cell.cellIndex);
      hit(cell.parentNode.rowIndex, cell.cellIndex, arrOfEnemyShips);
    },
    { once: true }
  );
});

function hit(y, x, arr) {
  arr.forEach((element) => {
    for (let i = 0; i <= element.startPalub; i++) {
      let temp;
      if (element.r >= 5) {
        temp = element.x + i;
      } else {
        temp = element.y + i;
      }
      if (element.r >= 5) {
        if (temp == x && element.y == y) {
          console.log("yes,baby", element);
          element.palub--;
          
          element.sayDead();
          if(arr==arrOfEnemyShips)
          table2.rows[event.path[1].rowIndex].cells[event.target.cellIndex].classList.add("ship");
        } 
      } else {
        if (element.x == x && temp == y) {
          console.log("yes,baby", element);
          element.palub--;
          element.sayDead();
          if(arr==arrOfEnemyShips)
          table2.rows[event.path[1].rowIndex].cells[event.target.cellIndex].classList.add("ship");
          else
          table.rows[event.path[1].rowIndex].cells[event.target.cellIndex].classList.add("ship");
        } 
      }
    }
  });
}

let compButt = document.querySelector(".piu");
compButt.addEventListener("click", computer);
function computer() {
  let y = getRandomInt(),
    x = getRandomInt();
  table.rows[y].cells[x].innerHTML = `<div class="hit">&#9773</div>`;
  hit(y, x, arrOfShips);
}

function enemyShipyard(palub, x, y, r) {
  console.log("palub -", palub, "y -", y + 1, "x- ", x + 1);

  if (r >= 5) {
    //horizontal
    for (let i = 0; i < palub; i++) {
      if (
        x + palub > 10 ||
        !table2.rows[y].cells[x + i] ||
        table2.rows[y].cells[x + i].classList.contains("enemyShip") ||
        table2.rows[y].cells[x + i].classList.contains("enemyClose")
      ) {
        return console.log("no");
      }
    }

    for (let i = 1; i <= palub; i++, x++) {
      table2.rows[y].cells[x].classList.add("enemyShip");

      if (y + 1 < 10) table2.rows[y + 1].cells[x].classList.add("enemyClose");
      if (y - 1 >= 0) table2.rows[y - 1].cells[x].classList.add("enemyClose");

      if (i == 1) {
        if (x - 1 >= 0) table2.rows[y].cells[x - 1].classList.add("enemyClose");
        if (y - 1 >= 0 && x - 1 >= 0)
          table2.rows[y - 1].cells[x - 1].classList.add("enemyClose");
        if (y + 1 < 10 && x - 1 >= 0)
          table2.rows[y + 1].cells[x - 1].classList.add("enemyClose");
      }
      if (i == palub) {
        if (x + 1 < 10) table2.rows[y].cells[x + 1].classList.add("enemyClose");
        if (y - 1 >= 0 && x + 1 < 10)
          table2.rows[y - 1].cells[x + 1].classList.add("enemyClose");
        if (y + 1 < 10 && x + 1 < 10)
          table2.rows[y + 1].cells[x + 1].classList.add("enemyClose");
      }
    }
  } else {
    //vertical

    for (let i = 0; i < palub; i++) {
      if (
        y + palub > 10 ||
        !table2.rows[y + i].cells[x] ||
        table2.rows[y + i].cells[x].classList.contains("enemyShip") ||
        table2.rows[y + i].cells[x].classList.contains("enemyClose")
      ) {
        return console.log("no");
      }
    }

    for (let i = 1; i <= palub; i++, y++) {
      table2.rows[y].cells[x].classList.add("enemyShip");

      if (table2.rows[y].cells[x - 1])
        table2.rows[y].cells[x - 1].classList.add("enemyClose");
      if (table2.rows[y].cells[x + 1])
        table2.rows[y].cells[x + 1].classList.add("enemyClose");

      if (i == 1) {
        if (y - 1 >= 0) table2.rows[y - 1].cells[x].classList.add("enemyClose");
        if (y - 1 >= 0 && x - 1 >= 0)
          table2.rows[y - 1].cells[x - 1].classList.add("enemyClose");
        if (y - 1 >= 0 && x + 1 < 10)
          table2.rows[y - 1].cells[x + 1].classList.add("enemyClose");
      }
      if (i == palub) {
        if (y + 1 < 10) table2.rows[y + 1].cells[x].classList.add("enemyClose");
        if (y + 1 < 10 && x - 1 >= 0)
          table2.rows[y + 1].cells[x - 1].classList.add("enemyClose");
        if (y + 1 < 10 && x + 1 < 10)
          table2.rows[y + 1].cells[x + 1].classList.add("enemyClose");
      }
    }
  }
  return true;
}

let arrOfEnemyShips = [];

let enemonepalub = document.querySelector(".enemonepalub");
let enemtwopalub = document.querySelector(".enemtwopalub");
let enemthreepalub = document.querySelector(".enemthreepalub");
let enemfourpalub = document.querySelector(".enemfourpalub");

function closeAround(x, y, r, palub, tablica) {
  if (r >= 5) {
    for (let i = 1; i <= palub; i++, x++) {
      if (y + 1 < 10) tablica.rows[y + 1].cells[x].innerHTML = `<div class="hit">&#9773</div>`;
      if (y - 1 >= 0) tablica.rows[y - 1].cells[x].innerHTML = `<div class="hit">&#9773</div>`;

      if (i == 1) {
        if (x - 1 >= 0) tablica.rows[y].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`;
        if (y - 1 >= 0 && x - 1 >= 0)
          tablica.rows[y - 1].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`;
        if (y + 1 < 10 && x - 1 >= 0)
          tablica.rows[y + 1].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`;
      }
      if (i == palub) {
        if (x + 1 < 10) tablica.rows[y].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`;
        if (y - 1 >= 0 && x + 1 < 10)
          tablica.rows[y - 1].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`;
        if (y + 1 < 10 && x + 1 < 10)
          tablica.rows[y + 1].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`;
      }
    }
  } else {
    for (let i = 1; i <= palub; i++, y++) {
      if (tablica.rows[y].cells[x - 1])
        tablica.rows[y].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`;
      if (tablica.rows[y].cells[x + 1])
        tablica.rows[y].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`;

      if (i == 1) {
        if (y - 1 >= 0) tablica.rows[y - 1].cells[x].innerHTML = `<div class="hit">&#9773</div>`;
        if (y - 1 >= 0 && x - 1 >= 0)
          tablica.rows[y - 1].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`;
        if (y - 1 >= 0 && x + 1 < 10)
          tablica.rows[y - 1].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`;
      }
      if (i == palub) {
        if (y + 1 < 10) tablica.rows[y + 1].cells[x].innerHTML = `<div class="hit">&#9773</div>`;
        if (y + 1 < 10 && x - 1 >= 0)
          tablica.rows[y + 1].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`;
        if (y + 1 < 10 && x + 1 < 10)
          tablica.rows[y + 1].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`;
      }
    }
  }
}

class EnemyShip {
  constructor(palub, y, x, r) {
    (this.palub = palub),
      (this.y = y),
      (this.x = x),
      (this.r = r),
      (this.startPalub = palub);
  }
  sayDead() {
    if (this.palub == 0) {
      console.log("Меня убили");
      if (this.startPalub == 1) {
        let temp = enemonepalub.innerHTML;
        temp--;
        enemonepalub.innerHTML = temp;
      }
      if (this.startPalub == 2) {
        let temp = enemtwopalub.innerHTML;
        temp--;
        enemtwopalub.innerHTML = temp;
      }
      if (this.startPalub == 3) {
        let temp = enemthreepalub.innerHTML;
        temp--;
        enemthreepalub.innerHTML = temp;
      }
      if (this.startPalub == 4) {
        let temp = enemfourpalub.innerHTML;
        temp--;
        enemfourpalub.innerHTML = temp;
      }
      closeAround(this.x, this.y, this.r, this.startPalub, table2);
    }
  }
}



for (let i = 1; i <= 10; i++) {
  let y = getRandomInt(),
    x = getRandomInt(),
    r = getRandomInt(),
    p;

  if (i == 1) p = 4;
  if (i == 2 || i == 3) p = 3;
  if (i == 4 || i == 5 || i == 6) p = 2;
  if (i == 7 || i == 8 || i == 9 || i == 10) p = 1;

  if (!enemyShipyard(p, x, y, r, table)) {
    i--;
  } else {
    arrOfEnemyShips.push(new EnemyShip(p, y, x, r));
  }
}


// for (let i = 8; i <= 8; i++) {
//   let y = 1,
//     x = 1,
//     r = 2,
//     p;

//   if (i == 1) p = 4;
//   if (i == 2 || i == 3) p = 3;
//   if (i == 4 || i == 5 || i == 6) p = 2;
//   if (i == 7 || i == 8 || i == 9 || i == 10) p = 1;

//   if (!enemyShipyard(p, x, y, r, table)) {
//     i--;
//   } else {
//     arrOfEnemyShips.push(new EnemyShip(p, y, x, r));
//   }
// }

