function tableCreate() {
  let body = document.body,
    tbl = document.createElement('table');


  for (let i = 0; i < 10; i++) {
    let tr = tbl.insertRow();
    for (let j = 0; j < 10; j++) {

      let td = tr.insertCell();


    }
  }
  body.append(tbl);
}
tableCreate();

let table = document.querySelector('table');
// console.log(table.rows[4].cells[4])



// table.rows[4].cells[4].classList.add('test')

function getRandomInt(max = 10) {
  return Math.floor(Math.random() * max);
}


function shipyard(palub = 4, zh, zb ) {

  let x = zh,
    y = zb;

  console.log('palub -',palub, "y -",y+1, "x- ", x+1)

  if (getRandomInt() >= 5) {

    for (let i = 0; i < palub; i++) {
      if ((x + palub) > 10 || !table.rows[y].cells[x + i] 
      || table.rows[y].cells[x + i].classList.contains('test') 
      || table.rows[y].cells[x + i].classList.contains('close')
       ) {

        return console.log('no');
      }
    }

    for (let i = 1; i <= palub; i++, x++) {

      table.rows[y].cells[x].classList.add('test');

      if (y + 1 < 10) table.rows[y + 1].cells[x].classList.add('close');
      if (y - 1 >= 0) table.rows[y - 1].cells[x].classList.add('close');

      if (i == 1) {
        if (x - 1 >= 0) table.rows[y].cells[x - 1].classList.add('close');
        if (y - 1 >= 0 && x - 1 >= 0) table.rows[y - 1].cells[x - 1].classList.add('close');
        if (y + 1 <10 && x - 1 >= 0) table.rows[y + 1].cells[x - 1].classList.add('close');
      }
      if (i == palub) {
        if (x + 1 < 10) table.rows[y].cells[x + 1].classList.add('close');
        if (y - 1 >= 0 && x + 1 <10) table.rows[y - 1].cells[x + 1].classList.add('close');
        if (y + 1 <10 && x + 1 <10) table.rows[y + 1].cells[x + 1].classList.add('close');
      }
    }
  } else {

    for (let i = 0; i < palub; i++) {
      if ((y + palub) > 10 || !table.rows[y + i].cells[x] 
      || table.rows[y + i].cells[x].classList.contains('test') 
      || table.rows[y + i].cells[x].classList.contains('close')
       ) {

        return console.log('no');
      }
    }

    for (let i = 1; i <= palub; i++, y++) {

      table.rows[y].cells[x].classList.add('test');

      if (table.rows[y].cells[x - 1]) table.rows[y].cells[x - 1].classList.add('close');
      if (table.rows[y].cells[x + 1]) table.rows[y].cells[x + 1].classList.add('close');

      if (i == 1) {
        if (y - 1 >= 0) table.rows[y - 1].cells[x].classList.add('close');
        if (y - 1 >= 0 && x - 1 >= 0) table.rows[y - 1].cells[x - 1].classList.add('close');
        if (y - 1 >= 0 && x + 1 < 10) table.rows[y - 1].cells[x + 1].classList.add('close');
      }
      if (i == palub) {
        if (y + 1 <10) table.rows[y + 1].cells[x].classList.add('close');
        if (y + 1 <10 && x - 1 >=0) table.rows[y + 1].cells[x - 1].classList.add('close');
        if (y + 1 <10 && x + 1 <10) table.rows[y + 1].cells[x + 1].classList.add('close');
      }
    }
  }
  return true
}

  while(!shipyard(4, getRandomInt(), getRandomInt()));
  for(let i=1; i<=2; i++){
    while(!shipyard(3, getRandomInt(), getRandomInt()));
  }
  for(let i=1; i<=3; i++){
    while(!shipyard(2, getRandomInt(), getRandomInt()));
  }
  for(let i=1; i<=4; i++){
    while(!shipyard(1, getRandomInt(), getRandomInt()));
  }


  let cels = document.querySelectorAll('td');
  cels.forEach(cell => {
    cell.addEventListener('click',(e)=>{
    console.log(e);
    cell.innerHTML=`<div class="hit">&#9773</div>`;
    
    })
  });
  

  