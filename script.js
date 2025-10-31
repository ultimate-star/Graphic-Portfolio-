document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle (No Change) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- Contact Form Logic (No Change) ---
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     const formMessage = document.getElementById('form-message');
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         // ... (rest of form logic is unchanged)
    //         formMessage.textContent = 'Thank you for your message!';
    //         formMessage.style.color = 'green';
    //         contactForm.reset();
    //     });
    // }


    // --- NEW: Portfolio Modal Logic ---
    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-button');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentProjectImages = [];
    let currentImageIndex = 0;

    // Function to open the modal and display the selected project
    function openModal(projectImages, startIndex) {
        currentProjectImages = projectImages;
        currentImageIndex = startIndex;
        modal.style.display = 'flex';
        showImage(currentImageIndex);
    }

    // Function to display the correct image and caption
    function showImage(index) {
        if (currentProjectImages.length === 0) return;
        
        modalImg.src = currentProjectImages[index];
        captionText.innerHTML = `${index + 1} / ${currentProjectImages.length}`;

        // Hide/show navigation arrows if there's only one image
        if (currentProjectImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Event listeners for portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const imagesAttr = item.getAttribute('data-images');
            const images = imagesAttr.split(',').map(img => img.trim());
            openModal(images, 0);
        });
    });

    // Event listener for the close button
    closeBtn.addEventListener('click', closeModal);

    // Event listener to close modal by clicking the background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Event listeners for next/prev buttons
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        showImage(currentImageIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        showImage(currentImageIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });

});