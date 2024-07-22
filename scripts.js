// Lightbox functionality
function openLightbox(imageSrc, captionText) {
    document.getElementById('lightbox').style.display = 'block';
    document.getElementById('lightbox-image').src = imageSrc;
    document.getElementById('lightbox-caption').innerText = captionText;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Form validation
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

