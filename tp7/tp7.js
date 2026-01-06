let ctx, W, H;
const gridUnit = 20;

const canvas = document.getElementById('votre_canvas_id');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    const gridUnit = 30; 
    
    drawGrid(ctx, W, H, gridUnit); 

    drawChicken(ctx, W, H, gridUnit); 
}

function clearCanvas() {
    ctx.clearRect(0, 0, W, H);
}

function drawTarget() {
    clearCanvas();
    
    const centerX = W / 2;
    const centerY = H / 2;
    const numCircles = 6; 
    const maxRadius = Math.min(W, H) / 2; 
    const ringWidth = maxRadius / numCircles; 

    for (let i = numCircles; i >= 1; i--) {
        const radius = i * ringWidth;
        const isBlack = (i % 2 === 0);
        
        ctx.fillStyle = (i === 1) ? 'red' : (isBlack ? 'black' : 'white');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

function drawChicken() {
    clearCanvas();
    const gridUnit = W / 10; 

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        ctx.beginPath(); ctx.moveTo(i * gridUnit, 0); ctx.lineTo(i * gridUnit, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * gridUnit); ctx.lineTo(W, i * gridUnit); ctx.stroke();
    }

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'round';

    const points = [
        [2, 2], [3, 2], 
        [3, 1.5], [3.25, 1.75], [3.5, 1.5], [3.75, 1.75], [4, 1.5], [4, 2],
        [5, 3], [7, 3],
        [8, 2], [8, 3], [9, 3], [8, 4], [9, 4], 
        [7, 6], [5, 6], [4, 5], [4, 4], [3, 3], [2, 2],

        null, [5, 6], [5, 7], 
        null, [5, 7], [4.2, 7], 
        null, [5, 7], [4.5, 7.5], 
        null, [5, 7], [5, 7.5], 

        null, [7, 6], [7, 7], 
        null, [7, 7], [6.2, 7], 
        null, [7, 7], [6.5, 7.5], 
        null, [7, 7], [7, 7.5]
    ];

    ctx.beginPath();
    let isNewPath = true;
    points.forEach((p) => {
        if (p === null) { isNewPath = true; return; }
        const px = p[0] * gridUnit;
        const py = p[1] * gridUnit;
        if (isNewPath) { ctx.moveTo(px, py); isNewPath = false; }
        else { ctx.lineTo(px, py); }
    });
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(2 * gridUnit, 2 * gridUnit); ctx.lineTo(3 * gridUnit, 2 * gridUnit);
    ctx.moveTo(3 * gridUnit, 2 * gridUnit); ctx.lineTo(3 * gridUnit, 3 * gridUnit);
    ctx.moveTo(3 * gridUnit, 2 * gridUnit); ctx.lineTo(4 * gridUnit, 2 * gridUnit);
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(3.3 * gridUnit, 2.4 * gridUnit, gridUnit * 0.08, 0, Math.PI * 2);
    ctx.fill();
}

function drawCheckerboard() {
    clearCanvas();
    
    const numSquares = 8; 
    const squareSize = W / numSquares;
    
    for (let row = 0; row < numSquares; row++) {
        for (let col = 0; col < numSquares; col++) {
            const isBlack = (row + col) % 2 !== 0; 
            
            ctx.fillStyle = isBlack ? 'black' : 'white';
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }
}

function drawCurveQuadrillage() {
    clearCanvas();
    const PADDING = 20; 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    const gridSize = Math.min(W, H) - 2 * PADDING; 
    const numLines = 40; 
    
    const offsetX = PADDING; 
    const offsetY = PADDING;
    
    for (let i = 0; i <= numLines; i++) {
        const ratio = i / numLines;
        
        const startX = offsetX; 
        const startY = offsetY + (gridSize * ratio); 
        
        const endX = offsetX + (gridSize * ratio); 
        const endY = offsetY + gridSize;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    for (let i = 0; i <= numLines; i++) {
        const ratio = i / numLines;
        
        const startX = offsetX + (gridSize * ratio);
        const startY = offsetY; 
        
        const endX = offsetX + gridSize; 
        const endY = offsetY + (gridSize * ratio);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    
    ctx.strokeRect(offsetX, offsetY, gridSize, gridSize);
}

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas_unique');
    const button = document.getElementById('nextFigureBtn');
    
    if (!canvas || !button) return;

    ctx = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    
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
        currentFigureIndex = (currentFigureIndex + 1) % drawFunctions.length; 
        renderFigure();
    });

    renderFigure();
});

function drawPacManStatic(ctx, W, H) {
    const centerX = W / 2;
    const centerY = H / 2;
    const radius = 100;
    
    const mouthOpenAngle = -0.070; 
    
    const startAngle = (0.25 + mouthOpenAngle) * Math.PI; 
    const endAngle = (1.75 - mouthOpenAngle) * Math.PI;   

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.lineTo(centerX, centerY); 
    ctx.fillStyle = '#FFD700'; 
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(centerX + 0, centerY - 50, 15, 0, Math.PI * 2, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    const eyeRadius = 8; 
    const reflectionRadius = 5; 
    const eyeX = centerX + 3; 
    const eyeY = centerY - 50; 

    const reflectionX = eyeX + 2; 
    const reflectionY = eyeY - 2; 

    ctx.arc(reflectionX, reflectionY, reflectionRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
    
    const pillRadius = 14;
    ctx.fillStyle = 'white';
    
    ctx.beginPath();
    ctx.arc(centerX + radius + 0, centerY, pillRadius, 0, Math.PI * 2, false);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(centerX + radius + 70, centerY, pillRadius, 0, Math.PI * 2, false);
    ctx.fill();
}

document.addEventListener('DOMContentLoaded', function() {

    const canvasAnim = document.getElementById('canvas_animation');
    
    if (canvasAnim) {
        const ctxAnim = canvasAnim.getContext('2d');
        const W_Anim = canvasAnim.width;
        const H_Anim = canvasAnim.height;

        ctxAnim.fillStyle = 'black';
        ctxAnim.fillRect(0, 0, W_Anim, H_Anim);
        
        drawPacManStatic(ctxAnim, W_Anim, H_Anim);
    }
});