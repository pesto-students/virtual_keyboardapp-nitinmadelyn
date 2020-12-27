const init = () => {
    addListener("caps-lock", "click", toggleCapsLock);
    
    let switches = elementByClass("switch")
    for(let ele in switches){
        if(!isNaN(ele))
            addListener(switches[ele], "click", keyPressed, true);    
    }
}

//toggle caps on & off
const toggleCapsLock = () => {
    const caps = elementById("caps-lock");
    caps.childNodes[1].classList.toggle("caps-on")

    let toTransform = "lowercase";
    if(caps.childNodes[1].classList.length == 2){
        toTransform = "uppercase";
    }
    convertLetterCase(toTransform);
}

// to capture which key pressed
const keyPressed = (e) => {
    let key = getPressedKeyValue(e);
    putValueInTextArea(key, e);
}