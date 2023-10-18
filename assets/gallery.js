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
// Fin de section pour le filtrage et comportement de la galerie //

// Section pour la modal et son comportement //
const modal = document.querySelector("#modal-picture");
const modalContent = document.querySelector(".modal-content");
const modalPicture = document.querySelector(".modal-picture");
const allPicture = document.querySelectorAll(".gallery-picture");
const selectorCloseModal = document.querySelector(".close-modal");

// Récupération des éléments de gallery-picture et listener //
allPicture.forEach((picture, index) => {
    picture.addEventListener("click", () => openModal(index));
});

// Ouverture de la modal //
function openModal(imageIndex) {
    const imgUrl = allPicture[imageIndex].getAttribute("src");
    const imgAlt = allPicture[imageIndex].getAttribute("alt");

    const createModalPicture = document.createElement("img");
    createModalPicture.src = imgUrl;
    createModalPicture.alt = imgAlt;

    modalPicture.innerHTML = "";
    modalPicture.appendChild(createModalPicture);

    modal.style.display = "flex";
    modalContent.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Fermeture de la modal //
function closeModal() {
    modal.style.display = "none";
    modalContent.style.display = "none"
    document.body.style.overflow = "auto";
}

selectorCloseModal.addEventListener("click", closeModal);

/*function showNewPicture(imgUrl) {
    const allPicture = document.querySelectorAll(".gallery-picture");
    const rightArrow = document.querySelector(".right-arrow");
    const leftArrow = document.querySelector(".left-arrow");

    function showPreviousPicture() {
        
    }

    function showNextPicture() {

    }
}*/



/*showNewPicture.addEventListener("click", showNewPicture);*/