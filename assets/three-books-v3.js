
const t = (text) => window.__getTranslation ? window.__getTranslation(text) : text;
const tr = t;

class ThreeBooks {
    constructor(containerId, booksData) {
        this.container = document.getElementById(containerId);
        if(!this.container) return;
        this.booksData = booksData;
        this.init();
    }

    init() {
        const root = this.container;
        root.innerHTML = `
            <div id="bs-root" style="position:relative; width:100%; height:100%; min-height:560px; overflow:hidden; font-family:sans-serif; background:var(--bg, #fbf9f4);">
                <div id="bs-hero-word" style="pointer-events:none; position:absolute; left:50%; top:18%; transform:translateX(-50%) translateY(0); opacity:1; z-index:1; transition:all 0.5s ease-out; font-size:clamp(4.5rem,22.5vw,18rem); font-weight:800; line-height:0.85; letter-spacing:-0.015em; color:rgba(0,0,0,0.05); white-space:nowrap;">
                    Practice
                </div>
                
                <canvas id="bs-canvas" style="position:absolute; inset:0; z-index:2; width:100%; height:100%; touch-action:pan-y pinch-zoom;"></canvas>
                
                <!-- Nav -->
                <nav id="bs-nav" style="pointer-events:none; position:absolute; inset:0 0 auto 0; z-index:40; display:flex; justify-content:space-between; padding:clamp(20px,4vw,42px); transition:opacity 0.3s; opacity:1;">
                    <div style="font-size:clamp(20px,2.2vw,29px); font-weight:800; letter-spacing:-0.01em; color:#141a32;">Legal Areas</div>
                </nav>

                <!-- Carousel arrows -->
                <button id="bs-prev" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); z-index:30; width:44px; height:44px; border-radius:50%; background:rgba(253,251,244,0.9); color:#141a32; border:none; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); cursor:pointer; transition:all 0.3s;">❮</button>
                <button id="bs-next" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); z-index:30; width:44px; height:44px; border-radius:50%; background:rgba(253,251,244,0.9); color:#141a32; border:none; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); cursor:pointer; transition:all 0.3s;">❯</button>

                <!-- Open pill -->
                <button id="bs-open-btn" style="position:absolute; left:0; top:0; z-index:30; transform:translate(-50%, -50%) rotate(-1.6deg) scale(0.94); opacity:0; padding:16px 38px 18px; font-size:15px; font-weight:bold; text-transform:uppercase; letter-spacing:0.1em; color:#141a32; pointer-events:none; transition:opacity 0.3s, transform 0.3s; clip-path:polygon(0% 0.9%,8.3% 0.8%,16.7% 6.3%,25% 3.8%,33.3% 5.5%,41.7% 2.7%,50% 5.2%,58.3% 0.4%,66.7% 5.9%,75% 6.5%,83.3% 1%,91.7% 6.4%,100% 0.7%,97.7% 20%,97% 40%,99.6% 60%,98.7% 80%,100% 96.5%,91.7% 99.8%,83.3% 95.6%,75% 94.9%,66.7% 96.6%,58.3% 93.5%,50% 97.9%,41.7% 99.5%,33.3% 93.2%,25% 93.6%,16.7% 93.2%,8.3% 93.1%,0% 93.5%,0.2% 80%,1.1% 60%,3.9% 40%,3.8% 20%); background:repeating-linear-gradient(92deg,rgba(90,74,40,0.03) 0px 2px,transparent 2px 6px),radial-gradient(125% 150% at 28% 0%,#fffdf7 0%,#f8f2e3 58%,#ede4cf 100%); filter:drop-shadow(0 14px 26px rgba(0,0,0,0.4));">Open</button>

                <!-- Close btn -->
                <button id="bs-close-btn" style="position:absolute; left:50%; top:30px; transform:translateX(-50%); z-index:40; width:52px; height:52px; border-radius:50%; border:1.5px solid rgba(253,251,244,0.4); background:transparent; color:#fdfbf4; font-size:17px; cursor:pointer; pointer-events:none; opacity:0; transition:opacity 0.3s; display:flex; align-items:center; justify-content:center;">✕</button>

                <!-- Detail Panel -->
                <div id="bs-dp" style="position:absolute; right:7%; top:50%; transform:translateY(-50%); z-index:15; width:min(560px, 42%); pointer-events:none; visibility:hidden;">
                    <div id="bs-dp-subtitle" style="color:#96a2de; font-weight:bold; letter-spacing:2px; text-transform:uppercase; margin-bottom:15px; opacity:0; transform:translateY(28px); transition:all 0.6s cubic-bezier(0.22,1,0.36,1); font-size:13px;">PRACTICE AREA</div>
                    <h1 id="bs-dp-title" style="margin:0; color:#f591ac; font-size:clamp(36px, 5.6vw, 92px); font-weight:800; line-height:0.98; letter-spacing:-0.015em; opacity:0; transform:translateY(28px); transition:all 0.6s cubic-bezier(0.22,1,0.36,1) 0.04s;">Title</h1>
                    
                    <div id="bs-dp-meta" style="display:flex; align-items:center; gap:15px; margin-top:20px; opacity:0; transform:translateY(28px); transition:all 0.6s cubic-bezier(0.22,1,0.36,1) 0.08s; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:20px;">
                        <div style="color:#fff;">★ ★ ★ ★ ★</div>
                        <div style="width:1px; height:16px; background:rgba(255,255,255,0.2);"></div>
                        <div style="color:#c9d0ee; font-style:italic;">Adv. Achche Lal Gautam</div>
                        <div style="width:1px; height:16px; background:rgba(255,255,255,0.2);"></div>
                        <div style="color:#c9d0ee; font-style:italic;">Unnao District Court</div>
                    </div>

                    <p id="bs-dp-desc" style="margin-top:26px; max-width:54ch; color:#c9d0ee; font-size:clamp(15px, 1.25vw, 19px); line-height:1.65; opacity:0; transform:translateY(28px); transition:all 0.6s cubic-bezier(0.22,1,0.36,1) 0.12s;">Description</p>
                    
                    </div>
            </div>
        `;

        const canvasEl = document.getElementById('bs-canvas');
        const heroWord = document.getElementById('bs-hero-word');
        const nav = document.getElementById('bs-nav');
        const prevBtn = document.getElementById('bs-prev');
        const nextBtn = document.getElementById('bs-next');
        const openBtn = document.getElementById('bs-open-btn');
        const closeBtn = document.getElementById('bs-close-btn');
        const dp = document.getElementById('bs-dp');
        const dpTitle = document.getElementById('bs-dp-title');
        const dpDesc = document.getElementById('bs-dp-desc');
        
        const dpSubtitle = document.getElementById('bs-dp-subtitle');
        const dpMeta = document.getElementById('bs-dp-meta');
        const rootEl = document.getElementById('bs-root');

        if(this.booksData.length <= 3) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        let uiMode = 'hero';
        let selectedCfg = null;
        let cancelled = false;
        
        const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const lowPowerDevice = RM || window.matchMedia('(max-width: 900px)').matches || (navigator.hardwareConcurrency ?? 8) <= 4;
        const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

        class Spring {
            constructor(v, k, d) { this.v = v; this.t = v; this.vel = 0; this.k = k || 120; this.d = d || 14; }
            set(v) { this.v = v; this.t = v; this.vel = 0; return this; }
            update(dt) {
                const a = this.k * (this.t - this.v) - this.d * this.vel;
                this.vel += a * dt;
                this.v += this.vel * dt;
                return this.v;
            }
        }

        
        const t = (str) => {
            if (window.__getTranslation) return window.__getTranslation(str);
            return str;
        };

        function mkCanvas(w, h) {
            const c = document.createElement('canvas');
            c.width = w; c.height = h; return c;
        }

        function drawSpaced(x, text, cx, y, ls) {
            const prev = x.textAlign; x.textAlign = 'left';
            const chars = [...text];
            let tot = 0;
            const ws = chars.map((ch) => { const w = x.measureText(ch).width; tot += w; return w; });
            tot += ls * (chars.length - 1);
            let px = cx - tot / 2;
            chars.forEach((ch, i) => { x.fillText(ch, px, y); px += ws[i] + ls; });
            x.textAlign = prev;
        }

        function rr(x, px, py, w, h, r) {
            x.beginPath(); x.moveTo(px + r, py); x.arcTo(px + w, py, px + w, py + h, r);
            x.arcTo(px + w, py + h, px, py + h, r); x.arcTo(px, py + h, px, py, r);
            x.arcTo(px, py, px + w, py, r); x.closePath();
        }

        let renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: !lowPowerDevice, alpha: true });
        const dims = { w: 0, h: 0 };
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPowerDevice ? 1 : 1.25));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.92;
        renderer.shadowMap.enabled = !lowPowerDevice;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        const ANISO = renderer.capabilities.getMaxAnisotropy();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
        camera.position.set(0, 0.1, 9.6);

        function envBlob(x, cx, cy, r, rgb, a) {
            const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
            g.addColorStop(0, 'rgba(' + rgb + ',' + a + ')');
            g.addColorStop(1, 'rgba(' + rgb + ',0)');
            x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fill();
        }
        (function buildEnv() {
            const c = mkCanvas(512, 256), x = c.getContext('2d');
            const g = x.createLinearGradient(0, 0, 0, 256);
            g.addColorStop(0, '#5a6ba6'); g.addColorStop(0.55, '#262e52'); g.addColorStop(1, '#0a0d1d');
            x.fillStyle = g; x.fillRect(0, 0, 512, 256);
            envBlob(x, 140, 66, 95, '255,255,255', 0.95);
            envBlob(x, 405, 84, 55, '255,214,168', 0.55);
            envBlob(x, 256, 150, 120, '255,155,185', 0.28);
            const tx = new THREE.CanvasTexture(c);
            tx.mapping = THREE.EquirectangularReflectionMapping;
            const pmrem = new THREE.PMREMGenerator(renderer);
            scene.environment = pmrem.fromEquirectangular(tx).texture;
            tx.dispose(); pmrem.dispose();
        })();

        const hemi = new THREE.HemisphereLight(0x8fa0d8, 0x0d1024, 0.32); scene.add(hemi);
        const key = new THREE.DirectionalLight(0xffffff, 0.82);
        key.position.set(3.5, 5, 6); key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
        key.shadow.camera.left = -4; key.shadow.camera.right = 4; key.shadow.camera.top = 4; key.shadow.camera.bottom = -4;
        scene.add(key);
        const fillLight = new THREE.DirectionalLight(0xa9b6ff, 0.2); fillLight.position.set(-4, 1, 4); scene.add(fillLight);
        const rim = new THREE.DirectionalLight(0xff9db8, 0.3); rim.position.set(-2, 3, -5); scene.add(rim);

        const bookRoot = new THREE.Group(); scene.add(bookRoot);

        function tex(c) { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = ANISO; return t; }

        function noiseTexture(base, amp, scratches) {
            const s = 256, c = mkCanvas(s, s), x = c.getContext('2d');
            const img = x.createImageData(s, s), d = img.data;
            for (let i = 0; i < d.length; i += 4) {
                const v = base + (Math.random() - 0.5) * 2 * amp;
                d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
            }
            x.putImageData(img, 0, 0);
            return new THREE.CanvasTexture(c);
        }
        const laminateBump = noiseTexture(128, 10, true);
        const clothBump = noiseTexture(128, 15, false);

        function striationTexture(vertical) {
            const s = 512, c = mkCanvas(s, s), x = c.getContext('2d');
            x.fillStyle = '#ece4d2'; x.fillRect(0, 0, s, s);
            return tex(c);
        }
        const striV = striationTexture(true); const striH = striationTexture(false);
        const endpaperTex = striationTexture(true);

        const blobTex = (function () {
            const s = 256, c = mkCanvas(s, s), x = c.getContext('2d');
            const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
            g.addColorStop(0, 'rgba(0,0,0,.85)'); g.addColorStop(1, 'rgba(0,0,0,0)');
            x.fillStyle = g; x.fillRect(0, 0, s, s);
            return new THREE.CanvasTexture(c);
        })();

        function paintDefaultFront(x, w, h, title, bg) {
            // 1. Rich gradient background to simulate lighting on leather
            const grad = x.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0, bg);
            // make a darker version of bg for the bottom right
            x.fillStyle = bg; x.fillRect(0, 0, w, h);
            x.fillStyle = 'rgba(0,0,0,0.4)'; x.fillRect(0, 0, w, h); // darken layer
            const glow = x.createRadialGradient(w/2, h/3, 0, w/2, h/3, w);
            glow.addColorStop(0, bg);
            glow.addColorStop(1, 'rgba(0,0,0,0.8)');
            x.fillStyle = glow; x.fillRect(0, 0, w, h);

            // 2. Ornate Gold Foil Borders
            const goldGrad = x.createLinearGradient(0, 0, w, h);
            goldGrad.addColorStop(0, '#ebd197');
            goldGrad.addColorStop(0.5, '#ffd700');
            goldGrad.addColorStop(1, '#b8860b');
            
            x.strokeStyle = goldGrad;
            
            // Outer thick border
            x.lineWidth = 12;
            x.strokeRect(50, 50, w - 100, h - 100);
            
            // Inner thin border
            x.lineWidth = 3;
            x.strokeRect(75, 75, w - 150, h - 150);
            
            // Corner flourishes (simple squares for now)
            x.fillStyle = goldGrad;
            const cs = 20;
            x.fillRect(75 - cs/2, 75 - cs/2, cs, cs);
            x.fillRect(w - 75 - cs/2, 75 - cs/2, cs, cs);
            x.fillRect(75 - cs/2, h - 75 - cs/2, cs, cs);
            x.fillRect(w - 75 - cs/2, h - 75 - cs/2, cs, cs);

            // 3. Top Label
            x.textAlign = 'center';
            x.font = '600 32px "Times New Roman", serif';
            x.letterSpacing = '6px';
            x.fillStyle = 'rgba(255,255,255,0.6)';
            x.fillText('PRACTICE AREA', w / 2, 220);

            // 4. Scales of Justice Icon / Emblem
            x.font = '120px serif';
            x.fillStyle = goldGrad;
            x.fillText('⚖', w / 2, 400);

            // 5. Main Title (Gold foil look with drop shadow)
            x.shadowColor = 'rgba(0,0,0,0.8)';
            x.shadowBlur = 15;
            x.shadowOffsetX = 0;
            x.shadowOffsetY = 5;
            
            x.fillStyle = goldGrad; 
            x.font = '800 85px "Times New Roman", serif';
            // Disable letterSpacing for main title if unsupported, or simulate
            if(x.letterSpacing !== undefined) x.letterSpacing = '2px';
            
            const words = title.split(' ');
            let line = ''; const lines = [];
            words.forEach(word => {
                const test = line ? line + ' ' + word : word;
                if (x.measureText(test).width > w * 0.7 && line) { lines.push(line); line = word; } else line = test;
            });
            if (line) lines.push(line);
            
            const startY = 650;
            lines.forEach((l, i) => x.fillText(l.toUpperCase(), w / 2, startY + i * 110));
            
            x.shadowColor = 'transparent'; // reset shadow

            // 6. Decorative line
            const lineY = startY + (lines.length * 110) + 40;
            x.fillRect(w/2 - 80, lineY, 160, 4);

            // 7. Author / Advocate Name at bottom
            x.font = 'italic 40px "Times New Roman", serif';
            x.fillStyle = 'rgba(255,255,255,0.8)';
            if(x.letterSpacing !== undefined) x.letterSpacing = '4px';
            x.fillText('Adv. Achche Lal Gautam', w / 2, h - 180);
            
            x.font = '30px "Times New Roman", serif';
            x.fillStyle = 'rgba(255,255,255,0.5)';
            if(x.letterSpacing !== undefined) x.letterSpacing = '8px';
            x.fillText('DISTRICT COURT UNNAO', w / 2, h - 130);
        }

        function paintSpine(x, w, h, title, bg) {
            // Gradient background matching front cover
            x.fillStyle = bg; x.fillRect(0, 0, w, h);
            x.fillStyle = 'rgba(0,0,0,0.4)'; x.fillRect(0, 0, w, h);
            const glow = x.createLinearGradient(0, 0, w, 0);
            glow.addColorStop(0, 'rgba(0,0,0,0.8)');
            glow.addColorStop(0.5, bg);
            glow.addColorStop(1, 'rgba(0,0,0,0.8)');
            x.fillStyle = glow; x.fillRect(0, 0, w, h);

            const goldGrad = x.createLinearGradient(0, 0, w, h);
            goldGrad.addColorStop(0, '#ebd197');
            goldGrad.addColorStop(0.5, '#ffd700');
            goldGrad.addColorStop(1, '#b8860b');

            // Spine horizontal ridges (classic leather book style)
            x.fillStyle = 'rgba(0,0,0,0.6)';
            x.fillRect(0, 150, w, 15);
            x.fillRect(0, 300, w, 15);
            x.fillRect(0, h - 300, w, 15);
            x.fillRect(0, h - 150, w, 15);
            
            x.fillStyle = 'rgba(255,255,255,0.1)';
            x.fillRect(0, 147, w, 3);
            x.fillRect(0, 297, w, 3);
            x.fillRect(0, h - 303, w, 3);
            x.fillRect(0, h - 153, w, 3);

            // Title text rotated
            x.save(); x.translate(w / 2, h / 2); x.rotate(Math.PI / 2);
            x.shadowColor = 'rgba(0,0,0,0.8)'; x.shadowBlur = 10; x.shadowOffsetY = 3;
            x.fillStyle = goldGrad; x.font = '800 48px "Times New Roman", serif';
            drawSpaced(x, title.toUpperCase(), -h * 0.05, 15, 6);
            
            // Author text
            x.shadowColor = 'transparent';
            x.font = 'italic 34px "Times New Roman", serif';
            x.fillStyle = 'rgba(255,255,255,0.8)';
            drawSpaced(x, 'Adv. Achche Lal Gautam', h * 0.35, 10, 2);
            x.restore();

            // Decorative top and bottom gold boxes
            x.strokeStyle = goldGrad; x.lineWidth = 4;
            x.strokeRect(30, 40, w - 60, 80);
            x.font = '40px serif'; x.fillStyle = goldGrad; x.textAlign = 'center';
            x.fillText('⚖', w/2, 95);
            
            x.strokeRect(30, h - 120, w - 60, 80);
            x.font = '24px serif';
            x.fillText('VOL.', w/2, h - 85);
            x.fillText('I', w/2, h - 55);
        }

        
        function trimToWidth(x, text, maxW) {
            if (x.measureText(text).width <= maxW) return text;
            let t = text;
            while (t.length > 1 && x.measureText(t + '...').width > maxW) t = t.slice(0, -1);
            return t + '...';
        }

        function makeIndexPageTex(chapters) {
            const w = 1024, h = 1536, c = mkCanvas(w, h), x = c.getContext('2d');
            x.fillStyle = '#f4efdf'; x.fillRect(0, 0, w, h);
            x.fillStyle = 'rgba(130,110,80,0.07)';
            for (let i = 0; i < 1600; i++) x.fillRect(Math.random() * w, Math.random() * h, 1.1, 1.1);
            x.fillStyle = '#2f2a23'; x.textAlign = 'center'; x.font = '700 84px Georgia';
            x.fillText('KEY AREAS', w / 2, 190);
            x.globalAlpha = 0.26; x.fillRect(220, 225, w - 440, 3); x.globalAlpha = 1;

            const list = chapters && chapters.length ? chapters : ['Consultation', 'Case Study', 'Representation', 'Filing', 'Argument', 'Judgment'];
            x.textAlign = 'left'; x.font = '500 46px Georgia';
            let y = 318;
            for (let i = 0; i < list.length; i++) {
                const n = String(i + 1).padStart(2, '0');
                const left = n + '. ' + trimToWidth(x, list[i], 700);
                x.fillStyle = '#2f2a23'; x.fillText(left, 150, y);
                x.globalAlpha = 0.22; x.fillRect(150, y + 16, w - 300, 2); x.globalAlpha = 1;
                y += 112;
            }
            return tex(c);
        }

        const W = 1.42, H = 2.14, T = 0.34, CT = 0.032, OV = 0.05;
        const PAGE_N = lowPowerDevice ? 6 : 10, BACK_PAGE_N = lowPowerDevice ? 3 : 5, PW = W - 0.02, PH = H - 0.02;
        const BLOCK_D = 0.245, BLOCK_Z = -0.0205, PIVOT_Z = T / 2 + CT / 2, BPIVOT_Z = -(T / 2 + CT / 2), HINGE_OVERLAP = 0.05;

        const coverGeo = new THREE.BoxGeometry(W + OV, H + OV * 2, CT);
        const blockGeo = new THREE.BoxGeometry(W - 0.015, H, BLOCK_D);
        const pageGeo = new THREE.PlaneGeometry(PW, PH);
        const spineGeo = new THREE.BoxGeometry(0.028, H + OV * 2, T + CT * 2 + 0.006);
        const hitGeo = new THREE.BoxGeometry(1.8, 2.5, 1.15);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });

        function std(o) { return new THREE.MeshStandardMaterial(Object.assign({ metalness: 0.02 }, o)); }
        const paperFlat = std({ color: 0xf2ecdd, roughness: 0.95, envMapIntensity: 0.2 });
        const striMatV = std({ map: striV, bumpMap: striV, bumpScale: 0.0025, roughness: 0.95 });
        const striMatH = std({ map: striH, bumpMap: striH, bumpScale: 0.0025, roughness: 0.95 });
        const endpaperMat = std({ map: endpaperTex, roughness: 0.9 });
        const pageMats = [0xf4eee0, 0xf1ebdb, 0xf6f0e3].map((c) => std({ color: c, roughness: 0.92, side: THREE.DoubleSide }));

        const bookInstances = [];
        const hitMeshes = [];

        this.booksData.forEach((cfg, index) => {
            const float = new THREE.Group();
            const root = new THREE.Group(); root.add(float); bookRoot.add(root);
            
            const edgeColor = '#eee4cf';
            const mEdge = std({ color: edgeColor, bumpMap: laminateBump, bumpScale: 0.0035, roughness: 0.68 });
            
            const cFront = mkCanvas(1024, 1536); paintDefaultFront(cFront.getContext('2d'), 1024, 1536, (window.__getTranslation?window.__getTranslation(cfg.title):cfg.title), cfg.color || '#222');
            const mFront = std({ map: tex(cFront), bumpMap: laminateBump, bumpScale: 0.0035, roughness: 0.54 });
            
            const cBack = mkCanvas(1024, 1536); cBack.getContext('2d').fillStyle = cfg.color || '#222'; cBack.getContext('2d').fillRect(0,0,1024,1536);
            const mBack = std({ map: tex(cBack), bumpMap: laminateBump, bumpScale: 0.0035, roughness: 0.58 });
            
            const cSpine = mkCanvas(220, 1536); paintSpine(cSpine.getContext('2d'), 220, 1536, (window.__getTranslation?window.__getTranslation(cfg.title):cfg.title), cfg.color || '#222');
            const mSpine = std({ map: tex(cSpine), bumpMap: clothBump, bumpScale: 0.006, roughness: 0.78 });

            const backPivot = new THREE.Group(); backPivot.position.set(-W / 2 - HINGE_OVERLAP, 0, BPIVOT_Z);
            const backMesh = new THREE.Mesh(coverGeo, [mEdge, mEdge, mEdge, mEdge, endpaperMat, mBack]);
            backMesh.position.x = (W + OV) / 2; backMesh.castShadow = true; backPivot.add(backMesh); float.add(backPivot);

            const pivot = new THREE.Group(); pivot.position.set(-W / 2 - HINGE_OVERLAP, 0, PIVOT_Z);
            const frontMesh = new THREE.Mesh(coverGeo, [mEdge, mEdge, mEdge, mEdge, mFront, endpaperMat]);
            frontMesh.position.x = (W + OV) / 2; frontMesh.castShadow = true; pivot.add(frontMesh); float.add(pivot);

            const spine = new THREE.Mesh(spineGeo, mSpine); spine.position.set(-W / 2 - 0.013, 0, 0); spine.castShadow = true; float.add(spine);
            const block = new THREE.Mesh(blockGeo, [striMatV, paperFlat, striMatH, striMatH, paperFlat, paperFlat]);
            block.position.set(-0.0075, 0, BLOCK_Z); block.castShadow = true; float.add(block);

            const pages = [], pageF = [];
            
            const indexPageMat = std({ map: makeIndexPageTex(cfg.chapters ? cfg.chapters.map(c => window.__getTranslation ? window.__getTranslation(c) : c) : null), roughness: 0.92, side: THREE.DoubleSide });
            for (let i = 0; i < PAGE_N; i++) {
                const pp = new THREE.Group(); pp.position.set(-W / 2 + 0.01, (Math.random() - 0.5) * 0.006, 0.166 - i * 0.0042);
                const pm = new THREE.Mesh(pageGeo, i === 0 ? indexPageMat : pageMats[i % 3]); pm.position.x = PW / 2; pm.rotation.z = (Math.random() - 0.5) * 0.006;
                pp.add(pm); float.add(pp); pages.push(pp); pageF.push(0.3 * Math.pow(1 - i / PAGE_N, 2.6));
            }

            const pagesB = [], pageFB = [];
            for (let i = 0; i < BACK_PAGE_N; i++) {
                const pp = new THREE.Group(); pp.position.set(-W / 2 + 0.01, (Math.random() - 0.5) * 0.006, -0.166 + i * 0.0042);
                const pm = new THREE.Mesh(pageGeo, pageMats[i % 3]); pm.position.x = PW / 2; pm.rotation.z = (Math.random() - 0.5) * 0.006;
                pp.add(pm); float.add(pp); pagesB.push(pp); pageFB.push(0.3 * Math.pow(1 - i / BACK_PAGE_N, 2.6));
            }

            const blob = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, opacity: 0.45, depthWrite: false }));
            blob.scale.set(3.1, 3.9, 1); blob.position.set(0.1, -0.3, -0.85); blob.renderOrder = -5; root.add(blob);

            const hit = new THREE.Mesh(hitGeo, hitMat); float.add(hit);

            bookInstances.push({
                cfg, index, root, float, pivot, backPivot, frontMesh, spine, block, pages, pageF, pagesB, pageFB, hit,
                springs: {
                    px: new Spring(0, 17, 6.8), py: new Spring(0, 17, 6.8), pz: new Spring(0, 17, 6.8),
                    rx: new Spring(0, 17, 6.8), ry: new Spring(0, 17, 6.8), rz: new Spring(0, 17, 6.8),
                    sc: new Spring(1, 17, 6.8), tiltX: new Spring(0, 120, 13), tiltY: new Spring(0, 120, 13),
                    lift: new Spring(0, 120, 13), cover: new Spring(0, 90, 12), coverB: new Spring(0, 90, 12), drag: new Spring(0, 160, 16)
                },
                phase: Math.random() * 6.28, slotScale: 1, scr: { x: 0, y: 0 },
                orbY: 0, orbYv: 0, orbPhase: 'idle', orbTarget: 0, orbXs: new Spring(0, 60, 12), exit: null
            });
        });
        
        this.retranslate = () => {
            const tr = window.__getTranslation || (t => t);
            bookInstances.forEach(b => {
                const cfg = b.cfg;
                
                // Front
                const cFront = mkCanvas(1024, 1536);
                paintDefaultFront(cFront.getContext('2d'), 1024, 1536, tr(cfg.title), cfg.color || '#222');
                const tFront = tex(cFront);
                b.frontMesh.material[4].map.dispose();
                b.frontMesh.material[4].map = tFront;
                b.frontMesh.material[4].needsUpdate = true;

                // Spine
                const cSpine = mkCanvas(220, 1536);
                paintSpine(cSpine.getContext('2d'), 220, 1536, tr(cfg.title), cfg.color || '#222');
                const tSpine = tex(cSpine);
                b.spine.material.map.dispose();
                b.spine.material.map = tSpine;
                b.spine.material.needsUpdate = true;

                // Index
                const translatedChapters = cfg.chapters ? cfg.chapters.map(c => tr(c)) : null;
                const tIndex = makeIndexPageTex(translatedChapters);
                const pm = b.pages[0].children[0];
                pm.material.map.dispose();
                pm.material.map = tIndex;
                pm.material.needsUpdate = true;
            });

            if (selectedCfg) {
                dpTitle.innerText = tr(selectedCfg.title);
                dpDesc.innerText = tr(selectedCfg.desc);
                dpSubtitle.innerText = tr('PRACTICE AREA');
            }
            
            heroWord.innerText = tr('Practice');
            nav.querySelector('div').innerText = tr('Legal Areas');
            openBtn.innerText = tr('Open');
        };
        window.__threeBooksRetranslate = this.retranslate;

        const bookByHit = (m) => bookInstances.find((b) => b.hit === m);

        // Leaves
        const leaves = {
            items: [], anchor: null,
            activate(book) {
                this.anchor = book;
                this.items.forEach((l) => {
                    l.kick.set(-l.hx + (Math.random() - 0.5) * 0.6, -l.hy + (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.5);
                    l.s.t = l.size; l.mesh.visible = true;
                });
            },
            deactivate() { this.items.forEach((l) => { l.s.t = 0; }); },
            push(dx, dy) { if (!this.anchor) return; this.items.forEach((l) => { l.kick.x += dx * 2.4 * Math.random(); l.kick.y += -dy * 2.4 * Math.random(); }); },
            update(dt, t) {
                if (!this.anchor) return;
                const ap = this.anchor.root.position, w = RM ? 0.15 : 1;
                this.items.forEach((l) => {
                    l.kick.multiplyScalar(Math.exp(-1.15 * dt));
                    l.mesh.position.set(ap.x + l.hx + Math.sin(t * l.sp + l.ph) * 0.4 * w + l.kick.x, ap.y + l.hy + Math.cos(t * l.sp * 0.83 + l.ph * 1.3) * 0.3 * w + l.kick.y, ap.z * 0.4 + l.hz + l.kick.z);
                    l.mesh.rotation.x += l.rv.x * dt * (0.3 + w); l.mesh.rotation.y += l.rv.y * dt * (0.3 + w); l.mesh.rotation.z += l.rv.z * dt * (0.3 + w);
                    const s = l.s.update(dt); l.mesh.scale.setScalar(Math.max(s, 0.0001));
                    if (l.s.t === 0 && s < 0.01) l.mesh.visible = false;
                });
            }
        };
        (function buildLeaves() {
            const shape = new THREE.Shape(); shape.moveTo(0, -0.5); shape.bezierCurveTo(0.3, -0.28, 0.3, 0.22, 0, 0.55); shape.bezierCurveTo(-0.3, 0.22, -0.3, -0.28, 0, -0.5);
            const geo = new THREE.ShapeGeometry(shape, 10);
            const cols = [0x3e7c3f, 0x57944a, 0x2f6136, 0x6aa557];
            for (let i = 0; i < 16; i++) {
                const mesh = new THREE.Mesh(geo, std({ color: cols[i % 4], roughness: 0.55, side: THREE.DoubleSide }));
                mesh.visible = false; bookRoot.add(mesh);
                let hx = (Math.random() - 0.5) * 4.6; if (i % 5 === 0) hx += 2.8 * Math.sign(hx || 1);
                leaves.items.push({ mesh, hx, hy: (Math.random() - 0.5) * 3.2, hz: -0.5 + Math.random() * 1.5, sp: 0.25 + Math.random() * 0.5, ph: Math.random() * 6.28, rv: new THREE.Vector3((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8), kick: new THREE.Vector3(), size: 0.14 + Math.random() * 0.16, s: new Spring(0, 60, 10) });
            }
        })();

        const SLOTS = { hero: [], detail: null, portrait: false };
        function computeSlots() {
            const a = dims.w / Math.max(1, dims.h), portrait = a < 0.85;
            const fit = portrait ? clamp(a / 1.08, 0.38, 0.74) : clamp(a / 1.62, 0.52, 1);
            bookRoot.scale.setScalar(fit); bookRoot.position.y = -(1 - fit) * 0.28;
            SLOTS.portrait = portrait;
            SLOTS.hero = portrait ? [
                { p: [-1.36, -0.58, -0.12], r: [-0.045, 0.4, 0.185], s: 1.25 },
                { p: [0.2, -0.22, 0.6], r: [-0.05, -0.1, -0.035], s: 1.35 },
                { p: [1.62, -0.62, -0.34], r: [-0.045, -0.42, -0.17], s: 1.25 },
            ] : [
                { p: [-2.05, -0.58, -0.12], r: [-0.045, 0.4, 0.185], s: 1.22 },
                { p: [0.25, -0.36, 0.6], r: [-0.05, -0.1, -0.035], s: 1.32 },
                { p: [2.35, -0.64, -0.34], r: [-0.045, -0.42, -0.17], s: 1.22 },
            ];
            if (portrait) {
                SLOTS.detail = { p: [0, -0.1, 0.8], r: [-0.02, -0.4, 0.06], s: 0.8 };
            } else {
                SLOTS.detail = { p: [-1.68, 0.0, 0.85], r: [0.02, -0.44, 0.08], s: 1.06 };
            }
        }

        const EASE = { hold: () => 1, outQuad: (t) => 1 - (1 - t) * (1 - t), outQuint: (t) => 1 - Math.pow(1 - t, 5), inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2 };
        function playY(b, segs) { b.exit = { segs, i: 0, t: 0 }; }
        function stepY(b, dt) {
            const ex = b.exit, s = b.springs; ex.t += dt; let seg = ex.segs[ex.i];
            while (seg && ex.t >= seg.d) { ex.t -= seg.d; s.py.v = seg.to; if (seg.end) seg.end(); seg = ex.segs[++ex.i]; }
            if (seg) s.py.v = seg.from + (seg.to - seg.from) * seg.ease(ex.t / seg.d); else b.exit = null;
            s.py.t = s.py.v; s.py.vel = 0;
        }
        function pinInPlace(b) { const s = b.springs; s.px.t = s.px.v; s.pz.t = s.pz.v; s.rx.t = s.rx.v; s.ry.t = s.ry.v; s.rz.t = s.rz.v; }

        let currentWindow = [0, 1, 2].map(i => i % bookInstances.length);
        let carouselStart = 0;

        function applyMode() {
            if (uiMode === 'hero' || uiMode === 'closing') {
                currentWindow.forEach((bi, i) => {
                    const slot = SLOTS.hero[i];
                    if (slot) {
                        const s = bookInstances[bi].springs;
                        s.px.t = slot.p[0]; s.py.t = slot.p[1]; s.pz.t = slot.p[2];
                        s.rx.t = slot.r[0]; s.ry.t = slot.r[1]; s.rz.t = slot.r[2];
                        bookInstances[bi].slotScale = slot.s;
                    }
                });
            } else if (selectedCfg) {
                const b = bookInstances.find(bk => bk.cfg === selectedCfg);
                const slot = SLOTS.detail;
                const s = b.springs;
                s.px.t = slot.p[0]; s.py.t = slot.p[1]; s.pz.t = slot.p[2];
                s.rx.t = slot.r[0]; s.ry.t = slot.r[1]; s.rz.t = slot.r[2];
                b.slotScale = slot.s;
            }
        }

        function shiftCarousel(dir) {
            if (uiMode !== 'hero' || bookInstances.length <= 3) return;
            carouselStart = (((carouselStart + dir) % bookInstances.length) + bookInstances.length) % bookInstances.length;
            const incoming = [0, 1, 2].map(i => (carouselStart + i) % bookInstances.length);
            
            const toHide = currentWindow.filter(bi => !incoming.includes(bi));
            toHide.forEach(bi => {
                const b = bookInstances[bi];
                const oldIdx = currentWindow.indexOf(bi);
                const slot = SLOTS.hero[oldIdx];
                if (slot) b.springs.px.t = slot.p[0] - dir * 6.5;
            });
            setTimeout(() => toHide.forEach(bi => { bookInstances[bi].root.visible = false; }), 650);

            incoming.forEach((bi, i) => {
                const slot = SLOTS.hero[i];
                if (!slot) return;
                const b = bookInstances[bi];
                const alreadyOnScreen = currentWindow.includes(bi);
                b.root.visible = true;
                if (!alreadyOnScreen) {
                    b.springs.px.set(slot.p[0] + dir * 6.5); b.springs.py.set(slot.p[1]); b.springs.pz.set(slot.p[2]);
                    b.springs.rx.set(slot.r[0]); b.springs.ry.set(slot.r[1]); b.springs.rz.set(slot.r[2]); b.springs.sc.set(slot.s * 0.92);
                }
                const s = b.springs;
                s.px.t = slot.p[0]; s.py.t = slot.p[1]; s.pz.t = slot.p[2];
                s.rx.t = slot.r[0]; s.ry.t = slot.r[1]; s.rz.t = slot.r[2];
                b.slotScale = slot.s;
            });
            currentWindow = incoming;
            hitMeshes.length = 0;
            currentWindow.forEach(bi => hitMeshes.push(bookInstances[bi].hit));
        }

        prevBtn.addEventListener('click', () => shiftCarousel(-1));
        nextBtn.addEventListener('click', () => shiftCarousel(1));

        const camX = new Spring(0, 13, 6.5), camY = new Spring(0.1, 13, 6.5), camZ = new Spring(9.6, 13, 6.5);
        const lookX = new Spring(0, 13, 6.5), lookY = new Spring(0, 13, 6.5);
        const parX = new Spring(0, 60, 10), parY = new Spring(0, 60, 10);

        function camTo(mode) {
            if (mode === 'detail') { camX.t = SLOTS.portrait ? 0 : -0.25; camZ.t = SLOTS.portrait ? 10.4 : 9.6; lookX.t = SLOTS.portrait ? 0 : -0.35; lookY.t = SLOTS.portrait ? 0 : 0.15; }
            else { camX.t = 0; camZ.t = 9.6; lookX.t = 0; lookY.t = 0; }
        }

        const pillX = new Spring(0, 190, 23), pillY = new Spring(0, 190, 23);
        let pillOn = false;
        function showPill() { openBtn.style.opacity = 1; openBtn.style.transform = 'translate(-50%,-50%) scale(1) rotate(-1.6deg)'; pillOn = true; }
        function hidePill() { openBtn.style.opacity = 0; openBtn.style.transform = 'translate(-50%,-50%) scale(0.94) rotate(-1.6deg)'; pillOn = false; }

        function open(book) {
            if (uiMode !== 'hero' || !book) return;
            uiMode = 'opening';
            selectedCfg = book.cfg;
            hidePill(); book.exit = null;
            rootEl.style.background = '#141a32';
            heroWord.style.opacity = 0;
            nav.style.opacity = 0;
            prevBtn.style.opacity = 0; prevBtn.style.pointerEvents = 'none';
            nextBtn.style.opacity = 0; nextBtn.style.pointerEvents = 'none';

            computeSlots();
            let out = 0;
            currentWindow.forEach((bi, i) => {
                const b = bookInstances[bi];
                if (b !== book) {
                    const y0 = SLOTS.hero[i].p[1], here = b.springs.py.v, apex = y0 + 0.38;
                    b.root.visible = true; pinInPlace(b);
                    playY(b, [{ d: out++ * 0.08, from: here, to: here, ease: EASE.hold }, { d: 0.28, from: here, to: apex, ease: EASE.outQuad }, { d: 0.9, from: apex, to: y0 - 4.2, ease: EASE.inOutSine, end: () => { b.root.visible = false; } }]);
                }
            });

            setTimeout(() => {
                book.orbY = RM ? 0 : -6.2832; book.orbYv = RM ? 0 : 3; book.orbPhase = 'return'; book.orbTarget = 0; book.orbXs.set(0);
                applySlotsToDetail();
            }, 760);
            setTimeout(() => leaves.activate(book), 1000);
            setTimeout(() => {
                if (uiMode === 'opening') {
                    currentWindow.forEach((bi) => { const sibling = bookInstances[bi]; if (sibling !== book) { sibling.exit = null; sibling.root.visible = false; } });
                    uiMode = 'detail';
                    
                    dp.style.visibility = 'visible';
                    const tr = window.__getTranslation || (t => t);
                    dpTitle.innerText = tr(selectedCfg.title);
                    dpDesc.innerText = tr(selectedCfg.desc);
                    dpSubtitle.innerText = tr('PRACTICE AREA');
                    
                    dpTitle.style.opacity = 1; dpTitle.style.transform = 'translateY(0)';
                    dpDesc.style.opacity = 1; dpDesc.style.transform = 'translateY(0)';
                    
                    dpSubtitle.style.opacity = 1; dpSubtitle.style.transform = 'translateY(0)';
                    dpMeta.style.opacity = 1; dpMeta.style.transform = 'translateY(0)';
                    closeBtn.style.opacity = 1; closeBtn.style.pointerEvents = 'auto';
                }
            }, 1400);
        }

        function applySlotsToDetail() { applyMode(); camTo('detail'); }

        function close() {
            if (uiMode !== 'detail') return;
            uiMode = 'closing';
            leaves.deactivate(); orbit.drag = false;
            
            dpTitle.style.opacity = 0; dpTitle.style.transform = 'translateY(28px)';
            dpDesc.style.opacity = 0; dpDesc.style.transform = 'translateY(28px)';
            
            dpSubtitle.style.opacity = 0; dpSubtitle.style.transform = 'translateY(28px)';
            dpMeta.style.opacity = 0; dpMeta.style.transform = 'translateY(28px)';
            closeBtn.style.opacity = 0; closeBtn.style.pointerEvents = 'none';

            const b = bookInstances.find(bk => bk.cfg === selectedCfg);
            if (b) { b.orbTarget = Math.round(b.orbY / 6.2832) * 6.2832 + 6.2832; b.orbYv = Math.max(b.orbYv, 3); b.orbPhase = 'return'; b.orbXs.t = 0; }
            setTimeout(() => {
                rootEl.style.background = '#fbf9f4';
                applyMode(); camTo('hero');
                let back = 0;
                currentWindow.forEach((bi, i) => {
                    const bk = bookInstances[bi];
                    if (bk !== b) {
                        const here = bk.springs.py.v; bk.root.visible = true; pinInPlace(bk);
                        playY(bk, [{ d: 0.85 + back++ * 0.1, from: here, to: here, ease: EASE.hold }, { d: 1.0, from: here, to: SLOTS.hero[i].p[1], ease: EASE.outQuint }]);
                    }
                });
            }, 250);
            setTimeout(() => {
                if (uiMode === 'closing') {
                    uiMode = 'hero'; selectedCfg = null;
                    dp.style.visibility = 'hidden';
                    heroWord.style.opacity = 1;
                    nav.style.opacity = 1;
                    if(bookInstances.length > 3) {
                        prevBtn.style.opacity = 1; prevBtn.style.pointerEvents = 'auto';
                        nextBtn.style.opacity = 1; nextBtn.style.pointerEvents = 'auto';
                    }
                }
            }, 1600);
        }
        closeBtn.addEventListener('click', close);

        const ptr = { ndcX: 0, ndcY: 0, cx: 0, cy: 0, lastX: 0, lastY: 0, down: false, downX: 0, downY: 0, moved: 0, t0: 0, type: 'mouse', seen: false, id: null };
        let dragBook = null, rayBook = null;
        const orbit = { drag: false, dxAcc: 0, dyAcc: 0 };
        const ray = new THREE.Raycaster(); const tmpV = new THREE.Vector3();

        canvasEl.addEventListener('pointermove', e => {
            if (ptr.id !== null && e.pointerId !== ptr.id) return;
            const r = rootEl.getBoundingClientRect(), cx = e.clientX - r.left, cy = e.clientY - r.top;
            const dxN = (cx - ptr.lastX) / dims.w, dyN = (cy - ptr.lastY) / dims.h;
            ptr.lastX = cx; ptr.lastY = cy; ptr.cx = cx; ptr.cy = cy; ptr.ndcX = (cx / dims.w) * 2 - 1; ptr.ndcY = -(cy / dims.h) * 2 + 1;
            ptr.type = e.pointerType || 'mouse'; ptr.seen = true;
            if (uiMode === 'detail') leaves.push(dxN, dyN);
            if (ptr.down && dragBook) { ptr.moved += Math.abs(dxN * dims.w) + Math.abs(dyN * dims.h); dragBook.springs.drag.t = clamp(((ptr.downX - cx) / dims.w) * 3.4, 0, 1.0); }
            if (ptr.down && orbit.drag) { orbit.dxAcc += dxN; orbit.dyAcc += dyN; ptr.moved += Math.abs(dxN * dims.w) + Math.abs(dyN * dims.h); }
        });
        canvasEl.addEventListener('pointerdown', e => {
            if (ptr.id !== null) return; ptr.id = e.pointerId;
            const r = rootEl.getBoundingClientRect(), cx = e.clientX - r.left, cy = e.clientY - r.top;
            ptr.cx = cx; ptr.cy = cy; ptr.lastX = cx; ptr.lastY = cy; ptr.ndcX = (cx / dims.w) * 2 - 1; ptr.ndcY = -(cy / dims.h) * 2 + 1;
            ptr.type = e.pointerType || 'mouse'; ptr.seen = true;
            castRay();
            const bDetail = selectedCfg ? bookInstances.find(bk => bk.cfg === selectedCfg) : null;
            if (uiMode === 'hero' && rayBook) { ptr.down = true; dragBook = rayBook; ptr.downX = cx; ptr.downY = cy; ptr.moved = 0; ptr.t0 = performance.now(); canvasEl.setPointerCapture(e.pointerId); }
            else if (uiMode === 'detail' && rayBook === bDetail) { ptr.down = true; orbit.drag = true; orbit.dxAcc = 0; orbit.dyAcc = 0; ptr.moved = 0; ptr.t0 = performance.now(); canvasEl.setPointerCapture(e.pointerId); }
        });
        window.addEventListener('pointerup', e => {
            if (ptr.id !== null && e.pointerId !== ptr.id) return; ptr.id = null; orbit.drag = false;
            if (dragBook) {
                const slop = (ptr.type === 'touch') ? 26 : 14, limit = (ptr.type === 'touch') ? 650 : 450;
                const wasDrag = ptr.moved > slop; dragBook.springs.drag.t = 0;
                if (!wasDrag && uiMode === 'hero' && performance.now() - ptr.t0 < limit) open(dragBook);
                dragBook = null;
            }
            ptr.down = false; if (ptr.type === 'touch') rayBook = null;
        });
        const cancelPointer = (e) => { if (e && ptr.id !== null && e.pointerId !== ptr.id) return; ptr.id = null; ptr.down = false; orbit.drag = false; if (dragBook) { dragBook.springs.drag.t = 0; dragBook = null; } if (ptr.type === 'touch') rayBook = null; };
        window.addEventListener('pointercancel', cancelPointer);
        canvasEl.addEventListener('lostpointercapture', cancelPointer);

        function castRay() {
            ray.setFromCamera({ x: ptr.ndcX, y: ptr.ndcY }, camera);
            const hits = ray.intersectObjects(hitMeshes, false);
            rayBook = hits.length ? bookByHit(hits[0].object) : null;
        }

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const dt = Math.min(clock.getDelta(), 0.05), t = clock.getElapsedTime();

            if (ptr.seen && (ptr.type === 'mouse' || ptr.down)) castRay();
            let hov = null;
            const bDetail = selectedCfg ? bookInstances.find(bk => bk.cfg === selectedCfg) : null;
            if (uiMode === 'hero') { hov = rayBook || null; } else if (uiMode === 'detail') { hov = rayBook === bDetail ? rayBook : null; }
            let cur = 'default';
            if (uiMode === 'hero' && hov) cur = 'pointer'; else if (uiMode === 'detail' && bDetail) { if (orbit.drag) cur = 'grabbing'; else if (rayBook === bDetail) cur = 'grab'; }
            canvasEl.style.cursor = cur;

            bookInstances.forEach(b => {
                b.root.getWorldPosition(tmpV).project(camera); b.scr.x = (tmpV.x * 0.5 + 0.5) * dims.w; b.scr.y = (-tmpV.y * 0.5 + 0.5) * dims.h;
                
                const s = b.springs, isHov = hov === b, inDetail = uiMode === 'detail' && b === bDetail, orbitActive = b === bDetail && uiMode !== 'hero';
                let activity = 0;
                if (orbitActive) {
                    if (orbit.drag && inDetail) {
                        const step = orbit.dxAcc * 6.5; orbit.dxAcc = 0; b.orbY += step; b.orbYv = clamp(b.orbYv * 0.5 + (step / Math.max(dt, 0.001)) * 0.5, -14, 14);
                        b.orbXs.t = clamp(b.orbXs.t + orbit.dyAcc * 3.2, -0.55, 0.55); orbit.dyAcc = 0; b.orbPhase = 'drag';
                    } else {
                        b.orbXs.t = 0;
                        if (b.orbPhase === 'drag') { if (Math.abs(b.orbYv) > 0.6) b.orbPhase = 'spin'; else { b.orbPhase = 'return'; b.orbTarget = Math.round((b.orbY + b.orbYv * 1.2) / Math.PI) * Math.PI; } }
                        if (b.orbPhase === 'spin') { b.orbYv *= Math.exp(-0.9 * dt); b.orbY += b.orbYv * dt; if (Math.abs(b.orbYv) < 0.5) { b.orbPhase = 'return'; b.orbTarget = Math.round((b.orbY + b.orbYv * 1.2) / Math.PI) * Math.PI; } }
                        else if (b.orbPhase === 'return') { const acc = 16 * (b.orbTarget - b.orbY) - 8 * b.orbYv; b.orbYv += acc * dt; b.orbY += b.orbYv * dt; if (Math.abs(b.orbTarget - b.orbY) < 0.002 && Math.abs(b.orbYv) < 0.01) { b.orbY = b.orbTarget; b.orbYv = 0; b.orbPhase = 'idle'; } }
                    }
                    const distRest = Math.abs(b.orbY - Math.round(b.orbY / 6.2832) * 6.2832); activity = clamp(Math.abs(b.orbYv) * 1.5 + (orbit.drag ? 1 : 0) + distRest * 2, 0, 1);
                }
                b.orbXs.update(dt);
                let coverBase = inDetail ? 0.88 + Math.sin(t * 0.8 + b.phase) * 0.035 : 0;
                const fan = orbitActive ? clamp(b.orbYv * 0.16, 0, 0.75) : 0, fanB = orbitActive ? clamp(-b.orbYv * 0.16, 0, 0.75) : 0;
                let coverBBase = inDetail ? 0.2 + Math.sin(t * 0.8 + b.phase + 1.7) * 0.02 : 0;

                if (isHov && ptr.seen && uiMode === 'hero') {
                    const dxN = (ptr.cx - b.scr.x) / (dims.w * 0.25), dyN = (b.scr.y - ptr.cy) / (dims.h * 0.3);
                    s.tiltY.t = clamp(dxN * 0.28, -0.15, 0.15); s.tiltX.t = clamp(-dyN * 0.1, -0.09, 0.1); s.lift.t = 0.3; coverBase = 0;
                } else { s.tiltY.t = 0; s.tiltX.t = 0; s.lift.t = 0; }
                s.cover.t = coverBase + fan; s.coverB.t = coverBBase + fanB; s.sc.t = b.slotScale * (isHov && uiMode === 'hero' ? 1.09 : 1);

                s.px.update(dt); if (b.exit) stepY(b, dt); else s.py.update(dt); s.pz.update(dt);
                s.rx.update(dt); s.ry.update(dt); s.rz.update(dt); s.sc.update(dt);
                s.tiltX.update(dt); s.tiltY.update(dt); s.lift.update(dt); s.cover.update(dt); s.coverB.update(dt); s.drag.update(dt);

                b.float.position.y = Math.sin(t * 0.7 + b.phase) * 0.035; b.float.rotation.z = Math.sin(t * 0.9 + b.phase * 1.7) * 0.006;
                b.root.position.set(s.px.v, s.py.v, s.pz.v + s.lift.v);
                const sway = inDetail ? Math.sin(t * 0.45 + b.phase) * 0.035 * (1 - activity) : 0, swing = clamp(-s.px.vel * 0.12, -0.5, 0.5);
                b.root.rotation.set(s.rx.v + s.tiltX.v + b.orbXs.v, s.ry.v + s.tiltY.v + b.orbY + sway + swing, s.rz.v);
                b.root.scale.setScalar(Math.max(s.sc.v, 0.001));

                const ang = Math.max(0, s.cover.v + s.drag.v), angB = Math.max(0, s.coverB.v);
                b.pivot.rotation.y = -ang; b.pivot.position.z = PIVOT_Z + ang * 0.022; b.backPivot.rotation.y = angB; b.backPivot.position.z = BPIVOT_Z - angB * 0.022;
                b.spine.rotation.y = -ang * 0.16 + angB * 0.16; b.block.scale.z = 1 - (ang + angB) * 0.05; b.block.position.z = BLOCK_Z - ang * 0.006 + angB * 0.006;
                for (let i = 0; i < PAGE_N; i++) { const fl = Math.sin(t * 1.15 + b.phase + i * 0.6) * 0.006 * (1 - i / PAGE_N); b.pages[i].rotation.y = -(ang * b.pageF[i] + Math.max(0, fl)); }
                for (let i = 0; i < BACK_PAGE_N; i++) b.pagesB[i].rotation.y = angB * b.pageFB[i];
            });
            leaves.update(dt, t);
            parX.t = RM ? 0 : ptr.ndcX * 0.02; parY.t = RM ? 0 : -ptr.ndcY * 0.012; bookRoot.rotation.y = parX.update(dt); bookRoot.rotation.x = parY.update(dt);
            camera.position.set(camX.update(dt), camY.update(dt), camZ.update(dt)); camera.lookAt(lookX.update(dt), lookY.update(dt), 0);

            if (uiMode === 'hero' && hov && ptr.seen && ptr.type !== 'touch' && !(ptr.down && ptr.moved > 14)) {
                const tx = ptr.cx, ty = ptr.cy + 34; if (!pillOn) { pillX.set(tx); pillY.set(ty); } pillX.t = tx; pillY.t = ty;
                openBtn.style.left = pillX.update(dt) + 'px'; openBtn.style.top = pillY.update(dt) + 'px';
                if (!pillOn) showPill();
            } else { hidePill(); }

            renderer.render(scene, camera);
        }

        function relayout() {
            const r = rootEl.getBoundingClientRect(); dims.w = Math.max(1, Math.round(r.width)); dims.h = Math.max(1, Math.round(r.height));
            renderer.setSize(dims.w, dims.h); camera.aspect = dims.w / dims.h; camera.updateProjectionMatrix();
            computeSlots(); applyMode(); camTo(uiMode === 'detail' || uiMode === 'opening' ? 'detail' : 'hero');
        }
        window.addEventListener('resize', relayout);
        relayout();

        currentWindow.forEach((bi, i) => {
            const b = bookInstances[bi], slot = SLOTS.hero[i], s = b.springs;
            s.px.set(slot.p[0]); s.py.set(slot.p[1] - 3.9); s.pz.set(slot.p[2]); s.rx.set(slot.r[0]); s.ry.set(slot.r[1]); s.rz.set(slot.r[2] + 0.35 * (i === 1 ? -1 : Math.sign(slot.p[0]))); s.sc.set(slot.s); b.slotScale = slot.s;
            setTimeout(() => setTargets(b, slot), 240 + i * 150);
        });
        function setTargets(b, slot) { const s = b.springs; s.px.t = slot.p[0]; s.py.t = slot.p[1]; s.pz.t = slot.p[2]; s.rx.t = slot.r[0]; s.ry.t = slot.r[1]; s.rz.t = slot.r[2]; b.slotScale = slot.s; }

        bookInstances.forEach((b, idx) => { if (!currentWindow.includes(idx)) b.root.visible = false; });
        hitMeshes.length = 0; currentWindow.forEach(bi => hitMeshes.push(bookInstances[bi].hit));
        camTo('hero');
        
        window.addEventListener('languageChanged', () => {
            heroWord.innerText = t('Practice');
            bookInstances.forEach(b => {
                const cfg = b.cfg;
                
                const cFront = mkCanvas(1024, 1536);
                paintDefaultFront(cFront.getContext('2d'), 1024, 1536, cfg.title, cfg.color || '#222');
                const tFront = tex(cFront);
                b.frontMesh.material[4].map = tFront;
                b.frontMesh.material[4].needsUpdate = true;
                
                const cSpine = mkCanvas(220, 1536);
                paintSpine(cSpine.getContext('2d'), 220, 1536, cfg.title, cfg.color || '#222');
                const tSpine = tex(cSpine);
                b.spine.material.map = tSpine;
                b.spine.material.needsUpdate = true;
                
                const tIndex = makeIndexPageTex(cfg.chapters);
                b.pages[0].children[0].material.map = tIndex;
                b.pages[0].children[0].material.needsUpdate = true;
            });
            
            if (uiMode === 'detail' && selectedCfg) {
                dpTitle.innerText = t(selectedCfg.title);
                dpDesc.innerText = t(selectedCfg.desc);
                dpSubtitle.innerText = t('PRACTICE AREA');
            }
        });

        animate();
    }
}
window.ThreeBooks = ThreeBooks;
