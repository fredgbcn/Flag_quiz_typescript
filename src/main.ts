

fetch("https://restcountries.com/v3.1/all").then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function(datas) {
        startApplication(datas)
      });
    } else {
      console.log("Oops, nous n'avons pas du JSON!");
    }
  });

type Pays = {
  nom:string;
  drapeau: string;
}
type Datas = {
  name:{
    common:string;
    [props:string]:string;
  }
  flags:{
    svg:string;
    png:string;
  [props:string]: any;
  }
}
let listePays:Pays[] = [];
let randomPays:Pays;
let fourAnswers:string[];

function startApplication(datas:Datas[]){
  for(let unPays of datas){
    const pays:Pays = {
      nom: unPays.name.common,
      drapeau: unPays.flags.svg
    }
    listePays.push(pays);
  }
  randomPays =getOneCountry(listePays)
  const buttons = document.querySelector('#buttons')!;

  let goodAnswer = randomPays.nom;
  let firstBadAnswer = getOneCountry(listePays).nom;
  let secondBadAnswer= getOneCountry(listePays).nom;
  let thirdBadAnswer = getOneCountry(listePays).nom;


  
  let fourAnswers:string[] = [goodAnswer, firstBadAnswer, secondBadAnswer, thirdBadAnswer];
  console.log(fourAnswers)
  fourAnswers = sortArray(fourAnswers)
  console.log(fourAnswers)
/* buttons.innerHTML = `<button type ="button" class=${goodAnswer.nom}>${goodAnswer.nom}</button>
<button type ="button" class=${firstBadAnswer.nom}>${firstBadAnswer.nom}</button>
<button type ="button" class=${secondBadAnswer.nom}>${secondBadAnswer.nom}</button>
<button type ="button" class=${thirdBadAnswer.nom}>${thirdBadAnswer.nom}</button>` */

  document.querySelector("#flag")!.innerHTML =`<img src=${randomPays.drapeau} alt=${randomPays.nom}>`
}

function sortArray(array:any[]){
  let randomArray = array;
  for(var i = randomArray.length-1 ;  i>1 ; i--){
    var j = Math.floor(Math.random()* (i + 1));
    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]]; //swap
  }

  return randomArray;
} 
function getOneCountry(listePays:Pays[]){
  let randomNumber = Math.floor(Math.random() * listePays.length);
  return listePays[randomNumber];
}
