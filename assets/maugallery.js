const dataPictures = {
    "gallery-picture": [
        {
            "filename": "./images/gallery/concerts/aaron-paul-large.webp",
            "tags": ["concert", "tous"],
            "description": "Concert vu du public"
        },
        {
            "filename": "./images/gallery/entreprise/ali-morshedlou-large.webp",
            "tags": ["entreprises", "tous"],
            "description": "Homme en costume noir posé"
        },
        {
            "filename": "./images/gallery/entreprise/jason-goodman-large.webp",
            "tags": ["entreprises", "tous"],
            "description": "Femme souriante assise au travail"
        },
        {
            "filename": "./images/gallery/mariage/hannah-busing-large.webp",
            "tags": ["mariages", "tous"],
            "description": "Un homme et une femme se tendant les mains"
        },
        {
            "filename": "./images/gallery/portraits/ade-tunji-large.webp",
            "tags": ["portrait", "tous"],
            "description": "Portrait d'un homme fermant les yeux"
        },
        {
            "filename": "./images/gallery/mariage/jakob-owens-large.webp",
            "tags": ["mariages", "tous"],
            "description": "Mariés se tenant la main en extérieur et heureux"
        },
        {
            "filename": "./images/gallery/portraits/van-prattenburg-large.webp",
            "tags": ["portrait", "tous"],
            "description": "Portrait d'une jeune femme blanche à lunettes"
        },
        {
            "filename": "./images/gallery/concerts/austin-neill-large.webp",
            "tags": ["concert", "tous"],
            "description": "Portrait d'un chanteur vu de la foule"
        },
        {
            "filename": "./images/gallery/entreprise/mateus-campos-felipe-large.webp",
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

                const sourceLarge = document.createElement("source");
                sourceLarge.srcset = item.filename;
                sourceLarge.media = "(min-width: 992px)";
                sourceLarge.type = "image/webp";

                const sourceMedium = document.createElement("source");
                sourceMedium.srcset = item.filename.replace("-large.webp", "-medium.webp");
                sourceMedium.media = "(min-width: 576px)";
                sourceMedium.type = "image/webp";

                const img = document.createElement("img");
                img.className = "gallery-picture";
                img.dataset.galleryTag = item.tags[0];
                img.src = item.filename.replace("-large.webp", "-small.webp");
                img.alt = item.description;

                picture.appendChild(sourceLarge);
                picture.appendChild(sourceMedium);
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
});