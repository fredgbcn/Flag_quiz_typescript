"use strict";
fetch("https://restcountries.com/v3.1/all").then(function (response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function (datas) {
            startApplication(datas);
            console.log(datas);
        });
    }
    else {
        console.log("Oops, nous n'avons pas du JSON!");
    }
});
let listePays = [];
let randomPays;
function startApplication(datas) {
    for (let unPays of datas) {
        const pays = {
            nom: unPays.name.common,
            drapeau: unPays.flags.svg
        };
        listePays.push(pays);
    }
    for (let i = 0; i < 3; i++) {
        randomPays = getOneCountry(listePays);
        console.log(randomPays);
    }
    /*  randomPays = getOneCountry(listePays); */
    console.log(randomPays);
    document.querySelector("#flag").innerHTML = `<img src=${randomPays.drapeau} alt=${randomPays.nom}>`;
}
function getOneCountry(listePays) {
    let randomNumber = Math.floor(Math.random() * listePays.length);
    return listePays[randomNumber];
}
//# sourceMappingURL=main.js.map