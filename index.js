document.addEventListener('DOMContentLoaded', () => {
    
    const carouselContainer = document.getElementById('tpCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carouselContainer || !prevBtn || !nextBtn) {
        console.error("Échec du chargement du carrousel. Vérifiez les IDs HTML ('tpCarousel', 'prevBtn', 'nextBtn').");
        return; 
    }
    
    const scrollDistance = carouselContainer.clientWidth; 

    nextBtn.addEventListener('click', () => {
        carouselContainer.scrollBy({
            left: scrollDistance,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        carouselContainer.scrollBy({
            left: -scrollDistance,
            behavior: 'smooth'
        });
    });
});