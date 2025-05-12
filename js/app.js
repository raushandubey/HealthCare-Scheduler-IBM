// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Modal Elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const showSignupBtn = document.getElementById('showSignupBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const closeButtons = document.querySelectorAll('.close');
    const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');

    // Form Elements
    const appointmentForm = document.getElementById('appointmentForm');
    const serviceSelect = document.getElementById('service');
    const doctorSelect = document.getElementById('doctor');
    const timeSelect = document.getElementById('time');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const contactForm = document.getElementById('contactForm');

    // Testimonial Elements
    const prevTestimonialBtn = document.getElementById('prevTestimonial');
    const nextTestimonialBtn = document.getElementById('nextTestimonial');
    const testimonials = document.querySelectorAll('.testimonial');

    // Doctor Data
    const doctors = {
        general: [
            { id: 'doc1', name: 'Dr. Lisa Williams', availability: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
            { id: 'doc2', name: 'Dr. Michael Chen', availability: ['09:30', '10:30', '13:30', '16:30'] }
        ],
        dental: [
            { id: 'doc3', name: 'Dr. Raj Singh', availability: ['08:00', '09:00', '10:00', '15:00', '16:00'] },
            { id: 'doc4', name: 'Dr. Rupali', availability: ['11:00', '13:00', '14:00', '17:00'] }
        ],
        cardiology: [
            { id: 'doc5', name: 'Dr. Raushan Dubey', availability: ['08:30', '10:30', '13:00', '14:30'] },
            { id: 'doc6', name: 'Dr. Akshay Singh', availability: ['09:00', '11:30', '15:30', '16:30'] }
        ],
        pediatrics: [
            { id: 'doc7', name: 'Dr. Sara', availability: ['09:00', '10:00', '11:00', '15:00'] },
            { id: 'doc8', name: 'Dr. Sudhanshu Singh', availability: ['08:00', '12:00', '13:00', '16:00'] }
        ],
        dermatology: [
            { id: 'doc9', name: 'Dr. Robert Chen', availability: ['10:00', '11:00', '14:00', '16:00'] },
            { id: 'doc10', name: 'Dr. Jessica Wong', availability: ['09:00', '12:00', '15:00', '17:00'] }
        ]
    };

    // Modal Functions
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            closeModal(modal);
        });
    }

    // Modal Event Listeners
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            openModal(loginModal);
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            openModal(signupModal);
        });
    }

    if (bookAppointmentBtn) {
        bookAppointmentBtn.addEventListener('click', function() {
            const appointmentSection = document.getElementById('appointment');
            if (appointmentSection) {
                appointmentSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        });
    }

    // Close button event listeners
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });

    if (closeConfirmationBtn) {
        closeConfirmationBtn.addEventListener('click', function() {
            closeModal(confirmationModal);
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Add accessibility to testimonial buttons
    if (prevTestimonialBtn) {
        prevTestimonialBtn.setAttribute('aria-label', 'Previous testimonial');
        prevTestimonialBtn.setAttribute('title', 'Previous testimonial');
    }
    
    if (nextTestimonialBtn) {
        nextTestimonialBtn.setAttribute('aria-label', 'Next testimonial');
        nextTestimonialBtn.setAttribute('title', 'Next testimonial');
    }

    // Service change handler
    if (serviceSelect && doctorSelect) {
        serviceSelect.addEventListener('change', function() {
            updateDoctorOptions();
        });
    }

    // Doctor change handler
    if (doctorSelect && timeSelect) {
        doctorSelect.addEventListener('change', function() {
            updateTimeOptions();
        });
    }

    // Form submission handlers
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (serviceSelect && doctorSelect && timeSelect) {
                const service = serviceSelect.value;
                const doctorText = doctorSelect.options[doctorSelect.selectedIndex].text;
                const date = document.getElementById('date').value;
                const time = timeSelect.value;
                
                // Update confirmation details
                if (document.getElementById('confirmService')) {
                    document.getElementById('confirmService').textContent = getServiceName(service);
                }
                
                if (document.getElementById('confirmDoctor')) {
                    document.getElementById('confirmDoctor').textContent = doctorText;
                }
                
                if (document.getElementById('confirmDate')) {
                    document.getElementById('confirmDate').textContent = formatDate(date);
                }
                
                if (document.getElementById('confirmTime')) {
                    document.getElementById('confirmTime').textContent = time;
                }
                
                // Open confirmation modal
                openModal(confirmationModal);
                
                // Reset form
                appointmentForm.reset();
                updateDoctorOptions();
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            loginForm.reset();
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            closeModal(signupModal);
            signupForm.reset();
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Initialize testimonial slider
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(function(testimonial, i) {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    if (testimonials.length > 0) {
        // Show first testimonial
        showTestimonial(currentTestimonial);
        
        // Previous button click
        if (prevTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
        
        // Next button click
        if (nextTestimonialBtn) {
            nextTestimonialBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
    }

    // Service booking buttons
    const bookNowButtons = document.querySelectorAll('.service-card .btn');
    if (bookNowButtons.length > 0) {
        bookNowButtons.forEach(function(button, index) {
            button.addEventListener('click', function() {
                const appointmentSection = document.getElementById('appointment');
                if (appointmentSection) {
                    appointmentSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Set service based on which button was clicked
                    const services = ['general', 'dental', 'cardiology', 'pediatrics'];
                    if (index < services.length && serviceSelect) {
                        serviceSelect.value = services[index];
                        updateDoctorOptions();
                    }
                }
            });
        });
    }

    // Helper functions for form selects
    function updateDoctorOptions() {
        if (!doctorSelect || !serviceSelect) return;
        
        const selectedService = serviceSelect.value;
        doctorSelect.innerHTML = '<option value="">Select a doctor</option>';
        
        if (selectedService && doctors[selectedService]) {
            doctors[selectedService].forEach(function(doctor) {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = doctor.name;
                doctorSelect.appendChild(option);
            });
        }
        
        // Reset time select
        if (timeSelect) {
            timeSelect.innerHTML = '<option value="">Select a time</option>';
        }
    }

    function updateTimeOptions() {
        if (!timeSelect || !doctorSelect || !serviceSelect) return;
        
        const selectedService = serviceSelect.value;
        const selectedDoctorId = doctorSelect.value;
        timeSelect.innerHTML = '<option value="">Select a time</option>';
        
        if (selectedService && selectedDoctorId && doctors[selectedService]) {
            const doctor = doctors[selectedService].find(function(doc) {
                return doc.id === selectedDoctorId;
            });
            
            if (doctor && doctor.availability) {
                doctor.availability.forEach(function(time) {
                    const option = document.createElement('option');
                    option.value = time;
                    option.textContent = time;
                    timeSelect.appendChild(option);
                });
            }
        }
    }

    function getServiceName(serviceValue) {
        const serviceMap = {
            'general': 'General Checkup',
            'dental': 'Dental Care',
            'cardiology': 'Cardiology',
            'pediatrics': 'Pediatrics',
            'dermatology': 'Dermatology'
        };
        return serviceMap[serviceValue] || serviceValue;
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
            nav.classList.remove('active');
        }
    });
});