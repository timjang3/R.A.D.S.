let rooms = [0, 0, 0];

const url = window.location.search;

const urlParams = new URLSearchParams(url);

const roomNum = urlParams.get('r');
const avail = urlParams.get('f');

rooms[roomNum] = avail;

const Listing_API_URL = 'http://localhost:3001/rm';

for(let i = 0; i <rooms.length; i++){
    if(rooms[roomNum] == 1){
        document.getElementById(roomNum.toString()).innerHTML = "FULL";
        document.getElementById(roomNum.toString()).style.backgroundColor = '#e26d5e';
    }
    else if(rooms[roomNum] == 0){
        document.getElementById(roomNum.toString()).innerHTML = "Available";
        document.getElementById(roomNum.toString()).style.backgroundColor = '#54f0a7';
    }
}

async function fetchData(){
    const res = await fetch(Listing_API_URL);
    const data = await res.json();

    console.log(data);
}
fetchData();