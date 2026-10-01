// Vanilla JS port of the BooksShowcase Three.js component
class BooksShowcase {
    constructor(container, books, onBookSelect) {
        this.container = container;
        this.books = books;
        this.onBookSelect = onBookSelect;
        this.init();
    }

    init() {
        const root = this.container;
        const canvasEl = document.createElement('canvas');
        canvasEl.style.position = 'absolute';
        canvasEl.style.top = '0';
        canvasEl.style.left = '0';
        canvasEl.style.width = '100%';
        canvasEl.style.height = '100%';
        canvasEl.style.zIndex = '2';
        root.appendChild(canvasEl);

        let cancelled = false;
        this.cancelled = false;
        const timeouts = [];
        const setT = (fn, ms) => {
            const id = setTimeout(() => { if (!this.cancelled) fn(); }, ms);
            timeouts.push(id);
            return id;
        };

        const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const lowPowerDevice = RM || window.matchMedia('(max-width: 900px)').matches || (navigator.hardwareConcurrency ?? 8) <= 4;
        const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

        class Spring {
            constructor(v, k = 120, d = 14) {
                this.v = v; this.t = v; this.vel = 0; this.k = k; this.d = d;
            }
            set(v) { this.v = v; this.t = v; this.vel = 0; return this; }
            update(dt) {
                const a = this.k * (this.t - this.v) - this.d * this.vel;
                this.vel += a * dt;
                this.v += this.vel * dt;
                return this.v;
            }
        }

        function mkCanvas(w, h) {
            const c = document.createElement('canvas');
            c.width = w; c.height = h; return c;
        }

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: !lowPowerDevice, alpha: true });
        } catch (err) {
            console.warn('WebGL failed', err);
            return;
        }

        const dims = { w: root.clientWidth, h: root.clientHeight };
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPowerDevice ? 1 : 1.25));
        renderer.setSize(dims.w, dims.h);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.92;
        renderer.shadowMap.enabled = !lowPowerDevice;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        const ANISO = renderer.capabilities.getMaxAnisotropy();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(26, dims.w / dims.h, 0.1, 100);
        camera.position.set(0, 0.1, 9.6);

        const hemi = new THREE.HemisphereLight(0x8fa0d8, 0x0d1024, 0.32);
        scene.add(hemi);
        const key = new THREE.DirectionalLight(0xffffff, 0.82);
        key.position.set(3.5, 5, 6);
        key.castShadow = true;
        scene.add(key);

        const bookRoot = new THREE.Group();
        scene.add(bookRoot);

        function tex(c) {
            const t = new THREE.CanvasTexture(c);
            t.colorSpace = THREE.SRGBColorSpace;
            t.anisotropy = ANISO;
            return t;
        }

        function paintDefaultFront(x, w, h, o) {
            x.fillStyle = o.bg; x.fillRect(0, 0, w, h);
            x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.font = '700 76px Georgia';
            x.fillText(o.title, w / 2, h * 0.4);
        }

        const W = 1.42, H = 2.14, T = 0.34, CT = 0.032, OV = 0.05;
        const coverGeo = new THREE.BoxGeometry(W + OV, H + OV * 2, CT);
        const spineGeo = new THREE.BoxGeometry(0.028, H + OV * 2, T + CT * 2 + 0.006);
        const blockGeo = new THREE.BoxGeometry(W - 0.015, H, 0.245);
        const hitGeo = new THREE.BoxGeometry(1.8, 2.5, 1.15);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });

        function std(o) { return new THREE.MeshStandardMaterial(Object.assign({ metalness: 0.02 }, o)); }
        const paperFlat = std({ color: 0xf2ecdd, roughness: 0.95 });

        const bookInstances = [];
        const hitMeshes = [];

        this.books.forEach((cfg, index) => {
            const float = new THREE.Group();
            bookRoot.add(float);

            const mFront = std({ color: cfg.bg || '#222' });
            const frontMesh = new THREE.Mesh(coverGeo, mFront);
            frontMesh.position.x = (W + OV) / 2;
            const pivot = new THREE.Group();
            pivot.position.set(-W / 2, 0, T/2);
            pivot.add(frontMesh);
            float.add(pivot);

            const spine = new THREE.Mesh(spineGeo, std({ color: cfg.bg || '#222' }));
            spine.position.set(-W / 2, 0, 0);
            float.add(spine);

            const hit = new THREE.Mesh(hitGeo, hitMat);
            float.add(hit);
            hitMeshes.push(hit);

            const springs = {
                px: new Spring(0), py: new Spring(0), pz: new Spring(0),
                rx: new Spring(0), ry: new Spring(0), rz: new Spring(0), sc: new Spring(1),
                cover: new Spring(0)
            };

            bookInstances.push({ cfg, float, pivot, springs, hit, slotScale: 1, phase: Math.random() * 6 });
        });

        const SLOTS = [
            { p: [-1.8, -0.5, 0], r: [0, 0.4, 0.1], s: 1.2 },
            { p: [0, -0.2, 0.6], r: [0, 0, 0], s: 1.3 },
            { p: [1.8, -0.5, 0], r: [0, -0.4, -0.1], s: 1.2 }
        ];

        let state = 'hero';
        let selectedBook = null;
        let hoveredBook = null;

        function applySlots() {
            bookInstances.forEach((b, i) => {
                const s = SLOTS[i];
                if(s) {
                    b.springs.px.t = s.p[0]; b.springs.py.t = s.p[1]; b.springs.pz.t = s.p[2];
                    b.springs.rx.t = s.r[0]; b.springs.ry.t = s.r[1]; b.springs.rz.t = s.r[2];
                    b.springs.sc.t = s.s;
                }
            });
        }
        applySlots();

        const ptr = { x: 0, y: 0, ndcX: 0, ndcY: 0, down: false };
        const ray = new THREE.Raycaster();

        canvasEl.addEventListener('pointermove', e => {
            const rect = canvasEl.getBoundingClientRect();
            ptr.x = e.clientX - rect.left; ptr.y = e.clientY - rect.top;
            ptr.ndcX = (ptr.x / dims.w) * 2 - 1;
            ptr.ndcY = -(ptr.y / dims.h) * 2 + 1;
        });

        canvasEl.addEventListener('pointerdown', () => { ptr.down = true; });
        canvasEl.addEventListener('pointerup', () => { 
            ptr.down = false; 
            if(hoveredBook && state === 'hero') {
                state = 'detail';
                selectedBook = hoveredBook;
                if(this.onBookSelect) this.onBookSelect(selectedBook.cfg);
                
                // Move selected to center
                selectedBook.springs.px.t = 0;
                selectedBook.springs.py.t = 0;
                selectedBook.springs.pz.t = 2;
                selectedBook.springs.rx.t = 0;
                selectedBook.springs.ry.t = 0;
                selectedBook.springs.rz.t = 0;
                selectedBook.springs.cover.t = 1.5; // open cover
                
                // Hide others
                bookInstances.forEach(b => {
                    if(b !== selectedBook) b.springs.py.t = -5;
                });
            } else if (state === 'detail') {
                state = 'hero';
                selectedBook.springs.cover.t = 0;
                selectedBook = null;
                if(this.onBookSelect) this.onBookSelect(null);
                applySlots();
            }
        });

        let rafId;
        const clock = new THREE.Clock();
        const animate = () => {
            if(this.cancelled) return;
            rafId = requestAnimationFrame(animate);
            const dt = Math.min(clock.getDelta(), 0.05);

            ray.setFromCamera({x: ptr.ndcX, y: ptr.ndcY}, camera);
            const hits = ray.intersectObjects(hitMeshes);
            hoveredBook = hits.length ? bookInstances.find(b => b.hit === hits[0].object) : null;
            canvasEl.style.cursor = hoveredBook ? 'pointer' : 'default';

            bookInstances.forEach(b => {
                const s = b.springs;
                s.px.update(dt); s.py.update(dt); s.pz.update(dt);
                s.rx.update(dt); s.ry.update(dt); s.rz.update(dt);
                s.sc.update(dt); s.cover.update(dt);

                b.float.position.set(s.px.v, s.py.v, s.pz.v);
                b.float.rotation.set(s.rx.v, s.ry.v, s.rz.v);
                b.float.scale.setScalar(s.sc.v);
                
                b.pivot.rotation.y = -s.cover.v;
            });

            renderer.render(scene, camera);
        };
        animate();
    }

    destroy() {
        this.cancelled = true;
    }
}
window.BooksShowcase = BooksShowcase;
