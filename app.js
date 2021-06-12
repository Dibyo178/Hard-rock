const searchSong = () => {
    const searchText = document.getElementById('search').value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySongs(data.data)
        })
        .catch(error => {
            // displayErr('something went wrong');
            alert('Something went wrong')
        })
}

// const searchSong = async () => {
//     const searchText = document.getElementById('search').value;
//     const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
//    const res= await fetch(url)
//         const data= await res.json();
       
//             displaySongs(data.data);
        
// }

const displaySongs = (songs) => {

    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML ='';


    songs.forEach(song => {
        console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
          <source src="${song.preview}" type="audio/ogg">
        </audio>
      </div>
       <div class="col-md-3 text-md-right text-center">
        <button onClick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
       </div`;
        songContainer.appendChild(songDiv);
    })
}


// const getLyric=(artist,title) =>{
//     const url =`https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(response =>response.json())
//     .then(data =>{
//         displayLyrics(data.lyrics);
//     })
    
// }


const getLyric=async(artist,title) =>{
    const url =`https://api.lyrics.ovh/v1/${artist}/${title}`;
   try{
    const res= await fetch(url)
    const data= await res.json();
    
        displayLyrics(data.lyrics);
   }
  catch(error){
      displayErr('something went wrong')
  }
    
}


const displayLyrics = (lyrics) => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText=lyrics;
}

const displayErr=err=>{
    const errorDisplay =document.getElementById('error');
    errorDisplay.innerText=err;
}