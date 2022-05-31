let player1;
let player2;
let element;
let cnt;

function getPlayerInfo(){
     localStorage["player1"] = document.getElementById("player1").value;
     localStorage["player2"] = document.getElementById("player2").value;
     if(document.getElementById("player1").value!="" && document.getElementById("player2").value!=""){
         window.location.href = "asocijacije-igra.html"
     }else{
         alert("Oba polja moraju biti popunjena")
     }
}

function populate(){
    localStorage.setItem("A1",["Osmeh","Studenti","Banja","Duvan","Krv"]);
    localStorage.setItem("A2",["Dunav","Restoran","Voda","Cigare","Element"]);
    localStorage.setItem("A3",["Izbor","Bonovi","Planina","Kutija","Clan"]);
    localStorage.setItem("A4",["Prostran","Linija","Gejzir","Z. Colic","Gradjanin"]);
    localStorage.setItem("B1",["Lipe","Dizalice","Traka","Kum","Mali"]);
    localStorage.setItem("B2",["Kuce","Skele","Nemi","Muzika","Beli konj"]);
    localStorage.setItem("B3",["Glavna","Cuvar","Animacija","Ceremonija","Bels"]);
    localStorage.setItem("B4",["Slepa","Zidari","Montaza","Deveruse","Kruna"]);
    localStorage.setItem("C1",["Saga","Generalni","Ekspres","Grudi","Roba"]);
    localStorage.setItem("C2",["Bogovi","Glad","Istok","Hrabrost","Pijaca"]);
    localStorage.setItem("C3",["Prvi","Blokada","Zacini","Odlicje","Pult"]);
    localStorage.setItem("C4",["Vece","Obustava","Kultura","Sport","Vasar"]);
    localStorage.setItem("D1",["Tabak","Decija","Kabina","Andjeo","Ton"]);
    localStorage.setItem("D2",["Roto","LJudska","Kupatilo","Guska","Tus"]);
    localStorage.setItem("D3",["Ofset","Zastita","Rvanje","Avion","Vojna"]);
    localStorage.setItem("D4",["Duboka","Juristika","Crtanje","Veata","Pleh"]);
    localStorage.setItem("A",["Sirok","Menza","Izvor","Tabakera","Grupa"]);
    localStorage.setItem("B",["Ulica","Gradiliste","Film","Svadba","Princ"]);
    localStorage.setItem("C",["Sumrak","Strajk","Orijent","Medalja","Tezga"]);
    localStorage.setItem("D",["Stampa","Prava","Tus","Krila","Muzika"]);
    localStorage.setItem("solution",["Bulevar","Radnici","Muzika","Srebrna","Pevac"]);
    player1 = localStorage.getItem("player1");
    player2 = localStorage.getItem("player2");
    localStorage.setItem("currPlayer",1);
    localStorage.setItem('1',0);
    localStorage.setItem('2',0);
    localStorage.setItem("flag",1);
    localStorage.setItem("solFlag",1);
    localStorage.setItem("AOtk",4);
    localStorage.setItem("BOtk",4);
    localStorage.setItem("COtk",4);
    localStorage.setItem("DOtk",4);
    play();
}

function play(){
    document.getElementById("Name").innerHTML=player1;
    document.getElementById("Name").style.color="blue";
    element= Math.floor(Math.random()*5);
    cnt=10;
    updateCounter()
    Counter = setInterval(updateCounter,1000);
    Change = setInterval(changePlayer,10000);
    setTimeout(endGame,240000);
    

}


function updateCounter(){
    document.getElementById("cnt").innerHTML=cnt;
    cnt=cnt-1;
}

function changePlayer(){
    cnt=10;
    updateCounter()
    localStorage.setItem("flag",1);
    localStorage.setItem("solFlag",1);
    let player = localStorage.getItem("currPlayer");
    if(player==1){
        localStorage.setItem("currPlayer",2);
        document.getElementById("Name").innerHTML=player2;
        document.getElementById("Name").style.color="red";
    }else{
        localStorage.setItem("currPlayer",1);
        document.getElementById("Name").innerHTML=player1;
        document.getElementById("Name").style.color="blue";
    }

}

function Reveal(buttonId){

    if(localStorage.getItem("flag")==1){
        localStorage.setItem("flag",0);
        let btn = document.getElementById(buttonId);
        let field = localStorage.getItem(buttonId);
        btn.setAttribute("dissabled","dissabled");
        btn.innerHTML=(field.split(','))[element];
        let el = buttonId.charAt(0)+"Otk";
        let otk = localStorage.getItem(el);
        otk=parseInt(otk)-1;
        localStorage.setItem(el,otk)
    }
}

function Check(solId){
    let idF;
    if(localStorage.getItem("solFlag")==1){
        localStorage.setItem("solFlag",1);
        let field = localStorage.getItem(solId);
        let player = localStorage.getItem("currPlayer");
    if(solId=="solution"){
        if(document.getElementById(solId).value==(field.split(','))[element]){
            let points = localStorage.getItem(player);
            A = parseInt(localStorage.getItem("AOtk"));
            B = parseInt(localStorage.getItem("BOtk"));
            C = parseInt(localStorage.getItem("COtk"));
            D = parseInt(localStorage.getItem("DOtk"));
            points = parseInt(points) + 10 + A + B+ C+ D;
            localStorage.setItem(player,points);
            document.getElementById("A").value=(localStorage.getItem("A").split(','))[element];
            document.getElementById("C").value=(localStorage.getItem("C").split(','))[element];
            document.getElementById("D").value=(localStorage.getItem("D").split(','))[element];
            document.getElementById("B").value=(localStorage.getItem("B").split(','))[element];
            if(player==1){
                document.getElementById(solId).style.background="blue";
                }else{
                document.getElementById(solId).style.background="red";
                }
            for (let i = 1; i < 5; i++) {
                idF="A"+i;
                localStorage.setItem('flag',1);
                Reveal(idF);
            }
            for (let i = 1; i < 5; i++) {
                idF="B"+i;
                localStorage.setItem('flag',1);
                Reveal(idF);
            }
            for (let i = 1; i < 5; i++) {
                idF="C"+i;
                localStorage.setItem('flag',1);
                Reveal(idF);
            }
            for (let i = 1; i < 5; i++) {
                idF="D"+i;
                localStorage.setItem('flag',1);
                Reveal(idF);
            } 
            endGame();
        }else{
            alert("Greska");
        }
    }else{
        if(document.getElementById(solId).value==(field.split(','))[element]){
            let points = localStorage.getItem(player);
            let el = solId+"Otk";
            let otk = parseInt(localStorage.getItem(el));
            points = parseInt(points) + 5+ otk;
            localStorage.setItem(player,points);
            document.getElementById(solId).setAttribute("dissabled","dissabled");
            for (let i = 1; i < 5; i++) {
                idF=solId+i;
                localStorage.setItem('flag',1);
                Reveal(idF);
                if(player==1){
                document.getElementById(idF).style.background="blue";
                document.getElementById(solId).style.background="blue";
                }else{
                document.getElementById(idF).style.background="red";
                document.getElementById(solId).style.background="red";

                }
            }
            localStorage.setItem(el,0);
        }else{
            alert("Greska");
        }
        clearInterval(Change);
        changePlayer();
        Change = setInterval(changePlayer,10000);
        clearInterval(Counter);
        Counter = setInterval(updateCounter,1000);
    }
}
}

function endGame(){
    clearInterval(Change);
    clearInterval(Counter);
    document.getElementById("dalje").setAttribute("dissabled","dissabled");
    if(parseInt(localStorage.getItem("1"))>parseInt(localStorage.getItem("2"))){
        alert(player1+" JE POBEDIO/LA"+"\n"+player1+":"+localStorage.getItem("1")+"\n"+player2+":"+localStorage.getItem("2"))

    }else if(parseInt(localStorage.getItem("1"))<parseInt(localStorage.getItem("2"))){
        alert(player2+" JE POBEDIO/LA"+"\n"+player2+":"+localStorage.getItem("2")+"\n"+player1+":"+localStorage.getItem("1"))

    }else{
        alert("Its a tie!"+"\n"+player2+":"+localStorage.getItem("2")+"\n"+player1+":"+localStorage.getItem("1"))

    }
}