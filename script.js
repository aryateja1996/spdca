const launchDate = new Date("April 26, 2025 00:00:00").getTime();

const timer = setInterval(() => {

    const now = new Date().getTime();


    const distance = launchDate - now;


    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<span class='launched'>We're Live!</span>";
        return;
    }


    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    document.getElementById("countdown").innerHTML = `
        <div class="time-unit">
            <span class="number">${days}</span>
            <span class="label">Days</span>
        </div>
        <div class="time-unit">
            <span class="number">${hours}</span>
            <span class="label">Hours</span>
        </div>
        <div class="time-unit">
            <span class="number">${minutes}</span>
            <span class="label">Minutes</span>
        </div>
        <div class="time-unit">
            <span class="number">${seconds}</span>
            <span class="label">Seconds</span>
        </div>
    `;
}, 1000);


document.addEventListener('DOMContentLoaded', () => {

    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');

            if (emailInput && emailInput.value) {

                alert(`Thank you for subscribing with ${emailInput.value}! We'll keep you updated.`);
                emailInput.value = '';
            }
        });
    }


    const features = document.querySelectorAll('.feature');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    features.forEach(feature => {
        feature.style.opacity = 0;
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(feature);
    });


    const countdownElement = document.getElementById('countdown');

    if (countdownElement) {
        const style = document.createElement('style');
        style.textContent = `
            .time-unit {
                display: flex;
                flex-direction: column;
                align-items: center;
                min-width: 80px;
            }
            
            .number {
                font-size: 2.2rem;
                font-weight: 700;
                color: #0073e6;
            }
            
            .label {
                font-size: 0.9rem;
                color: #6c757d;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .launched {
                color: #28a745;
                font-size: 2rem;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            @media (max-width: 768px) {
                .time-unit {
                    min-width: 60px;
                }
                
                .number {
                    font-size: 1.8rem;
                }
            }
        `;

        document.head.appendChild(style);
    }
});