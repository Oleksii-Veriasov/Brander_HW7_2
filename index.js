let startButton = document.getElementById("start");
let p = document.getElementById("scor");
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let four = document.getElementById("four");
let five = document.getElementById("five");
let gameButtons = document.getElementById("gameButtons");
let listRecords = document.getElementsByClassName("record"); 
let buttonsFlag = [0,0];

gameButtons.style.display = "none";
let intervalId = null;
let time = 0;
let records = [];
let level = 1;
let checkString = "11"

startButton.addEventListener("click", () => {
    startButton.disabled = 'disabled';
    addButton(level);
    time = 0;
    gameButtons.style.display = "block";
    buttons = document.querySelectorAll('button[id^=but]');
    buttons.forEach(btn => {
        btn.style.backgroundColor = "red";     
    });
    
    intervalId = setInterval(() => {
        time +=16;
        p.innerHTML = time.toString().padStart(4, '0') + 'ms';
        if (buttonsFlag.join("") === checkString){
            clearInterval(intervalId);
            level++;
            startButton.disabled = '';
            gameButtons.style.display = "none";
            checkString += "1";
            buttonsFlag = new Array(level + 1).fill(0);
            records.push([`${time} / ${level}`]);
            console.log(records);
            renderRecords(records, listRecords);
            time = 0;
        }
    }, 16)
});

function addButton(level){
    if(level === 1) {
        let button1 = document.createElement("button");
        button1.className = "game";
        button1.id = `but${1}`;
        button1.innerText = "1";
        gameButtons.appendChild(button1); 
        
        let button2 = document.createElement("button");
        button2.className = "game";
        button2.id = `but${2}`;
        button2.innerText = "2";
        gameButtons.appendChild(button2);         
    }
    if (level > 1) {
        let button = document.createElement("button");
        button.className = "game";
        button.id = `but${level+1}`;
        button.innerText = `${level+1}`;
        gameButtons.appendChild(button);      
    } 
    let buttons = document.querySelectorAll('button[id^=but]');
    buttons.forEach(btn => {
        btn.addEventListener('click', event => {      
            let buttonNumber = event.target.innerText;
            buttonsFlag[buttonNumber-1] = 1;
            toggleColor(event.target);
        });
     
    });

}

function renderRecords(records, listRecords){    
    records.sort(function(a, b) {
        return a - b;
      });
            
    for (i = 0; i < listRecords.length; i++) {
        listRecords[i].innerText = `${records[i]}`;
    }
}

function toggleColor(el){
    el.style.backgroundColor !== "green" ?
        el.style.backgroundColor = "green": null;
}