init();
function init() {    
    document.querySelector(".welcome").innerHTML = `Hello ${sessionStorage.getItem("username")}`;
    fetchAllSongs();
    fetchPlaylist();
}

function logout(event){
    event.preventDefault();
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    location.href= './login.html';
}

async function fetchAllSongs(){
    let response = await fetch('http://localhost:3000/api/music', {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    let songs = await  response.json();
    console.log(songs);
    for ( let i = 0; i < songs.length; i ++) {
        let myNewRow = document.createElement("tr");
        document.querySelector("#interestedList").appendChild(myNewRow);
        let newRowHTML = `
        <tr>
            <td>${i + 1}</td>        
            <td>${songs[i].title}</td>
            <td>${songs[i].releaseDate}</td>
            <td><img id="addBtn" src="./images/add.png " alt="" style="width:20px; height: 20px" onclick="addToList(${songs[i].id})"></td>
        </tr>`;
        myNewRow.outerHTML = newRowHTML;
    }            
}

async function fetchPlaylist() {
    let response = await fetch("http://localhost:3000/api/playlist", {
    headers: {

            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    }
    });
    let songs = await response.json();
    console.log(songs);
    songs.forEach(song => {
        let myNewRow = document.createElement("tr");
        document.querySelector("#playlist").appendChild(myNewRow);
        let newRowHTML = `
        <tr>
            <td>${song.orderId}</td>        
            <td>${song.title}</td>            
            <td>
                <img id="deleteBtn" src="./images/delete.png " alt="" style="width:20px; height: 20px; margin-right: 10px;">
                <img id="playBtn" src="./images/icons8-play-button-circled-30.png" alt="" style="width:25px; height: 25px;">
            </td>
        </tr>`;
        myNewRow.outerHTML = newRowHTML;
    });
}

function addToList(id) {

}