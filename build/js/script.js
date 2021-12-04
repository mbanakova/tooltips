"use strict";

const tooltips = document.querySelectorAll(".all-tooltip .tooltip");
const fullDiv = document.querySelector("section");
const container = document.querySelector(".container");
let timeoutId;
window.addEventListener("resize", contentPosition);
window.addEventListener("DOMContentLoaded", contentPosition);

function contentPosition() {
  tooltips.forEach(tooltip => {
    const pin = tooltip.querySelector(".pin");
    const content = tooltip.querySelector(".tooltip-content");
    const arrow = tooltip.querySelector(".arrow");
    const pinLeft = pin.offsetLeft;

    if (pinLeft + content.offsetWidth / 2 > fullDiv.offsetWidth) {
      const extraLeft = fullDiv.offsetWidth - (pinLeft + content.offsetWidth / 2); // console.log('right-conflict', tooltip)

      content.style.left = pinLeft - content.offsetWidth / 2 + extraLeft - 40 + "px";
      content.style.top = pin.offsetTop + 40 + "px";
    } else if (pin.offsetLeft + container.offsetLeft < content.offsetWidth / 2) {
      // console.log('left conflict', pin.offsetLeft)
      content.style.left = -container.offsetLeft + "px";
      content.style.top = pin.offsetTop + 30 + "px";
    } else {
      content.style.left = `${pinLeft - content.offsetWidth / 2}px`;
      content.style.top = `${pin.offsetTop + 30}px`;
    }

    arrow.style.left = `${pinLeft - content.offsetLeft}px`;
    content.style.zIndex = 50;
  });
}

tooltips.forEach(tooltip => {
  const pin = tooltip.querySelector(".pin");
  const content = tooltip.querySelector(".tooltip-content");
  pin.addEventListener("mouseover", () => {
    console.log(pin.offsetLeft);
    tooltip.classList.add("active");
  });
  pin.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      if (!tooltip.classList.contains("content-hover")) {
        tooltip.classList.remove("active");
      }
    }, 2000);
  });
  content.addEventListener("mouseover", () => {
    clearTimeout(timeoutId);
    tooltip.classList.add("active");
    tooltip.classList.add("content-hover");
  });
  content.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      tooltip.classList.remove("active");
      tooltip.classList.remove("content-hover");
    }, 2000);
  });
}); // // *********************
// // This Code is for only the floating card in right bottom corner
// // **********************
// const WebCifarIcon = document.querySelector("#webCifar-icon");
// const WebCifarEl = document.querySelector("#webCifar");
// const close = WebCifarEl.querySelector(".close");
// const youtubeLink = document.querySelector(".youtubeLink");
// WebCifarIcon.addEventListener("click", () => {
//   WebCifarEl.classList.add("active");
// });
// close.addEventListener("click", () => {
//   WebCifarEl.classList.remove("active");
// });
// youtubeLink.setAttribute("href", "https://youtu.be/e_jEquJo7y8");

function getCursorPosition(elem, event) {
  const rect = elem.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);
  return {
    x,
    y
  };
}

const buttons = document.querySelectorAll('.content__button');
buttons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    getCursorPosition(btn, e);
    const coords = getCursorPosition(btn, e);
    const x = coords.x;
    const y = coords.y;
    const ripples = document.createElement('span');
    ripples.classList.add("bubble");
    ripples.style.left = `${x}px`;
    ripples.style.top = `${y}px`;
    this.appendChild(ripples);
    setTimeout(() => {
      ripples.remove();
    }, 500);
  });
}); // -------------- отбивает разряды + ₽

function splitPrice(price) {
  price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${price} ₽`;
}

let priceDiv = document.querySelectorAll(".js-price");
priceDiv.forEach(div => div.textContent = splitPrice(div.textContent));
//# sourceMappingURL=script.js.map
