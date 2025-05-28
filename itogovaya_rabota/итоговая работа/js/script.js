document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Плавный скролл для навигации
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню если открыто
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Фиксированная шапка с плавной анимацией
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Кнопка "Наверх" с плавной анимацией
    const scrollTop = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });

    // Фильтрация портфолио с анимацией
    const filterButtons = document.querySelectorAll('.filter__btn');
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('animate__animated', 'animate__fadeInUp');
                    }, 50);
                } else {
                    item.classList.remove('animate__animated', 'animate__fadeInUp');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Форма обратной связи
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackResults = document.getElementById('feedbackResults');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Валидация
            if (!name || !email || !message) {
                showMessage('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Вывод результатов
            feedbackResults.innerHTML = `
                <div class="form-results">
                    <h3>Ваши данные:</h3>
                    <p><strong>Имя:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    ${phone ? `<p><strong>Телефон:</strong> ${phone}</p>` : ''}
                    <p><strong>Сообщение:</strong> ${message}</p>
                </div>
            `;
            
            showMessage('Форма отправлена! Мы свяжемся с вами', 'success');
            feedbackForm.reset();
        });
    }

    // Форма подписки
    const subscribeForm = document.getElementById('subscribeForm');
    const subscribeResults = document.getElementById('subscribeResults');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('subscribeEmail').value.trim();
            const agree = document.getElementById('agree').checked;
            
            if (!email) {
                showMessage('Пожалуйста, введите email', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            if (!agree) {
                showMessage('Необходимо согласие на обработку данных', 'error');
                return;
            }
            
            // Вывод результатов
            subscribeResults.innerHTML = `
                <div class="form-results">
                    <h3>Вы подписались!</h3>
                    <p><strong>Email:</strong> ${email}</p>
                    <p>Мы отправили письмо с подтверждением</p>
                </div>
            `;
            
            showMessage('Спасибо за подписку!', 'success');
            subscribeForm.reset();
        });
    }

    // Анимация элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service, .team__member, .review, .portfolio__item');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Функция показа сообщений с плавной анимацией
    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `screen-message screen-message--${type}`;
        message.textContent = text;
        document.body.appendChild(message);
        
        requestAnimationFrame(() => {
            message.classList.add('show');
        });
        
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 600);
        }, 3000);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});