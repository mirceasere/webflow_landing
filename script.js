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

// Form Submission with Neon DB
const form = document.querySelector('.audit-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Submitting...';
        submitBtn.disabled = true;

        const formDataObj = new FormData(form);
        const data = Object.fromEntries(formDataObj.entries());

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Thanks! Your audit request has been received.');
                form.reset();
            } else {
                throw new Error(result.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}
