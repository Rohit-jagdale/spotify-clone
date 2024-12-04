// console.log("js")
// let currentSong = new Audio();
// let songs;
// let currFolder;
// let volumeLevel;
// let library;
// function formatSeconds(seconds) {
//     const minutes = Math.floor(seconds / 60); // Convert seconds to minutes
//     const remainingSeconds = Math.floor(seconds % 60); // Get whole remaining seconds
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; // Format as "minutes:seconds"
// }






// async function getSongs(folder) {
//     currFolder = folder;
//     let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")
//     songs = []
//     for (let i = 0; i < as.length; i++) {
//         const ele = as[i];
//         if (ele.href.endsWith(".mp3")) {
//             songs.push(ele.href.split(`/${folder}/`)[1]);
//         }
//     }
//     //get the list of all songs

//     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
//     songUL.innerHTML = ""
//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li>

//       <img src="images/music.svg" alt="music">
//                               <div class="info">
//                                   <div> ${song.replaceAll("%20", " ")}</div>
//                                   <div>Rohit</div>
//                               </div>
//                               <div class="playnow">
//                                   <span>play now</span>
//                                   <img src="images/song-play.svg" alt="">
//                               </div></li>`;
//     }
//     //Attach an event listener to each song
//     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", element => {
//             // console.log(e.querySelector(".info").firstElementChild.innerHTML)
//             PlayMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
//         })
//     })
//     return songs;
// }

// const PlayMusic = (track, pause = false) => {
//     currentSong.src = `/${currFolder}/` + track
//     if (!pause) {

//         currentSong.play();
//         play.src = "images/pause.svg"
//     }
//     document.querySelector(".songinfo").innerHTML = decodeURI(track)
//     document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
//     currentSong.addEventListener("timeupdate", () => {
//         // console.log(currentSong.currentTime, currentSong.duration)
//     })
//     currentSong.addEventListener("timeupdate", () => {
//         // console.log(currentSong.currentTime, currentSong.duration)
//         document.querySelector(".songtime").innerHTML = `${formatSeconds(currentSong.currentTime)} / ${formatSeconds(currentSong.duration)}`
//     })
//     document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100;
// }


// async function displayAlbums() {
//     let a = await fetch(`http://127.0.0.1:5500/songs/`)
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a")
//     let cardContainer = document.querySelector(".cardContainer")
//     let array = Array.from(anchors)

//     for (let index = 0; index < array.length; index++) {
//         const e = array[index];
//         // Check if the href is valid before proceeding
//         if (e.href && e.href.includes("/songs")) {
//             let folder = e.href.split("/").slice(-1)[0]

//             try {
//                 let metadataResponse = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
//                 if (!metadataResponse.ok) {
//                     throw new Error("Metadata not found for folder: " + folder);
//                 }
//                 let responseData = await metadataResponse.json();
//                 // console.log(responseData)

//                 cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
//                     <div class="play">
//                         <img src="images/play-button.svg" alt="play-button">
//                     </div>
//                     <img src="/songs/${folder}/cover.jpg" alt="song-img">
//                     <h2>${responseData.title}</h2>
//                     <p>${responseData.description}</p>
//                 </div>`
//                 library = responseData.title;
//             } catch (error) {
//                 console.error("Error fetching info.json for folder:", folder, error);
//             }
//         } else {
//             console.warn(`Skipping invalid href: ${e.href}`);
//         }
//     }

//     // Add click event listener for cards
//     Array.from(document.getElementsByClassName("card")).forEach(e => {
//         e.addEventListener("click", async item => {
//             // console.log(item.currentTarget.dataset.folder)
//             let songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
//             PlayMusic(songs[0])
//         })

//     })
// }


// async function main() {

//     await getSongs("songs/ashique")
//     PlayMusic(songs[0], true)

//     //album display on page
//     displayAlbums()





//     //attach an event listner to play, next and pevious
//     play.addEventListener("click", () => {
//         if (currentSong.paused) {
//             currentSong.play()
//             play.src = "images/pause.svg"
//         } else {
//             currentSong.pause()
//             play.src = "images/song-play.svg"
//         }


//         //update a current time of song
//         currentSong.addEventListener("timeupdate", () => {
//             // console.log(currentSong.currentTime, currentSong.duration)
//             document.querySelector(".songtime").innerHTML = `${formatSeconds(currentSong.currentTime)} / ${formatSeconds(currentSong.duration)}`
//             document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
//         })


//         //update the seekbar according to time
//         document.querySelector(".seekbar").addEventListener("click", e => {
//             let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//             document.querySelector(".circle").style.left = percent + "%";
//             currentSong.currentTime = (currentSong.duration * percent) / 100
//         })

//     })


//     //when click on humburger
//     document.querySelector(".hamburger").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "0"
//     })

//     //when click on close
//     document.querySelector(".close").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "-120%"
//     })

//     //when click on next 
//     next.addEventListener("click", () => {
//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//         PlayMusic(songs[(index + 1) % songs.length])
//     })
//     //when click on previous 
//     previous.addEventListener("click", () => {
//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//         if ((index - 1) >= 0) {
//             PlayMusic(songs[index - 1])
//         }
//     })

//     //add event to volume
//     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
//         // console.log(e.target.value)
//         volumeLevel = parseInt(e.target.value);
//         currentSong.volume = volumeLevel / 100;
//         // console.log("volume" + currentSong.volume)
//     })

//     mute.addEventListener("click", () => {
//         if (currentSong.volume === 0) {
//             mute.src = "/images/volume.svg";
//             currentSong.volume = 0.10;
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
//         } else {
//             currentSong.volume = 0;
//             mute.src = "images/volumeoff.svg";
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
//         }
//     });


//     // //change the name of library according to folder
//     // document.querySelector(".heading").innerHTML = `<img class="invert" src="images/playlist.svg" alt="playlist">
//     //                 <h2> ${library} </h2>`
//     // console.log(library);


// }


// main();


console.log("js")
let currentSong = new Audio();
let songs;
let currFolder;
let volumeLevel;
let library;
function formatSeconds(seconds) {
    const minutes = Math.floor(seconds / 60); // Convert seconds to minutes
    const remainingSeconds = Math.floor(seconds % 60); // Get whole remaining seconds
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; // Format as "minutes:seconds"
}






async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let i = 0; i < as.length; i++) {
        const ele = as[i];
        if (ele.href.endsWith(".mp3")) {
            songs.push(ele.href.split(`/${folder}/`)[1]);
        }
    }
    //get the list of all songs

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
      
      <img src="images/music.svg" alt="music">
                              <div class="info">
                                  <div> ${song.replaceAll("%20", " ")}</div>
                                  <div>Rohit</div>
                              </div>
                              <div class="playnow">
                                  <span>play now</span>
                                  <img src="images/song-play.svg" alt="">
                              </div></li>`;
    }
    //Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML)
            PlayMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    return songs;
}

const PlayMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track
    if (!pause) {

        currentSong.play();
        play.src = "images/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration)
    })
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${formatSeconds(currentSong.currentTime)} / ${formatSeconds(currentSong.duration)}`
    })
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100;
}


async function displayAlbums() {
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)

    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        // Check if the href is valid before proceeding
        if (e.href && e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-1)[0]

            try {
                let metadataResponse = await fetch(`/songs/${folder}/info.json`);
                if (!metadataResponse.ok) {
                    throw new Error("Metadata not found for folder: " + folder);
                }
                let responseData = await metadataResponse.json();
                // console.log(responseData)

                cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
                    <div class="play">
                        <img src="images/play-button.svg" alt="play-button">
                    </div>
                    <img src="/songs/${folder}/cover.jpg" alt="song-img">
                    <h2>${responseData.title}</h2>
                    <p>${responseData.description}</p>
                </div>`
                library = responseData.title;
            } catch (error) {
                console.error("Error fetching info.json for folder:", folder, error);
            }
        } else {
            console.warn(`Skipping invalid href: ${e.href}`);
        }
    }

    // Add click event listener for cards
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            // console.log(item.currentTarget.dataset.folder)
            let songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            PlayMusic(songs[0])
        })

    })
}


async function main() {

    await getSongs("songs/ashique")
    PlayMusic(songs[0], true)

    //album display on page
    displayAlbums()





    //attach an event listner to play, next and pevious
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "images/pause.svg"
        } else {
            currentSong.pause()
            play.src = "images/song-play.svg"
        }


        //update a current time of song
        currentSong.addEventListener("timeupdate", () => {
            // console.log(currentSong.currentTime, currentSong.duration)
            document.querySelector(".songtime").innerHTML = `${formatSeconds(currentSong.currentTime)} / ${formatSeconds(currentSong.duration)}`
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        })


        //update the seekbar according to time
        document.querySelector(".seekbar").addEventListener("click", e => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".circle").style.left = percent + "%";
            currentSong.currentTime = (currentSong.duration * percent) / 100
        })

    })


    //when click on humburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //when click on close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    //when click on next 
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        PlayMusic(songs[(index + 1) % songs.length])
    })
    //when click on previous 
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            PlayMusic(songs[index - 1])
        }
    })

    //add event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // console.log(e.target.value)
        volumeLevel = parseInt(e.target.value);
        currentSong.volume = volumeLevel / 100;
        // console.log("volume" + currentSong.volume)
    })

    mute.addEventListener("click", () => {
        if (currentSong.volume === 0) {
            mute.src = "/images/volume.svg";
            currentSong.volume = 0.10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        } else {
            currentSong.volume = 0;
            mute.src = "images/volumeoff.svg";
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
    });


    // //change the name of library according to folder
    // document.querySelector(".heading").innerHTML = `<img class="invert" src="images/playlist.svg" alt="playlist">
    //                 <h2> ${library} </h2>`
    // console.log(library);


}


main();

