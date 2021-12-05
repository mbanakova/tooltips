"use strict";

(function () {
  const tooltips = document.querySelectorAll(".all-tooltip .tooltip");
  const fullDiv = document.querySelector("section");
  const container = document.querySelector(".container");
  let timeoutId; // window.addEventListener("DOMContentLoaded", contentPosition);

  window.onload = contentPosition;
  window.addEventListener("resize", contentPosition);

  function contentPosition() {
    tooltips.forEach(tooltip => {
      const pin = tooltip.querySelector(".pin");
      const pinSize = 20;
      const pinGap = pinSize / 2;
      const pinLeft = pin.offsetLeft;
      const content = tooltip.querySelector(".tooltip-content");
      const arrow = tooltip.querySelector(".arrow");

      if (pinLeft + content.offsetWidth / 2 > fullDiv.offsetWidth) {
        const extraLeft = fullDiv.offsetWidth - (pinLeft + content.offsetWidth / 2);
        content.style.left = `${pinLeft - content.offsetWidth / 2 + extraLeft - pinGap}px`;
        content.style.top = `${pin.offsetTop + pinSize + pinGap}px`;
      } else if (pin.offsetLeft + container.offsetLeft < content.offsetWidth / 2) {
        content.style.left = `${-container.offsetLeft + pinGap}px`;
        content.style.top = `${pin.offsetTop + pinSize + pinGap}px`;
      } else {
        content.style.left = `${pinLeft - content.offsetWidth / 2}px`;
        content.style.top = `${pin.offsetTop + pinSize + pinGap}px`;
      }

      arrow.style.left = `${pinLeft - content.offsetLeft}px`;
      content.style.zIndex = 50;
    });
  }

  tooltips.forEach(tooltip => {
    const pin = tooltip.querySelector(".pin");
    const content = tooltip.querySelector(".tooltip-content");
    pin.addEventListener("mouseover", () => {
      tooltip.classList.add("active");
    }); // если мышь ушла с пина и зашла на карточку (у неё 2 сек)

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
  }); // пузырьки на кнопке

  function getClickCoords(elem, event) {
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
    btn.addEventListener('mousemove', function (evt) {
      getClickCoords(btn, evt);
      const coords = getClickCoords(btn, evt);
      const x = coords.x;
      const y = coords.y;
      const bubbles = document.createElement('span');
      bubbles.classList.add("bubble");
      bubbles.style.left = `${x}px`;
      bubbles.style.top = `${y}px`;
      this.appendChild(bubbles);
      setTimeout(() => {
        bubbles.remove();
      }, 1000);
    });
  }); // -------------- отбивает разряды + ₽

  function splitPrice(price) {
    price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${price} ₽`;
  }

  let priceDiv = document.querySelectorAll(".js-price");
  priceDiv.forEach(div => div.textContent = splitPrice(div.textContent));
})();
//# sourceMappingURL=script.js.map
