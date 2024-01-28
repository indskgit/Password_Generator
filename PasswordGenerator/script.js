
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
        setIndicator("#0f0");
    }
    else if((hasLower || hasUpper) &&(hasNum || hasSym) && passLen >= 6){
        setIndicator("#ff0");
    }
    else setIndicator("#f00");
}

//copy the msg to ClipBoard
async function copyContent() {
   try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
   } catch (e) {
    copyMsg.innerText = "failed";
   }

   //to make copy wala span visible
   copyMsg.classList.add("active");

   setTimeout(() => {
    copyMsg.classList.remove("active");
   }, 2000);
};

function shufflePassword(array){
    //fisher Yates method
    for(let i = array.length-1; i >0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) =>(str+= el));
    return str;
};

// function handleCheckBoxChange() { // mine Code
//     checkCount = 0;
//     allCheckBox.forEach((checkbox) => {
//         if(checkbox.checked) checkCount++;
//     })

//     //case where passlen < checkedCount
//     if (passLen < checkCount) {
//         passLen = checkCount;
//         handleSlider();
//     }
// };

function handleCheckBoxChange() {  // AI generated
    let checkCount = 0;
    const allCheckBox = Array.from(document.querySelectorAll('input[type="checkbox"]'));

    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;
    });

    if (passLen < checkCount) {
        passLen = checkCount;
        handleSlider();
    }
};

// allCheckBox.forEach((checkbox)=>{
//     checkbox.addEventListener('change', handleCheckBoxChange);
// });

const checkBoxArray = Array.from(allCheckBox);

checkBoxArray.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

//Adding EventListner to slider so as slider moves the display length will also update/change

inputSlider.addEventListener('input', (e) =>{
    passLen = e.target.value;
    handleSlider();
});

//Adding EventListner to copyBtn

copyBtn.addEventListener('click', () =>{
        if (passwordDisplay.value)
         //when display not null or not empty
            copyContent();
});

//Adding EventListner to Generate Password Button
generateBtn.addEventListener('click', ()=>{
    // none of checkbox selected
    if(checkCount ==0) return;
    if(passLen < checkCount){
        passLen = checkCount;
        handleSlider();
    }

    //generate new password
    //remove old password
    password = "";

    //AS checkboxes checked
    /* if(uppercaseCheck.checked){
        password+= generateUpperCase();
    }

    if(lowercaseCheck.checked){
        password+= generateLowerCase();
    }

    if(numbersCheck.checked){
        password+= generateRandomNumber();
    }

    if(symbolsCheck.checked){
        password+= generateSymbol();
    }
    */

    let funArr = []; //created Empty Appray to Store Functions

    if(uppercaseCheck.checked){
        funArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
        funArr.push(generateLowerCase);
    }

    if(numbersCheck.checked){
        funArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked){
        funArr.push(generateSymbol);
    }

    //Now adding these above to function
    for (let i = 0; i < funArr.length; i++) {
         password+= funArr[i]();
    }

    // Other i.e Remaining Passwords means let password length is 10 and checke boxes checke = 4 then from first for loop it will add checkedOne function to funArray then randomly generate remaining i.e [10 - 4] = 6

    for (let i = 0; i < (passLen - funArr.length); i++) {
        let rndIndex = getRndInteger(0, funArr.length);
        password+= funArr[rndIndex]();
    }

    //shuffle the password
    password = shufflePassword(Array.from(password));

    // update UI
    passwordDisplay.value = password;
    //show strength
    calcStrength();
});
