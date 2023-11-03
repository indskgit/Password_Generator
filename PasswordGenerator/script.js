
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const copyBtn = document.querySelector("[data-copy]");

const allCheckBox = document.querySelector("input[type=checkbox]");

const symbols = '`!@#$%^&*<>:;.,/(){}[]|+-_~?';


let password = " ";  // default password show on screen
let passLen = 10; //Default password length
let checkCount = 1; // Default one check box be checked

handleSlider();

//strength color

//set Password Length
function handleSlider(){
    inputSlider.value = passLen;
    lengthDisplay.innerText = passLen;
}

//Change Indicator Color
function setIndicator(color) {
    indicator.style.backgroundColor = color;
}

//Get Random Numbers For Password between range
function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

//Checking The Password Strength and set color according
function calcStrength() {
    let hasUpper = false; // unchecked at first
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passLen >=8 ){
        setIndicator("#0f0")
    }else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) && passLen >= 6
    ){
        setIndicator("#ff0");
    }else setIndicator("#f00");
}
