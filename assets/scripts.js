$(document).ready(function() {
    try {
        const $gallery = $('.gallery');
        
        const galleryOptions = {
            columns: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3
            },
            lightBox: true,
            lightboxId: 'myAwesomeLightbox',
            showTags: true,
            tagsPosition: 'top'
        };
        
        $gallery.mauGallery(galleryOptions);
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
});