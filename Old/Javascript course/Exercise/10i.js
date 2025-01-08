let calculation = localStorage.getItem('calculation') || '';
showCalculation();

function showCalculation(){
document.querySelector('.js-show').innerHTML = calculation || 0;
}

function updateCalculation(number){
    calculation += number;
    localStorage.setItem('calculation',calculation);
    showCalculation();
}