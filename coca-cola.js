const COLA_PRICE = 5;
export const STOCK_NUMBER = 10;
export const NO_CHANGE = "We are sorry there is no change, please enter another payment instrument";
const CHANGE_STOCK = [
    [1,0],    
    [5,0],    
    [10,0],    
    [20,0],    
];
export let testMode = false;
export let cocaColaCan;
export let massageScreen;
export let currencyInput;

document.addEventListener ("DOMContentLoaded" , function() {
    Reset(STOCK_NUMBER);
    //check if the program is in test moode
    if(!testMode) {
         //Add Event Listener to the buy button
        document.getElementById("buy-btn").addEventListener("click" , function() {
        massageScreen.textContent = " ";
        //count the money
        let totalMoney = countMoney(currencyInput);
        //send change to the user
        outputChange(change(totalMoney));
    });
   
    }
   
});

// Reset the change stock
export function Reset (stockNumber) {
    //Reset the change stock
    for (let i = 0; i < CHANGE_STOCK.length; i++) {
        CHANGE_STOCK[i][1] = stockNumber;
    }
    //Reset the elemnts
    cocaColaCan = document.getElementById("cola-can-img");
    massageScreen = document.getElementById("massage-screen-div");
    currencyInput = document.getElementsByClassName("input");
    cocaColaCan.style.visibility = "hidden";
}

// Count the money according to the currencies input and update the stock change
export function countMoney (currencyArray) {
    let moneyInput = 0;
    let inputContent;
    for (let i = 0; i < CHANGE_STOCK.length; i++) {
        //gets the amount of every currency 
        inputContent = currencyArray[i].value;
        //add to count the total money from the specific currency
        moneyInput += (inputContent) * CHANGE_STOCK[i][0];
        //add the money to the change stock
        CHANGE_STOCK[i][1] += Number(inputContent);
    }
    return moneyInput;
}

// Calculates and then returns the change to the user considering the change stock
export function change (moneyUser) {
    let changeReturn = [
        [1,0],    
        [5,0],    
        [10,0],    
        [20,0],    
    ];
    //Checking that the user has put in enough money
    if (moneyUser < COLA_PRICE) {
        massageScreen.textContent = "add " + (COLA_PRICE - moneyUser) + " shekels more and press the buy button again";
    } else {     
        let moneyChange = moneyUser - COLA_PRICE;
        //calculate the change and updte the change stock
        for (let i = CHANGE_STOCK.length - 1; i >= 0; i--) {
            let changeCurrency = CHANGE_STOCK[i][0];
            let numCurrency = Math.floor(moneyChange / changeCurrency);
            //check if currency is available
            if (numCurrency > 0) {
                if (CHANGE_STOCK[i][1] >= numCurrency) {
                    moneyChange -= (changeCurrency * numCurrency);
                    changeReturn[i][1] += numCurrency;
                }
            }
        }
        //check that the change calculation complete
        if (moneyChange > 0) {
            massageScreen.textContent = NO_CHANGE;
            changeReturn = [
                [1,0],    
                [5,0],    
                [10,0],    
                [20,0],    
            ];
        } else {
            cocaColaCan.style.visibility = "visible";
            massageScreen.textContent = " ";
        }
    }
    return changeReturn;
}
// Returns the change to the user
function outputChange (changeToReturn) {
    for (let i = 0; i < changeToReturn.length; i++) {
        massageScreen.textContent += " " + changeToReturn[i][1] + "-" + changeToReturn[i][0] + "shekels";
    }
}





