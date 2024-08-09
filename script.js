document.querySelectorAll('.grid img').forEach(img => {
    const container = img.parentElement;
    const containerRect = container.getBoundingClientRect();

    // Limiting factor (e.g., 70% of the container's width and height)
    const limitFactor = 0.9;

    const maxX = containerRect.width * limitFactor - img.width;
    const maxY = containerRect.height * limitFactor - img.height;

    // Set initial random positions within the limited space
    let xPos = Math.random() * maxX + (containerRect.width * (1 - limitFactor) / 2);
    let yPos = Math.random() * maxY + (containerRect.height * (1 - limitFactor) / 2);
    img.style.left = `${xPos}px`;
    img.style.top = `${yPos}px`;

    let speedX = (Math.random() - 0.5) * 2;
    let speedY = (Math.random() - 0.5) * 2;

    function animate() {
        // Update positions
        xPos += speedX;
        yPos += speedY;

        // Bounce off the limited space walls
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

    // Collision detection with mouse
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const distX = e.clientX - (rect.left + rect.width / 2);
        const distY = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < 100) {
            const angle = Math.atan2(distY, distX);
            const bounceFactor = 6; // Adjust bounce strength
            speedX = -Math.cos(angle) * bounceFactor;
            speedY = -Math.sin(angle) * bounceFactor;

            // Update position to reflect the bounce
            xPos += speedX;
            yPos += speedY;

            // Ensure the image stays within the limited space bounds
            xPos = Math.max(containerRect.width * (1 - limitFactor) / 2, Math.min(xPos, maxX + (containerRect.width * (1 - limitFactor) / 2)));
            yPos = Math.max(containerRect.height * (1 - limitFactor) / 2, Math.min(yPos, maxY + (containerRect.height * (1 - limitFactor) / 2)));
        }
    });
});