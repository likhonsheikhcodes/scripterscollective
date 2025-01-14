document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('md:hidden', 'bg-gray-900', 'fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center', 'transform', 'transition-transform', 'duration-300', 'ease-in-out', 'translate-x-full');
    mobileMenu.innerHTML = `
        <nav class="text-center">
            <a href="#home" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">Home</a>
            <a href="#products" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">Products</a>
            <a href="#projects" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">Projects</a>
            <a href="#about" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">About</a>
            <a href="#contact" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">Contact</a>
        </nav>
    `;
    document.body.appendChild(mobileMenu);

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('translate-x-full');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
            mobileMenu.classList.add('translate-x-full');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            mobileMenu.classList.add('translate-x-full');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const fadeElems = document.querySelectorAll('.fade-in-section');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElems.forEach(elem => {
        appearOnScroll.observe(elem);
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form submitted');
        contactForm.reset();
        alert('Thank you for your message. We will get back to you soon!');
    });

    // ATLOS Payment Integration
    window.atlos = {
        Pay: function(options) {
            console.log('ATLOS Payment initiated with options:', options);
            // Here you would typically integrate with the real ATLOS payment gateway
            // For this example, we'll use a simulated payment process
            setTimeout(() => {
                alert(`Payment of $${options.orderAmount} processed successfully with ATLOS. Order ID: ${options.orderId}`);
            }, 2000);
        }
    };

    // Generate a unique order ID
    window.generateOrderId = function() {
        return 'ORDER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    };
});

