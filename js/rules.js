const openBtn = document.querySelector(".game-area__rules");
const closeBtn = document.querySelector(".rules-header__close-window");
const rulesWindowContainer = document.querySelector(".rules-window-container")
// const mainContainer = document.querySelector(".main-container");

const rulesElements = [openBtn, closeBtn];

const openCloseRulesWindow = () => {
    rulesWindowContainer.classList.toggle("rules-window-container--active");
}

rulesElements.forEach(openClose => openClose.addEventListener("click", openCloseRulesWindow));