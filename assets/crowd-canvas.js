class CrowdCanvas {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.config = {
            src: options.src || 'images/peeps/all-peeps.png',
            rows: options.rows || 15,
            cols: options.cols || 7
        };
        
        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.bottom = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none'; // let clicks pass through
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        
        this.stage = { width: 0, height: 0 };
        this.allPeeps = [];
        this.availablePeeps = [];
        this.crowd = [];
        
        this.img = new Image();
        this.img.onload = () => this.start();
        this.img.onerror = () => this.generateFallback(); // Fallback if image missing
        this.img.src = this.config.src;
        
        this.handleResize = () => this.resize();
        window.addEventListener('resize', this.handleResize);
    }
    
    generateFallback() {
        console.warn("Could not load " + this.config.src + ". Generating procedural fallback peeps.");
        const w = 1400, h = 3000;
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const x = c.getContext('2d');
        const rw = w / this.config.cols, rh = h / this.config.rows;
        
        for (let i = 0; i < this.config.rows * this.config.cols; i++) {
            const col = i % this.config.cols;
            const row = Math.floor(i / this.config.cols);
            
            x.fillStyle = `hsl(${Math.random()*360}, 60%, 60%)`;
            
            // Draw a crude "person" shape
            const px = col * rw, py = row * rh;
            x.beginPath();
            x.arc(px + rw/2, py + rh*0.3, rw*0.2, 0, Math.PI*2); // Head
            x.fill();
            x.fillRect(px + rw*0.25, py + rh*0.5, rw*0.5, rh*0.3); // Body
            x.fillRect(px + rw*0.3, py + rh*0.8, rw*0.15, rh*0.2); // Leg L
            x.fillRect(px + rw*0.55, py + rh*0.8, rw*0.15, rh*0.2); // Leg R
        }
        this.img = new Image();
        this.img.onload = () => this.start();
        this.img.src = c.toDataURL();
    }

    randomRange(min, max) { return min + Math.random() * (max - min); }
    randomIndex(array) { return Math.floor(this.randomRange(0, array.length)); }
    removeFromArray(array, i) { return array.splice(i, 1)[0]; }
    removeItemFromArray(array, item) { return this.removeFromArray(array, array.indexOf(item)); }
    removeRandomFromArray(array) { return this.removeFromArray(array, this.randomIndex(array)); }
    getRandomFromArray(array) { return array[this.randomIndex(array)]; }

    resetPeep(peep) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        // Parse ease "power2.in" equivalent manually since we aren't calling gsap.parseEase directly
        const easeVal = Math.pow(Math.random(), 2); 
        const offsetY = 100 - 250 * easeVal;
        const startY = this.stage.height - peep.height + offsetY;
        let startX, endX;

        if (direction === 1) {
            startX = -peep.width;
            endX = this.stage.width;
            peep.scaleX = 1;
        } else {
            startX = this.stage.width + peep.width;
            endX = 0;
            peep.scaleX = -1;
        }

        peep.x = startX;
        peep.y = startY;
        peep.anchorY = startY;

        return { startX, startY, endX };
    }

    normalWalk(peep, props) {
        const { startX, startY, endX } = props;
        const xDuration = 10;
        const yDuration = 0.25;

        const tl = gsap.timeline();
        tl.timeScale(this.randomRange(0.5, 1.5));
        
        tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
        tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 10 }, 0);

        return tl;
    }

    createPeep(rect) {
        const peep = {
            image: this.img,
            rect: rect,
            width: rect[2],
            height: rect[3],
            x: 0, y: 0, anchorY: 0, scaleX: 1,
            walk: null,
            render: (ctx) => {
                ctx.save();
                ctx.translate(peep.x, peep.y);
                ctx.scale(peep.scaleX, 1);
                ctx.drawImage(peep.image, peep.rect[0], peep.rect[1], peep.rect[2], peep.rect[3], 0, 0, peep.width, peep.height);
                ctx.restore();
            }
        };
        return peep;
    }

    createPeeps() {
        const { rows, cols } = this.config;
        const width = this.img.naturalWidth;
        const height = this.img.naturalHeight;
        const total = rows * cols;
        const rectWidth = width / cols; // Note: original React code used width / rows, which is mathematically inverted, but I will fix it here to match typical spritesheet cols/rows
        const rectHeight = height / rows;

        for (let i = 0; i < total; i++) {
            this.allPeeps.push(this.createPeep([
                (i % cols) * rectWidth,
                Math.floor(i / cols) * rectHeight,
                rectWidth,
                rectHeight
            ]));
        }
    }

    initCrowd() {
        while (this.availablePeeps.length) {
            this.addPeepToCrowd().walk.progress(Math.random());
        }
    }

    addPeepToCrowd() {
        const peep = this.removeRandomFromArray(this.availablePeeps);
        const props = this.resetPeep(peep);
        
        const walk = this.normalWalk(peep, props).eventCallback("onComplete", () => {
            this.removePeepFromCrowd(peep);
            this.addPeepToCrowd();
        });

        peep.walk = walk;
        this.crowd.push(peep);
        this.crowd.sort((a, b) => a.anchorY - b.anchorY);

        return peep;
    }

    removePeepFromCrowd(peep) {
        this.removeItemFromArray(this.crowd, peep);
        this.availablePeeps.push(peep);
    }

    render() {
        if (!this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.scale(devicePixelRatio, devicePixelRatio);

        this.crowd.forEach((peep) => {
            peep.render(this.ctx);
        });

        this.ctx.restore();
    }

    resize() {
        if (!this.canvas) return;
        this.stage.width = this.container.clientWidth;
        this.stage.height = this.container.clientHeight;
        this.canvas.width = this.stage.width * devicePixelRatio;
        this.canvas.height = this.stage.height * devicePixelRatio;

        this.crowd.forEach((peep) => {
            if (peep.walk) peep.walk.kill();
        });

        this.crowd.length = 0;
        this.availablePeeps.length = 0;
        this.availablePeeps.push(...this.allPeeps);

        this.initCrowd();
    }

    start() {
        this.createPeeps();
        this.resize();
        
        // bind render to gsap ticker
        this.tickRender = () => this.render();
        gsap.ticker.add(this.tickRender);
    }

    destroy() {
        window.removeEventListener('resize', this.handleResize);
        if (this.tickRender) gsap.ticker.remove(this.tickRender);
        this.crowd.forEach(peep => { if (peep.walk) peep.walk.kill(); });
        this.canvas.remove();
    }
}

window.CrowdCanvas = CrowdCanvas;
