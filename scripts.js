function openGift() {
    const giftCard = document.getElementById('gift-card');
    giftCard.style.display = 'block';

    const giftContainer = document.querySelector('.gift-container');
    giftContainer.style.animation = 'none';
    giftContainer.style.cursor = 'default';

    document.querySelector('.gift-image').style.display = 'none';

    // Iniciar la animación de confeti
    startConfetti();

    // Iniciar la barra de progreso
    startProgressBar();
}

function startConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
}

function startProgressBar() {
    const endDate = new Date('2024-07-26T00:00:00'); // Fecha y hora de entrega del regalo
    const progressBar = document.getElementById('progress');
    const deliveryCart = document.getElementById('delivery-cart');
    const timeRemaining = document.getElementById('time-remaining');

    function updateProgress() {
        const now = new Date();
        const totalTime = endDate - now;
        const totalDuration = endDate - new Date();
        const progressPercent = 100 - (totalTime / totalDuration) * 100;

        progressBar.style.width = `${progressPercent}%`;
        deliveryCart.style.left = `${progressPercent}%`;

        const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

        timeRemaining.textContent = `Tiempo restante: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (totalTime < 0) {
            clearInterval(interval);
            timeRemaining.textContent = "¡El regalo ha llegado!";
        }
    }

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
}
