var firebaseConfig = {
    apiKey: "AIzaSyC61KgtFq7wpY6YZpzLpMrgVeVPeVXPrU8",
    authDomain: "character-generator-3420c.firebaseapp.com",
    databaseURL: "https://character-generator-3420c.firebaseio.com",
    projectId: "character-generator-3420c",
    storageBucket: "character-generator-3420c.appspot.com",
    messagingSenderId: "853614400708",
    appId: "1:853614400708:web:bf200c85828f58e6f76591"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let grid = document.getElementById('grid');
let container = document.getElementById('grid');
let login = localStorage.getItem('loggedIn');

let bit = [];

if(login == null){
    window.location.replace('register.html')
}
function Logout(){
    localStorage.removeItem('loggedIn')
    window.location.replace('register.html')

}
const warningTitleCSS = 'color:red; font-size:60px; font-weight: bold; -webkit-text-stroke: 1px black;';
      const warningDescCSS = 'font-size: 18px;';
      console.log('%cStop!', warningTitleCSS);
      console.log("%cIn name of god, dubbelclick on a clicked item to remove the click", warningDescCSS);

function createGrid(){
    container.innerHTML = ""; 
    bit = []
    for (let x = 0; x < 64; x++) {
        let div = document.createElement('div');
        div.id = x;
        bit.push(0);

        container.append(div)
    }
    RealtimePush()
}
function RealtimePush(){
    firebase.database().ref("/realtime").set(bit)

}
function pushFirebase(){
    firebase.database().ref("/character").push(bit)
    createGrid();
}

function loopFirebase(){
    bit =[];
    let leadsRef = firebase.database().ref('character');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let char = childSnapshot.val();
            bit.push(char);
        });
    }); 
    generateCharacter()
}

function generateCharacter() {
    bit.forEach((element, index) => {
        setTimeout(function () {
            container.innerHTML = ""; 

        for( let key in element){

                let div = document.createElement('div');
                div.className = element[key];
                container.append(div)
        };   
    }, index * 3000);  
    })
}

function LoopRaspberry(){
    firebase.database().ref("/pi").set({
        loop: true
    })

}

document.getElementById("generate").addEventListener("click", pushFirebase);
document.getElementById("loop").addEventListener("click", loopFirebase);
document.getElementById("clear").addEventListener("click", createGrid);
document.getElementById("raspiLoop").addEventListener("click", LoopRaspberry);
document.getElementById("Logout").addEventListener("click", Logout);


grid.addEventListener('click', function(evt) {
   let target = evt.target;
   bit[target.id] = 1;
   target.style.backgroundColor = '#071a23';
    RealtimePush()

}, false);

grid.addEventListener('dblclick', function(evt) {
    let target = evt.target;
    bit[target.id] = 0;
    target.style.backgroundColor = '';
    RealtimePush()
 
 }, false);
createGrid();


