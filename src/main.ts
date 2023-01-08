

fetch("https://restcountries.com/v3.1/all").then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function(datas) {
        startApplication(datas)
        console.log(datas)
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

function startApplication(datas:Datas[]){
  for(let unPays of datas){
    const pays:Pays = {
      nom: unPays.name.common,
      drapeau: unPays.flags.svg
    }
    listePays.push(pays);
  }
  randomPays = getOneCountry(listePays);
  console.log(randomPays)
  document.querySelector("#flag")!.innerHTML =`<img src=${randomPays.drapeau}>`
}
function getOneCountry(listePays:Pays[]){
  let randomNumber = Math.floor(Math.random() * listePays.length);
  return listePays[randomNumber];
}
