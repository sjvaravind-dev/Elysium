/*=========================================================
ELYSIUM STUDIO SUITES
script.js - Enhanced Edition
=========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*=========================================
        INITIALIZE AOS (Animate On Scroll)
    =========================================*/
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            offset: 80,
            disable: false,
            startEvent: 'DOMContentLoaded',
            initClassName: 'aos-init',
            animatedClassName: 'aos-animate',
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99
        });
    }

    /*=========================================
        CUSTOM CURSOR
    =========================================*/
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effect
        const hoverElements = document.querySelectorAll('a, button, .property-card, .gallery-item, .amenity-item, .btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('hover');
            });
        });
    }

    /*=========================================
        PRELOADER
    =========================================*/
    const loader = document.querySelector(".loader");

    window.addEventListener("load", function () {
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                }, 600);
            }, 800);
        }
    });

    /*=========================================
        STICKY NAVBAR
    =========================================*/
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /*=========================================
        SMOOTH SCROLL
    =========================================*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });

                // Close mobile menu
                const navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse && navCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

    /*=========================================
        ACTIVE NAVIGATION
    =========================================*/
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar .nav-link");

    function updateActiveNav() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href === "#" + current || (current === "" && href === "#")) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();

    /*=========================================
        SCROLL TO TOP
    =========================================*/
    const scrollTop = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollTop.classList.add("active");
        } else {
            scrollTop.classList.remove("active");
        }
    });

    if (scrollTop) {
        scrollTop.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    }

    /*=========================================
        SWIPER TESTIMONIALS
    =========================================*/
    if (document.querySelector(".reviewSlider") && typeof Swiper !== 'undefined') {
        new Swiper(".reviewSlider", {
            loop: true,
            spaceBetween: 30,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }

    /*=========================================
        COUNTER ANIMATION
    =========================================*/
    const counters = document.querySelectorAll("[data-count]");
    const counterSpeed = 60;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-count');
                let current = 0;
                const increment = Math.ceil(target / counterSpeed);

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = current.toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /*=========================================
        PARALLAX EFFECT FOR HERO
    =========================================*/
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
            }
        });
    }

    /*=========================================
        BOOKING FORM VALIDATION
    =========================================*/
    const bookingForm = document.querySelector(".booking-box form");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const inputs = bookingForm.querySelectorAll("input,select");
            let valid = true;

            inputs.forEach(input => {
                if (input.value === "") {
                    valid = false;
                    input.style.border = "2px solid #ff4444";
                    input.style.animation = "shake 0.5s";
                } else {
                    input.style.border = "2px solid #06332C";
                    input.style.animation = "none";
                }
            });

            if (valid) {
                showNotification("🎉 Thank you! Your booking request has been received.", "success");
                bookingForm.reset();
                inputs.forEach(input => input.style.border = "2px solid transparent");
            }
        });
    }

    /*=========================================
        NEWSLETTER FORM
    =========================================*/
    const newsletter = document.querySelector(".newsletter-form");

    if (newsletter) {
        newsletter.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = newsletter.querySelector("input[type='email']");

            if (email.value === "") {
                showNotification("Please enter your email address.", "error");
            } else if (!isValidEmail(email.value)) {
                showNotification("Please enter a valid email address.", "error");
            } else {
                showNotification("🎉 Thank you for subscribing!", "success");
                newsletter.reset();
            }
        });
    }

    /*=========================================
        EMAIL VALIDATION
    =========================================*/
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /*=========================================
        NOTIFICATION SYSTEM
    =========================================*/
    function showNotification(message, type) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }

    /*=========================================
        FADE ON SCROLL
    =========================================*/
    const revealElements = document.querySelectorAll(".fade-up");

    function revealOnScroll() {
        revealElements.forEach(box => {
            const top = box.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight - 100;
            if (top < triggerBottom) {
                box.classList.add("show");
            }
        });
    }

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);

    /*=========================================
        FOOTER YEAR
    =========================================*/
    const year = document.getElementById("year");
    if (year) {
        year.innerHTML = new Date().getFullYear();
    }

    /*=========================================
        GALLERY LIGHTBOX
    =========================================*/
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                `;
                document.body.appendChild(lightbox);
                setTimeout(() => lightbox.classList.add('show'), 10);

                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                        lightbox.classList.remove('show');
                        setTimeout(() => lightbox.remove(), 300);
                    }
                });
            }
        });
    });

    /*=========================================
        ANIMATED NUMBER FOR STATS
    =========================================*/
    const animateNumbers = () => {
        document.querySelectorAll('.stat-item h3').forEach(el => {
            const text = el.innerText;
            const numMatch = text.match(/[\d,]+/);
            if (numMatch) {
                const num = parseInt(numMatch[0].replace(/,/g, ''));
                if (!isNaN(num)) {
                    let current = 0;
                    const increment = Math.ceil(num / 50);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            current = num;
                            clearInterval(timer);
                        }
                        el.innerHTML = text.replace(/[\d,]+/, current.toLocaleString());
                    }, 30);
                }
            }
        });
    };

    // Trigger stat animation on load
    setTimeout(animateNumbers, 1500);

    /*=========================================
        PAGE LOAD ANIMATION
    =========================================*/
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);

    /*=========================================
        REFRESH AOS ON LOAD
    =========================================*/
    window.addEventListener('load', () => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });

});

/*=========================================
    SHAKE ANIMATION
=========================================*/
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;
const style = document.createElement('style');
style.innerHTML = shakeKeyframes;
document.head.appendChild(style);

/*=========================================================
END
=========================================================*/
