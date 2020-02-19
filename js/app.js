(function IIFE() {
    const list = [
      {
        id: 1,
        url: "http://cdn.atrera.com/audio/Marcel_Pequel_-_01_-_One.mp3",
        author: "Genesis",
        title: "One",
        cover: "https://image.freepik.com/vector-gratis/fondo-color-pastel_19875-20.jpg"
      },
      {
        id: 2,
        url: "http://cdn.atrera.com/audio/Marcel_Pequel_-_02_-_Two.mp3",
        author: "Genesis",
        title: "Two",
        cover: "https://i.pinimg.com/originals/74/3b/64/743b643ef767a54284fcbbdf82dcc263.png"
      },
      {
        id: 3,
        url: "http://cdn.atrera.com/audio/Marcel_Pequel_-_03_-_Three.mp3",
        author: "Genesis",
        title: "Three",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtOzWGzAz6g2C4MnfxlKz8w6RZ_CoiCWkG6d2PaZcGHVRKhDUm"
      },
      {
        id: 4,
        url: "http://cdn.atrera.com/audio/Marcel_Pequel_-_04_-_Four.mp3",
        author: "Genesis",
        title: "Four",
        cover: "https://www.marketingdirecto.com/wp-content/uploads/2017/01/colores-tarjetas.jpg"
      },
      {
        id: 5,
        url: "http://cdn.atrera.com/audio/Marcel_Pequel_-_05_-_Five.mp3",
        author: "Genesis",
        title: "Five",
        cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/L%C3%A1pices_de_colores_01.jpg/1200px-L%C3%A1pices_de_colores_01.jpg"
      },
      {
        id: 6,
        url: "http://cdn.atrera.com/audio/Marcel_Pequel_-_06_-_Six.mp3",
        author: "Genesis",
        title: "Six",
        cover: "https://s03.s3c.es/imag/_v0/770x420/d/d/2/iStock-870361774.jpg"
      },
      {
        id: 7,
        url: "http://cdn.atrera.com/audio/Marcel_Pequel_-_07_-_Seven.mp3",
        author: "Genesis",
        title: "Seven",
        cover: "https://www.movilzona.es/app/uploads/2015/11/Colores.png"
      },
      {
        id: 8,
        url: "http://cdn.atrera.com/audio/Marcel_Pequel_-_08_-_Eight.mp3",
        author: "Genesis",
        title: "Eight",
        cover: "https://www.tecnohotelnews.com/wp-content/uploads/2018/04/importancia-de-elegir-colores-en-la-estrategia-de-un-hotel.jpg"
      },
      {
        id: 9,
        url: "http://cdn.atrera.com/audio/Marcel_Pequel_-_09_-_Nine.mp3",
        author: "Genesis",
        title: "Nine",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6GXRKcKDhp1_9BSfxCKOzGYsYkj6XRtN5xqTKwGvTIUM83-R5"
      }
    ];
  
    let currentId = 0;
    let isPlaying = false;
    let isLoop = true;
    let isShuffle = false;
    let currentAudio = "music1";
    let timer = null;
    let loopOne = false;
  
    const currentTimeIndicator = document.querySelector(".music-time__current");
    const leftTimeIndicator = document.querySelector(".music-time__last");
    const progressBar = document.getElementById("length");
    const playBtn = document.querySelector(".play");
    const cover = document.querySelector(".cover");
    const title = document.querySelector(".music-player__title");
    const author = document.querySelector(".music-player__author");
  
    const loopBtn = document.getElementById("loop");
    const shuffleBtn = document.getElementById("shuffle");
    const forwardBtn = document.getElementById("forward");
    const backwardBtn = document.getElementById("backward");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const progressDiv = document.getElementById("progress");
  
    function play(e) {
      if (!isPlaying) {
        // console.log('play');
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/pause.svg";
        e.target.alt = "Pause";
        isPlaying = true;
        document.getElementById(currentAudio).play();
        showTime();
      } else {
        // console.log('pause');
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
        e.target.alt = "Play";
        document.getElementById(currentAudio).pause();
        isPlaying = false;
        clearInterval(timer);
      }
    }
  
    function changeBar() {
      const audio = document.getElementById(currentAudio);
      const percentage = (audio.currentTime / audio.duration).toFixed(3);
      progressBar.style.transition = "";
      // console.log(audio.currentTime);
  
      //set current time
      const minute = Math.floor(audio.currentTime / 60);
      const second = Math.floor(audio.currentTime % 60);
      const leftTime = audio.duration - audio.currentTime;
      currentTimeIndicator.innerHTML =
        ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);
  
      //set left time
      const leftMinute = Math.floor(leftTime / 60);
      const leftSecond = Math.floor(leftTime % 60);
  
      leftTimeIndicator.innerHTML =
        ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
  
      //set time bar
      progressBar.style.width = percentage * 100 + "%";
    }
  
    function showTime() {
      timer = setInterval(() => changeBar(), 500);
    }
  
    function nextMusic(mode) {
      playBtn.src =
        "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
      playBtn.alt = "Play";
      document.getElementById(currentAudio).pause();
      isPlaying = false;
      clearInterval(timer);
  
      if (mode === "next") {
        currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
        init();
      } else {
        currentId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
        init();
      }
    }
  
    function shuffle(e) {
      isShuffle = !isShuffle;
      if (isShuffle) {
        e.target.parentNode.classList.add("is-loop");
      } else {
        e.target.parentNode.classList.remove("is-loop");
      }
    }
  
    function backward() {
      const audio = document.getElementById(currentAudio);
      audio.currentTime -= 5;
      if (!isPlaying) {
        changeBar();
      }
    }
  
    function forward() {
      const audio = document.getElementById(currentAudio);
      audio.currentTime += 5;
      if (!isPlaying) {
        changeBar();
      }
    }
  
    function stopMusic() {
      playBtn.src =
        "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
      playBtn.alt = "Play";
      isPlaying = false;
    }
  
    function goToNextMusic() {
      let newId = currentId;
      while (isShuffle && !loopOne && newId === currentId) {
        newId = Math.floor(Math.random() * Math.floor(list.length - 1));
      }
  
      if (!isShuffle && !loopOne) {
        currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
      }
      if (!isShuffle && loopOne) {
        currentId = currentId;
      }
  
      if (isShuffle) {
        currentId = newId;
      }
      init();
      document.getElementById(currentAudio).play();
    }
  
    function loop(e) {
      const audio = document.getElementById(currentAudio);
  
      if (!isLoop && !loopOne) {
        isLoop = true;
        loopOne = false;
        // console.log('is loop');
        e.target.parentNode.classList.add("is-loop");
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loop.svg";
        audio.loop = false;
        audio.onended = e => goToNextMusic();
        console.log(isLoop, loopOne);
      } else if (isLoop && !loopOne) {
        // console.log('is loop one');
        isLoop = true;
        loopOne = true;
        e.target.parentNode.classList.add("is-loop");
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loopone.svg";
        audio.loop = true;
        audio.onended = e => goToNextMusic();
        console.log(isLoop, loopOne);
      } else {
        // console.log('not loop');
        isLoop = false;
        loopOne = false;
        e.target.parentNode.classList.remove("is-loop");
        e.target.src =
          "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loop.svg";
        audio.loop = false;
        audio.onended = e => stopMusic();
        console.log(isLoop, loopOne);
      }
    }
  
    function progress(e) {
      const audio = document.getElementById(currentAudio);
      //get current position and minus progress bar's x position to get current position in progress bar
      const pos =
        (e.pageX - progressDiv.getClientRects()[0].x) /
        progressDiv.getClientRects()[0].width;
      audio.currentTime = pos * audio.duration;
      changeBar();
    }
  
    function init() {
      //reset music duration and setup audio
      const audio =
        document.getElementById(currentAudio) === null
          ? new Audio()
          : document.getElementById(currentAudio);
      audio.src = list[currentId].url;
      audio.id = currentAudio;
      document.getElementById(currentAudio) === null
        ? document.body.appendChild(audio)
        : "";
  
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      document.getElementById(currentAudio).currentTime = 0;
  
      title.innerHTML = list[currentId].title;
      author.innerHTML = list[currentId].author;
      cover.src = list[currentId].cover;
  
      //set current time
      audio.addEventListener("loadedmetadata", function() {
        const leftMinute = Math.floor(audio.duration / 60);
        const leftSecond = Math.floor(audio.duration % 60);
        currentTimeIndicator.innerHTML = "00:00";
        leftTimeIndicator.innerHTML =
          ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
        progressBar.style.transition = "";
      });
  
      //set loop
      document.getElementById(currentAudio).onended = e => goToNextMusic(e);
    }
  
    playBtn.addEventListener("click", play);
    loopBtn.addEventListener("click", loop);
  
    shuffleBtn.addEventListener("click", shuffle);
    forwardBtn.addEventListener("click", forward);
    backwardBtn.addEventListener("click", backward);
  
    prevBtn.addEventListener("click", e => nextMusic("prev"));
    nextBtn.addEventListener("click", e => nextMusic("next"));
    progressDiv.addEventListener("click", e => {
      progress(e);
    });
  
    init();
  })();
  