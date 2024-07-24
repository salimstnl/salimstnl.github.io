document.addEventListener('DOMContentLoaded', function() {
    // Pre-animation
    const preAnimation = document.getElementById("pre-animation");
    const mainContent = document.getElementById("main-content");

    setTimeout(() => {
        preAnimation.classList.add("fade-out");
        setTimeout(() => {
            preAnimation.style.display = "none";
            mainContent.style.display = "block";
            mainContent.classList.add("fade-in");
        }, 1000);
    }, 2000);

    // Smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    //Scroll indicator
    window.addEventListener("scroll", function () {
        const scrollIndicator = document.querySelector(".scroll-progress");
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progressHeight = (window.scrollY / totalHeight) * 100;
        scrollIndicator.style.height = `${progressHeight}%`;
    });

    // Fade-in effect for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        observer.observe(section);
    });

    // Smooth transition for header (if desired)
    const header = document.querySelector('header');
    const headerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });
    headerObserver.observe(header);

    // Certification animation
    const certificationsGrid = document.querySelector('.certifications-grid');
    
    function checkVisibility() {
        const rect = certificationsGrid.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2) {
            certificationsGrid.classList.add('visible');
        } else {
            certificationsGrid.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check

    // Projects animation
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        observer.observe(card);
    });

    function handleScroll() {
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight * 0.9) {
                card.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});
