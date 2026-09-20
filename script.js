document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target all sections, project cards, video containers, and press cards for the fade-in effect
    const hiddenElements = document.querySelectorAll('.section, .project-card, .video-container, .press-card');
    
    hiddenElements.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
