"use strict";
fetch("https://restcountries.com/v3.1/all").then(function (response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function (datas) {
            startApplication(datas);
        });
    }
    else {
        console.log("Oops, nous n'avons pas du JSON!");
    }
});
let listePays = [];
let randomPays;
let fourAnswers;
function startApplication(datas) {
    for (let unPays of datas) {
        const pays = {
            nom: unPays.name.common,
            drapeau: unPays.flags.svg
        };
        listePays.push(pays);
    }
    randomPays = getOneCountry(listePays);
    const buttons = document.querySelector('#buttons');
    let goodAnswer = randomPays.nom;
    let firstBadAnswer = getOneCountry(listePays).nom;
    let secondBadAnswer = getOneCountry(listePays).nom;
    let thirdBadAnswer = getOneCountry(listePays).nom;
    let fourAnswers = [goodAnswer, firstBadAnswer, secondBadAnswer, thirdBadAnswer];
    fourAnswers = sortArray(fourAnswers);
    buttons.innerHTML = generateButtons(fourAnswers);
    document.querySelector("#flag").innerHTML = `<img src=${randomPays.drapeau} alt=${randomPays.nom}>`;
}
function sortArray(array) {
    let randomArray = array;
    for (var i = randomArray.length - 1; i > 1; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]]; //swap
    }
    return randomArray;
}
function getOneCountry(listePays) {
    let randomNumber = Math.floor(Math.random() * listePays.length);
    return listePays[randomNumber];
}
function generateButtons(array) {
    let buttonsHtml = "";
    for (let name of array) {
        buttonsHtml += `<button type ="button" onClick ="checkResponse('${name}')" class=${name}>${name}</button>`;
    }
    return buttonsHtml;
}
function checkResponse(response) {
    const resultDiv = document.querySelector('#result');
    if (response === randomPays.nom) {
        resultDiv.innerHTML = `<div>Excellent ! ${response} is the good answer`;
    }
    else {
        resultDiv.innerHTML = `<div>That's wrong ... ${response} is not the good answer`;
    }
}
//# sourceMappingURL=main.js.map