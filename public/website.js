let rooms = [0, 0, 0];
const root = "http://localhost:3000";

getAvails();



async function getAvails() {
    const url = new URL("/avails", root).href;
    const body = await fetch(url).then(res => res.json());
    rooms = body;
    for(let i = 1; i <= rooms.length; i++){
        if(rooms[i - 1] == 1){
            document.getElementById(i.toString()).innerHTML = "FULL";
            document.getElementById(i.toString()).style.backgroundColor = '#e26d5e';
        }
        else if(rooms[i - 1] == 0){
            document.getElementById(i.toString()).innerHTML = "Available";
            document.getElementById(i.toString()).style.backgroundColor = '#54f0a7';
        }
    }
    
}