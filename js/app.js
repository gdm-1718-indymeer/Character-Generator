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
let bit = [];

function createGrid(){
    container.innerHTML = ""; 

    for (let x = 0; x < 64; x++) {
        let div = document.createElement('div');
        div.id = x;
        bit.push(0);

        container.append(div)
    }
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

grid.addEventListener('click', function(evt) {
   let target = evt.target;
   bit[target.id] = 1;
   target.style.backgroundColor = 'black';

}, false);

grid.addEventListener('dblclick', function(evt) {
    let target = evt.target;
    bit[target.id] = 0;
    target.style.backgroundColor = '';
 
 }, false);
createGrid();


