const startTime = Date.now();
const entries = 1000000;

const fs = require("fs");
const data = fs.readFileSync('./src/products.json', { encoding: "utf8" });
const products = JSON.parse(data); 

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function  genRandomDate() {
    let date = getRandomInt(28);
    if(date < 10) date = "0" + date;
    let month = getRandomInt(12);
    if(month < 10) month = "0" + month;
    let year = 2000 + getRandomInt(25);
    return date + ":" + month + ":" + year;
}

function msecToString(ml) {
    let seconds = Math.round(ml / 1000);
    let mins = Math.round(ml / 60000);
    let hours = Math.floor(mins / 60);
    mins %= 60;
    if (mins < 10)
      mins = '0' + mins;
    return hours + ':' + mins + ":" + seconds + ":" + ml;
}

let text = "date,name,price\n";

for(i = 0; i < entries; i++){
    const x = getRandomInt(products.length);
    text += genRandomDate() + "," + products[x].name + "," + products[x].price + "\n";
}
     
fs.writeFile("products.csv", text, function(error){
    if(error){  // если ошибка
        return console.log(error);
    }
    console.log("Файл успешно записан");
});

const endTime = Date.now();
const ml = endTime - startTime;

console.log('\x1b[33m%s\x1b[0m', "Код создал файл .csv c " + entries + " записями за следующее время: " + msecToString(ml));