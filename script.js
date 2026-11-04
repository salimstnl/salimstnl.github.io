document.addEventListener("DOMContentLoaded", () => {
    
    /* ----------------------------------------------------------------------
       1. Mobile Drawer Navigation Logic
       ---------------------------------------------------------------------- */
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navCloseBtn = document.getElementById("navCloseBtn");
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");

    function openMenu() {
        navLinks.classList.add("active");
        navOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        navLinks.classList.remove("active");
        navOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener("click", openMenu);
    if (navCloseBtn) navCloseBtn.addEventListener("click", closeMenu);
    if (navOverlay) navOverlay.addEventListener("click", closeMenu);

    /* ----------------------------------------------------------------------
       2. Hero Section Spotlight Carousel
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

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideIdx = parseInt(e.target.getAttribute("data-slide"));
            showSlide(slideIdx);
        });
    });

    /* ----------------------------------------------------------------------
       3. "Let's Do Math" Generator Logic
       ---------------------------------------------------------------------- */
    const mathQuestions = [
        {
            q: "What is the derivative of f(x) = x^3 - 4x + 7 with respect to x?",
            options: ["A) 3x^2 - 4", "B) 3x^2 + 4", "C) x^2 - 4", "D) 3x^3 - 4"],
            answer: 0
        },
        {
            q: "Which matrix property dictates that det(A * B) = det(A) * det(B)?",
            options: ["A) Additive property", "B) Multiplicative property", "C) Invertibility rule", "D) Linear combination"],
            answer: 1
        },
        {
            q: "What is the sum of the roots of x^2 - 7x + 12 = 0?",
            options: ["A) -7", "B) 12", "C) 7", "D) -12"],
            answer: 2
        },
        {
            q: "According to the Hairy Ball Theorem, how many vector zeros must exist on a combed 3D sphere?",
            options: ["A) Exactly zero", "B) At least one", "C) Infinitely many", "D) Exactly four"],
            answer: 1
        }
    ];

    const questionTextEl = document.getElementById("mathQuestionText");
    const optionsGridEl = document.getElementById("mathOptionsGrid");
    const feedbackEl = document.getElementById("mathFeedback");

    if (questionTextEl && optionsGridEl) {
        // Pick random question on refresh
        const randomIndex = Math.floor(Math.random() * mathQuestions.length);
        const selectedQ = mathQuestions[randomIndex];

        questionTextEl.textContent = selectedQ.q;

        selectedQ.options.forEach((optText, index) => {
            const btn = document.createElement("button");
            btn.className = "opt-btn";
            btn.textContent = optText;

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
