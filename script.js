// SINGLE VIEWER ON THE WEBSITE - doesnt respect DRY rule :-)
// Petr Hovorka

const modelViewer = document.querySelector(".model");
let i;

//--------------------------------------------------------Toggle element
const coll = document.querySelector(".collapsible");
coll.addEventListener("click", function () {
  this.classList.toggle("active");
  const content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
});

//-------------------------------------------------------show menu after launch 3D
modelViewer.addEventListener("click", function () {
  const ml = this.querySelector(".drop");
  ml.style.display = "block";
  const showFull = this.querySelector(".fullScreen");
  showFull.style.display = "block";
});
//--------------------------------------------------------------------hide progress bar when content loaded
modelViewer.addEventListener("load", function () {
  const progress = this.querySelector(".progress");
  progress.style.display = "none";
});

//-------------------------------------------------------------fullscreen
const full = document.querySelector(".fullScreen");
const exitfull = document.querySelector(".exit-Fullscreen");

/* View in fullscreen */
function openFullscreen() {
  if (modelViewer.requestFullscreen) {
    modelViewer.requestFullscreen();
    exitfull.style.display = "block";
    full.style.display = "none";
  } else if (modelViewer.webkitRequestFullscreen) {
    /* Safari */
    modelViewer.webkitRequestFullscreen();
  } else if (modelViewer.msRequestFullscreen) {
    /* IE11 */
    modelViewer.msRequestFullscreen();
  }
}

//----------------------------------------------------close fullscreen
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

exitfull.addEventListener("click", () => {
  full.style.display = "block";
  exitfull.style.display = "none";
});

//----------------------------------------------------Background color
const bgG = document.querySelector(".bgGrey");
bgG.addEventListener("click", () => {
  modelViewer.style.background = "linear-gradient(#ffffff, #ada996)";
});

const bgW = document.querySelector(".bgWhite");
bgW.addEventListener("click", () => {
  modelViewer.style.background = "#ffffff  no-repeat right top";
});

const bgB = document.querySelector(".bgBlack");
bgB.addEventListener("click", () => {
  modelViewer.style.background = "radial-gradient(circle,rgba(161, 161, 176, 1) 0%,rgba(143, 143, 152, 1) 5%,rgba(0, 0, 0, 1) 100%)";
});

//-------------------------------------------------------Views
const views = {
  top: "0deg 0deg 90deg",
  front: "0deg 90deg 0deg",
  left: "-90deg 90deg 0deg",
  right: "90deg 90deg 0deg",
  back: "180deg 90deg 0deg",
  iso: "-45deg 60deg 60deg"
};

function setCameraOrbit(view) {
  modelViewer.cameraOrbit = views[view];
}

function addClickListener(view, element) {
  element.addEventListener("click", () => setCameraOrbit(view));
}

addClickListener("front", document.querySelector(".front"));
addClickListener("top", document.querySelector(".top"));
addClickListener("left", document.querySelector(".left"));
addClickListener("right", document.querySelector(".right"));
addClickListener("back", document.querySelector(".back"));
addClickListener("iso", document.querySelector(".iso"));

//------------------------------------------------------- play, pause animation

let playBtn = document.querySelector(".play");
let pauseBtn = document.querySelector(".pause");

playBtn.addEventListener("click", () => {
  modelViewer.play();
    
});
pauseBtn.addEventListener("click", () => {
  modelViewer.pause();
});


//----------------------------------progress bar
const progress = document.querySelector(".progress");
const bar = progress.querySelector(".bar");

modelViewer.addEventListener("progress", (event) => {
  const { totalProgress } = event.detail;
  progress.classList.toggle("show", totalProgress < 1);
  bar.style.transform = `scaleX(${totalProgress})`;
});

// ---------------------------------------------------Close the dropdown if the user clicks outside of it
document.addEventListener("click", (event) => {
  if (!event.target.matches(".menu")) {
    const dropdown = document.querySelector(".content");
    if ((dropdown.style.display = "block")) {
      dropdown.style.display = "none";
    }
  }
});



//--------------------------------------------------------------slider animation

let slider = document.querySelector(".anim-Range");
slider.max = Math.floor(modelViewer.duration * 100) / 100;
let updateSlider = () => {
  slider.max = Math.floor(modelViewer.duration * 100) / 100;
  slider.value = modelViewer.currentTime;
};
slider.addEventListener("input", (event) => {
  modelViewer.currentTime = event.target.value;
});

self.setInterval(() => {
  updateSlider();
}, 100);

//--------------------------------------------------------------hide animation toolbar when no animation appears

modelViewer.addEventListener("load", () => {
  const animations = modelViewer.availableAnimations;
  const numberOfAnimations = animations.length;
  const animToolbar = document.querySelector(".animation-Toolbar");
  console.log(numberOfAnimations);
  if (numberOfAnimations) {
    animToolbar.style.display = "block";
  } 
  else {
  animToolbar.style.display = "none";
}
});

// ----------------------------------------------------change model src and zoom on click slide

const slides = document.querySelectorAll(".slide-Picture");
window.switchSrc = (element, source, orbit, target, minOrbit, minFov) => {
  modelViewer.src = source;
  modelViewer.cameraOrbit = orbit;
  modelViewer.cameraTarget = target;
  modelViewer.minCameraOrbit = minOrbit;
  modelViewer.minFieldOfView = minFov;


  slides.forEach((element) => {
    element.classList.remove("selected");
    element.firstChild.nextElementSibling.style.display = "block";

  });
  element.classList.add("selected");
  element.firstChild.nextElementSibling.style.display = "none";
 
};

