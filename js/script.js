class ImageSlider {
    constructor() {
        // Initialize slider elements
        this.slider = document.querySelector('.slider');
        this.slides = document.querySelectorAll('.slide');
        this.dotsContainer = document.querySelector('.dots');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        
        this.currentSlide = 0;
        this.slideInterval = null;
        
        // Touch handling variables
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        // Create pagination dots
        this.createDots();
        
        // Add event listeners
        this.addEventListeners();
        
        // Start auto sliding
        this.startAutoSlide();
        
        // Set initial state
        this.updateSlider();
    }

    createDots() {
        // Create dots for each slide
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    addEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Touch events
        this.slider.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.stopAutoSlide();
        });

        this.slider.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
            this.startAutoSlide();
        });

        // Mouse events
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }

    startAutoSlide() {
        // Auto slide every 3 seconds
        this.stopAutoSlide();
        this.slideInterval = setInterval(() => this.nextSlide(), 3000);
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }
    }

    updateSlider() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        // Update slider position
        this.slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
}

// Initialize the slider
new ImageSlider();