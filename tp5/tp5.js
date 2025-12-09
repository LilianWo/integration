function toHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function updateBackgroundColor() {
    
    const scrollableElement = document.getElementById('exo2_scrollable_content');

    if (!scrollableElement) return;

    const scrollHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
    const scrollTop = scrollableElement.scrollTop;
    let scrollProgress = 0;
    if (scrollHeight > 0) {
        scrollProgress = scrollTop / scrollHeight;
    }
    scrollProgress = Math.max(0, Math.min(1, scrollProgress)); 

    const redValue = Math.round(255 * scrollProgress); 
    const newColor = `#${toHex(redValue)}0000`; 

    scrollableElement.style.backgroundColor = newColor;
    
}

document.addEventListener('DOMContentLoaded', function() {
    const scrollableContent = document.getElementById('exo2_scrollable_content');

    if (scrollableContent) {
        scrollableContent.addEventListener('scroll', updateBackgroundColor);
        
        updateBackgroundColor();
    }
});