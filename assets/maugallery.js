document.addEventListener("DOMContentLoaded", function () {
  try {
    const gallery = document.querySelector(".gallery");
    const galleryOptions = {
      columns: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
      },
      lightBox: true,
      lightboxId: "myAwesomeLightbox",
      showTags: true,
      tagsPosition: "top",
    };
    mauGallery(gallery, galleryOptions);
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
});

function mauGallery(gallery, options) {
  const tagsCollection = [];
  createRowWrapper(gallery);

  if (options.lightBox) {
    createLightBox(gallery, options.lightboxId, options.navigation);
  }

  listeners(options);

  const galleryItems = gallery.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    responsiveImageItem(item);
    wrapItemInColumn(item, options.columns);

    const theTag = item.dataset.galleryTag;
    if (options.showTags && theTag !== undefined && tagsCollection.indexOf(theTag) === -1) {
      tagsCollection.push(theTag);
    }
  });

  if (options.showTags) {
    showItemTags(gallery, options.tagsPosition, tagsCollection);
  }

  gallery.style.display = "block";
}

function createRowWrapper(element) {
  if (!element.querySelector(".gallery-items-row")) {
    const rowWrapper = document.createElement("div");
    rowWrapper.className = "gallery-items-row row";
    element.appendChild(rowWrapper);
  }
}

function wrapItemInColumn(element, columns) {
  if (columns.constructor === Number) {
    const columnClasses = `mb-4 col-${Math.ceil(12 / columns)}`;
    const columnWrapper = document.createElement("div");
    columnWrapper.className = "item-column " + columnClasses;
    element.parentNode.appendChild(columnWrapper);
    columnWrapper.appendChild(element);
  } else if (columns.constructor === Object) {
    let columnClasses = "mb-4";
    if (columns.xs) {
      columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
    }
    if (columns.sm) {
      columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
    }
    if (columns.md) {
      columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
    }
    if (columns.lg) {
      columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
    }
    if (columns.xl) {
      columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
    }
    const columnWrapper = document.createElement("div");
    columnWrapper.className = "item-column " + columnClasses;
    element.parentNode.appendChild(columnWrapper);
    columnWrapper.appendChild(element);
  } else {
    console.error(`Columns should be defined as numbers or objects. ${typeof columns} is not supported.`);
  }
}

function responsiveImageItem(element) {
  if (element.tagName === "IMG") {
    element.classList.add("img-fluid");
  }
}

function createLightBox(gallery, lightboxId) {
  const lightboxHtml = `
    <div class="modal fade" id="${lightboxId ? lightboxId : "galleryLightbox"}" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div id="prevButton" class="mg-prev">&lt;</div>
            <img id="lightboxImage" class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clic" />
            <div id="nextButton" class="mg-next">&gt;</div>
          </div>
        </div>
      </div>
    </div>`;

  gallery.insertAdjacentHTML("beforeend", lightboxHtml);

  const lightboxContainer = document.querySelector(`#${lightboxId}`);
  const lightboxImage = document.querySelector('#lightboxImage');

  lightboxContainer.style.zIndex = "999";  // Met la lightbox-container en avant-plan

  lightboxContainer.addEventListener('click', function (e) {
    if (e.target === lightboxContainer) {
      lightboxContainer.style.display = 'none';
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target !== lightboxImage && e.target.id !== 'prevButton' && e.target.id !== 'nextButton') {
      lightboxContainer.style.display= 'none';
    }
  });
}



function showItemTags(gallery, position, tags) {
  let tagItems = '<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>';
  tags.forEach((value, index) => {
    tagItems += `<li class="nav-item active">
      <span class="nav-link" data-images-toggle="${value}">${value}</span></li>`;
  });

  const tagsBarHtml = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

  if (position === "bottom") {
    gallery.insertAdjacentHTML("beforeend", tagsBarHtml);
  } else if (position === "top") {
    gallery.insertAdjacentHTML("afterbegin", tagsBarHtml);
  } else {
    console.error(`Unknown tags position: ${position}`);
  }
}

function listeners(options) {
  document.addEventListener("click", function (e) {
    if (options.lightBox && e.target.tagName === "IMG") {
      openLightBox(e.target, options.lightboxId);
    }
  });

  document.querySelector(".gallery").addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-link")) {
      filterByTag(e.target);
    }
  });

  document.querySelector(".gallery").addEventListener("click", function (e) {
    if (e.target.classList.contains("mg-prev")) {
      prevImage(options.lightboxId);
    } else if (e.target.classList.contains("mg-next")) {
      nextImage(options.lightboxId);
    }
  });
}

function createLightBoxContainer(gallery) {
  const lightboxContainer = document.createElement("div");
  lightboxContainer.className = "lightbox-container";
  gallery.appendChild(lightboxContainer);
  lightboxContainer.style.display = "none";
  return lightboxContainer;
}


function openLightBox(element) {
  const lightboxContainer = document.querySelector(".lightbox-container");
  const lightbox = lightboxContainer.querySelector(".lightbox");
  const lightboxImage = lightbox.querySelector(".lightboxImage");

  lightboxImage.src = element.src;
  lightboxContainer.style.display = "block";
}



function filterByTag(tagElement) {
  document.querySelectorAll(".nav-link").forEach((element) => {
    element.classList.remove("active", "active-tag");
  });
  tagElement.classList.add("active", "active-tag");

  const tag = tagElement.getAttribute("data-images-toggle");
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    const itemTag = item.getAttribute("data-gallery-tag");
    if (tag === "all" || itemTag === tag) {
      item.closest(".item-column").style.display = "block";
    } else {
      item.closest(".item-column").style.display = "none";
    }
  });
}

function prevImage(lightboxId) {
  const activeImage = document.querySelector(".lightboxImage");
  let activeTag = document.querySelector(".active-tag").getAttribute("data-images-toggle");
  let imagesCollection = [];

  if (activeTag === "all") {
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      imagesCollection.push(item);
    });
  } else {
    document.querySelectorAll(`.gallery-item[data-galleryTag="${activeTag}"]`).forEach(function (item) {
      imagesCollection.push(item);
    });
  }

  let index = 0;
  let next = null;

  imagesCollection.forEach(function (item, i) {
    if (activeImage.src === item.src) {
      index = i - 1;
    }
  });

  next = imagesCollection[index] || imagesCollection[imagesCollection.length - 1];
  activeImage.src = next.src;
}

function nextImage(lightboxId) {
  const activeImage = document.querySelector(".lightboxImage");
  let activeTag = document.querySelector(".active-tag").getAttribute("data-images-toggle");
  let imagesCollection = [];

  if (activeTag === "all") {
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      imagesCollection.push(item);
    });
  } else {
    document.querySelectorAll(`.gallery-item[data-galleryTag="${activeTag}"]`).forEach(function (item) {
      imagesCollection.push(item);
    });
  }

  let index = 0;
  let next = null;

  imagesCollection.forEach(function (item, i) {
    if (activeImage.src === item.src) {
      index = i + 1;
    }
  });

  next = imagesCollection[index] || imagesCollection[0];
  activeImage.src = next.src;
}