const EX4_IMAGE_SRC = 'https://picsum.photos/400/300'; 
const EX5_IMAGE_SRC = 'https://picsum.photos/960/540'; 

function setupEx4() {
    const canvas = document.getElementById('imageCanvas');
    if (!canvas) return; 

    const ctx = canvas.getContext('2d');
    const colorDisplay = document.getElementById('colorDisplay');
    const colorInfo = document.getElementById('colorInfo');

    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
        const displayWidth = 400;
        const displayHeight = 300; 

        canvas.width = displayWidth;
        canvas.height = displayHeight;
        
        ctx.drawImage(img, 0, 0, displayWidth, displayHeight);

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const pixelData = ctx.getImageData(x, y, 1, 1).data; 
            const r = pixelData[0];
            const g = pixelData[1];
            const b = pixelData[2];

            const rgbColor = `rgb(${r}, ${g}, ${b})`;
            colorDisplay.style.backgroundColor = rgbColor;

            const hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
            
            colorInfo.innerHTML = `
                <p>Coordonnées: (${Math.floor(x)}, ${Math.floor(y)})</p>
                <p>RGB: ${r}, ${g}, ${b}</p>
                <p>HEX: ${hexColor}</p>
            `;
        });
    };

    img.src = EX4_IMAGE_SRC;
}

function setupEx5() {
    const mainCanvas = document.getElementById('mainCanvas');
    const magnifierCanvas = document.getElementById('magnifierCanvas');
    if (!mainCanvas || !magnifierCanvas) return; 

    const mainCtx = mainCanvas.getContext('2d');
    const magnifierCtx = magnifierCanvas.getContext('2d');

    const CANVAS_WIDTH = 640;
    const CANVAS_HEIGHT = 360;
    const MAGNIFIER_SIZE = 150; 

    mainCanvas.width = CANVAS_WIDTH;
    mainCanvas.height = CANVAS_HEIGHT;
    magnifierCanvas.width = MAGNIFIER_SIZE;
    magnifierCanvas.height = MAGNIFIER_SIZE;

    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
        const IMG_WIDTH = img.naturalWidth; 
        const IMG_HEIGHT = img.naturalHeight; 

        mainCtx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        mainCanvas.addEventListener('mousemove', (event) => {
            const rect = mainCanvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const scaleX = IMG_WIDTH / CANVAS_WIDTH; 
            const scaleY = IMG_HEIGHT / CANVAS_HEIGHT; 

            const realX = mouseX * scaleX;
            const realY = mouseY * scaleY;

            const sourceSize = MAGNIFIER_SIZE; 
            const sourceX = realX - sourceSize / 2;
            const sourceY = realY - sourceSize / 2;

            magnifierCtx.clearRect(0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE);
            
            magnifierCtx.save();
            magnifierCtx.beginPath();
            magnifierCtx.arc(MAGNIFIER_SIZE / 2, MAGNIFIER_SIZE / 2, MAGNIFIER_SIZE / 2, 0, Math.PI * 2, true);
            magnifierCtx.clip(); 

            magnifierCtx.drawImage(
                img, 
                sourceX, sourceY, sourceSize, sourceSize, 
                0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE 
            );

            magnifierCtx.restore(); 
        });
        
        mainCanvas.addEventListener('mouseleave', () => {
            magnifierCtx.clearRect(0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE);
        });
    };

    img.src = EX5_IMAGE_SRC;
}

window.onload = () => {
    setupEx4();
    setupEx5();
};