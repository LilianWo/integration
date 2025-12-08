// --- Configuration des Images (IMPORTANT : REMPLACER PAR VOS PROPRES CHEMINS D'IMAGES) ---
const EX4_IMAGE_SRC = 'https://picsum.photos/400/300'; // Image pour Exercice 4
const EX5_IMAGE_SRC = 'https://picsum.photos/960/540'; // Image pour Exercice 5 (Haute résolution)


// =========================================================================================
//                                   EXERCICE 4 : Couleur du Pixel
// =========================================================================================

function setupEx4() {
    const canvas = document.getElementById('imageCanvas');
    // Vérifier si l'élément existe avant de continuer
    if (!canvas) return; 

    const ctx = canvas.getContext('2d');
    const colorDisplay = document.getElementById('colorDisplay');
    const colorInfo = document.getElementById('colorInfo');

    const img = new Image();
    img.crossOrigin = "Anonymous"; // Nécessaire si l'image n'est pas sur le même domaine

    img.onload = () => {
        // Taille d'affichage souhaitée
        const displayWidth = 400;
        const displayHeight = 300; 

        canvas.width = displayWidth;
        canvas.height = displayHeight;
        
        // Dessiner l'image sur le canvas (mise à l'échelle)
        ctx.drawImage(img, 0, 0, displayWidth, displayHeight);

        canvas.addEventListener('click', (event) => {
            // 1. Calculer les coordonnées du clic sur le canvas
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // 2. Récupérer les données du pixel
            // Retourne [R, G, B, A]
            const pixelData = ctx.getImageData(x, y, 1, 1).data; 
            const r = pixelData[0];
            const g = pixelData[1];
            const b = pixelData[2];

            // 3. Affichage de la couleur (div colorDisplay)
            const rgbColor = `rgb(${r}, ${g}, ${b})`;
            colorDisplay.style.backgroundColor = rgbColor;

            // 4. Conversion en HEX et affichage des informations
            // Technique rapide pour obtenir le format HEX
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

// =========================================================================================
//                                   EXERCICE 5 : Effet de Loupe
// =========================================================================================

function setupEx5() {
    const mainCanvas = document.getElementById('mainCanvas');
    const magnifierCanvas = document.getElementById('magnifierCanvas');
    // Vérifier si les éléments existent avant de continuer
    if (!mainCanvas || !magnifierCanvas) return; 

    const mainCtx = mainCanvas.getContext('2d');
    const magnifierCtx = magnifierCanvas.getContext('2d');

    // Dimensions spécifiées
    const CANVAS_WIDTH = 640;
    const CANVAS_HEIGHT = 360;
    const MAGNIFIER_SIZE = 150; // Taille du canvas de loupe

    // Configuration des canvas
    mainCanvas.width = CANVAS_WIDTH;
    mainCanvas.height = CANVAS_HEIGHT;
    magnifierCanvas.width = MAGNIFIER_SIZE;
    magnifierCanvas.height = MAGNIFIER_SIZE;

    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
        const IMG_WIDTH = img.naturalWidth;   // Ex: 1920
        const IMG_HEIGHT = img.naturalHeight; // Ex: 1080

        // Dessiner l'image originale mise à l'échelle sur le mainCanvas
        mainCtx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        mainCanvas.addEventListener('mousemove', (event) => {
            const rect = mainCanvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // 1. Calculer le ratio d'échelle (Zoom Factor)
            const scaleX = IMG_WIDTH / CANVAS_WIDTH; // Ex: 3
            const scaleY = IMG_HEIGHT / CANVAS_HEIGHT; // Ex: 3

            // 2. Coordonnées de la souris sur l'image réelle (grande taille)
            const realX = mouseX * scaleX;
            const realY = mouseY * scaleY;

            // 3. Définir la zone de l'image réelle à copier (source)
            const sourceSize = MAGNIFIER_SIZE; // On veut afficher une zone de 150x150 en taille réelle
            // Le point de départ est le centre de la loupe moins la moitié de sa taille
            const sourceX = realX - sourceSize / 2;
            const sourceY = realY - sourceSize / 2;

            // 4. Vider et appliquer le masque circulaire
            magnifierCtx.clearRect(0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE);
            
            magnifierCtx.save();
            magnifierCtx.beginPath();
            magnifierCtx.arc(MAGNIFIER_SIZE / 2, MAGNIFIER_SIZE / 2, MAGNIFIER_SIZE / 2, 0, Math.PI * 2, true);
            magnifierCtx.clip(); // Limite le dessin au cercle

            // 5. Dessiner la zone zoomée (taille réelle)
            // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
            magnifierCtx.drawImage(
                img, 
                sourceX, sourceY, sourceSize, sourceSize, // Source (image réelle)
                0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE      // Destination (canvas loupe)
            );

            magnifierCtx.restore(); // Retire le masque pour les prochains dessins
        });
        
        // Cacher la loupe lorsque la souris quitte le canvas principal
        mainCanvas.addEventListener('mouseleave', () => {
            magnifierCtx.clearRect(0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE);
        });
    };

    img.src = EX5_IMAGE_SRC;
}

// Lancer les configurations après le chargement du DOM
window.onload = () => {
    setupEx4();
    setupEx5();
};