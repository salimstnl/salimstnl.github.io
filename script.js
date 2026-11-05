document.addEventListener("DOMContentLoaded", () => {
    /* 1. Typewriter Title Animation */
    const typeWriterEl = document.getElementById('typewriter');
    if (typeWriterEl) {
        const text = "The most powerful art is that of learning.";
        let isDeleting = false;
        let charIndex = 0;
        let typingSpeed = 100;

        function type() {
            const currentText = text.substring(0, charIndex);
            typeWriterEl.innerHTML = currentText + '<span class="typed-cursor">|</span>';

            if (!isDeleting && charIndex < text.length) {
                charIndex++;
                typingSpeed = 60; // Slightly faster typing speed
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                typingSpeed = 30; // Erase faster
            } else if (!isDeleting && charIndex === text.length) {
                isDeleting = true;
                typingSpeed = 3000; // Pause at end before erasing
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                typingSpeed = 500; // Pause before typing again
            }
            setTimeout(type, typingSpeed);
        }
        setTimeout(type, 800);
    }

    /* ----------------------------------------------------------------------
       2. Glowing Timeline Scroll Effect
       ---------------------------------------------------------------------- */
    const timeline = document.getElementById('timeline');
    if (timeline) {
        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            // Calculate how far we've scrolled past the top of the timeline
            // Trigger earlier so the line moves down as the user scrolls
            const scrollPercentage = Math.max(0, Math.min(100, ((window.innerHeight * 0.7 - rect.top) / rect.height) * 100));
            timeline.style.setProperty('--scroll-glow', `${scrollPercentage}%`);
        });
    }

    /* ----------------------------------------------------------------------
       3. Mobile Drawer Navigation Logic
       ---------------------------------------------------------------------- */
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navCloseBtn = document.getElementById("navCloseBtn");
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");

    function openMenu() { navLinks.classList.add("active"); navOverlay.classList.add("active"); document.body.style.overflow = "hidden"; }
    function closeMenu() { navLinks.classList.remove("active"); navOverlay.classList.remove("active"); document.body.style.overflow = "auto"; }

    if (hamburgerBtn) hamburgerBtn.addEventListener("click", openMenu);
    if (navCloseBtn) navCloseBtn.addEventListener("click", closeMenu);
    if (navOverlay) navOverlay.addEventListener("click", closeMenu);

    /* ----------------------------------------------------------------------
       4. Hero Section Spotlight Carousel
       ---------------------------------------------------------------------- */
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("carouselPrev");
    const nextBtn = document.getElementById("carouselNext");
    let currentSlide = 0;

    function showSlide(index) {
        if (slides.length === 0) return;
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
        dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
    }

    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            showSlide(parseInt(e.target.getAttribute("data-slide")));
        });
    });

    /* ----------------------------------------------------------------------
       5. "Math of the Day" Generator (Using KaTeX for beautiful rendering)
       ---------------------------------------------------------------------- */
    const mathQuestions = [
        { 
            q: "What is the derivative of \\( f(x) = x^3 - 4x + 7 \\) with respect to \\( x \\)?", 
            options: ["\\( 3x^2 - 4 \\)", "\\( 3x^2 + 4 \\)", "\\( x^2 - 4 \\)", "\\( 3x^3 - 4 \\)"], 
            answer: 0 
        },
        { 
            q: "Which property dictates that \\( \\det(A \\cdot B) = \\det(A) \\cdot \\det(B) \\)?", 
            options: ["Additive property", "Multiplicative property", "Invertibility rule", "Linear combination"], 
            answer: 1 
        },
        { 
            q: "What is the sum of the roots of \\( x^2 - 7x + 12 = 0 \\)?", 
            options: ["-7", "12", "7", "-12"], 
            answer: 2 
        },
        {
            q: "Evaluate the integral \\( \\int_0^1 3x^2 \\,dx \\)",
            options: ["1", "3", "\\( \\frac{1}{3} \\)", "0"],
            answer: 0
        }
    ];

    const questionTextEl = document.getElementById("mathQuestionText");
    const optionsGridEl = document.getElementById("mathOptionsGrid");
    const feedbackEl = document.getElementById("mathFeedback");

    // Helper to render math strings with KaTeX
    function renderMath(text) {
        // If the text contains \( ... \), we render it via KaTeX
        if (typeof katex !== 'undefined' && text.includes("\\(")) {
            return text.replace(/\\\((.*?)\\\)/g, (match, p1) => {
                return katex.renderToString(p1, { throwOnError: false });
            });
        }
        return text;
    }

    if (questionTextEl && optionsGridEl) {
        const randomIndex = Math.floor(Math.random() * mathQuestions.length);
        const selectedQ = mathQuestions[randomIndex];

        questionTextEl.innerHTML = renderMath(selectedQ.q);

        selectedQ.options.forEach((optText, index) => {
            const btn = document.createElement("button");
            btn.className = "opt-btn";
            btn.innerHTML = renderMath(optText);

            btn.addEventListener("click", () => {
                const allButtons = optionsGridEl.querySelectorAll(".opt-btn");
                allButtons.forEach(b => b.disabled = true);

                if (index === selectedQ.answer) {
                    btn.classList.add("correct");
                    feedbackEl.textContent = "Correct!";
                    feedbackEl.style.color = "var(--correct)";
                } else {
                    btn.classList.add("wrong");
                    allButtons[selectedQ.answer].classList.add("correct");
                    feedbackEl.textContent = "Incorrect!";
                    feedbackEl.style.color = "var(--wrong)";
                }
            });
            optionsGridEl.appendChild(btn);
        });
    }
});
