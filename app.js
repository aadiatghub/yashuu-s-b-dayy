/**
 * 🎂 HAPPY BIRTHDAY YASHUU BABY 🎂
 * Birthday Surprise — Interaction Logic
 */

// ============================================
// PARTICLE SYSTEM — Floating hearts & sparkles
// ============================================
const particleCanvas = document.getElementById('particleCanvas');
const pCtx = particleCanvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(type) {
        this.type = type;
        this.x = Math.random() * particleCanvas.width;
        this.y = particleCanvas.height + 20;
        this.size = Math.random() * 12 + 6;
        this.speedY = -(Math.random() * 1.2 + 0.3);
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.03;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.color = this.getColor();
    }

    getColor() {
        const colors = ['#ff6b9d','#ff2d78','#e91e63','#ff9800','#ff6b9d','#c2185b','#ff80ab','#ff4081','#ffd54f','#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;
        this.rotation += this.rotSpeed;
        this.opacity -= 0.001;
    }

    draw() {
        if (this.opacity <= 0) return;
        pCtx.save();
        pCtx.translate(this.x, this.y);
        pCtx.rotate(this.rotation);
        pCtx.globalAlpha = Math.max(0, this.opacity);
        if (this.type === 'heart') this.drawHeart();
        else if (this.type === 'sparkle') this.drawSparkle();
        else this.drawStar();
        pCtx.restore();
    }

    drawHeart() {
        pCtx.fillStyle = this.color;
        pCtx.beginPath();
        const s = this.size / 16;
        pCtx.moveTo(0, -3 * s);
        pCtx.bezierCurveTo(-5 * s, -8 * s, -12 * s, -2 * s, 0, 6 * s);
        pCtx.bezierCurveTo(12 * s, -2 * s, 5 * s, -8 * s, 0, -3 * s);
        pCtx.fill();
    }

    drawSparkle() {
        pCtx.fillStyle = this.color;
        pCtx.beginPath();
        const s = this.size / 2;
        for (let i = 0; i < 4; i++) {
            const a = (i * Math.PI) / 2;
            pCtx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
            const m = a + Math.PI / 4;
            pCtx.lineTo(Math.cos(m) * s * 0.3, Math.sin(m) * s * 0.3);
        }
        pCtx.closePath();
        pCtx.fill();
    }

    drawStar() {
        pCtx.fillStyle = this.color;
        pCtx.beginPath();
        const s = this.size / 2;
        for (let i = 0; i < 5; i++) {
            const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const inner = (i * 2 * Math.PI) / 5 + Math.PI / 5 - Math.PI / 2;
            if (i === 0) pCtx.moveTo(Math.cos(a) * s, Math.sin(a) * s);
            else pCtx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
            pCtx.lineTo(Math.cos(inner) * s * 0.4, Math.sin(inner) * s * 0.4);
        }
        pCtx.closePath();
        pCtx.fill();
    }
}

function spawnParticles(count = 1) {
    const types = ['heart', 'sparkle', 'star'];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(types[Math.floor(Math.random() * types.length)]));
    }
}

let particleInterval = setInterval(() => spawnParticles(1), 400);

function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles = particles.filter(p => p.opacity > 0 && p.y > -30);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ============================================
// CONFETTI SYSTEM
// ============================================
const confettiCanvas = document.getElementById('confettiCanvas');
const cCtx = confettiCanvas.getContext('2d');
let confettiPieces = [];
let confettiActive = false;

function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeConfetti();
window.addEventListener('resize', resizeConfetti);

class ConfettiPiece {
    constructor(cx, cy) {
        this.x = cx || Math.random() * confettiCanvas.width;
        this.y = cy || -10;
        this.w = Math.random() * 10 + 5;
        this.h = Math.random() * 6 + 3;
        this.color = ['#ff6b9d','#ff2d78','#e91e63','#ff9800','#ffd54f','#ff80ab','#ba68c8','#ffffff','#ff4081','#ffab40'][Math.floor(Math.random() * 10)];
        this.speedY = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 6;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.2;
        this.opacity = 1;
        this.gravity = 0.08;
        this.drag = 0.98;
    }
    update() {
        this.speedY += this.gravity;
        this.speedX *= this.drag;
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotSpeed;
        this.opacity -= 0.005;
    }
    draw() {
        if (this.opacity <= 0) return;
        cCtx.save();
        cCtx.translate(this.x, this.y);
        cCtx.rotate(this.rotation);
        cCtx.globalAlpha = this.opacity;
        cCtx.fillStyle = this.color;
        cCtx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        cCtx.restore();
    }
}

function launchConfetti(cx, cy, count = 80) {
    for (let i = 0; i < count; i++) confettiPieces.push(new ConfettiPiece(cx, cy));
    if (!confettiActive) { confettiActive = true; animateConfetti(); }
}

function animateConfetti() {
    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces = confettiPieces.filter(c => c.opacity > 0 && c.y < confettiCanvas.height + 50);
    confettiPieces.forEach(c => { c.update(); c.draw(); });
    if (confettiPieces.length > 0) requestAnimationFrame(animateConfetti);
    else confettiActive = false;
}

// ============================================
// HEART BURST EFFECT
// ============================================
function heartBurst(x, y, count = 15) {
    const container = document.createElement('div');
    container.className = 'heart-burst-container';
    document.body.appendChild(container);
    const hearts = ['❤️','💗','💖','💕','💓','💝','💘','✨','🌟','⭐'];
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = (Math.random() * 18 + 14) + 'px';
        const angle = (i / count) * Math.PI * 2;
        const dist = Math.random() * 150 + 80;
        heart.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * dist - 100 + 'px');
        heart.style.setProperty('--rot', (Math.random() - 0.5) * 720 + 'deg');
        heart.style.animationDelay = (Math.random() * 0.15) + 's';
        container.appendChild(heart);
    }
    setTimeout(() => container.remove(), 1500);
}

// ============================================
// SOUND — Web Audio beeps (no files needed)
// ============================================
let audioCtx = null;

function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTone(freq, duration, type = 'sine', vol = 0.08) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + duration);
}

function playTapSound() {
    initAudio();
    playTone(600, 0.08, 'sine', 0.06);
    setTimeout(() => playTone(900, 0.1, 'sine', 0.05), 50);
}

function playBigReveal() {
    initAudio();
    [400, 500, 650, 800, 1000, 1300].forEach((f, i) => {
        setTimeout(() => playTone(f, 0.3, 'sine', 0.06), i * 80);
    });
}

// ============================================
// SCREEN NAVIGATION
// ============================================
let currentScreen = 1;

function goToScreen(num) {
    playTapSound();
    const current = document.getElementById(`screen${currentScreen}`);
    const next = document.getElementById(`screen${num}`);
    if (!current || !next) return;
    heartBurst(window.innerWidth / 2, window.innerHeight / 2, 12);
    launchConfetti(window.innerWidth / 2, window.innerHeight / 2, 40);
    current.classList.add('exiting');
    setTimeout(() => {
        current.classList.remove('active', 'exiting');
        next.classList.add('active', 'entering');
        setTimeout(() => next.classList.remove('entering'), 600);
        currentScreen = num;
    }, 450);
}

// ============================================
// FINAL REVEAL — Big dramatic reveal
// ============================================
function revealFinal() {
    playBigReveal();
    const current = document.getElementById(`screen${currentScreen}`);
    launchConfetti(window.innerWidth / 2, window.innerHeight / 2, 150);
    heartBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
    setTimeout(() => heartBurst(window.innerWidth * 0.3, window.innerHeight * 0.4, 15), 200);
    setTimeout(() => heartBurst(window.innerWidth * 0.7, window.innerHeight * 0.6, 15), 400);
    setTimeout(() => launchConfetti(window.innerWidth * 0.2, 0, 60), 500);
    setTimeout(() => launchConfetti(window.innerWidth * 0.8, 0, 60), 700);
    setTimeout(() => launchConfetti(window.innerWidth * 0.5, 0, 80), 900);
    current.classList.add('exiting');
    setTimeout(() => {
        current.classList.remove('active', 'exiting');
        const finalScreen = document.getElementById('finalScreen');
        finalScreen.classList.add('active', 'entering');
        setTimeout(() => finalScreen.classList.remove('entering'), 600);
        currentScreen = 99;
        // Start typewriter + load saved photos
        setTimeout(() => {
            typewriterReveal();
            loadSavedPhotos();
        }, 800);
    }, 500);
}

// ============================================
// TYPEWRITER REVEAL — Line by line letter
// ============================================
const LETTER_TEXT = `Happy Birthday to my heartbeat, my absolute favorite person, and the undisputed love of my life! 💖

Honestly, I don't know how I got so lucky. Having you feels like winning the jackpot, even though you can be a total drama queen half the time! You are the cutest, squishiest blessing in my world, <span class="highlight-gulgula">MERA GULGULA</span> 😚😚😚😚😚❤️✨ and I wouldn't trade your weirdness for anything....

I am genuinely so, so sorry for all the silly fights and confusion we had over the last 15-20 days 🥹.... Being mad at you is literally the worst feeling in the world, and I hate that we wasted even a single second being upset with each other. I'm sorry for being a dummy sometimes!

But honestly, getting through that rollercoaster just proves that no matter what, we always find our way back to each other... Even when we are bickering, you are still my favorite person to be annoyed at.

This Lucknow to Noida distance is already hard enough without us fighting, and I am just so incredibly glad we cleared it all up and are back to being us.

My heart is right there in Noida celebrating with you today.

Have the best day ever, mera betu 🥹😚❤️🫂....

<span class="highlight-loveyou">"I LOVE YOU"</span> endlessly, and I cannot wait to finally see you, give you the biggest squeeze, and spoil you the way you deserve.

Enjoy your day, my love! 🎂✨❤️🫂😚😚😚😚😚🫶🏻`;

let loveYouRevealed = false;

function typewriterReveal() {
    const container = document.getElementById('letterText');
    container.innerHTML = '';
    revealHTML(container, LETTER_TEXT);
}

function revealHTML(container, html) {
    container.innerHTML = '';
    let i = 0;
    let inTag = false;
    let currentChunk = '';
    const chunkSize = 3;

    function addNext() {
        if (i >= html.length) return;
        for (let j = 0; j < chunkSize && i < html.length; j++, i++) {
            const char = html[i];
            if (char === '<') inTag = true;
            if (inTag) {
                currentChunk += char;
                if (char === '>') { inTag = false; container.innerHTML += currentChunk; currentChunk = ''; }
            } else {
                container.innerHTML += char;
            }
        }
        container.scrollTop = container.scrollHeight;
        if (!loveYouRevealed && container.innerHTML.includes('highlight-loveyou')) {
            loveYouRevealed = true;
            launchConfetti(window.innerWidth / 2, window.innerHeight * 0.6, 120);
            heartBurst(window.innerWidth / 2, window.innerHeight * 0.6, 20);
            initAudio();
            [523, 659, 784, 1047].forEach((f, idx) => {
                setTimeout(() => playTone(f, 0.4, 'sine', 0.07), idx * 120);
            });
        }
        const lastChar = html[i - 1];
        const delay = inTag ? 0 : (lastChar === '\n' ? 40 : 18);
        setTimeout(addNext, delay);
    }
    addNext();
}

// ============================================
// PHOTO GALLERY — Upload, Preview, Lightbox
// ============================================
let uploadedPhotos = [];
let currentLightboxIndex = 0;
const PHOTO_STORAGE_KEY = 'yashuu-baby-photos';

// --- Compress image before saving ---
function compressImage(dataUrl, maxWidth) {
    return new Promise(function(resolve) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            let w = img.width;
            let h = img.height;
            if (w > maxWidth) { h = (h * maxWidth) / w; w = maxWidth; }
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = dataUrl;
    });
}

// --- localStorage ---
function savePhotos() {
    try {
        localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(uploadedPhotos));
    } catch (e) {
        while (uploadedPhotos.length > 1) {
            uploadedPhotos.pop();
            try { localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(uploadedPhotos)); break; } catch (e2) {}
        }
    }
}

function loadPhotos() {
    try {
        const raw = localStorage.getItem(PHOTO_STORAGE_KEY);
        if (raw) { uploadedPhotos = JSON.parse(raw); return uploadedPhotos.length > 0; }
    } catch (e) {}
    return false;
}

// --- Render saved photos into grid ---
function loadSavedPhotos() {
    const grid = document.getElementById('photoGrid');
    const uploadArea = document.getElementById('photoUploadArea');
    if (!grid) return;

    if (!loadPhotos() || uploadedPhotos.length === 0) return;

    grid.innerHTML = '';
    uploadedPhotos.forEach((dataUrl, idx) => {
        grid.appendChild(buildPhotoItem(dataUrl, idx));
    });

    if (uploadArea) {
        uploadArea.style.opacity = '0.4';
        uploadArea.style.maxHeight = '0';
        uploadArea.style.overflow = 'hidden';
        uploadArea.style.padding = '0';
        uploadArea.style.border = 'none';
        uploadArea.style.margin = '0';
    }
}

// --- Build a single photo item element ---
function buildPhotoItem(dataUrl, index) {
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.style.animationDelay = (index * 0.1) + 's';

    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = 'Memory';
    img.loading = 'lazy';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'photo-remove';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        item.style.transform = 'scale(0.5) rotate(10deg)';
        item.style.opacity = '0';
        setTimeout(() => {
            item.remove();
            uploadedPhotos.splice(uploadedPhotos.indexOf(dataUrl), 1);
            savePhotos();
            if (uploadedPhotos.length === 0) {
                const ua = document.getElementById('photoUploadArea');
                if (ua) { ua.style.opacity=''; ua.style.maxHeight=''; ua.style.overflow=''; ua.style.padding=''; ua.style.border=''; ua.style.margin=''; }
            }
        }, 300);
    });

    item.appendChild(img);
    item.appendChild(removeBtn);

    item.addEventListener('click', function() {
        openLightbox(uploadedPhotos.indexOf(dataUrl));
    });

    return item;
}

// --- Handle file input / drag-drop ---
function handleFiles(files) {
    const grid = document.getElementById('photoGrid');
    const uploadArea = document.getElementById('photoUploadArea');
    if (!grid) return;

    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    let loaded = 0;

    imageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            compressImage(e.target.result, 800).then(function(compressedUrl) {
                uploadedPhotos.push(compressedUrl);
                loaded++;
                grid.appendChild(buildPhotoItem(compressedUrl, uploadedPhotos.length - 1));
                if (loaded === imageFiles.length) {
                    savePhotos();
                    if (uploadArea) {
                        uploadArea.style.opacity = '0.4';
                        uploadArea.style.maxHeight = '0';
                        uploadArea.style.overflow = 'hidden';
                        uploadArea.style.padding = '0';
                        uploadArea.style.border = 'none';
                        uploadArea.style.margin = '0';
                        uploadArea.style.transition = 'all 0.5s ease';
                    }
                    setTimeout(() => {
                        const section = document.getElementById('photoSection');
                        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 400);
                }
            });
        };
        reader.readAsDataURL(file);
    });
}

// --- Lightbox ---
function openLightbox(index) {
    if (index < 0 || index >= uploadedPhotos.length) return;
    currentLightboxIndex = index;
    document.getElementById('lightboxImg').src = uploadedPhotos[index];
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    currentLightboxIndex += dir;
    if (currentLightboxIndex < 0) currentLightboxIndex = uploadedPhotos.length - 1;
    if (currentLightboxIndex >= uploadedPhotos.length) currentLightboxIndex = 0;
    const img = document.getElementById('lightboxImg');
    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = 'lightboxIn 0.3s ease';
    img.src = uploadedPhotos[currentLightboxIndex];
}

// --- Init photo gallery (call once on load) ---
function initPhotoGallery() {
    const uploadArea = document.getElementById('photoUploadArea');
    const photoInput = document.getElementById('photoInput');
    const lightbox = document.getElementById('lightbox');

    if (!uploadArea || !photoInput || !lightbox) return;

    // File input change
    photoInput.addEventListener('change', function(e) {
        handleFiles(e.target.files);
        photoInput.value = '';
    });

    // Drag & Drop
    uploadArea.addEventListener('dragover', function(e) { e.preventDefault(); uploadArea.classList.add('dragover'); });
    uploadArea.addEventListener('dragleave', function() { uploadArea.classList.remove('dragover'); });
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // Lightbox controls
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) { if (e.target === lightbox) closeLightbox(); });
    document.getElementById('lightboxPrev').addEventListener('click', function(e) { e.stopPropagation(); navigateLightbox(-1); });
    document.getElementById('lightboxNext').addEventListener('click', function(e) { e.stopPropagation(); navigateLightbox(1); });

    // Swipe on mobile
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', function(e) {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? -1 : 1);
    }, { passive: true });

    // Grid click to add more photos
    const grid = document.getElementById('photoGrid');
    if (grid) {
        grid.addEventListener('click', function(e) {
            if (!e.target.closest('.photo-item') && !e.target.closest('.photo-remove')) {
                photoInput.click();
            }
        });
    }
}

// ============================================
// REPLAY
// ============================================
function resetPhotoGallery() {
    uploadedPhotos = [];
    try { localStorage.removeItem(PHOTO_STORAGE_KEY); } catch (e) {}
    const grid = document.getElementById('photoGrid');
    if (grid) grid.innerHTML = '';
    const uploadArea = document.getElementById('photoUploadArea');
    if (uploadArea) {
        uploadArea.style.opacity = '';
        uploadArea.style.maxHeight = '';
        uploadArea.style.overflow = '';
        uploadArea.style.padding = '';
        uploadArea.style.border = '';
        uploadArea.style.margin = '';
    }
    closeLightbox();
}

function replay() {
    playTapSound();
    loveYouRevealed = false;
    const final = document.getElementById('finalScreen');
    final.classList.add('exiting');
    setTimeout(() => {
        final.classList.remove('active', 'exiting');
        document.getElementById('letterText').innerHTML = '';
        resetPhotoGallery();
        const screen1 = document.getElementById('screen1');
        screen1.classList.add('active', 'entering');
        currentScreen = 1;
        setTimeout(() => screen1.classList.remove('entering'), 600);
        spawnParticles(20);
    }, 500);
}

// ============================================
// INIT
// ============================================
window.addEventListener('load', function() {
    initPhotoGallery();
    setTimeout(() => heartBurst(window.innerWidth / 2, window.innerHeight * 0.7, 10), 500);
});

for (let i = 0; i < 8; i++) {
    setTimeout(() => spawnParticles(1), i * 200);
}
