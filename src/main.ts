

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
  const buttons = document.querySelector('#buttons')! as HTMLDivElement;

  let goodAnswer = randomPays.nom;
  let firstBadAnswer = getOneCountry(listePays).nom;
  let secondBadAnswer= getOneCountry(listePays).nom;
  let thirdBadAnswer = getOneCountry(listePays).nom;


  
  let fourAnswers:string[] = [goodAnswer, firstBadAnswer, secondBadAnswer, thirdBadAnswer];

  fourAnswers = sortArray(fourAnswers)

buttons.innerHTML = generateButtons(fourAnswers); 

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
function generateButtons(array: string[]) : string{
  let buttonsHtml = "";
  for(let name of array){
    buttonsHtml += `<button id ="answers-buttons" type ="button" onClick ="checkResponse('${name}')" class=${name}>${name}</button>`
  }
  return buttonsHtml;
}
function checkResponse(response: string) : void{
  const skipDiv =   document.querySelector("#skip")! as HTMLDivElement;
  const resultDiv = document.querySelector('#result')! as HTMLDivElement;
if(response === randomPays.nom){
  resultDiv.innerHTML =`<p>That's it ! ${response} is the good answer</p>`;
  skipDiv.innerHTML = `<button  type ="button" onClick ="location.reload()">Skip</button>`;
}else{
  resultDiv.innerHTML =`<p>That's wrong ... ${response} is not the good answer</p>`;
  skipDiv.innerHTML = `<button type ="button" onClick ="location.reload()">Skip</button>`;
}
}