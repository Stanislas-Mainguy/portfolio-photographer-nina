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

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const tag = this.textContent.toLowerCase();
        filterPictures(tag);
    });
});

filterPictures("tous");

gallery.addEventListener("animationend", function () {
    gallery.classList.remove("gallery-open");
});