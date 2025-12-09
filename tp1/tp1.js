document.addEventListener('DOMContentLoaded', () => {
    
    const carouselContainer = document.getElementById('tpCarouselPage');
    const prevBtn = document.getElementById('prevBtnPage');
    const nextBtn = document.getElementById('nextBtnPage');
    
    if (!carouselContainer || !prevBtn || !nextBtn) {
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