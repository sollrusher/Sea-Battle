function tableCreate() {
  let body = document.body,
    tbl = document.createElement("table");

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
// console.log(table.rows[4].cells[4])

// table.rows[4].cells[4].classList.add('test')

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
        table.rows[y].cells[x + i].classList.contains("test") ||
        table.rows[y].cells[x + i].classList.contains("close")
      ) {
        return console.log("no");
      }
    }

    for (let i = 1; i <= palub; i++, x++) {
      table.rows[y].cells[x].classList.add("test");

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
        table.rows[y + i].cells[x].classList.contains("test") ||
        table.rows[y + i].cells[x].classList.contains("close")
      ) {
        return console.log("no");
      }
    }

    for (let i = 1; i <= palub; i++, y++) {
      table.rows[y].cells[x].classList.add("test");

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

let onepalub = document.querySelector('.onepalub');
let twopalub = document.querySelector('.twopalub');
let threepalub = document.querySelector('.threepalub');
let fourpalub = document.querySelector('.fourpalub');

class Ship {
  constructor(palub, y, x, r) {
    (this.palub = palub), (this.y = y), (this.x = x), (this.r = r), (this.startPalub = palub);
  }
  sayDead() {
    if (this.palub == 0) {
      console.log("Меня убили");
      if(this.startPalub == 1){
        let temp= onepalub.innerHTML;
        temp--;
        onepalub.innerHTML = temp;
      }
      if(this.startPalub == 2){
        let temp= twopalub.innerHTML;
        temp--;
        twopalub.innerHTML = temp;
      }
      if(this.startPalub == 3){
        let temp= threepalub.innerHTML;
        temp--;
        threepalub.innerHTML = temp;
      }
      if(this.startPalub == 4){
        let temp= fourpalub.innerHTML;
        temp--;
        fourpalub.innerHTML = temp;
      }
      
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

  if (!shipyard(p, x, y, r)) {
    i--;
  } else {
    arrOfShips.push(new Ship(p, y, x, r));
  }
}
console.log(arrOfShips);

let cels = document.querySelectorAll("td");
cels.forEach((cell) => {
  cell.addEventListener("click", () => {
    cell.innerHTML = `<div class="hit">&#9773</div>`;
    console.log(cell.parentNode.rowIndex, cell.cellIndex);
    hit(cell.parentNode.rowIndex, cell.cellIndex);
  }, {once: true});
});

function hit(y, x) {

  arrOfShips.forEach((element) => {
    for (let i = 0; i <= element.palub; i++) {
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
          //console.log(arrOfShips)
        } else {
          console.log("miss");
        }
      } else {
        if (element.x == x && temp == y) {
          console.log("yes,baby", element);
          element.palub--;
          element.sayDead();
          //console.log(arrOfShips)
        } else {
          console.log("miss");
        }
      }
    }
  });
}

let compButt= document.querySelector('.piu')
compButt.addEventListener('click',computer);
function computer(){
  let y= getRandomInt(),
      x= getRandomInt();
  table.rows[y].cells[x].innerHTML = `<div class="hit">&#9773</div>`;
  hit(y,x)
}

