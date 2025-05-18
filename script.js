document.addEventListener('DOMContentLoaded', () => {
    // 슬라이더 기능
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 6000);
    
    // 처음에 모든 슬라이드를 비활성화
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // 첫번째 슬라이드 활성화
    slides[0].classList.add('active');

    // 페이드 효과로 슬라이드 전환
    function nextSlide() {
        // 현재 슬라이드 비활성화
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // 다음 슬라이드 인덱스 계산 (순환 구조 확실히 적용)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // 다음 슬라이드 활성화
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function prevSlide() {
        // 현재 슬라이드 비활성화
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // 이전 슬라이드 인덱스 계산 (순환 구조 확실히 적용)
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        
        // 이전 슬라이드 활성화
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function goToSlide(n) {
        if (currentSlide === n) return;
        
        // 현재 슬라이드 비활성화
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // 선택한 슬라이드로 이동
        currentSlide = n;
        
        // 선택한 슬라이드 활성화
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // 타이머 재설정
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
    }

    // 슬라이더 컨트롤
    if (prev && next) {
        prev.addEventListener('click', () => {
            prevSlide();
            // 타이머 재설정
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        });
        
        next.addEventListener('click', () => {
            nextSlide();
            // 타이머 재설정
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        });
    }
    
    // 슬라이더 도트 컨트롤
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // 첫 번째 슬라이드의 도트 활성화
    dots[0].classList.add('active');

    // 메뉴 버튼 기능
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 부드러운 스크롤 이동
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 슬라이더에 마우스 올릴 때 버튼과 텍스트 강조 효과
    const heroSection = document.querySelector('.hero');
    
    heroSection.addEventListener('mouseenter', () => {
        const activeSlide = document.querySelector('.slide.active');
        const content = activeSlide.querySelector('.slide-content');
        
        content.style.transform = 'scale(1.05)';
        
        const btn = content.querySelector('.btn');
        if (btn) {
            btn.style.backgroundColor = 'var(--secondary-color)';
            btn.style.transform = 'translateY(-5px)';
        }
    });
    
    heroSection.addEventListener('mouseleave', () => {
        const activeSlide = document.querySelector('.slide.active');
        const content = activeSlide.querySelector('.slide-content');
        
        content.style.transform = 'scale(1)';
        
        const btn = content.querySelector('.btn');
        if (btn) {
            btn.style.backgroundColor = 'var(--primary-color)';
            btn.style.transform = 'translateY(0)';
        }
    });
});

// 3D 회전 효과 추가
function createRotationEffect() {
    const slider = document.querySelector('.slider');
    let xAxis, yAxis;
    
    slider.addEventListener('mousemove', (e) => {
        const width = slider.offsetWidth;
        const height = slider.offsetHeight;
        const centerX = slider.offsetLeft + width/2;
        const centerY = slider.offsetTop + height/2;
        
        xAxis = (e.pageX - centerX) / 25;
        yAxis = (e.pageY - centerY) / 25;
        
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            activeSlide.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg) translateZ(50px)`;
        }
    });
    
    slider.addEventListener('mouseleave', () => {
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            activeSlide.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
        }
    });
}

createRotationEffect();
   