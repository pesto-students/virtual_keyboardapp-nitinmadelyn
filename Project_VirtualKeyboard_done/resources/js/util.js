var capsOn = false;
const addListener = (id, eventName, functionName, byClass) => {
    if(byClass != undefined){
        id.addEventListener(eventName, functionName);
    } else {
        document.getElementById(id).addEventListener(eventName, functionName);
    }
}

const elementById = (id) => {
    return document.getElementById(id)
}

const elementByClass = (className) => {
    return document.getElementsByClassName(className);
}

const convertLetterCase = (toTransform) => {
    for(ele in elementByClass("letter")){
        if(!isNaN(ele))
            elementByClass("letter")[ele].style["text-transform"] = toTransform;
    }
}

const getPressedKeyValue = (e) => {
    e.stopPropagation();
    return e.target.closest('.switch').innerHTML;
}

const shiftToggle = () => {
    let allShiftKey = elementByClass("btn-4");
    for(let shft in allShiftKey){
        if(allShiftKey[shft].classList)
            allShiftKey[shft].classList.toggle("btn-active")
    }
}

const putValueInTextArea = (key, e) => {
    let textArea = elementById("typing");
    switch(key){
        case("delete"):
            textArea.value = textArea.value.slice(0, -1);
            key = "";
            break;
        case("shift"):
            shiftToggle();
            let allShiftKey = elementByClass("btn-4");
            let toTransform = "lowercase";
            if(allShiftKey[0].classList.length == 3){
                toTransform = "uppercase";
            }
            convertLetterCase(toTransform);
            key = "";
            break;
        case('&nbsp;'):
            key = " ";
            break;
        case('enter'):
            key = "\n";
            break;
        case('tab'):
            key = "";
            break;
        case('ctrl'):
            key = "";
            break;
        case('alt'):
            key = "";
            break;
        case('command'):
            key = "";
            break;
        default:
            //check if shift is pressed
            let shiftPressed = elementByClass("btn-active");
            let htmlStrip = key.replace( /(<([^>]+)>)/ig, '').trim();
            if(htmlStrip == 'caps'){
                if(capsOn == false)
                    capsOn = true;
                else
                    capsOn = false;
                key = "";
                break; 
            }
            let isLetterPressed = isLetter(key);
            htmlStrip = replaceHtmlSpecialCharacters(htmlStrip);

            if(capsOn == true){
                if(isLetterPressed){
                    key = key.toUpperCase();
                    if(shiftPressed.length > 0)
                        shiftToggle();
                } else {
                    if(shiftPressed.length > 0){
                        key = htmlStrip.split('')[0];
                        shiftToggle();
                    } else {
                        key = htmlStrip.split('')[1];
                    }
                }
            } else if(shiftPressed.length > 0){
                if(isLetterPressed){
                    key = key.toUpperCase();
                } else {
                    key = htmlStrip.split('')[0];
                }
                shiftToggle();
                //convert all letters to lowercase
                convertLetterCase("lowercase")
            } else {
                if(!isLetterPressed)
                    key = htmlStrip.split('')[1];
            }
            break;
    }
    if(key != undefined)
        textArea.value = textArea.value + key;
}

const isLetter = (str) => {
    return str.length === 1 && str.match(/[a-z]/i);
}   

const replaceHtmlSpecialCharacters = (string) => {
    const specialChars = ["&gt;","&lt;","&nbsp;"];
    const replaceChars = [">","<"," "];
    for(let char in specialChars){
        string = string.replace(specialChars[char], replaceChars[char]);
    }
    return string;
}