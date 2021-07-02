
const utilContent = document.querySelector(".util-container");
let current = document.querySelector("#encr-block").innerHTML;
const encrTab = document.querySelector("#encrypt");
const decrTab = document.querySelector("#decrypt");
const encInput = document.querySelector("#encr-input");

let plainText = "";
let encrText = "";
let rows = [];
let cols = [];
let secKey = "";

// stting the document contents and their style 
const setCurrent = ()=> {
    utilContent.innerHTML = current;
    document.querySelector("#sec-key").innerHTML = `Your secret key is <strong id="sec-key">${secKey}</strong>`;
    document.getElementById("enc-out").innerHTML = encrText;
    
}

window.addEventListener("load",(e)=> {
    encrTab.classList.add("active");
    setCurrent();
    // generate key
    generateKey(); 
    // console.log(secKey);
    // console.log(rows);
    // console.log(cols);
});

encrTab.addEventListener("click",(e)=> {
    decrTab.classList.remove("active");
    encrTab.classList.add("active");
    current = document.querySelector("#encr-block").innerHTML;
    setCurrent();
});

decrTab.addEventListener("click",(e)=> {
    encrTab.classList.remove("active");
    decrTab.classList.add("active");
    current = document.querySelector("#decr-block").innerHTML;
    setCurrent();
});



const generateKey = ()=> {
    rows = [];
    cols = [];
    var count=0;
    while(count!=5) {
        let randomNumber = Math.floor((Math.random() * 10));
        if(!rows.includes(randomNumber)) {
            rows.push(randomNumber);
            count++;
        }
    }
    count=0;
    while(count!=6) {
        let randomNumber = Math.floor((Math.random() * 10));
        if(!cols.includes(randomNumber)) {
            cols.push(randomNumber);
            count++;
        }
    }
    // put on the document
    secKey = `${cols[0]}${rows[0]}${cols[1]}${rows[1]}${cols[2]}${rows[2]}${cols[3]}${rows[3]}${cols[4]}${rows[4]}${cols[5]}`;
    document.querySelector("#sec-key").innerHTML = `Your secret key is <strong id="sec-key">${secKey}</strong>`;
};

// main matrix

const mainMatrix = [
    ["A","B","C","D"," ","."],
    ["E","F","G","H",",","?"],
    ["I","J","K","L","M","N"],
    ["O","P","Q","R","S","T"],
    ["U","V","W","X","Y","Z"],
];

// Function for encryption
const encrypt = (e)=> {
    e.preventDefault();
    // get user input
    getValue(e);
    encrText = "";
    for(let i=0;i<plainText.length;i++) {
        let currChar = plainText.charCodeAt(i);
        if(currChar>=65 && currChar<=68) { // A to D
            encrText += ((rows[0]).toString() + cols[Math.abs(currChar-65)]);
            // console.log(encrText);
        } else if(currChar>=69 && currChar<=72) { // E to H
            encrText += ((rows[1]).toString() + cols[Math.abs(currChar-69)]);
            // console.log(encrText);
        } else if(currChar>=73 && currChar<=78) { // I to N
            encrText += ((rows[2]).toString() + cols[Math.abs(currChar-73)]);
            // console.log(encrText);
        } else if(currChar>=79 && currChar<=84) { // O to T
            encrText += ((rows[3]).toString() + cols[Math.abs(currChar-79)]);
            // console.log(encrText);
        } else if(currChar>=85 && currChar<=90) { // U to Z
            encrText += ((rows[4]).toString() + cols[Math.abs(currChar-85)]);
            // console.log(encrText);
        } else if(currChar===32) {
            encrText += (rows[0].toString()+cols[4]); //space
        } else if(currChar===46) {
            encrText += (rows[0].toString()+cols[5]);
        } else if(currChar === 44) {
            encrText += (rows[1].toString()+cols[4]);
        } else if(currChar === 63) {
            encrText += (rows[1].toString()+cols[5]);
        }
    }
    // // now put it on the DOM
    console.log(encrText);
    document.getElementById("enc-out").innerHTML = encrText;
}



// fucntion for getting the user input
const getValue = (e)=> {
    let inputs = e.target.elements;
    plainText = inputs[0].value;
    plainText = plainText.toUpperCase();
}


// NOW HERE COMES THE DECRYPTION
const decrypt = (e)=> {
    e.preventDefault();
    encrText = "";
    secKey = "";
    plainText = "";
    rows = [];
    cols = [];
    // get the user input
    getDecInput(e);
    // set the rows and columns according to the secret key
    for(var i=0;i<secKey.length;i+=2) {
        cols.push(secKey[i]);
        if(typeof secKey[i+1] !== 'undefined')
            rows.push(secKey[i+1]);
    }
    // console.log(rows,cols);
    // find the characters according to the rows and cols
    for(i=0;i<encrText.length;i+=2) {
        let r = rows.indexOf(encrText[i]);
        let c = cols.indexOf(encrText[i+1]);
        // console.log(r,c);
        if(typeof mainMatrix[r][c] !== 'undefined')
            plainText += mainMatrix[r][c];
    }
    // console.log(plainText);

    // Now show to the DOM
    document.getElementById("dec-out").innerHTML = plainText;

}

const getDecInput = (e)=> {
    let inputs = e.target.elements;
    encrText = inputs[0].value;
    secKey = inputs[1].value;
}