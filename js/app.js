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
let bit = [];


function createGrid(){
    const container = document.getElementById('grid');
    container.innerHTML = ""; 

    for (let x = 0; x < 64; x++) {
        let div = document.createElement('div');
        div.className = x;
        bit.push(0);

        container.append(div)
    }
}

function generateCharacter() {
    for(let i = 0; i < bit.length; i++){
        
    }
}
function pushFirebase(){
    firebase.database().ref("/character").push(bit)
    createGrid();
}

function loopFirebase(){
    bit = [];
    let leadsRef = firebase.database().ref('character');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let char = childSnapshot.val();
            bit.push(char);

        });
    }); 

    forEach(let element in bit){
        console.log(element)
    }
    //createGrid();
}




document.getElementById("generate").addEventListener("click", pushFirebase);
document.getElementById("loop").addEventListener("click", loopFirebase);



grid.addEventListener('click', function(evt) {
   let target = evt.target;
   bit[target.className] = 1;
   target.style.backgroundColor = 'black';
   generateCharacter();

}, false);

grid.addEventListener('dblclick', function(evt) {
    let target = evt.target;
    bit[target.className] = 0;
    target.style.backgroundColor = '';
 
 }, false);
createGrid();


