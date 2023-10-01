// Attend que le document soit prêt
$(document).ready(function() {
    try {
        // Sélectionne l'élément HTML avec la classe "gallery" et initialise la galerie
        const $gallery = $('.gallery');
        
        // Configuration de la galerie
        const galleryOptions = {
            columns: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3
            },
            lightBox: true, // Active la lightbox //
            lightboxId: 'myAwesomeLightbox', // ID de la lightbox //
            showTags: true, // Affiche les tags //
            tagsPosition: 'top' // Position des tags //
        };
        
        // Initialise la galerie avec les options //
        $gallery.mauGallery(galleryOptions);
    } catch (error) {
        // Gestion des erreurs //
        console.error('Une erreur s\'est produite :', error);
    }
});