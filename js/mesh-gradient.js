// ============================================
// MESH GRADIENT ANIMATION
// ============================================

const meshGradientContainer = document.getElementById('mesh-gradient');

// Create mesh gradient background using canvas
const meshCanvas = document.createElement('canvas');
meshCanvas.width = window.innerWidth;
meshCanvas.height = window.innerHeight;
meshCanvas.style.position = 'absolute';
meshCanvas.style.top = '0';
meshCanvas.style.left = '0';
meshCanvas.style.width = '100%';
meshCanvas.style.height = '100%';

meshGradientContainer.appendChild(meshCanvas);

const ctx = meshCanvas.getContext('2d');

// Handle window resize
window.addEventListener('resize', () => {
    meshCanvas.width = window.innerWidth;
    meshCanvas.height = window.innerHeight;
});

// Define mesh nodes
const nodes = [
    { x: 0, y: 0, color: 'rgba(0, 162, 255, 0.3)' },
    { x: window.innerWidth, y: 0, color: 'rgba(216, 255, 61, 0.26)' },
    { x: window.innerWidth, y: window.innerHeight, color: 'rgba(204, 255, 0, 0.2)' },
    { x: 0, y: window.innerHeight, color: 'rgba(120, 255, 30, 0.2)' },
    { x: window.innerWidth / 2, y: window.innerHeight / 2, color: 'rgba(0, 162, 255, 0.4)' },
];

let time = 0;

function drawMeshGradient() {
    // Clear canvas
    ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
    ctx.fillRect(0, 0, meshCanvas.width, meshCanvas.height);

    time += 0.001;

    // Update node positions
    const animatedNodes = nodes.map((node, index) => {
        const baseX = node.x;
        const baseY = node.y;
        const wobbleX = Math.sin(time + index) * 50;
        const wobbleY = Math.cos(time + index * 0.7) * 50;

        return {
            ...node,
            x: baseX + wobbleX,
            y: baseY + wobbleY,
        };
    });

    // Draw Delaunay-like triangulation and apply gradients
    // For simplicity, we'll create quadrilaterals from node clusters

    // Triangle 1
    drawGradientTriangle(
        animatedNodes[0].x, animatedNodes[0].y,
        animatedNodes[1].x, animatedNodes[1].y,
        animatedNodes[4].x, animatedNodes[4].y,
        [animatedNodes[0].color, animatedNodes[1].color, animatedNodes[4].color]
    );

    // Triangle 2
    drawGradientTriangle(
        animatedNodes[1].x, animatedNodes[1].y,
        animatedNodes[2].x, animatedNodes[2].y,
        animatedNodes[4].x, animatedNodes[4].y,
        [animatedNodes[1].color, animatedNodes[2].color, animatedNodes[4].color]
    );

    // Triangle 3
    drawGradientTriangle(
        animatedNodes[2].x, animatedNodes[2].y,
        animatedNodes[3].x, animatedNodes[3].y,
        animatedNodes[4].x, animatedNodes[4].y,
        [animatedNodes[2].color, animatedNodes[3].color, animatedNodes[4].color]
    );

    // Triangle 4
    drawGradientTriangle(
        animatedNodes[3].x, animatedNodes[3].y,
        animatedNodes[0].x, animatedNodes[0].y,
        animatedNodes[4].x, animatedNodes[4].y,
        [animatedNodes[3].color, animatedNodes[0].color, animatedNodes[4].color]
    );

    // Draw node points (optional, for debugging)
    // animatedNodes.forEach(node => {
    //     ctx.fillStyle = node.color.replace('0.3', '1').replace('0.2', '1').replace('0.4', '1');
    //     ctx.beginPath();
    //     ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
    //     ctx.fill();
    // });

    requestAnimationFrame(drawMeshGradient);
}

function drawGradientTriangle(x1, y1, x2, y2, x3, y3, colors) {
    const triangle = new Path2D();
    triangle.moveTo(x1, y1);
    triangle.lineTo(x2, y2);
    triangle.lineTo(x3, y3);
    triangle.closePath();

    // Draw filled triangle with gradient-like effect
    ctx.globalAlpha = 0.15;

    // Simple color mixing approach
    const colorStr = colors[0];
    ctx.fillStyle = colorStr;
    ctx.fill(triangle);

    ctx.globalAlpha = 1;
}

// Alternative: Use CSS backdrop filter with animated gradient
function createCSSSGradient() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes mesh-flow {
            0% {
                background-position: 0% 0%;
            }
            50% {
                background-position: 100% 100%;
            }
            100% {
                background-position: 0% 0%;
            }
        }

        #mesh-gradient {
            background: 
                radial-gradient(circle at 20% 50%, rgba(0, 162, 255, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(204, 255, 0, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(120, 255, 30, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 90% 10%, rgba(216, 255, 61, 0.24) 0%, transparent 50%);
            background-size: 300% 300%;
            background-position: 0% 0%;
            animation: mesh-flow 15s ease infinite;
        }
    `;
    document.head.appendChild(style);
}

// Use CSS gradient approach (simpler and more performant)
createCSSSGradient();

// Optional: Uncomment to use canvas-based approach instead
// drawMeshGradient();

// Re-initialize nodes on window resize
window.addEventListener('resize', () => {
    nodes[1].x = window.innerWidth;
    nodes[2].x = window.innerWidth;
    nodes[2].y = window.innerHeight;
    nodes[3].y = window.innerHeight;
    nodes[4].x = window.innerWidth / 2;
    nodes[4].y = window.innerHeight / 2;
});
