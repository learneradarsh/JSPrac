"use strict";

function rollTheDice() {
  const imageSrcList = [
    "dice-5.png",
    "dice-1.png",
    "dice-2.png",
    "dice-3.png",
    "dice-4.png",
    "dice-6.png",
  ];
  const randomIndex = Math.trunc(Math.random() * 6);
  document.querySelector(".dice").src = `${imageSrcList[randomIndex]}`;
}

document.querySelector(".btn--roll").addEventListener("click", rollTheDice);
