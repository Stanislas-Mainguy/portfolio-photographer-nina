const dataPictures = {
    "gallery-picture": [
        {
            "filename": [
                "./images/gallery/concerts/aaron-paul-large.webp",
                "./images/gallery/concerts/aaron-paul-medium.webp",
                "./images/gallery/concerts/aaron-paul-mini.webp",
                "./images/gallery/concerts/aaron-paul-375.webp"
            ],
            "tags": ["concert", "tous"],
            "description": "Concert vu du public"
        },
        {
            "filename": [
                "./images/gallery/entreprise/ali-morshedlou-large.webp",
                "./images/gallery/entreprise/ali-morshedlou-medium.webp",
                "./images/gallery/entreprise/ali-morshedlou-mini.webp",
                "./images/gallery/entreprise/ali-morshedlou-375.webp"
            ],
            "tags": ["entreprises", "tous"],
            "description": "Homme en costume noir posé"
        },
        {
            "filename": [
                "./images/gallery/entreprise/jason-goodman-large.webp",
                "./images/gallery/entreprise/jason-goodman-medium.webp",
                "./images/gallery/entreprise/jason-goodman-mini.webp",
                "./images/gallery/entreprise/jason-goodman-375.webp"
            ],
            "tags": ["entreprises", "tous"],
            "description": "Femme souriante assise au travail"
        },
        {
            "filename": [
                "./images/gallery/mariage/hannah-busing-large.webp",
                "./images/gallery/mariage/hannah-busing-medium.webp",
                "./images/gallery/mariage/hannah-busing-mini.webp",
                "./images/gallery/mariage/hannah-busing-375.webp"
            ],
            "tags": ["mariages", "tous"],
            "description": "Un homme et une femme se tendant les mains"
        },
        {
            "filename": [
                "./images/gallery/portraits/ade-tunji-large.webp",
                "./images/gallery/portraits/ade-tunji-medium.webp",
                "./images/gallery/portraits/ade-tunji-mini.webp",
                "./images/gallery/portraits/ade-tunji-375.webp"
            ],
            "tags": ["portrait", "tous"],
            "description": "Portrait d'un homme fermant les yeux"
        },
        {
            "filename": [
                "./images/gallery/mariage/jakob-owens-large.webp",
                "./images/gallery/mariage/jakob-owens-medium.webp",
                "./images/gallery/mariage/jakob-owens-mini.webp",
                "./images/gallery/mariage/jakob-owens-375.webp"
            ],
            "tags": ["mariages", "tous"],
            "description": "Mariés se tenant la main en extérieur et heureux"
        },
        {
            "filename": [
                "./images/gallery/portraits/van-prattenburg-large.webp",
                "./images/gallery/portraits/van-prattenburg-medium.webp",
                "./images/gallery/portraits/van-prattenburg-mini.webp",
                "./images/gallery/portraits/van-prattenburg-375.webp"
            ],
            "tags": ["portrait", "tous"],
            "description": "Portrait d'une jeune femme blanche à lunettes"
        },
        {
            "filename": [
                "./images/gallery/concerts/austin-neill-large.webp",
                "./images/gallery/concerts/austin-neill-medium.webp",
                "./images/gallery/concerts/austin-neill-mini.webp",
                "./images/gallery/concerts/austin-neill-375.webp"
            ],
            "tags": ["concert", "tous"],
            "description": "Portrait d'un chanteur vu de la foule"
        },
        {
            "filename": [
                "./images/gallery/entreprise/mateus-campos-felipe-large.webp",
                "./images/gallery/entreprise/mateus-campos-felipe-medium.webp",
                "./images/gallery/entreprise/mateus-campos-felipe-mini.webp",
                "./images/gallery/entreprise/mateus-campos-felipe-375.webp"
            ],
            "tags": ["entreprises", "tous"],
            "description": "Femme souriante assise à son bureau"
        }
    ]
};

document.addEventListener("DOMContentLoaded", function () {
    function displayImagesByTag(tag) {
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";

        dataPictures["gallery-picture"].forEach((item) => {
            if (tag === "Tous" || item.tags.includes(tag)) {
                const picture = document.createElement("picture");
                picture.className = "picture-item";

                let imageUrl = "";
                const currentWidth = window.innerWidth;

                if (currentWidth >= 992) {
                    imageUrl = item.filename[0];
                } else if (currentWidth >= 576) {
                    imageUrl = item.filename[1];
                } else if (currentWidth >= 376) {
                    imageUrl = item.filename[2];
                } else {
                    imageUrl = item.filename[3];
                }

                const img = document.createElement("img");
                img.className = "gallery-picture";
                img.dataset.galleryTag = item.tags[0];
                img.src = imageUrl;
                img.alt = item.description;

                picture.appendChild(img);
                gallery.appendChild(picture);
            }
        });
    }

    displayImagesByTag("Tous");

    const buttons = document.querySelectorAll(".gallery-button");
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const tag = this.textContent.toLowerCase();
            displayImagesByTag(tag);
        });
    });

    window.addEventListener("resize", function () {
        displayImagesByTag("Tous");
    });
});