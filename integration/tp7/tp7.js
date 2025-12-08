let ctx, W, H;
const gridUnit = 20;

// ... (Dans votre logique d'initialisation du Canvas) ...

const canvas = document.getElementById('votre_canvas_id');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    // Assurez-vous que cette variable est définie (ex: 30 pixels par unité)
    const gridUnit = 30; 
    
    // 1. Dessiner la grille
    drawGrid(ctx, W, H, gridUnit); 

    // 2. Dessiner la poule par-dessus
    drawChicken(ctx, W, H, gridUnit); 
}

function clearCanvas() {
    ctx.clearRect(0, 0, W, H);
}

// ------------------------------------------------
// 1. FIGURE (a) : CIBLE CONCENTRIQUE
// ------------------------------------------------
function drawTarget() {
    clearCanvas();
    
    const centerX = W / 2;
    const centerY = H / 2;
    const numCircles = 6; 
    const maxRadius = Math.min(W, H) / 2; 
    const ringWidth = maxRadius / numCircles; 

    // Dessiner les anneaux, de l'extérieur vers l'intérieur
    for (let i = numCircles; i >= 1; i--) {
        const radius = i * ringWidth;
        const isBlack = (i % 2 === 0);
        
        // Couleur : Rouge au centre (i=1), puis alternance noir/blanc
        ctx.fillStyle = (i === 1) ? 'red' : (isBlack ? 'black' : 'white');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}


// ------------------------------------------------
// 2. FIGURE (b) : POULET
// ------------------------------------------------
function drawChicken() {
    clearCanvas();
    const PADDING = 20; // Marge interne
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    
    // Définition de la taille du dessin dans l'unité de grille.
    const GRID_UNIT_SIZE = 9; // Le corps s'étend sur 9 unités de large
    const CHICKEN_WIDTH = GRID_UNIT_SIZE * gridUnit;
    const CHICKEN_HEIGHT = 8 * gridUnit; // Hauteur maximale du corps
    
    const W_PADDED = W - 2 * PADDING;
    const H_PADDED = H - 2 * PADDING;

    // Calcul du décalage pour centrer la figure dans la zone padée
    const offsetX = PADDING + (W_PADDED - CHICKEN_WIDTH) / 2;
    const offsetY = PADDING + (H_PADDED - CHICKEN_HEIGHT) / 2;

    // Points basés sur le quadrillage (lecture de l'image)
    // Coordonnées [x, y]
    const points = [
        // 1. Contour principal du corps
        [2, 3], // 0. Démarrage (Nez)
        [1, 4], [1, 5], [2, 6], [4, 7], [6, 7], [7, 6], [8, 6], 
        [9, 5], [8, 4], [7, 5], [5, 5], [3, 4], 
        [2, 3], // Fermeture de la tête
        
        // 2. Crête
        [3, 3], // Reprise de la tête (moveTo implicite ou explicite)
        [3, 2], [4, 1], [5, 2], [5, 3], // Crête
        
        // 3. Queue (intérieur)
        [7, 5], // Reprise pour le détail de la queue
        [7, 6], [8, 5], 
        
        // 4. Pattes
        [4, 7], // Reprise pour la Patte 1
        [4, 8], [3, 8], [5, 8], // Patte 1 (doigts)
        
        [6, 7], // Reprise pour la Patte 2
        [6, 8], [7, 8], [5, 8] // Patte 2 (doigts)
    ];
    
    ctx.beginPath();
    ctx.lineJoin = 'round';

    points.forEach(([x, y], index) => {
        // Appliquer l'échelle (gridUnit) et le décalage (offsetX/Y)
        const px = x * gridUnit + offsetX;
        const py = y * gridUnit + offsetY;

        // Débuts de chemins (crête, détails de la queue, pattes)
        // [0] : Nez. [14] : Crête. [19] : Détail Queue. [22] : Patte 1. [26] : Patte 2.
        if (index === 0 || index === 14 || index === 19 || index === 22 || index === 26) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    });
    
    ctx.stroke();
    
    // 5. Oeil (Point noir)
    ctx.fillStyle = 'black';
    ctx.beginPath();
    // Coordonnées de l'œil: (3, 4) sur la grille
    ctx.arc(3 * gridUnit + offsetX, 4 * gridUnit + offsetY, 2, 0, Math.PI * 2); 
    ctx.fill();
    ctx.closePath();
}

// ------------------------------------------------
// 3. FIGURE (c) : DAMIER
// ------------------------------------------------
function drawCheckerboard() {
    clearCanvas();
    
    const numSquares = 8; // Damier 8x8
    const squareSize = W / numSquares;
    
    for (let row = 0; row < numSquares; row++) {
        for (let col = 0; col < numSquares; col++) {
            // Alterner la couleur : (row + col) impair = noir, pair = blanc
            const isBlack = (row + col) % 2 !== 0; 
            
            ctx.fillStyle = isBlack ? 'black' : 'white';
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }
}

// ------------------------------------------------
// 4. FIGURE (d) : COURBE QUADRILLÉE
// ------------------------------------------------
function drawCurveQuadrillage() {
    clearCanvas();
    const PADDING = 20; // Conserver le padding pour la marge interne
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // La taille du quadrillage est basée sur la zone padée
    const gridSize = Math.min(W, H) - 2 * PADDING; 
    const numLines = 20; // Nombre de lignes pour créer l'illusion de courbe
    
    // Décalage pour démarrer la figure au coin supérieur gauche du padding
    const offsetX = PADDING; 
    const offsetY = PADDING;
    
    // Pour dessiner la forme vue dans l'image (deux arcs de courbe créés par quadrillage),
    // nous devons dessiner deux quarts de cercle opposés.

    // ----------------------------------------------------
    // PREMIÈRE COURBE : Bas à gauche
    // Relie l'axe X (bas) à l'axe Y (gauche)
    for (let i = 0; i <= numLines; i++) {
        const ratio = i / numLines;
        
        // Point de départ sur l'axe X (bas du quadrillage)
        const startX = offsetX + (gridSize * ratio);
        const startY = offsetY + gridSize; // Base
        
        // Point d'arrivée sur l'axe Y (gauche du quadrillage)
        const endX = offsetX; // Gauche
        const endY = offsetY + (gridSize * (1 - ratio));

        // Dessiner la ligne droite
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    }

    // ----------------------------------------------------
    // DEUXIÈME COURBE : Haut à droite
    // Relie l'axe Y (haut) à l'axe X (droite)
    for (let i = 0; i <= numLines; i++) {
        const ratio = i / numLines;
        
        // Point de départ sur l'axe Y (haut du quadrillage)
        const startX = offsetX + (gridSize * ratio);
        const startY = offsetY; // Haut
        
        // Point d'arrivée sur l'axe X (droite du quadrillage)
        const endX = offsetX + gridSize; // Droite
        const endY = offsetY + (gridSize * (1 - ratio));

        // Dessiner la ligne droite
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    }
}

// ===============================================
// CONTRÔLEUR D'INITIALISATION ET DE NAVIGATION
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas_unique');
    const button = document.getElementById('nextFigureBtn');
    
    if (!canvas || !button) return;

    // Initialisation des variables globales
    ctx = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    
    // Tableau des fonctions de dessin (Vérifiez l'orthographe des noms de fonctions!)
    const drawFunctions = [
        { name: "Cible", func: drawTarget },
        { name: "Poulet", func: drawChicken },
        { name: "Damier", func: drawCheckerboard },
        { name: "Quadrillage", func: drawCurveQuadrillage }
    ];
    
    let currentFigureIndex = 0;

    function renderFigure() {
        drawFunctions[currentFigureIndex].func();
        button.textContent = `Figure Suivante (${currentFigureIndex + 1}/4) →`;
    }

    button.addEventListener('click', function() {
        // Incrémenter l'index et boucler
        currentFigureIndex = (currentFigureIndex + 1) % drawFunctions.length; 
        renderFigure();
    });

    // Dessiner la première figure au chargement
    renderFigure();
});

// ------------------------------------------------
// 5. FIGURE (e) : PAC-MAN (DESSIN STATIQUE)
// ------------------------------------------------
function drawPacManStatic(ctx, W, H) {
    const centerX = W / 2;
    const centerY = H / 2;
    const radius = 100;
    
    // Angles fixes pour la bouche ouverte (ex: 45 degrés d'ouverture totale)
    const mouthOpenAngle = -0.070; // Facteur d'ouverture (1/8 du cercle)
    
    // Convertir les angles en radians pour l'arc
    // Bouche orientée vers la droite (l'arc va de 45° à 315°)
    const startAngle = (0.25 + mouthOpenAngle) * Math.PI; 
    const endAngle = (1.75 - mouthOpenAngle) * Math.PI;   

    // 1. Dessin du corps (Arc de cercle)
    ctx.beginPath();
    // Dessine l'arc, puis trace une ligne vers le centre pour fermer la bouche
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.lineTo(centerX, centerY); 
    ctx.fillStyle = '#FFD700'; // Jaune
    ctx.fill();
    ctx.closePath();

    // 2. Dessin de l'œil (Petit cercle noir)
    ctx.beginPath();
    // Positionné en haut à droite du centre
    ctx.arc(centerX + 0, centerY - 50, 15, 0, Math.PI * 2, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    const eyeRadius = 8; // Réutilisez le rayon de l'œil si vous l'avez défini, sinon utilisez la valeur 8
    const reflectionRadius = 5; // Rayon très petit pour le reflet
    const eyeX = centerX + 3; // Position X de l'œil
    const eyeY = centerY - 50; // Position Y de l'œil

    // Position du reflet : légèrement décalé vers le haut et la droite de l'œil noir
    const reflectionX = eyeX + 2; 
    const reflectionY = eyeY - 2; 

    ctx.arc(reflectionX, reflectionY, reflectionRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
    
    // 3. Dessin des Pastilles (à droite)
    const pillRadius = 14;
    ctx.fillStyle = 'white';
    
    // Pastille 1 (juste devant la bouche)
    ctx.beginPath();
    ctx.arc(centerX + radius + 0, centerY, pillRadius, 0, Math.PI * 2, false);
    ctx.fill();
    
    // Pastille 2
    ctx.beginPath();
    ctx.arc(centerX + radius + 70, centerY, pillRadius, 0, Math.PI * 2, false);
    ctx.fill();
}

// ------------------------------------------------
// 4. Contrôleur Statique de l'Exercice 2
// ------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // ... (Logique de l'Exercice 1 ici) ...

    const canvasAnim = document.getElementById('canvas_animation');
    
    if (canvasAnim) {
        const ctxAnim = canvasAnim.getContext('2d');
        const W_Anim = canvasAnim.width;
        const H_Anim = canvasAnim.height;

        // Effacer le Canvas (fond noir, comme sur l'image)
        ctxAnim.fillStyle = 'black';
        ctxAnim.fillRect(0, 0, W_Anim, H_Anim);
        
        // Dessiner la figure statique une seule fois
        drawPacManStatic(ctxAnim, W_Anim, H_Anim);
    }
});