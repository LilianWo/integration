document.addEventListener('DOMContentLoaded', () => {
    
    // Cibler les éléments du carrousel sur la page TP
    const carouselContainer = document.getElementById('tpCarouselPage');
    const prevBtn = document.getElementById('prevBtnPage');
    const nextBtn = document.getElementById('nextBtnPage');
    
    if (!carouselContainer || !prevBtn || !nextBtn) {
        // Le carrousel peut ne pas être chargé si vous n'avez pas mis tous les liens TP, ce n'est pas bloquant ici.
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