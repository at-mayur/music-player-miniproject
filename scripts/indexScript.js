const mySongs = [
  {
    id: 1,
    name: "Akhiyaan - Mitraz",
    artist: "Mitraaz",
    genre: "Travel",
    source: "/audio/Akhiyaan - Mitraz.mp3",
    image:
      "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaWMlMjBhcnRpc3RzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Baarat",
    artist: "Ritwiz, Nucleya",
    genre: "Country",
    source: "/audio/Baarat.mp3",
    image:
      "https://images.unsplash.com/photo-1573253286301-35b8d29ac06f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFkZWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Jugnu",
    artist: "Badshah",
    genre: "Club",
    source: "/audio/Jugnu.mp3",
    image:
      "https://images.unsplash.com/photo-1621784166258-c6fdfff31879?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFydGlzdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Mannat - Darshan Raval",
    artist: "Darshan Raval",
    genre: "Travel",
    source: "/audio/Mannat.mp3",
    image:
      "https://images.unsplash.com/photo-1536849249744-44e01e7a089d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG11c2ljJTIwYWxidW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    name: "Mera Safar",
    artist: "Iqclipse Nova",
    genre: "Travel",
    source: "/audio/Mera Safar.mp3",
    image:
      "https://images.unsplash.com/photo-1616431842618-bdf65d9befd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG11c2ljJTIwYWxidW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 6,
    name: "Nasha - Equals Session",
    artist: "Amar Jalal, IP Singh",
    genre: "Club",
    source: "/audio/Nasha-Equals Session.mp3",
    image:
      "https://images.unsplash.com/photo-1504898770365-14faca6a7320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBhbGJ1bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 7,
    name: "Pasoori",
    artist: "Shae Gill, Ali Sethi",
    genre: "Rock",
    source: "/audio/Pasoori.mp3",
    image:
      "https://images.unsplash.com/photo-1621784166258-c6fdfff31879?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFydGlzdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 8,
    name: "Saahiba - Darshan Raval",
    artist: "Darshan Raval",
    genre: "Rock",
    source: "/audio/Saahiba.mp3",
    image:
      "https://images.unsplash.com/photo-1616431842618-bdf65d9befd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG11c2ljJTIwYWxidW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const myPlaylists = {
  recentlyAdded: { name: "Recently Added", songs: mySongs.slice(4) },
  favourites: {name: "Favaourites", songs: []}
};

let currentPlayingAudio = document.createElement("audio");
currentPlayingAudio.src = mySongs[0].source;
currentPlayingAudio.setAttribute("preload", "metadata");

let currPlayingSong = mySongs[0];

let genres = new Set();
mySongs.forEach((song) => {
  genres.add(song.genre);
});

let selectedGenre = -1;

// for navbar
function toggleClass() {
  var btn = document.getElementById("nav-toggler");
  btn.classList.toggle("show");
  document.getElementById("nav-menu").classList.toggle("show");
}

// Handle Dark mode
function handleDarkMode(){
  const darkModeSwitch = document.getElementById("dark-mode-check");

  darkModeSwitch.onchange = () => {

    if(darkModeSwitch.checked){
      document.body.style.setProperty("--body-back-color", "#060136");
      document.body.style.setProperty("--element-back-color", "#393460");
      document.body.style.setProperty("--text-color", "white");
    }
    else{
      document.body.style.setProperty("--body-back-color", "white");
      document.body.style.setProperty("--element-back-color", "rgb(225, 225, 225)");
      document.body.style.setProperty("--text-color", "black");
    }

  };
}
handleDarkMode();


//handle song search
function handleSongSearch(){
  const searchSongInput = document.getElementById("search-song-input");

  searchSongInput.oninput = () => {
    const filteredList = mySongs.filter((song) => {
      return (song.name.toLowerCase().includes(searchSongInput.value.toLowerCase()));
    });
    createSongsList(filteredList, "search-song-result");
  };
}
handleSongSearch();


// for add to playlist btn
function enableAddToPlaylist() {
  let addPlaylistBtn = document.getElementById("add-to-playlist");
  let selectPlaylistDiv = document.getElementById("playlist-options-container");
  let selectPlaylistForm = document.getElementById("select-playlist-form");
  let selectPlaylistFormOptions = document.getElementById("playlist-options");
  let selectPlaylistFormDismiss = document.getElementById(
    "select-playlist-form-dismiss"
  );

  addPlaylistBtn.onclick = (event) => {
    event.preventDefault();
    selectPlaylistDiv.classList.toggle("playlist-options-show");
  };

  selectPlaylistForm.onsubmit = (event) => {
    event.preventDefault();

    if(selectPlaylistFormOptions.value!=="None"){
      if(myPlaylists[selectPlaylistFormOptions.value]){
        myPlaylists[selectPlaylistFormOptions.value].songs.push(currPlayingSong);
        createSongsList(myPlaylists[selectPlaylistFormOptions.value].songs, `my-playlist-${ selectPlaylistFormOptions.value }`);
      }
    }

    selectPlaylistDiv.classList.toggle("playlist-options-show");
  };

  selectPlaylistFormDismiss.onclick = () => {
    selectPlaylistDiv.classList.toggle("playlist-options-show");
  };
}



// for create playlist btn
function enableCreatePlaylist() {
  let createPlaylistBtn = document.getElementById("create-playlist");
  let createPlaylistDiv = document.getElementById("create-playlist-container");
  let createPlaylistForm = document.getElementById("create-playlist-form");
  let createPlaylistFormInput = document.getElementById("create-playlist-input");
  let createPlaylistFormDismiss = document.getElementById("create-playlist-form-dismiss");
  let createPlaylistFormSubmitBtn = document.getElementById("create-playlist-form-submit");

  createPlaylistBtn.onclick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    createPlaylistDiv.classList.toggle("playlist-options-show");
  };

  createPlaylistFormInput.onclick = (event) => {
    event.stopPropagation();
  };

  createPlaylistFormSubmitBtn.onclick = (event) => {
    event.stopPropagation();
  };

  createPlaylistForm.onsubmit = (event) => {
    console.log(myPlaylists);
    event.stopPropagation();
    event.preventDefault();

    if(createPlaylistFormInput.value.length===0){
      alert("Enter playlist name");
      return;
    }

    let playlistName = createPlaylistFormInput.value.trim().toLowerCase();
    playlistName.replaceAll(" ", "");
    myPlaylists[playlistName] = {name: createPlaylistFormInput.value.trim(), songs: []};
    console.log(myPlaylists);
    showPlaylists();
    loadPlaylists();

    createPlaylistDiv.classList.toggle("playlist-options-show");
  };

  createPlaylistFormDismiss.onclick = (event) => {
    event.stopPropagation();
    createPlaylistDiv.classList.toggle("playlist-options-show");
  };
}



// show all playlists
function showPlaylists(){
  const playlistsContainer = document.getElementById("all-playlists-container");
  playlistsContainer.innerHTML = "";

  for(let playlist in myPlaylists){
    const newPlaylist = document.createElement("div");
    newPlaylist.className = "playlist control";

    newPlaylist.innerHTML = `
    <div
      id="show-hide-playlist"
      class="playlist-control show-hide-playlist"
    >
      <p>${ myPlaylists[playlist].name }</p>
      <p id="playlist-arr">
        <span><i class="fa-solid fa-angle-right"></i></span>
      </p>
    </div>

    <ul id="my-playlist-${ playlist }" class="songsList">

    </ul>
    `;

    playlistsContainer.append(newPlaylist);
    createSongsList(myPlaylists[playlist].songs, `my-playlist-${ playlist }`);
  }

  enableShowHidePlaylists();

}



// for show/hide playist
function enableShowHidePlaylists() {
  let playlistShow = document.querySelectorAll(".playlist");

  playlistShow.forEach((playList) => {
    let childs = playList.children;

    childs[0].addEventListener("click", () => {
      if (childs[1].classList.contains("playlist-show")) {
        childs[1].classList.remove("playlist-show");
        childs[0].children[1].innerHTML = `<span><i class="fa-solid fa-angle-right"></i></span>`;
      } else {
        childs[1].classList.add("playlist-show");
        childs[0].children[1].innerHTML = `<span><i class="fa-solid fa-angle-down"></i></span>`;
      }
    });
  });
}

// Handle Music List
function createSongsList(songsList, listParentId) {
  const allSongsList = document.getElementById(listParentId);
  allSongsList.innerHTML = "";
  songsList.forEach((song) => {
    const newSongElem = document.createElement("li");

    newSongElem.innerHTML = `
        <div id="song${ song.id }" class="curr-playlist-song">
            <div class="curr-playlist-song-img">
                <img src="${song.image}" alt="${song.name}">
            </div>
            <div class="curr-playlist-song-artist-detail">
                <div class="song-name-artist">
                    <h5>${song.name}</h5>
                    <h6>${song.artist}</h6>
                </div>
                <div>
                    <a href="#" class="like" data-song-index="${ song.id-1 }"><i class="fa-regular fa-heart"></i></a>
                </div>
            </div>
            
        </div>
        `;

    newSongElem.onclick = () => {
      currPlayingSong = song;
      currentPlayingAudio.src = song.source;
      currentPlayingAudio.play();
      loadSongInPlayer();
    };

    allSongsList.append(newSongElem);
  });
}


// handle adding song as favourite
function handleAddFavourite(){
  const likeBtns = document.querySelectorAll(".like");

  likeBtns.forEach((likeBtn) => {
    likeBtn.onclick = (event) => {
      event.stopPropagation();
      event.preventDefault();

      const songIndex = Number(likeBtn.dataset.songIndex);

      myPlaylists.favourites.songs.push(mySongs[songIndex]);
      createSongsList(myPlaylists.favourites.songs, `my-playlist-favourites`);
    };
  });
}


// Genre List
function updateGenreList() {
  let genreOptions = document.getElementById("selected-genre");
  genres.forEach((genre) => {
    const newOption = document.createElement("option");
    newOption.textContent = genre;
    newOption.value = genre;

    genreOptions.append(newOption);
  });

  genreOptions.onchange = () => {
    selectedGenre = genreOptions.value;

    if (selectedGenre === "None") {
      createSongsList(mySongs, "all-songs-list");
      return;
    }

    const filteredList = mySongs.filter((song) => {
      return song.genre === selectedGenre;
    });

    createSongsList(filteredList, "all-songs-list");
  };
}


// mount song in player
function loadSongInPlayer() {
  const albumArt = document.getElementById("album-artwork");
  const albumName = document.getElementById("album-name");
  const albumArtist = document.getElementById("album-artist");
  const actualTime = document.getElementById("actual-time");
  const totalTime = document.getElementById("total-time");
  const progressBar = document.getElementById("duration-progress");
  const volBtn = document.getElementById("song-vol-btn");

  const pauseBtn = document.getElementById("pause-song-btn");
  if(currentPlayingAudio.paused){
    pauseBtn.innerHTML = `<i id="pause-button" class="fa-regular fa-circle-play"></i>`;
  }
  else{
    pauseBtn.innerHTML = `<i id="pause-button" class="fa-regular fa-circle-pause"></i
    >`;
  }

  albumArt.src = currPlayingSong.image;
  albumName.textContent = currPlayingSong.name;
  albumArtist.textContent = currPlayingSong.artist;
  progressBar.value = 0;
  totalTime.textContent = `0.0`;
  actualTime.textContent = `0.0`;

  currentPlayingAudio.volume = volBtn.value;
}


// function to update song duration
currentPlayingAudio.ontimeupdate = () => {
  updateDurr();
};

function updateDurr() {
  const actualTime = document.getElementById("actual-time");
  const totalTime = document.getElementById("total-time");
  const progressBar = document.getElementById("duration-progress");

  if(isNaN(currentPlayingAudio.duration)){
    return;
  }

  totalTime.textContent = `${Math.round(
    currentPlayingAudio.duration / 60
  )}.${Math.round(currentPlayingAudio.duration % 60)}`;
  actualTime.textContent = `${Math.round(
    currentPlayingAudio.currentTime / 60
  )}.${Math.round(currentPlayingAudio.currentTime % 60)}`;

  progressBar.value = (currentPlayingAudio.currentTime/currentPlayingAudio.duration)*100;
}

// update playlists in dropdown
function loadPlaylists() {
  const playListDropdown = document.getElementById("playlist-options");
  playListDropdown.innerHTML = `<option value="None">Select Playlist</option>`;

  for (let playlist in myPlaylists) {
    const newOpt = document.createElement("option");
    newOpt.textContent = myPlaylists[playlist].name;
    newOpt.value = playlist;

    playListDropdown.append(newOpt);
  }
}



// handle songs control buttons
function handleAudioControls(){
  const prevBtn = document.getElementById("prev-song-btn");
  const pauseBtn = document.getElementById("pause-song-btn");
  const nxtBtn = document.getElementById("nxt-song-btn");
  const volBtn = document.getElementById("song-vol-btn");
  const volIcon = document.getElementById("vol-icon");
  const progressBar = document.getElementById("duration-progress");

  volIcon.onclick = (event) => {
    event.preventDefault();
  };

  prevBtn.onclick = (event) => {
    const index = mySongs.findIndex((song) => {
      return song.id === currPlayingSong.id;
    });
  
    if(index===-1){
      return;
    }
    event.preventDefault();
    if(index===0){
      return;
    }

    currPlayingSong = mySongs[index-1];
    currentPlayingAudio.src = currPlayingSong.source;
    loadSongInPlayer();
  };

  pauseBtn.onclick = (event) => {
    event.preventDefault();
    if(currentPlayingAudio.paused){
      currentPlayingAudio.play();
      pauseBtn.innerHTML = `<i id="pause-button" class="fa-regular fa-circle-pause"></i>`;
    }
    else{
      currentPlayingAudio.pause();
      pauseBtn.innerHTML = `<i id="pause-button" class="fa-regular fa-circle-play"></i
      >`;
    }
  };

  nxtBtn.onclick = (event) => {
    const index = mySongs.findIndex((song) => {
      return song.id === currPlayingSong.id;
    });
  
    if(index===-1){
      return;
    }
    event.preventDefault();
    if(index===mySongs.length-1){
      return;
    }

    currPlayingSong = mySongs[index+1];
    currentPlayingAudio.src = currPlayingSong.source;
    loadSongInPlayer();
  };

  volBtn.oninput = () => {
    currentPlayingAudio.volume = volBtn.value;
  };

  progressBar.oninput = () => {
    const durr = Number(currentPlayingAudio.duration);

    if(isNaN(durr)){
      return;
    }

    currentPlayingAudio.currentTime = Math.floor((progressBar.value/100)*durr);
  };

}



//Initiating Player
enableAddToPlaylist();
enableCreatePlaylist();
showPlaylists();
createSongsList(mySongs, "all-songs-list");
updateGenreList();
loadSongInPlayer();
loadPlaylists();
handleAudioControls();
handleAddFavourite();
