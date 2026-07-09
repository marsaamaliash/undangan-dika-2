document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    const opening = document.getElementById('opening');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-invitation');
    const guestNameDisplay = document.getElementById('guest-name-display');
    const countdownDate = new Date('2026-08-02T07:00:00+07:00').getTime();

    function getGuestNameFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('to');
    }

    const guestName = getGuestNameFromUrl();
    if (guestName) {
        guestNameDisplay.textContent = decodeURIComponent(guestName).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    setTimeout(function() {
        loading.classList.add('hidden');
    }, 1000);

    openBtn.addEventListener('click', function() {
        opening.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        document.body.style.overflow = 'auto';

        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.volume = 0.7;
            bgMusic.play().catch(function(err) {
                console.log('Autoplay music blocked:', err);
            });
        }

        setTimeout(function() {
            opening.style.display = 'none';
            const hero = document.getElementById('hero');
            hero.scrollIntoView({ behavior: 'smooth' });
        }, 1200);
    });

    document.body.style.overflow = 'hidden';

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    const rsvpForm = document.getElementById('rsvp-form');
    const wishesList = document.getElementById('wishes-list');

    function loadWishes() {
        const stored = localStorage.getItem('wedding-wishes');
        if (!stored) return [];
        try {
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }

    function saveWishes(wishes) {
        localStorage.setItem('wedding-wishes', JSON.stringify(wishes));
    }

    function createWishCard(wish) {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.innerHTML = `
            <h4>${escapeHtml(wish.name)}</h4>
            <p class="wish-status ${wish.statusClass}">${wish.statusText}</p>
            <p class="wish-text">${escapeHtml(wish.message || 'Tanpa ucapan.')}</p>
        `;
        return wishCard;
    }

    function renderWishes() {
        const wishes = loadWishes();
        if (wishes.length === 0) return;
        wishesList.innerHTML = '';
        wishes.slice().reverse().forEach(function(wish) {
            wishesList.appendChild(createWishCard(wish));
        });
    }

    renderWishes();

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('guest-name').value.trim();
        const attendance = document.getElementById('guest-attendance').value;
        const message = document.getElementById('guest-message').value.trim();

        if (!name || !attendance) {
            alert('Mohon lengkapi nama dan kehadiran.');
            return;
        }

        const statusMap = {
            'hadir': { text: 'Hadir', class: 'status-attending' },
            'tidak-hadir': { text: 'Tidak Hadir', class: 'status-absent' },
            'belum-pasti': { text: 'Belum Pasti', class: 'status-unsure' }
        };

        const status = statusMap[attendance];
        const wish = {
            name: name,
            statusClass: status.class,
            statusText: status.text,
            message: message || 'Tanpa ucapan.',
            timestamp: new Date().toISOString()
        };

        const wishes = loadWishes();
        wishes.push(wish);
        saveWishes(wishes);

        wishesList.prepend(createWishCard(wish));
        rsvpForm.reset();

        const successMsg = document.createElement('div');
        successMsg.className = 'rsvp-success';
        successMsg.textContent = 'Terima kasih, konfirmasi kehadiran Anda telah tersimpan.';
        rsvpForm.parentNode.insertBefore(successMsg, rsvpForm.nextSibling);

        setTimeout(function() {
            successMsg.remove();
        }, 4000);
    });

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    const addCalendarBtn = document.getElementById('add-calendar');
    if (addCalendarBtn) {
        addCalendarBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const event = {
                title: 'Akad & Resepsi Dika & Lisa',
                location: 'Pucangsawit, RT 01/RW 08, Jebres, Surakarta',
                details: 'Akad Nikah pukul 07.00 WIB dan Resepsi pukul 09.00 WIB',
                start: '20260802T070000',
                end: '20260802T140000'
            };

            const icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'BEGIN:VEVENT',
                `SUMMARY:${event.title}`,
                `DTSTART;TZID=Asia/Jakarta:${event.start}`,
                `DTEND;TZID=Asia/Jakarta:${event.end}`,
                `LOCATION:${event.location}`,
                `DESCRIPTION:${event.details}`,
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\n');

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'pernikahan-dika-lisa.ics';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    const loveStorySection = document.getElementById('love-story');
    const loveStoryProgress = document.querySelector('.love-story-progress');

    if (loveStorySection && loveStoryProgress) {
        function updateLoveStoryProgress() {
            const rect = loveStorySection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDistance = windowHeight + rect.height;
            const scrolled = windowHeight - rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
            loveStoryProgress.style.height = `${progress * 100}%`;
        }

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateLoveStoryProgress();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        updateLoveStoryProgress();
    }

    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicIconOn = document.getElementById('music-icon-on');
    const musicIconOff = document.getElementById('music-icon-off');

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play();
                musicIconOn.style.display = 'block';
                musicIconOff.style.display = 'none';
            } else {
                bgMusic.pause();
                musicIconOn.style.display = 'none';
                musicIconOff.style.display = 'block';
            }
        });
    }

    const carouselTrack = document.getElementById('carousel-track');
    const carouselDots = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (carouselTrack) {
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        let currentSlide = 0;
        let autoPlayInterval;

        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Slide ' + (index + 1));
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });

        const dots = carouselDots.querySelectorAll('.carousel-dot');

        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            if (currentSlide >= slides.length) currentSlide = 0;
            updateCarousel();
            resetAutoPlay();
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        carouselTrack.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carouselTrack.addEventListener('mouseleave', startAutoPlay);

        startAutoPlay();
    }
});
