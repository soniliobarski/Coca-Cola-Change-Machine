//Imports all the necessary data from the main files
import {testMode , NO_CHANGE , STOCK_NUMBER , Reset ,change , countMoney ,cocaColaCan ,massageScreen ,currencyInput} from './coca-cola.js';
document.addEventListener ("DOMContentLoaded" , function() {
    if(testMode) {
        let curenncyTestNum4 = [
            [1,5],    
            [5,0],    
            [10,0],    
            [20,0],    
        ];      
        let curenncyTestNum5 = [
            [1,0],    
            [5,0],    
            [10,0],    
            [20,2],    
        ];        
        let curenncyTestNum6 = [
            [1,6],    
            [5,0],    
            [10,4],    
            [20,0],    
        ];        
        let curenncyTestNum7 = [
            [1,4],    
            [5,0],    
            [10,0],    
            [20,0],    
        ];
        //the exact amount of money
        testChange(curenncyTestNum4 , 0 , "visible" , " " ,4);
        //too much money- without change
        testChange(curenncyTestNum5 , 0 , "hidden" , NO_CHANGE , 5);
        //too much money- with change
        testChange(curenncyTestNum6 , 41 , "visible" , " " , 6);
        //not enough money
        testChange(curenncyTestNum7 , 0 , "hidden" , "add " + (1) + " shekels more and press the buy button again" , 7);
    }
});

//Executes the test and checks the program
function testChange (moneyArray , expextedChange , expextedejection , expectedCaption , testNum) {
    insertTest(moneyArray);
    let isPass = true;
    let outPut = " ";
    //check test number five for emptying the change stock
    if(testNum == 5) {
        Reset(0);
    } else {
        Reset(STOCK_NUMBER);
    }
    let resultChange = change(countMoney(currencyInput));
    let moneyInput = 0;
    for (let i = 0; i < resultChange.length; i++) {
        //add to count the total money from the specific currency
        moneyInput += (resultChange[i][1]) * resultChange[i][0];
    }
    //test the change amount
    if (moneyInput != expextedChange) {
        isPass = false;
        outPut += "The change amount wrong:" + moneyInput;
    } 
    //test the coca cola can edejection
    if (cocaColaCan.style.visibility != expextedejection) {
        isPass = false;
        outPut += "The cola drink wasn't ejected" + resultChange;
    }
    //test the caption on the screen
    if (massageScreen.textContent != expectedCaption) {
        isPass = false;
        outPut += "Wrong caption on the screen";
    }
    //shows the tests result
    if (isPass) { 
        alert("Test " + testNum + " are pass" );
    } else {
        alert("Test " + testNum + " are fail the resone - " + outPut );
    }
}

// Insert the money into the text fields for the test execution
function insertTest (curenncyTest) {
    for (let i = 0; i < currencyInput.length; i++) {
        currencyInput[i].value = Number(curenncyTest[i][1]);
    }
}