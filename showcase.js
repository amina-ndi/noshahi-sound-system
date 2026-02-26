// Showcase Page JavaScript

// Video Player Controls
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('showcaseVideo');
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.getElementById('videoOverlay');

    if (playButton && videoOverlay && video) {
        // Play video when overlay is clicked
        videoOverlay.addEventListener('click', function () {
            video.play();
            videoOverlay.style.display = 'none';
        });

        // Show overlay when video ends
        video.addEventListener('ended', function () {
            videoOverlay.style.display = 'flex';
        });

        // Hide overlay when video starts playing
        video.addEventListener('play', function () {
            videoOverlay.style.display = 'none';
        });

        // Show overlay when video is paused
        video.addEventListener('pause', function () {
            if (video.currentTime !== video.duration) {
                videoOverlay.style.display = 'flex';
            }
        });
    }

    // Video Gallery Modal Logic
    const videoGalleryItems = document.querySelectorAll('.video-gallery-item');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoSource = modalVideo ? modalVideo.querySelector('source') : null;

    if (videoGalleryItems.length > 0 && videoModal && modalVideo && modalVideoSource) {
        videoGalleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const videoSrc = this.getAttribute('data-video-src');
                if (videoSrc) {
                    modalVideoSource.src = videoSrc;
                    modalVideo.load();
                    const bsModal = new bootstrap.Modal(videoModal);
                    bsModal.show();
                    modalVideo.play();
                }
            });
        });

        // Pause video when modal is closed
        videoModal.addEventListener('hidden.bs.modal', function () {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideoSource.src = '';
        });
    }

    // Animated Counter for Stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('%') ? '' : '');
                }
            };

            updateCounter();
        });
    };

    // Intersection Observer for Stats Animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(statsSection);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to cards on scroll
    const cards = document.querySelectorAll('.motivation-card, .testimonial-card');

    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        cards.forEach(card => {
            cardObserver.observe(card);
        });
    }
});
