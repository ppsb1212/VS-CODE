function onOffButton(name){
    let button = document.querySelector(name);
    if(!button.classList.contains('is-toggled')){
        turnOffButton();
        button.classList.add('is-toggled');
    }
    else{
    button.classList.remove('is-toggled');
}
}

function turnOffButton(){
    const text = document.querySelector('.is-toggled');
    if(text){
        text.classList.remove('is-toggled');
    }
}