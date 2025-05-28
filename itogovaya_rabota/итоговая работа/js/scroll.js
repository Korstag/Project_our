// Плавный скролл к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню, если оно открыто
            const nav = document.querySelector('.nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});