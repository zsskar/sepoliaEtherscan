document.addEventListener('DOMContentLoaded', function () {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseover', function () {
            const tooltipElement = this.nextElementSibling;
            tooltipElement.classList.remove('hidden');
        });
        tooltip.addEventListener('mouseout', function () {
            const tooltipElement = this.nextElementSibling;
            tooltipElement.classList.add('hidden');
        });
    });
});
