document.addEventListener("DOMContentLoaded", () => {
    
    /* ----------------------------------------------------------------------
       1. Typewriter Title Animation
       ---------------------------------------------------------------------- */
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
                typingSpeed = 60; // Typing speed
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                typingSpeed = 30; // Erase speed
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
            // Calculate scroll progress relative to the viewport
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
       4. Hero Section Spotlight Carousel
       ---------------------------------------------------------------------- */
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("carouselPrev");
    const nextBtn = document.getElementById("carouselNext");
    let currentSlide = 0;

    function showSlide(index) {
        if (slides.length === 0) return;
        
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
        dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
    }

    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            showSlide(parseInt(e.target.getAttribute("data-slide"), 10));
        });
    });

    /* ----------------------------------------------------------------------
       5. "Math of the Day" Generator (KaTeX Rendering)
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
        },
        { 
            q: "What is the value of \\( \\log_2(32) \\)?", 
            options: ["4", "5", "6", "8"], 
            answer: 1 
        },
        { 
            q: "What is the exact value of \\( \\sin(30^\\circ) \\)?", 
            options: ["\\( \\frac{1}{2} \\)", "\\( \\frac{\\sqrt{2}}{2} \\)", "\\( \\frac{\\sqrt{3}}{2} \\)", "1"], 
            answer: 0 
        },
        { 
            q: "How many different ways can you arrange the letters in the word 'MATH'?", 
            options: ["12", "16", "24", "256"], 
            answer: 2 
        },
        {
            q: "What is the area of a circle with a diameter of 10?",
            options: ["\\( 10\\pi \\)", "\\( 20\\pi \\)", "\\( 25\\pi \\)", "\\( 100\\pi \\)"],
            answer: 2
        },
        {
            q: "Simplify the expression \\( \\frac{x^5 \\cdot x^3}{x^2} \\).",
            options: ["\\( x^6 \\)", "\\( x^5 \\)", "\\( x^{15} \\)", "\\( x^4 \\)"],
            answer: 0
        },
        {
            q: "What is the y-intercept of the line given by the equation \\( 3x - 2y = 12 \\)?",
            options: ["-6", "6", "-4", "4"],
            answer: 0
        }
    ];

    const questionTextEl = document.getElementById("mathQuestionText");
    const optionsGridEl = document.getElementById("mathOptionsGrid");
    const feedbackEl = document.getElementById("mathFeedback");

    // Helper to render math strings with KaTeX
    function renderMath(text) {
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

    /* ----------------------------------------------------------------------
       6. Automatic Course Sync (Fetches latest 6 courses for Homepage)
       ---------------------------------------------------------------------- */
    async function loadLatestCoursesToHome() {
        const homeGrid = document.getElementById('home-course-grid');
        
        // Execute only if the grid exists on the current page
        if (!homeGrid) return;

        try {
            // Fetch the HTML content of the teaching page
            const response = await fetch('/teaching/index.html');
            const htmlText = await response.text();
            
            // Parse the fetched text into a readable HTML DOM
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            
            // Find all course cards and extract the first 6
            const allCourses = doc.querySelectorAll('.course-item');
            const latestCourses = Array.from(allCourses).slice(0, 6);
            
            // Clear loading text
            homeGrid.innerHTML = '';
            
            // Inject each course into the homepage
            latestCourses.forEach(course => {
                const btn = course.querySelector('button');
                
                if (btn) {
                    const linkObj = document.createElement('a');
                    linkObj.className = btn.className; // Maintain button styling
                    linkObj.href = '/teaching/';
                    linkObj.innerHTML = 'View All Courses &rarr;';
                    linkObj.style.textDecoration = 'none';
                    linkObj.style.display = 'inline-block';
                    linkObj.style.textAlign = 'center';
                    btn.replaceWith(linkObj);
                }
                
                homeGrid.appendChild(course);
            });
            
        } catch (error) {
            console.error('Failed to sync courses from teaching page:', error);
            homeGrid.innerHTML = '<p style="text-align: center; color: var(--wrong); grid-column: 1 / -1;">Failed to load courses. Please visit the Teaching page.</p>';
        }
    }

    loadLatestCoursesToHome();

        /* ----------------------------------------------------------------------
       Automatic Blog Sync (Fetches latest 3 blogs for Homepage)
       ---------------------------------------------------------------------- */
    async function loadLatestBlogsToHome() {
        const homeBlogGrid = document.getElementById('home-blog-grid');
        if (!homeBlogGrid) return;
    
        try {
            const response = await fetch('/blog/index.html');
            const htmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            
            // Find all blog cards and extract the first 3 (Assuming blog/index.html is default sorted newest-first)
            const allBlogs = doc.querySelectorAll('.blog-item');
            const latestBlogs = Array.from(allBlogs).slice(0, 3);
            
            homeBlogGrid.innerHTML = '';
            
            latestBlogs.forEach(blog => {
                const btn = blog.querySelector('button');
                
                if (btn) {
                    const linkObj = document.createElement('a');
                    linkObj.className = btn.className; 
                    linkObj.href = '/blog/';
                    linkObj.innerHTML = 'Read Article &rarr;';
                    linkObj.style.textDecoration = 'none';
                    linkObj.style.display = 'inline-block';
                    linkObj.style.textAlign = 'center';
                    btn.replaceWith(linkObj);
                }
                
                homeBlogGrid.appendChild(blog);
            });
            
        } catch (error) {
            console.error('Failed to sync blogs from blog page:', error);
            homeBlogGrid.innerHTML = '<p style="text-align: center; color: var(--wrong); grid-column: 1 / -1;">Failed to load articles. Please visit the Blog page.</p>';
        }
    }
    
    // Make sure to call this alongside your course sync
    document.addEventListener('DOMContentLoaded', () => {
        // loadLatestCoursesToHome(); // Assuming this is already here
        loadLatestBlogsToHome();
    });
});
