document.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('svg path');

    const animateWave = () => {
        svg.setAttribute('d', generateWavePath());
        requestAnimationFrame(animateWave);
    };

    const generateWavePath = () => {
        const width = window.innerWidth;
        const height = 160;
        const waveHeight = 20;
        const points = [];
        for (let i = 0; i <= width; i += 80) {
            const y = height + waveHeight * Math.sin(i / 80 + Date.now() / 1000);
            points.push(`${i},${y}`);
        }
        return `M0,${height}L${points.join('L')}L${width},320L0,320Z`;
    };

    requestAnimationFrame(animateWave);
});