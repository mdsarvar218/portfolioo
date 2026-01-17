document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });

    // Skill bar animation (simple example)
    const skillProgressBars = document.querySelectorAll('.progress');
    const animateSkills = () => {
        skillProgressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%'; // Reset for re-animation if needed
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };

    // Trigger skill animation when section is in view
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(skillsSection); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Animated education timeline
    const educationSection = document.getElementById('education');
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerEducation = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200); // Stagger animation
                });
                observerEducation.unobserve(educationSection);
            }
        });
    }, { threshold: 0.3 });

    if (educationSection) {
        observerEducation.observe(educationSection);
    }

    // Project Modals
    const projectModals = {
        'ai-doctor': {
            title: 'AI Doctor Assistant (Capstone Project)',
            description: `
                <ul>
                    <li>Upload medical reports, X-rays, ECGs, and scan documents</li>
                    <li>OCR-based text extraction and medical document understanding</li>
                    <li>Store embeddings using ChromaDB</li>
                    <li>Offline AI-powered explanations using Ollama</li>
                    <li>Disease insights, exercises, do’s & don’ts</li>
                    <li>Downloadable AI-generated medical reports (PDF)</li>
                </ul>
            `,
            techStack: ['Python', 'Streamlit', 'Ollama', 'ChromaDB', 'OCR']
        },
        'report-analyzer': {
            title: 'Combined Report Analyzer',
            description: `
                <ul>
                    <li>Multi-PDF upload support</li>
                    <li>Extracts and summarizes medical data</li>
                    <li>Handles corrupted or invalid PDFs gracefully</li>
                    <li>AI-powered structured insights</li>
                </ul>
            `,
            techStack: ['Python', 'pdfplumber', 'AI']
        }
    };

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTechStack = document.getElementById('modal-tech-stack');
    const closeButton = document.querySelector('.close-button');
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');

    function openModal(projectId) {
        const project = projectModals[projectId];
        if (project) {
            modalTitle.textContent = project.title;
            modalDescription.innerHTML = project.description;
            modalTechStack.innerHTML = '';
            project.techStack.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                modalTechStack.appendChild(span);
            });
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match CSS transition duration
    }

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectId = e.target.closest('.project-card').dataset.project;
            openModal(projectId);
        });
    });

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Smooth page transitions (simple example using opacity)
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                document.body.style.opacity = 0;
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                    document.body.style.opacity = 1;
                }, 300); // Small delay to show transition
            }
        });
    });

    // Resume Download (placeholder)
    const downloadResumeBtn = document.getElementById('download-resume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Resume download functionality will be implemented here!');
            // In a real application, you would link to your resume file directly:
            // window.open('./your-resume.pdf', '_blank');
        });
    }

    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageTextarea = this.querySelector('textarea');

            // Simple validation
            if (nameInput.value.trim() === '') {
                alert('Please enter your name.');
                isValid = false;
            }
            if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
                alert('Please enter a valid email address.');
                isValid = false;
            }
            if (messageTextarea.value.trim() === '') {
                alert('Please enter your message.');
                isValid = false;
            }

            if (isValid) {
                alert('Message sent successfully! (This is a demo. In a real application, form data would be sent to a server.)');
                contactForm.reset();
            }
        });
    }
});
