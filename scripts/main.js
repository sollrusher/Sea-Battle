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
let table = document.querySelectorAll("table")[1];

tableCreate();
let table2 = document.querySelectorAll("table")[2];
let wintitle= document.querySelector('.wintitle');

function getRandomInt(max = 10) {
  return Math.floor(Math.random() * max);
}

function shipyard(palub, x, y, r, table) {
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
function autoPlace(){
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
}


let cels = table2.querySelectorAll("td");
cels.forEach((cell) => {
  cell.addEventListener(
    "click",
    () => {
      cell.innerHTML = `<div class="hit">&#9773</div>`;
      console.log(cell.parentNode.rowIndex, cell.cellIndex);
      hit(cell.parentNode.rowIndex, cell.cellIndex, arrOfEnemyShips);
      computer()
    },
    { once: true }
  );
});

function hit(y, x, arr) {
  arr.forEach((element) => {
    for (let i = 0; i < element.startPalub; i++) {
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

        } 
      }
    }
  });


if(enemonepalub.innerHTML + enemtwopalub.innerHTML + enemthreepalub.innerHTML + enemfourpalub.innerHTML == 0) {wintitle.innerHTML="Я победил!"}

}
let hits=[];
let compButt = document.querySelector(".piu");
compButt.addEventListener("click", computer);
function computer() {


  let y = getRandomInt(),
    x = getRandomInt();
    
    if (hits[0]) {
      if (
        hits.some((element) => {
          return element[0] == y && element[1] == x;
        })
      ) {
        console.log("было");
        computer();
      } else {
        console.log("новое значение", y, x);
        hits.push([y, x]);
      }
    } else {
      hits.push([y, x]);
      console.log("push", y, x);
    }

  table.rows[y].cells[x].innerHTML = `<div class="hit">&#9773</div>`;
  hit(y, x, arrOfShips);

  if(myonepalub.innerHTML + mytwopalub.innerHTML + mythreepalub.innerHTML+ myfourpalub.innerHTML == 0) 
  {
    wintitle.innerHTML="Я победил!"
  }
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
      if (y + 1 < 10) {tablica.rows[y + 1].cells[x].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x])};
      if (y - 1 >= 0) {tablica.rows[y - 1].cells[x].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x])};

      if (i == 1) {
        if (x - 1 >= 0) {tablica.rows[y].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x])};
        if (y - 1 >= 0 && x - 1 >= 0){
          tablica.rows[y - 1].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x])};
        if (y + 1 < 10 && x - 1 >= 0)
          {tablica.rows[y + 1].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x])};
      }
      if (i == palub) {
        if (x + 1 < 10){ tablica.rows[y].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x])};
        if (y - 1 >= 0 && x + 1 < 10)
          {tablica.rows[y - 1].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x])};
        if (y + 1 < 10 && x + 1 < 10)
          {tablica.rows[y + 1].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x])};
      }
    }
  } else {
    for (let i = 1; i <= palub; i++, y++) {
      if (tablica.rows[y].cells[x - 1])
      {tablica.rows[y].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x-1])};
      if (tablica.rows[y].cells[x + 1])
        {tablica.rows[y].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y,x+1])};

      if (i == 1) {
        if (y - 1 >= 0){ tablica.rows[y - 1].cells[x].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y-1,x])};
        if (y - 1 >= 0 && x - 1 >= 0)
          {tablica.rows[y - 1].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y-1,x-1])};
        if (y - 1 >= 0 && x + 1 < 10)
          {tablica.rows[y - 1].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y-1,x+1])};
      }
      if (i == palub) {
        if (y + 1 < 10) {tablica.rows[y + 1].cells[x].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y+1,x])};
        if (y + 1 < 10 && x - 1 >= 0)
          {tablica.rows[y + 1].cells[x - 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y+1,x-1])};
        if (y + 1 < 10 && x + 1 < 10)
          {tablica.rows[y + 1].cells[x + 1].innerHTML = `<div class="hit">&#9773</div>`; hits.push([y+1,x+1])};
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

let table3 = document.querySelectorAll("table")[0];
let randomB = document.querySelector(".random");
let manualB = document.querySelector(".manual");
let rotate = document.querySelector(".rotate");

randomB.addEventListener("click",()=>{
  clearTable(table);
  autoPlace();
})

rotate.addEventListener('click',()=>{
  clearTable(table3)
  arrOfTableShip.forEach(element => {
    if(element.selected)
    element.rotate();
    shipfortable(element.palub,element.y, element.x, element.r)
  });
  
})

function clearTable(tablica){
  if(tablica==table){
    for(let i=0;i<10;i++){
      for(let z=0;z<10;z++){
        tablica.rows[i].cells[z].classList.remove("ship","close")
      }
      
    }
  }
  else{
    for(let i=0;i<5;i++){
      for(let z=0;z<14;z++){
        tablica.rows[z].cells[i].classList.remove("ship","selected")
      }
      
    }
  }
}


function shipfortable(palub, y, x, r){

  let temp;
  arrOfTableShip.forEach(element => {
      if(element.selected){
        temp=true;
      }
      else{
        temp=false;
      }
  });
  if(temp){
    if (r >= 5) {
      //horizontal
  
      for (let i = 1; i <= palub; i++, x++) {
        table3.rows[y].cells[x].classList.add("selected");
      }
    } else {
      //vertical
  
      for (let i = 1; i <= palub; i++, y++) {
        table3.rows[y].cells[x].classList.add("selected");
  
        }
    }
  }
  else{
  if (r >= 5) {
    //horizontal

    for (let i = 1; i <= palub; i++, x++) {
      table3.rows[y].cells[x].classList.add("ship");
    }
  } else {
    //vertical

    for (let i = 1; i <= palub; i++, y++) {
      table3.rows[y].cells[x].classList.add("ship");

      }
  }
}
}
arrOfTableShip=[];
class ShipTable{
  constructor(palub, y, x, r){
    this.palub=palub;
    this.y=y;
    this.x=x;
    this.r=r;
  }
  rotate(){
    if(this.r >=5){
      this.r=3;
    }
    else{
      this.r=8;
    }
  }
}

shipfortable(4,1,1,3);
arrOfTableShip.push(new ShipTable(4,1,1,3));


let pick = table3.querySelectorAll("td");
pick.forEach((cell) => {
  cell.addEventListener(
    "click",
    () => {

      console.log(cell.parentNode.rowIndex, cell.cellIndex);
      take(cell.parentNode.rowIndex, cell.cellIndex)
    }
  );
});



function take(y, x) {
  arrOfTableShip.forEach((element) => {
    for (let i = 0; i < element.palub; i++) {
      let temp;
      if (element.r >= 5) {
        temp = element.x + i;
      } else {
        temp = element.y + i;
      }
      if (element.r >= 5) {
        if (temp == x && element.y == y) {
          console.log("yes,baby", element);

            for(let z=element.palub;z >= element.x; z--){
              table3.rows[y].cells[z].classList.add("selected");
              element.selected = true;
              }
          
        } 
      } else {
        if (element.x == x && temp == y) {
          console.log("yes,baby", element);
          for(let z=element.palub;z >= element.y; z--){
            table3.rows[z].cells[x].classList.add("selected");
            element.selected = true;
            }
        }
      }
    }
  });
}


let celo = table.querySelectorAll("td");
celo.forEach((cell) => {
  cell.addEventListener(
    "click",
    () => {

     
            arrOfTableShip.forEach((element) =>{
              
        if(element.selected==true){
          
          shipyard(element.palub, event.target.cellIndex, event.path[1].rowIndex, element.r, table)
         
          // console.log(event.path[1].rowIndex)
        }
      })

    },
    { once: true }
  );
});

// shipfortable(3,5,1,7);
// shipfortable(3,1,1,7);
// shipfortable(2,1,1,7);
// shipfortable(2,1,1,7);
// shipfortable(2,1,1,7);
// shipfortable(1,12,4,7);
// shipfortable(1,12,2,7);
// shipfortable(1,13,3,7);
// shipfortable(1,13,1,7);