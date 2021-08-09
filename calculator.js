//1st step - caching the dom
const display1 = document.querySelector('.dis-1');
const display2 = document.querySelector('.dis-2');
const tempResult = document.querySelector('.temp-res');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll ('.operation');
const equal = document.querySelector('.equal');
const allClear = document.querySelector('.all-clear');
const dele = document.querySelector('.delete');


//2nd step - I want to work first on adding an EventListener to the number if clicked.
let dis_1 = '';
let dis_2 = '';
let res = null;
let prevOperation = '';
let haveDot = false;

numbers.forEach( num => {
    num.addEventListener('click', (e) => {
        //this check if there is still no dot. you can use 1. but if you already use dot. you cant use it again.
        if(e.target.innerText === '.' && !haveDot){
            haveDot= true;
        }
        else if (e.target.innerText === '.' && havedot) {
            return;
        }
        //as you click a number, it adds the previous number. not mathematically because it is in string.
        dis_2 += e.target.innerText;
        display2.innerHTML = dis_2;

    })
});

//2nd step - adding an eventListener to the operation. the operation must not be add if there is no number before it.
operations.forEach ( op => {
    op.addEventListener('click', (e)=> {
        //this check if there's a number before the operation
        if (!dis_2) return;
        haveDot= false; //if there's a number. then we must again allow to use the dot.
        const opName = e.target.innerText;
        if (dis_2 && dis_1 && prevOperation){       //lets check if display_1 is present we can do the computation of the previous operation. if not lets just first make a display_1
            computation();
        }
        else {
            res = parseFloat(dis_2);       //we use this so that we can display it on tempResult element where we access it for the computation of integers and not string.
        }
        clearVar(opName);                   //this function will display the dis_1 element and tempResult element.
        prevOperation = opName;             //and now we update our last operation for computation of the previous operation.
    })
});

function clearVar(name=''){                 //we use this syntax because the scenario is successive. in line 84 we dont need any parameters because we dont need the value of operation. if we not use this syntax after line 84 the output display will have "undefine" beside it.
    dis_1 += dis_2 + ' ' +name+ ' ';        
    display1.innerHTML = dis_1;             //here. in display1 it will show the number you click and the operation.
    dis_2= '';                          
    display2.innerHTML=''                   //after clicking the operation. it will automatically clear the display 2 inorder to display the number you want to apply the operation.
    tempResult.innerHTML=res;               //and here after it clear the display2. a temporary result will be display on tempResult Element.
}

//3rd step. since we have already a display on element dis_1 therefore we can now make a computation for the previous operation used. 
function computation() {                //this computation is only temporary if we want to successively continue to input numbers. and not by clicking the equal symbol
    if (prevOperation === 'X'){
        res = res * parseFloat(dis_2);      //in my reference he uses -> res = parseFloat(res) * parseFloat(dis_2). I realized the the value of element 'res' is already parsefloated.
    }                                       //if encountered any problem. try to check by changing the code like above this.
    else if (prevOperation === '+'){
        res = res + parseFloat(dis_2);
    }
    else if (prevOperation === '-'){
        res = res - parseFloat(dis_2);
    }
    else if (prevOperation === '/'){
        res = res / parseFloat(dis_2);
    }
    else if (prevOperation === '%'){
        res = res % parseFloat(dis_2);
    }
}

//4th step. now i want to add an evenListener on equal symbol.
equal.addEventListener('click', (e) => {
    if(!dis_1 || !dis_2) return;      //here if there's no number or values displayed on the calculator. it will do nothing.        
    computation();                    //if we have value both display2 and display1 tempResult will follow. therefore we can call computation function.
    clearVar();                       //we call this function because we just want to display the arithmetic on display1 element. we use without parameters because we only copy the previous value of display2 and no need for the next operation.
    display2.innerText=res;           //we want to display the result in display2 element.
    tempResult.innerText='';          //we dont want to display it again on tempResult element as we call the clearVar function. it looks redundant.
    dis_2=res;                       //we want to keep the value of the computed result if the user decide to continue the calculation.
    dis_1='';                        //we clear the values of dis_1 so that if we continue it will work just fine as it goes back to line 36. 
    haveDot=true;                     // here we set the haveDot value to "true" because if we have a computed result that involves dot, the dot will not be displayed anymore.   
});

//5th step. C button to clear the values and displays.
allClear.addEventListener('click', (e) => {
    display1.innerText='';
    display2.innerText='';
    tempResult.innerText='';
    dis_1='';
    dis_2='';
    res='';
});

//6th step. del button to delete the number inputted.
dele.addEventListener('click', (e) => {
    display2.innerText='';
    dis_2='';
});


//7th step bonus. this step is if we want to link our keyboard to operate the calculator.

window.addEventListener('keydown', (e) => {             //syntax for eventListener of keyboard.              
    if (e.key === '0'||
        e.key === '1'||
        e.key === '2'||
        e.key === '3'||
        e.key === '4'||
        e.key === '5'||
        e.key === '6'||
        e.key === '7'||
        e.key === '8'||
        e.key === '9') {
            pressToClick(e.key);                        //it calls the functio pressToClick with the parameter.
        }
    else if (e.key === '%'||
             e.key === '/'||
             e.key === '-'||
             e.key === '+'){
            pressToClick2(e.key);
        }
    else if (e.key === '*'){
            pressToClick2('X');
         }
    else if (e.key === 'C' || e.key === 'c'){
            pressToClick3('C');
    }
    else if (e.key === 'Backspace'){
            pressToClick4('del');
    }
    else if (e.key === 'Enter' || '=') {
            pressToClick5('=');
    }

});

function pressToClick(key){         
    numbers.forEach(press => {                          //we use the 'numbers' element of querySelectorAll to check if the key is in the selectors.
        if(press.innerText === key){
            press.click();                              //if the key is in the selectors. we use the javascript 'click()' method to access the numbers.
        }
    });
}

function pressToClick2(key){         
    operations.forEach(press => {                          //we use the 'operations' element of querySelectorAll to check if the key is in the selectors.
        if(press.innerText === key){
            press.click();                              //if the key is in the selectors. we use the javascript 'click()' method to access the numbers.
        }
    });
}

function pressToClick3(key){                            //This is the syntax for only querySelector.
    allClear.click();
}

function pressToClick4(key){
    dele.click();
}

function pressToClick5(key){
    equal.click();
}