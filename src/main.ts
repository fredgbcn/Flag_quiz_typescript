

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
let threeWrongCountries:Pays[] = [];

function startApplication(datas:Datas[]){
  for(let unPays of datas){
    const pays:Pays = {
      nom: unPays.name.common,
      drapeau: unPays.flags.svg
    }
    listePays.push(pays);
  }
  for(let i = 0; i<=3; i++){
    randomPays = getOneCountry(listePays);
    threeWrongCountries.push(randomPays);
  }
   
  const buttons = document.querySelector('#buttons')!;
  let firstCountry = threeWrongCountries[0];
  let secondCountry = threeWrongCountries[1];
  let thirdCountry= threeWrongCountries[2];
  let fourthCountry = threeWrongCountries[3];
buttons.innerHTML = `<button type ="button" class=${firstCountry.nom}>${firstCountry.nom}</button>
<button type ="button" class=${secondCountry.nom}>${secondCountry.nom}</button>
<button type ="button" class=${thirdCountry.nom}>${thirdCountry.nom}</button>
<button type ="button" class=${fourthCountry.nom}>${fourthCountry.nom}</button>
`


  
  /* threeWrongCountries.forEach(function(e){document.querySelector('#buttons')!.innerHTML = "HEY"}) */
 /*  randomPays = getOneCountry(listePays); */
  document.querySelector("#flag")!.innerHTML =`<img src=${randomPays.drapeau} alt=${randomPays.nom}>`
}
function getOneCountry(listePays:Pays[]){
  let randomNumber = Math.floor(Math.random() * listePays.length);
  return listePays[randomNumber];
}
