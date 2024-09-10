const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');
const highlightRight = document.createElement('div');
const highlightLeft = document.createElement('div');
const highlightTop = document.createElement('div');

highlightRight.classList.add('highlight-right');
highlightLeft.classList.add('highlight-left');
highlightTop.classList.add('highlight-top');
document.body.appendChild(highlightRight);
document.body.appendChild(highlightLeft);
document.body.appendChild(highlightTop);

let isDragging = false;
let startX, startY;
let currentX, currentY; // Sürükleme sırasında ikonu kontrol edeceğimiz konum
let animationFrameId = null;

// Menü ikonuna tıklama işlemi
menuIcon.addEventListener('click', function () {
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
    } else {
        menu.classList.add('show');
    }
});

// Sürükleme başlangıcı
menuIcon.addEventListener('mousedown', startDrag);
menuIcon.addEventListener('touchstart', startDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    startY = e.clientY || e.touches[0].clientY;

    currentX = startX;
    currentY = startY;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);

    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updatePosition);
    }
}

function onDrag(e) {
    currentX = e.clientX || e.touches[0].clientX;
    currentY = e.clientY || e.touches[0].clientY;
}

function updatePosition() {
    if (isDragging) {
        menuIcon.style.left = `${currentX - menuIcon.offsetWidth / 2}px`;
        menuIcon.style.top = `${currentY - menuIcon.offsetHeight / 2}px`;

        // Kenar belirteçlerini aktif et
        if (currentX > window.innerWidth - 50) {
            highlightRight.classList.add('highlight-active');
        } else {
            highlightRight.classList.remove('highlight-active');
        }

        if (currentX < 50) {
            highlightLeft.classList.add('highlight-active');
        } else {
            highlightLeft.classList.remove('highlight-active');
        }

        if (currentY < 50) {
            highlightTop.classList.add('highlight-active');
        } else {
            highlightTop.classList.remove('highlight-active');
        }

        requestAnimationFrame(updatePosition);
    }
}

function stopDrag(e) {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);

    // Kenar belirteçlerini gizle
    highlightRight.classList.remove('highlight-active');
    highlightLeft.classList.remove('highlight-active');
    highlightTop.classList.remove('highlight-active');

    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;

    // Sağ kenara yakınsa yapıştır
    if (parseInt(menuIcon.style.left) > window.innerWidth - 100) {
        menuIcon.style.left = `${window.innerWidth - menuIcon.offsetWidth}px`;
    }

    // Sol kenara yakınsa yapıştır
    if (parseInt(menuIcon.style.left) < 100) {
        menuIcon.style.left = `0px`;
    }

    // Üst kenara yakınsa yapıştır
    if (parseInt(menuIcon.style.top) < 100) {
        menuIcon.style.top = `0px`;
    }
}
