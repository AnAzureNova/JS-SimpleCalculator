let out = "";
let reg = [];
reg[0] = ""; reg[1] = "";
let numberIndex = 0;
let charReg = "";
let isFirstIndexFull = false;
let isSecondIndexFull = false;
let hasFailed = false;
let isCalculationDone = false;

let nullCounter = 0;

const out0 = document.getElementById("out0");
const outC = document.getElementById("outC");
const out1 = document.getElementById("out1");
const errOut = document.getElementById("errOut");
const outputField = document.getElementsByClassName("outputField")[0];
const nullPad = document.getElementById("null");


function errorHandler(errorIndex){
    switch(errorIndex){
        case 0: alert("ERROR 0 : Unknown error");break;
        case 1: errOut.innerHTML="Syntax Error"; out0.innerHTML="";  outC.innerHTML="";  out1.innerHTML=""; break;
        case 2: errOut.innerHTML="Cannot Divide by 0";  out0.innerHTML="";  outC.innerHTML="";  out1.innerHTML=""; nullCounter++; break;
        case 3: errOut.innerHTML="No Answer in Registry";  out0.innerHTML="";  outC.innerHTML="";  out1.innerHTML=""; break;
        case '?': out0.innerHTML="";  outC.innerHTML="";  out1.innerHTML=""; alert("ERROR ? : stop"); nullCounter=0; break;
    }
    consoleLog();
}
function consoleLog(){
    console.log(`---\n${reg[0]} ${charReg} ${reg[1]}\nisReg1Full: ${isFirstIndexFull}\nisReg2Full: ${isSecondIndexFull}\nisFinished: ${isCalculationDone}\nIndex: ${numberIndex}\nOUT-REG: ${out}\n---`);
}
function erase(){
    numberIndex=0;
    reg[0] = "";
    reg[1] = "";
    out = "";
    charReg = "";
    errOut.innerHTML=""; 
    isFirstIndexFull = false;
    isSecondIndexFull = false;
    isCalculationDone = false;
    hasFailed = false;
    out0.innerHTML = ""; outC.innerHTML = ""; out1.innerHTML = "";
    consoleLog();
}
function input(inputValue){
    if(isCalculationDone){
        reg[0] = "";
        numberIndex=0;
        isCalculationDone = false;
    }
    if(numberIndex==0){
        if (inputValue == 'answer'){
            if (out == ""){
                errorHandler(3);
                hasFailed = true;
                setTimeout(() => {
                    erase();
                }, 1000);
            }
            charReg = "";
            outC.innerHTML=charReg;
            reg[0] = out;
            out0.innerHTML=reg[0];
        }
        else{
            reg[0] = String(reg[0]) + String(inputValue);
            out0.innerHTML=reg[0];
        }
        isFirstIndexFull = true;
        isCalculationDone = false;
    } 
    else{
        if (nullCounter>=2){
            errorHandler('?');
            nullPad.style.scale="0%";
            erase();
        }
        if (inputValue == 'answer'){
            if (out == ""){
                errorHandler(3);
                hasFailed = true;
                setTimeout(() => {
                    erase();
                }, 1000);
            }
            reg[1] = out;
            out1.innerHTML=reg[1];
        }
        else{
            reg[1] = String(reg[1]) + String(inputValue);
            if(charReg === '^'){
                outC.innerHTML=`<sup>${reg[1]}</sup>`;
            }
            else{
                out1.innerHTML=reg[1];
            }
        }
        isSecondIndexFull = true;
        isCalculationDone = false;
    } 
    consoleLog();
}
function operant(character){
    if (isSecondIndexFull) {
        calc();
    }
    isCalculationDone = false;
    charReg = character;
    outC.innerHTML=charReg;
    consoleLog();
    if (isFirstIndexFull) numberIndex = 1;
}
function calc(){
    reg[0]  = Number(reg[0]);
    reg[1]  = Number(reg[1]);
    switch(charReg){
        case "+": out = reg[0] + reg[1]; break;
        case "-": out = reg[0] - reg[1]; break;
        case "*": out = reg[0] * reg[1]; break;
        case "^": out = Math.pow(reg[0],reg[1]); break;
        case "/": 
        if (reg[1]==0){
            errorHandler(2);
            hasFailed = true;
            setTimeout(() => {
                erase();
            }, 1000);
        }
        else out = reg[0] / reg[1]; break;
        default: out = reg[0]; break;
    }
    if (!isFirstIndexFull) {
        errorHandler(1);
        hasFailed = true;
        setTimeout(() => {
            erase();
        }, 1000);
    }
    else if(numberIndex == 1 && !isSecondIndexFull){
        errorHandler(1);
        hasFailed = true;
        setTimeout(() => {
            erase();
        }, 1000);
    }
    if (!hasFailed){
        out0.innerHTML=out;
        outC.innerHTML="";
        out1.innerHTML="";
        reg[0] = out;
        reg[1] = "";
        reg[0]  = String(reg[0]);
        reg[1]  = String(reg[1]);
        isSecondIndexFull = false;
        isCalculationDone = true;

        outputField.style.backgroundColor = "#353535ff";
        console.log(out);
        consoleLog();

        setTimeout(() => {
            outputField.style.backgroundColor = "#202020";
        }, 300);
    }
}

consoleLog();