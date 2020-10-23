function tableCreate(){
  let body = document.body,
      tbl  = document.createElement('table');
 

  for(let i = 0; i < 10; i++){
      let tr = tbl.insertRow();
      for(let j = 0; j < 10; j++){
          
              let td = tr.insertCell();
              // td.append(document.createTextNode('Cell'));

            
      }
  }
  body.append(tbl);
}
tableCreate();

let table = document.querySelector('table');
// console.log(table.rows[4].cells[4])



// table.rows[4].cells[4].classList.add('test')

function getRandomInt(max=10) {
  return Math.floor(Math.random() * max);
}

// console.log(getRandomInt(100));
//shipyard();
// function shipyard(palub=4){
//   let x=getRandomInt(),
//       y=getRandomInt();

//       console.log(table.rows[y].cells[x])
//   let z;
      
      
//       if(getRandomInt() >= 5){       //vertical
//         if((y + palub) >= 10) { shipyard()}
//         for(let i=1, z=y; i <= palub; i++, z++){
//           if(table.rows[z].cells[x].classList.contains('test')) { 
//             console.log('has cells');
//             shipyard(); 
//             break
//           }
//         }

//         for(let i=1; i <= palub; i++,y++){
          
//           // if(table.rows[y].cells[x].classList.contains('test')) { shipyard(); break}
//             table.rows[y].cells[x].classList.add('test')
//         }
//         return
//       }
//       else{       //or horizontal
//         if((x + palub) >= 10) { shipyard()}
//         for(let i=1, z=x; i <= palub; i++, z++){
//           if(table.rows[y].cells[z].classList.contains('test')) { 
//             console.log('has cells');
//             shipyard(); 
//             break
//           }
//         }
//         for(let i=1; i <= palub; i++,x++){
          
//           // if(table.rows[y].cells[x].classList.contains('test')) { shipyard(); break}
//           table.rows[y].cells[x].classList.add('test')
//         }
//         return
//       }  
//     return
// }


function shipyard(palub = 4, zh, zb){

  // let x=getRandomInt(),
  //     y=getRandomInt(),
  //     z;

    let x=zh,
        y=zb;

       console.log(x,y)

      if(getRandomInt() >= 5){

        for(let i=0;i < palub; i++){
          if((x+palub) >= 10 || table.rows[y].cells[x+i].classList.contains('test')) { 
            
            return console.log('no');
          }
        }



      for(let i=1; i <= palub; i++,x++){

          table.rows[y].cells[x].classList.add('test')

         if(table.rows[y+1].cells[x]) table.rows[y+1].cells[x].classList.add('close');
         if(table.rows[y-1].cells[x]) table.rows[y-1].cells[x].classList.add('close');
  
          if(i==1){
         if(table.rows[y].cells[x-1]) table.rows[y].cells[x-1].classList.add('close');        
         if(table.rows[y-1].cells[x-1]) table.rows[y-1].cells[x-1].classList.add('close');
         if(table.rows[y+1].cells[x-1]) table.rows[y+1].cells[x-1].classList.add('close');
        }
          if(i==palub){
         if(table.rows[y].cells[x+1]) table.rows[y].cells[x+1].classList.add('close'); 
         if(table.rows[y-1].cells[x+1]) table.rows[y-1].cells[x+1].classList.add('close');
         if(table.rows[y+1].cells[x+1]) table.rows[y+1].cells[x+1].classList.add('close');
          }
      }
    }
    else{

      for(let i=1;i <= palub; i++){
        if((y+palub) >= 10 || table.rows[y+i].cells[x].classList.contains('test')) { 
          return console.log('no');
        }
      }

      for(let i=1; i <= palub; i++,y++){

        table.rows[y].cells[x].classList.add('test');

        if(table.rows[y].cells[x-1]) table.rows[y].cells[x-1].classList.add('close');
       if(table.rows[y].cells[x+1]) table.rows[y].cells[x+1].classList.add('close');

        if(i==1){
       if(table.rows[y-1].cells[x]) table.rows[y-1].cells[x].classList.add('close');        
       if(table.rows[y-1].cells[x-1]) table.rows[y-1].cells[x-1].classList.add('close');
       if(table.rows[y-1].cells[x+1]) table.rows[y-1].cells[x+1].classList.add('close');
      }
        if(i==palub){
       if(table.rows[y+1].cells[x]) table.rows[y+1].cells[x].classList.add('close'); 
       if(table.rows[y+1].cells[x-1]) table.rows[y+1].cells[x-1].classList.add('close');
       if(table.rows[y+1].cells[x+1]) table.rows[y+1].cells[x+1].classList.add('close');
        }
    }
    }

}

for(let i=0, b=0;i<4;i++, b++){
  // console.log('i-',i,'b-',b);
  // shipyard(4, getRandomInt(), getRandomInt());
}
shipyard(4,6,4)

shipyard(4,0,4)