                    // Section pour le filtrage et comportement de la galerie //

// Filtrage des photos pour la galerie //
const pictures = document.querySelectorAll(".picture-item");
const buttons = document.querySelectorAll(".gallery-button");
const gallery = document.querySelector(".gallery");

function filterPictures(tag) {
    gallery.classList.add("gallery-open");
    pictures.forEach((picture) => {
        const tags = picture.querySelector("img").dataset.galleryTag.split(", ");
        if (tag === "tous" || tags.includes(tag)) {
            picture.style.display = "block";
        } else {
            picture.style.display = "none";
        }
    });
}

// Listener pour les filtres //
buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const tag = this.textContent.toLowerCase();
        buttons.forEach((btn) => {
            btn.classList.remove("selected-filter");
        })
        this.classList.add("selected-filter");
        filterPictures(tag);
    });
});

// Affichage de base des photos avec le filtre "tous" //
filterPictures("tous");

// Listener pour l'animation des filtres galerie //
gallery.addEventListener("animationend", function () {
    gallery.classList.remove("gallery-open");
});

// Fonction pour gérer le responsive de la galerie //
function setPictureHeight() {
    const screenWidth = window.innerWidth;
    const pictures = document.querySelectorAll(".picture-item");
    const maxScreenWidth = 576;
    const aspectRatio = 1;

    if (screenWidth <= maxScreenWidth) {
        pictures.forEach(picture => {
            picture.style.width = "100%";
            picture.style.height = screenWidth * aspectRatio + "px";
        });
    } else {
        // Rétablir les styles d'image par défaut //
        pictures.forEach(picture => {
            picture.style.width = "";
            picture.style.height = "";
        });
    }
}

window.addEventListener("resize", setPictureHeight);
setPictureHeight();

                    // Fin de section pour le filtrage et comportement de la galerie //

                    // Section pour la modal et son comportement //
const modal = document.querySelector("#modal-picture");
const modalContent = document.querySelector(".modal-content");
const modalPicture = document.querySelector(".modal-picture");
const allPicture = document.querySelectorAll(".gallery-picture");
const selectorCloseModal = document.querySelector(".close-modal");
const rightArrow = document.querySelector(".modal-arrow-right");
const leftArrow = document.querySelector(".modal-arrow-left");
let currentImageIndex = 0;

// Récupération des éléments de gallery-picture et listener //
allPicture.forEach((picture) => {
    picture.addEventListener("click", () => openModal(picture));
});

// Ouverture de la modal //
function openModal(picture) {
    dataIndex = parseInt(picture.getAttribute("data-index"));
    const imgUrl = picture.getAttribute("src");
    const imgAlt = picture.getAttribute("alt");

    const createModalPicture = document.createElement("img");
    createModalPicture.src = imgUrl;
    createModalPicture.alt = imgAlt;

    modalPicture.innerHTML = "";
    modalPicture.appendChild(createModalPicture);

    modal.style.display = "flex";
    modalContent.style.display = "block";
    document.body.style.overflow = "hidden";

    currentImageIndex = dataIndex; 
}

// Fonction pour afficher la prochaine image //
function nextPictureModal() {
    const nextIndexPicture = (currentImageIndex + 1) % allPicture.length;
    const nextPicture = allPicture[nextIndexPicture];
    const imgUrl = nextPicture.getAttribute("src");
    const imgAlt = nextPicture.getAttribute("alt");

    modalPicture.innerHTML = "";
    const createModalPicture = document.createElement("img");
    createModalPicture.src = imgUrl;
    createModalPicture.alt = imgAlt;
    modalPicture.appendChild(createModalPicture);

    currentImageIndex = nextIndexPicture;
}

// Fonction pour afficher la précédente image //
function previousPictureModal() {
    const previousIndexPicture = (currentImageIndex - 1 + allPicture.length) % allPicture.length;
    const previousPicture = allPicture[previousIndexPicture];
    const imgUrl = previousPicture.getAttribute("src");
    const imgAlt = previousPicture.getAttribute("alt");

    modalPicture.innerHTML = "";
    const createModalPicture = document.createElement("img");
    createModalPicture.src = imgUrl;
    createModalPicture.alt = imgAlt;
    modalPicture.appendChild(createModalPicture);

    currentImageIndex = previousIndexPicture;
}

leftArrow.addEventListener("click", () => previousPictureModal());
rightArrow.addEventListener("click", () => nextPictureModal());

// Fermeture de la modal //
function closeModal() {
    modal.style.display = "none";
    modalContent.style.display = "none";
    document.body.style.overflow = "auto";

    currentImageIndex = 0;
}

selectorCloseModal.addEventListener("click", closeModal);
                            


                    // Fin de la section pour la modal et son comportement //