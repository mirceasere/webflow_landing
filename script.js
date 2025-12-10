// Narrio Landing Page Script
console.log('Narrio Loaded 🚀');

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});

// Role Selection Logic
document.querySelectorAll('.select-role').forEach(button => {
    button.addEventListener('click', function () {
        const role = this.getAttribute('data-role');
        const radio = document.querySelector(`input[name="role"][value="${role}"]`);
        if (radio) {
            radio.checked = true;
        }
    });
});
