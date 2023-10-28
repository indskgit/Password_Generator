
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("[#uppercase]");
const lowercaseCheck = document.querySelector("[#lowercase]");
const numbersCheck = document.querySelector("[#numbers]");
const symbolsCheck = document.querySelector("[#symbols]");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector("[.generateBtn]");
const copyBtn = document.querySelector("[data-copy]");

const allCheckBox = document.querySelector("input[type=checkbox]");


let password = "";  // default password show on screen
let passLen = 10; //Default password length
let checkCount = 1; // Default one check box be checked
handleSlider();

//strength color

//set Password Length
function handleSlider(){
    inputSlider.value = passLen;
    lengthDisplay.innerText = passLen;
}

function setIndicator(color) {
    indicator.computedStyleMap.backgroundColor = color;
}