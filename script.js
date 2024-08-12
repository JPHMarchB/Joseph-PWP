let isCrazyView = true;

document.getElementById('toggleView').addEventListener('click', () => {
    isCrazyView = !isCrazyView;

    if (isCrazyView) {
        enableCrazyView();
    } else {
        resetToNormalView();
    }
});

function enableCrazyView() {
    document.querySelectorAll('.grid img').forEach(img => {
        const container = img.parentElement;
        const containerRect = container.getBoundingClientRect();

        const limitFactor = 0.9;

        const maxX = containerRect.width * limitFactor - img.width;
        const maxY = containerRect.height * limitFactor - img.height;

        let xPos = Math.random() * maxX + (containerRect.width * (1 - limitFactor) / 2);
        let yPos = Math.random() * maxY + (containerRect.height * (1 - limitFactor) / 2);
        img.style.left = `${xPos}px`;
        img.style.top = `${yPos}px`;

        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;

        function animate() {
            if (!isCrazyView) return; // Stop animation if crazy view is disabled

            xPos += speedX;
            yPos += speedY;

            if (xPos <= containerRect.width * (1 - limitFactor) / 2 || xPos >= maxX + (containerRect.width * (1 - limitFactor) / 2)) {
                speedX *= -1;
                xPos = Math.max(containerRect.width * (1 - limitFactor) / 2, Math.min(xPos, maxX + (containerRect.width * (1 - limitFactor) / 2)));
            }
            if (yPos <= containerRect.height * (1 - limitFactor) / 2 || yPos >= maxY + (containerRect.height * (1 - limitFactor) / 2)) {
                speedY *= -1;
                yPos = Math.max(containerRect.height * (1 - limitFactor) / 2, Math.min(yPos, maxY + (containerRect.height * (1 - limitFactor) / 2)));
            }

            img.style.left = `${xPos}px`;
            img.style.top = `${yPos}px`;

            requestAnimationFrame(animate);
        }

        animate();

        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const distX = e.clientX - (rect.left + rect.width / 2);
            const distY = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(distX * distX + distY * distY);

            if (dist < 100) {
                const angle = Math.atan2(distY, distX);
                const bounceFactor = 6;
                speedX = -Math.cos(angle) * bounceFactor;
                speedY = -Math.sin(angle) * bounceFactor;

                xPos += speedX;
                yPos += speedY;

                xPos = Math.max(containerRect.width * (1 - limitFactor) / 2, Math.min(xPos, maxX + (containerRect.width * (1 - limitFactor) / 2)));
                yPos = Math.max(containerRect.height * (1 - limitFactor) / 2, Math.min(yPos, maxY + (containerRect.height * (1 - limitFactor) / 2)));
            }
        });
    });
}

function resetToNormalView() {
    document.querySelectorAll('.grid img').forEach(img => {
        img.style.position = '';
        img.style.left = '';
        img.style.top = '';
    });
}

// Initialize with crazy view enabled
enableCrazyView();
