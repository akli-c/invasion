var golds=0;
var gps=0;
var clickmult=1;
var click=1;
var clickmultindex=0;


function addGold(click){
golds = golds+(click*clickmult);
displayGolds();
}

function displayGolds(){
    document.querySelector("#gold").innerHTML= Math.round(golds);
}

function displayGps(){
    document.querySelector("#gps").innerText=Math.round(gps);

}

var minions = [
    { id: 1, name: "Ship", cost: 0, gps: 0 , owned: 0 },
    { id: 2, name: "U.F.O", cost: 130, gps: 6, owned: 0 },
    { id: 3, name: "Moon", cost: 2600, gps: 36, owned: 0 },
    { id: 4, name: "Robots", cost: 52000, gps: 216, owned: 0 },
    { id: 5, name: "Aliens", cost: 624000, gps: 1296, owned: 0 },
    { id: 6, name: "Universe", cost: 7488000, gps: 7776, owned: 0 }
];


function buyMinion(id) {
    minions.forEach(minion => {
        if(minion.id === id)
        {
            if(golds >= minion.cost)
            {
                minion.owned += 1;
                golds = golds - minion.cost;
                gps += minion.gps;
                minion.cost = minion.cost * 1.15;
                clickmultindex++;
                if (clickmultindex==50){
                clickmult=clickmult*2;
                clickmultindex=0; 
                }     
                var mo=minion.owned;
                displayGps();
                display_minionschange(id);
                if(mo===25||mo===50||mo===100||mo===250||mo===1000){
                    minion.gps*=2;
                }
                if (minion.id === 6) {
                    replace();
                }
            }
    
        }
    });  
}
function replace() {
    var button = document.getElementById("oue");

    button.style.backgroundImage = "url('img/back2.gif')";
    button.style.backgroundRepeat = "no-repeat"; 
}

function getGps() {
    minions.forEach(minion => {
    gps += minion.gps;    
    });
}
function display_minionschange(id) {
    document.querySelector("#minioncost_" + id).textContent= minions[id-1].cost.toFixed(0);
    document.querySelector("#minionowned_" + id).textContent="-- Owned: "+ minions[id-1].owned;
    document.querySelector("#miniongps_" + id).textContent= " | Sps: " + minions[id-1].gps;
}

// Fonction qui permet une animation au moment du click 
function click_anime() {
    var c =click*clickmult; //nombre affiché à coté du + lors du clic
    console.log(event.pageX)
    if (event.pageY >= 1735 && event.pageY <= 1925 && event.pageX >=370 && event.pageX <= 570) { 
      var e = document.createElement("div");
      e.setAttribute('class', 'circle');
      e.textContent = "+" + c ; 
      document.querySelector('#click').appendChild(e);
      e.style.top = event.pageY + 105 + 'px';
      e.style.left = event.pageX + 105 + 'px';
      pos = event.pageY;
      setTimeout(function () {
        document.querySelector('#click').removeChild(e)
      }, 1000);
      document.addEventListener('click', click_anime);
    };
  };

//Sauvegarde
function save() {
    localStorage.setItem("golds", golds);
    localStorage.setItem("gps", gps);
    let minionsString = JSON.stringify(minions);
    localStorage.setItem("minionsString", minionsString);
  }

function load() {
    golds = localStorage.getItem("golds");
    golds = parseInt(golds);
    displayGolds();
  
    gps = localStorage.getItem("gps");
    gps = parseInt(gps);
    displayGps();
  
    minionsString = localStorage.getItem("minionsString");
    minions = JSON.parse(minionsString);
    i = 0
    while (i < minions.length) {
        document.querySelector("#minioncost_" + minions[i].id).textContent= minions[i].cost.toFixed(0);
        document.querySelector("#minionowned_" + minions[i].id).textContent= minions[i].owned;
        i++;
    }

}
//Remise à zéro 
function reset() {
    if(confirm("Are you sure you want to reset your game ?")) {
        var save={};
        localStorage.setItem("save", JSON.stringify(save));
        location.reload();

    }
}

//Autosave
setInterval(function(){
    save();
},3000);

//Ctrl+s to save 
document.addEventListener("keydown",function(event){
    if (event.ctrlKey && event.which == 83){
        event.preventDefault();
        save();
    }
},false);

setInterval(function () {
 golds+=gps;
 displayGolds();
}, 1000);

function show() {
    console.log(gps)
    console.log(golds)
    console.log(x)
    console.log(clickmultindex)
    console.log(m)
}