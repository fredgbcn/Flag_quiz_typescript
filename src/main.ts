
type Pays={
    nom: string;
    flag:string;
}
let Pays:Pays[] = [];
let unPays:Pays,{} = {};

fetch("https://restcountries.com/v3.1/all").then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function(json) {
        startApplication(json)
      });
    } else {
      console.log("Oops, nous n'avons pas du JSON!");
    }
  });
  
function startApplication(e){
    Pays = [e]
    console.log(Pays)
}


var rand = Math.random()*Pays.length | 0;
let chosenCountry = Pays[rand];  

