const startTime = Date.now();
const entries = 1000000;

const fs = require("fs");
const dataProducts = fs.readFileSync('./src/products.json', { encoding: "utf8" });
const products = JSON.parse(dataProducts); 

const dataBuyers = fs.readFileSync('./src/buyers.json', { encoding: "utf8" });
const buyers = JSON.parse(dataBuyers); 

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

function  genRandomTime() {
    let hours = getRandomInt(24);
    if(hours < 10) hours = "0" + hours;
    let mins = getRandomInt(59);
    if(mins < 10) mins = "0" + mins;
    let seconds =  getRandomInt(59);
    if(seconds < 10) seconds = "0" + seconds;
    return hours + ":" + mins + ":" + seconds;
}

function msecToString(ml) {
    let seconds = Math.round(ml / 1000);
    let mins = Math.round(ml / 60000);
    let hours = Math.floor(mins / 60);
    mins %= 60;
    if (mins < 10) mins = '0' + mins;
    return hours + ':' + mins + ":" + seconds + ":" + ml;
}

let text = "time,date,product,purchase price,sale price,buyer id,buyer name,membership level,check number\n";

let itemsInCart = getRandomInt(20);
let curBuyer = buyers[getRandomInt(10)];
let checkNum;
for(i = 0; i < entries; i++){
    if(i % itemsInCart == 0){
        check = getRandomInt(20);
        curBuyer = buyers[getRandomInt(10)];
        checkNum = entries - check;
    } 
    let x = getRandomInt(products.length);
    let xTime = genRandomTime();
    let xDate = genRandomDate();
    let product = products[x].name;
    let purchasePrice = (products[x].price / 100 * getRandomInt(20)).toFixed(2);
    let salePrice = products[x].price;
    let buyerId = curBuyer.id;
    let buyer = curBuyer.name;
    let membershipLevel = curBuyer.membership_level;
    text += xTime + "," + xDate + "," + product + "," + purchasePrice + ","+ salePrice + "," + buyerId + 
            "," + buyer + "," + membershipLevel + "," + checkNum +"\n";
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