// ============================================
// HERO BACKGROUND HEX GRID + NEURAL ANIMATION
// ============================================

const canvas = document.getElementById('hero-bg-sphere');

if (canvas) {
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const NEURON_COUNT = 6;
    const TRAIL_MAX_POINTS = 110;
    const NEURON_COLORS = [
        {
            trailOuter: [0, 162, 255],
            trailInner: [102, 210, 255],
            core: [0, 162, 255],
            halo: [0, 162, 255],
        },
        {
            trailOuter: [120, 255, 30],
            trailInner: [180, 255, 90],
            core: [216, 255, 61],
            halo: [120, 255, 30],
        },
    ];
    const neurons = [];
    const hexGrid = [];
    const hexEdges = [];
    const edgeAdjacency = new Map();
    const edgeIndexByKey = new Map();

    // AI Orbs and Geometric Objects
    const aiOrbs = [];
    const geometricShapes = [];
    const dataParticles = [];
    const orbCount = 4;
    const shapeCount = 3;
    const particleCount = 25;

    let width = 0;
    let height = 0;
    let hexSize = 0;
    let tick = 0;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function pointKey(x, y) {
        return `${x.toFixed(2)},${y.toFixed(2)}`;
    }

    function edgeKey(aKey, bKey) {
        return aKey < bKey ? `${aKey}|${bKey}` : `${bKey}|${aKey}`;
    }

    function getHexVertices(cx, cy, size) {
        const vertices = [];
        for (let i = 0; i < 6; i += 1) {
            const angle = (i * Math.PI) / 3 - Math.PI / 6;
            vertices.push({
                x: cx + size * Math.cos(angle),
                y: cy + size * Math.sin(angle),
            });
        }
        return vertices;
    }

    function getEdgePoint(edge, pointKeyValue) {
        if (edge.aKey === pointKeyValue) {
            return { x: edge.ax, y: edge.ay };
        }
        return { x: edge.bx, y: edge.by };
    }

    function randomInt(min, max) {
        return Math.floor(randomInRange(min, max + 1));
    }

    function pickRandomEdge(excludeEdgeIndex = -1) {
        if (hexEdges.length === 0) {
            return 0;
        }

        let edgeIndex = randomInt(0, hexEdges.length - 1);
        if (hexEdges.length > 1) {
            let safety = 12;
            while (edgeIndex === excludeEdgeIndex && safety > 0) {
                edgeIndex = randomInt(0, hexEdges.length - 1);
                safety -= 1;
            }
        }

        return edgeIndex;
    }

    function neuronVisibility(neuron) {
        if (!neuron.active) {
            return 0;
        }

        const fade = neuron.fadeFrames;
        if (neuron.life < fade) {
            return neuron.life / Math.max(1, fade);
        }
        if (neuron.life > neuron.lifeSpan - fade) {
            return (neuron.lifeSpan - neuron.life) / Math.max(1, fade);
        }

        return 1;
    }

    function activateNeuron(neuron) {
        const nextEdgeIndex = pickRandomEdge(neuron.edgeIndex);
        const edge = hexEdges[nextEdgeIndex];

        neuron.edgeIndex = nextEdgeIndex;
        neuron.fromKey = Math.random() > 0.5 ? edge.aKey : edge.bKey;
        neuron.progress = randomInRange(0, 1);
        neuron.speed = randomInRange(0.012, 0.02);
        neuron.life = 0;
        neuron.lifeSpan = randomInt(190, 340);
        neuron.fadeFrames = randomInt(22, 36);
        neuron.colorIndex = randomInt(0, NEURON_COLORS.length - 1);
        neuron.active = true;
        neuron.hiddenFor = 0;
        neuron.trail.length = 0;
    }

    function deactivateNeuron(neuron) {
        neuron.active = false;
        neuron.hiddenFor = randomInt(24, 75);
        neuron.life = 0;
        neuron.trail.length = 0;
    }

    function getNeuronPosition(neuron) {
        const edge = hexEdges[neuron.edgeIndex];
        const start = neuron.fromKey === edge.aKey
            ? { x: edge.ax, y: edge.ay }
            : { x: edge.bx, y: edge.by };
        const end = neuron.fromKey === edge.aKey
            ? { x: edge.bx, y: edge.by }
            : { x: edge.ax, y: edge.ay };

        return {
            x: start.x + (end.x - start.x) * neuron.progress,
            y: start.y + (end.y - start.y) * neuron.progress,
        };
    }

    function buildEdgeGraph() {
        hexEdges.length = 0;
        edgeAdjacency.clear();
        edgeIndexByKey.clear();

        for (const hex of hexGrid) {
            const vertices = getHexVertices(hex.x, hex.y, hexSize);

            for (let i = 0; i < 6; i += 1) {
                const a = vertices[i];
                const b = vertices[(i + 1) % 6];
                const aKey = pointKey(a.x, a.y);
                const bKey = pointKey(b.x, b.y);
                const key = edgeKey(aKey, bKey);

                if (!edgeIndexByKey.has(key)) {
                    const edge = {
                        ax: a.x,
                        ay: a.y,
                        bx: b.x,
                        by: b.y,
                        aKey,
                        bKey,
                    };

                    const index = hexEdges.length;
                    hexEdges.push(edge);
                    edgeIndexByKey.set(key, index);
                }
            }
        }

        for (let i = 0; i < hexEdges.length; i += 1) {
            const edge = hexEdges[i];

            if (!edgeAdjacency.has(edge.aKey)) {
                edgeAdjacency.set(edge.aKey, []);
            }
            if (!edgeAdjacency.has(edge.bKey)) {
                edgeAdjacency.set(edge.bKey, []);
            }

            edgeAdjacency.get(edge.aKey).push(i);
            edgeAdjacency.get(edge.bKey).push(i);
        }
    }

    function createNeuron() {
        if (hexEdges.length === 0) {
            return {
                edgeIndex: 0,
                fromKey: '',
                progress: 0,
                speed: 0,
                size: 2,
                alpha: 0,
                wobblePhase: 0,
                trail: [],
                active: false,
                hiddenFor: 0,
                life: 0,
                lifeSpan: 0,
                fadeFrames: 0,
                colorIndex: 0,
            };
        }

        const edgeIndex = pickRandomEdge();
        const edge = hexEdges[edgeIndex];
        const fromKey = Math.random() > 0.5 ? edge.aKey : edge.bKey;

        const neuron = {
            edgeIndex,
            fromKey,
            progress: randomInRange(0, 1),
            speed: randomInRange(0.012, 0.02),
            size: randomInRange(1.7, 2.6),
            alpha: randomInRange(0.5, 0.8),
            wobblePhase: randomInRange(0, Math.PI * 2),
            trail: [],
            active: false,
            hiddenFor: randomInt(0, 100),
            life: 0,
            lifeSpan: 0,
            fadeFrames: 0,
            colorIndex: randomInt(0, NEURON_COLORS.length - 1),
        };

        if (Math.random() > 0.45) {
            activateNeuron(neuron);
        }

        return neuron;
    }

    function generateHexGrid() {
        hexGrid.length = 0;
        const cols = Math.ceil(width / (hexSize * 1.5)) + 2;
        const rows = Math.ceil(height / (hexSize * Math.sqrt(3))) + 2;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * hexSize * 1.5 - hexSize * 0.75;
                const y = row * hexSize * Math.sqrt(3) + (col % 2) * hexSize * Math.sqrt(3) * 0.5 - hexSize * Math.sqrt(3) * 0.5;
                hexGrid.push({ x, y });
            }
        }

        buildEdgeGraph();
    }

    function initAIOrbs() {
        aiOrbs.length = 0;
        for (let i = 0; i < orbCount; i++) {
            aiOrbs.push({
                x: randomInRange(width * 0.15, width * 0.85),
                y: randomInRange(height * 0.15, height * 0.85),
                vx: randomInRange(-0.08, 0.08),
                vy: randomInRange(-0.08, 0.08),
                size: randomInRange(15, 28),
                pulsePhase: randomInRange(0, Math.PI * 2),
                rotationPhase: randomInRange(0, Math.PI * 2),
                alpha: randomInRange(0.3, 0.5),
                colorMode: i % 2,
            });
        }
    }

    function initGeometricShapes() {
        geometricShapes.length = 0;
        for (let i = 0; i < shapeCount; i++) {
            geometricShapes.push({
                x: randomInRange(width * 0.2, width * 0.8),
                y: randomInRange(height * 0.2, height * 0.8),
                vx: randomInRange(-0.04, 0.04),
                vy: randomInRange(-0.04, 0.04),
                rotationX: randomInRange(0, Math.PI * 2),
                rotationY: randomInRange(0, Math.PI * 2),
                rotationZ: randomInRange(0, Math.PI * 2),
                rotSpeedX: randomInRange(0.003, 0.008),
                rotSpeedY: randomInRange(0.003, 0.008),
                rotSpeedZ: randomInRange(0.003, 0.008),
                size: randomInRange(20, 35),
                type: i % 2,
                colorMode: i % 2,
                alpha: randomInRange(0.2, 0.35),
            });
        }
    }

    function initDataParticles() {
        dataParticles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            const life = randomInRange(100, 300);
            dataParticles.push({
                x: randomInRange(0, width),
                y: randomInRange(0, height),
                vx: randomInRange(-0.15, 0.15),
                vy: randomInRange(-0.15, 0.15),
                size: randomInRange(0.8, 2.2),
                life: life,
                maxLife: life,
                pulsePhase: randomInRange(0, Math.PI * 2),
                colorMode: i % 2,
            });
        }
    }

    function resize() {
        const rect = canvas.getBoundingClientRect();
        width = Math.max(1, Math.floor(rect.width));
        height = Math.max(1, Math.floor(rect.height));

        canvas.width = Math.floor(width * DPR);
        canvas.height = Math.floor(height * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        hexSize = Math.max(width, height) * 0.055;

        generateHexGrid();

        neurons.length = 0;
        for (let i = 0; i < NEURON_COUNT; i++) {
            neurons.push(createNeuron());
        }

        initAIOrbs();
        initGeometricShapes();
        initDataParticles();
    }

    function drawHexGrid() {
        ctx.strokeStyle = 'rgba(0, 162, 255, 0.18)';
        ctx.lineWidth = 0.8;

        for (const edge of hexEdges) {
            if (
                (edge.ax > -hexSize * 2 && edge.ax < width + hexSize * 2 && edge.ay > -hexSize * 2 && edge.ay < height + hexSize * 2) ||
                (edge.bx > -hexSize * 2 && edge.bx < width + hexSize * 2 && edge.by > -hexSize * 2 && edge.by < height + hexSize * 2)
            ) {
                ctx.beginPath();
                ctx.moveTo(edge.ax, edge.ay);
                ctx.lineTo(edge.bx, edge.by);
                ctx.stroke();
            }
        }
    }

    function updateNeurons() {
        for (const neuron of neurons) {
            if (!neuron.active) {
                neuron.hiddenFor -= 1;
                if (neuron.hiddenFor <= 0) {
                    activateNeuron(neuron);
                }
                continue;
            }

            const speedPulse = 1 + Math.sin(tick * 1.2 + neuron.wobblePhase) * 0.18;
            neuron.progress += neuron.speed * speedPulse;
            neuron.life += 1;

            if (neuron.life >= neuron.lifeSpan) {
                deactivateNeuron(neuron);
                continue;
            }

            if (neuron.progress >= 1) {
                const currentEdge = hexEdges[neuron.edgeIndex];
                const destinationKey = neuron.fromKey === currentEdge.aKey ? currentEdge.bKey : currentEdge.aKey;
                const candidateEdges = edgeAdjacency.get(destinationKey) || [];

                let nextEdgeIndex = neuron.edgeIndex;
                if (candidateEdges.length > 1) {
                    const filtered = candidateEdges.filter((idx) => idx !== neuron.edgeIndex);
                    nextEdgeIndex = filtered[Math.floor(randomInRange(0, filtered.length))];
                }

                const nextEdge = hexEdges[nextEdgeIndex];
                neuron.edgeIndex = nextEdgeIndex;
                neuron.fromKey = nextEdge.aKey === destinationKey ? nextEdge.aKey : nextEdge.bKey;
                neuron.progress = 0;
            }

            const pos = getNeuronPosition(neuron);
            neuron.trail.push({ x: pos.x, y: pos.y });

            if (neuron.trail.length > TRAIL_MAX_POINTS) {
                neuron.trail.shift();
            }
        }
    }

    function drawTrails() {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (const neuron of neurons) {
            if (!neuron.active) {
                continue;
            }

            if (neuron.trail.length < 2) {
                continue;
            }

            const visibility = neuronVisibility(neuron);
            const color = NEURON_COLORS[neuron.colorIndex];

            for (let i = 1; i < neuron.trail.length; i += 1) {
                const prev = neuron.trail[i - 1];
                const curr = neuron.trail[i];
                const t = i / neuron.trail.length;

                // Blue outer glow line for clearer path readability.
                ctx.strokeStyle = `rgba(${color.trailOuter[0]}, ${color.trailOuter[1]}, ${color.trailOuter[2]}, ${(0.08 + t * 0.45) * visibility})`;
                ctx.lineWidth = 0.8 + t * 2.0;
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(curr.x, curr.y);
                ctx.stroke();

                // Lime inner core to make trail direction and motion pop.
                ctx.strokeStyle = `rgba(${color.trailInner[0]}, ${color.trailInner[1]}, ${color.trailInner[2]}, ${(0.05 + t * 0.32) * visibility})`;
                ctx.lineWidth = 0.25 + t * 0.75;
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(curr.x, curr.y);
                ctx.stroke();
            }
        }
    }

    function drawConnections() {
        const maxConnectionDistance = Math.max(width, height) * 0.11;

        for (let i = 0; i < neurons.length; i++) {
            const neuronA = neurons[i];
            if (!neuronA.active) {
                continue;
            }
            const posA = getNeuronPosition(neuronA);

            for (let j = i + 1; j < neurons.length; j++) {
                const neuronB = neurons[j];
                if (!neuronB.active) {
                    continue;
                }
                const posB = getNeuronPosition(neuronB);
                const dx = posA.x - posB.x;
                const dy = posA.y - posB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxConnectionDistance) {
                    const strength = 1 - distance / maxConnectionDistance;
                    const vis = Math.min(neuronVisibility(neuronA), neuronVisibility(neuronB));
                    const colorA = NEURON_COLORS[neuronA.colorIndex].trailOuter;
                    ctx.strokeStyle = `rgba(${colorA[0]}, ${colorA[1]}, ${colorA[2]}, ${(0.08 + strength * 0.2) * vis})`;
                    ctx.lineWidth = 0.55 + strength * 0.45;
                    ctx.beginPath();
                    ctx.moveTo(posA.x, posA.y);
                    ctx.lineTo(posB.x, posB.y);
                    ctx.stroke();
                }
            }
        }
    }

    function drawNeurons() {
        for (const neuron of neurons) {
            if (!neuron.active) {
                continue;
            }

            const pos = getNeuronPosition(neuron);
            const visibility = neuronVisibility(neuron);
            const color = NEURON_COLORS[neuron.colorIndex];

            ctx.fillStyle = `rgba(${color.core[0]}, ${color.core[1]}, ${color.core[2]}, ${neuron.alpha * 0.9 * visibility})`;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, neuron.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = `rgba(${color.halo[0]}, ${color.halo[1]}, ${color.halo[2]}, ${neuron.alpha * 0.45 * visibility})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, neuron.size + 1.8, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    function updateAIOrbs() {
        for (const orb of aiOrbs) {
            orb.x += orb.vx;
            orb.y += orb.vy;

            if (orb.x < -50) orb.x = width + 50;
            if (orb.x > width + 50) orb.x = -50;
            if (orb.y < -50) orb.y = height + 50;
            if (orb.y > height + 50) orb.y = -50;

            orb.pulsePhase += 0.05;
            orb.rotationPhase += 0.03;
        }
    }

    function drawAIOrbs() {
        for (const orb of aiOrbs) {
            const pulse = 1 + Math.sin(orb.pulsePhase) * 0.25;
            const baseAlpha = orb.alpha;
            const size = orb.size * pulse;

            if (orb.colorMode === 0) {
                ctx.fillStyle = `rgba(0, 162, 255, ${baseAlpha * 0.4})`;
                ctx.strokeStyle = `rgba(0, 162, 255, ${baseAlpha * 0.8})`;
            } else {
                ctx.fillStyle = `rgba(216, 255, 61, ${baseAlpha * 0.3})`;
                ctx.strokeStyle = `rgba(216, 255, 61, ${baseAlpha * 0.8})`;
            }

            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = `rgba(${orb.colorMode === 0 ? '0, 162, 255' : '216, 255, 61'}, ${baseAlpha * 0.4})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, size + 4, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    function updateGeometricShapes() {
        for (const shape of geometricShapes) {
            shape.x += shape.vx;
            shape.y += shape.vy;

            if (shape.x < -50) shape.x = width + 50;
            if (shape.x > width + 50) shape.x = -50;
            if (shape.y < -50) shape.y = height + 50;
            if (shape.y > height + 50) shape.y = -50;

            shape.rotationX += shape.rotSpeedX;
            shape.rotationY += shape.rotSpeedY;
            shape.rotationZ += shape.rotSpeedZ;
        }
    }

    function drawGeometricShapes() {
        for (const shape of geometricShapes) {
            ctx.save();
            ctx.translate(shape.x, shape.y);

            if (shape.type === 0) {
                drawWireframeCube(shape);
            } else {
                drawWireframeOctahedron(shape);
            }

            ctx.restore();
        }
    }

    function drawWireframeCube(shape) {
        const s = shape.size;
        const vertices = [
            [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
            [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
        ];

        const rotated = vertices.map(v => rotateVertex(v, shape.rotationX, shape.rotationY, shape.rotationZ));

        ctx.strokeStyle = shape.colorMode === 0
            ? `rgba(0, 162, 255, ${shape.alpha})`
            : `rgba(216, 255, 61, ${shape.alpha})`;
        ctx.lineWidth = 1;

        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
        ];

        for (const [i, j] of edges) {
            ctx.beginPath();
            ctx.moveTo(rotated[i][0], rotated[i][1]);
            ctx.lineTo(rotated[j][0], rotated[j][1]);
            ctx.stroke();
        }
    }

    function drawWireframeOctahedron(shape) {
        const s = shape.size * 0.7;
        const vertices = [
            [0, -s, 0], [s, 0, 0], [0, s, 0], [-s, 0, 0],
            [0, 0, s], [0, 0, -s],
        ];

        const rotated = vertices.map(v => rotateVertex(v, shape.rotationX, shape.rotationY, shape.rotationZ));

        ctx.strokeStyle = shape.colorMode === 0
            ? `rgba(0, 162, 255, ${shape.alpha})`
            : `rgba(216, 255, 61, ${shape.alpha})`;
        ctx.lineWidth = 1;

        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 1], [4, 2], [4, 3], [4, 0],
            [5, 1], [5, 2], [5, 3], [5, 0],
        ];

        for (const [i, j] of edges) {
            ctx.beginPath();
            ctx.moveTo(rotated[i][0], rotated[i][1]);
            ctx.lineTo(rotated[j][0], rotated[j][1]);
            ctx.stroke();
        }
    }

    function rotateVertex(v, rx, ry, rz) {
        let [x, y, z] = v;

        const cosX = Math.cos(rx);
        const sinX = Math.sin(rx);
        [y, z] = [y * cosX - z * sinX, y * sinX + z * cosX];

        const cosY = Math.cos(ry);
        const sinY = Math.sin(ry);
        [x, z] = [x * cosY + z * sinY, -x * sinY + z * cosY];

        const cosZ = Math.cos(rz);
        const sinZ = Math.sin(rz);
        [x, y] = [x * cosZ - y * sinZ, x * sinZ + y * cosZ];

        return [x, y, z];
    }

    function updateDataParticles() {
        for (const particle of dataParticles) {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < -10) particle.x = width + 10;
            if (particle.x > width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = height + 10;
            if (particle.y > height + 10) particle.y = -10;

            particle.life -= 2;
            if (particle.life <= 0) {
                particle.x = randomInRange(0, width);
                particle.y = randomInRange(0, height);
                particle.life = randomInRange(100, 300);
                particle.maxLife = particle.life;
            }

            particle.pulsePhase += 0.08;
        }
    }

    function drawDataParticles() {
        for (const particle of dataParticles) {
            const lifeRatio = particle.life / Math.max(particle.maxLife || 200, 1);
            const pulse = 1 + Math.sin(particle.pulsePhase) * 0.3;
            const size = particle.size * pulse;

            if (particle.colorMode === 0) {
                ctx.fillStyle = `rgba(0, 162, 255, ${lifeRatio * 0.6})`;
            } else {
                ctx.fillStyle = `rgba(216, 255, 61, ${lifeRatio * 0.5})`;
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        tick += 0.016;

        ctx.clearRect(0, 0, width, height);

        // Draw the background elements
        drawHexGrid();

        // Update and draw AI objects
        updateAIOrbs();
        drawAIOrbs();

        updateGeometricShapes();
        drawGeometricShapes();

        updateDataParticles();
        drawDataParticles();

        // Update and draw neural network
        updateNeurons();
        drawTrails();
        drawConnections();
        drawNeurons();

        requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener('resize', resize);
}
