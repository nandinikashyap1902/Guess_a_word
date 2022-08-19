const wordList = [
    {
        word:"python",
        hint: "programming language"
    },

    {
        word:"guitar",
        hint: "a music instrument"
    },

    {
        word:"aim",
        hint: "a purpose or intention"
    },

    {
        word:"Venus",
        hint: "a planet of our solar system"
    },

    {
        word:"gold",
        hint: "a yellow precios metal"
    },

    {
        word:"golang",
        hint: "a programming language"
    },
];

const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector(".typing-input");

let word,incorrects=[],corrects=[],maxGusses;
function randomWord(){
    // getting random object from wordlist
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;// getting word of random object
    maxGusses = 8; corrects = []; incorrects = [];
    console.log(word);

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGusses;
    wrongLetter.innerText = incorrects;

    let html = "";
   for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
   }
   inputs.innerHTML = html;
   }
   randomWord();

   function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key} `) && !corrects.includes(key)) {
        // validating key is it number or character
        console.log(key);
        if(word.includes(key)){// if user letter found in the word

         for (let i = 0;i < word.length;i++) {

             if(word[i]===key){ // showing matched letter in the input value
                corrects.push(key);
               inputs.querySelectorAll("input") [i].value = key;
             }
         }
        } else {
            maxGusses--;
         incorrects.push(`${key}`);// adding spaces b/w the keys
        }
        guessLeft.innerText = maxGusses;
        wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";

  setTimeout(() =>{
    if(corrects.length === word.length){// if user found all letters
        alert(`congrats! you found the word ${word.toUpperCase()}`);
        randomWord();// calling randomword func, so the game reset
    } 
    
    else if(maxGusses<1){ // if user could not found all letters
        alert("game over! you don't have remaining guesses");
        for(let i=0; i<word.length;i++){
            //showing matched lettee in the input value
            inputs.querySelectorAll("input")[i].value= word[i];
        }
    }
});
   }

   resetBtn.addEventListener("click",randomWord);
   typingInput.addEventListener("input",initGame);
   document.addEventListener("keydown",() =>typingInput.focus());