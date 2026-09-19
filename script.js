document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Runs once per element
            }
        });
    }, observerOptions);

    // Target all sections and project cards for the fade-in effect
    const hiddenElements = document.querySelectorAll('.section, .project-card, .video-container');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
