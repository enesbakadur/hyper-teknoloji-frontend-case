// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const menuIcon = document.getElementById('mobile-menu-icon');

    mobileMenu.style.display = 'none';
    mobileMenuOverlay.style.display = 'none';

    menuButton.addEventListener('click', () => {
        const isMenuVisible = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isMenuVisible ? 'none' : 'block';
        mobileMenuOverlay.style.display = isMenuVisible ? 'none' : 'block';

        // Toggle menu icon
        menuIcon.classList.remove(
            isMenuVisible ? 'ri-close-large-line' : 'ri-menu-line'
        );
        menuIcon.classList.add(
            isMenuVisible ? 'ri-menu-line' : 'ri-close-large-line'
        );
    });

    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        mobileMenuOverlay.style.display = 'none';
        menuIcon.classList.remove('ri-close-large-line');
        menuIcon.classList.add('ri-menu-line');
    });
});
