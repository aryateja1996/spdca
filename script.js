
document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault(); 

      const email = emailInput.value.trim();

      if (validateEmail(email)) {
        showToast("✅ Subscribed successfully with: " + email, "success");
        newsletterForm.reset();
      }
    });

    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    function showToast(message, type) {
      const toast = document.createElement("div");
      toast.textContent = message;
      toast.style.position = "fixed";
      toast.style.bottom = "20px";
      toast.style.right = "20px";
      toast.style.padding = "15px 20px";
      toast.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545";
      toast.style.color = "white";
      toast.style.borderRadius = "8px";
      toast.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      toast.style.zIndex = "9999";
      toast.style.fontSize = "1rem";
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s ease";

      document.body.appendChild(toast);
      setTimeout(() => (toast.style.opacity = "1"), 100);
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
      }, 4000);
    }
  }
});



// Accessibility Features
let speechInstance = null;

const increaseTextBtn = document.getElementById('increaseText');
const body = document.body;
let currentFontSize = 16;

increaseTextBtn.addEventListener('click', function () {
    currentFontSize += 2;
    if (currentFontSize > 24) {
        currentFontSize = 16; // Reset if too large
    }
    body.style.fontSize = currentFontSize + 'px';
});

const grayscaleBtn = document.getElementById('grayscale');
let grayscaleEnabled = false;

grayscaleBtn.addEventListener('click', () => {
    if (grayscaleEnabled) {
        document.body.classList.remove('grayscale-mode');
        grayscaleEnabled = false;
    } else {
        document.body.classList.add('grayscale-mode');
        grayscaleEnabled = true;
    }
});



// Read Page Content (Start/Stop Audio)
document.getElementById('readPage').addEventListener('click', () => {
    if (speechInstance && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Stop audio if it's already speaking
        speechInstance = null;
        document.getElementById('readPage').innerHTML = '<i class="fas fa-volume-up"></i> Read Page';
    } else {
        const content = document.body.innerText;
        speechInstance = new SpeechSynthesisUtterance(content);
        speechInstance.lang = 'en-US';
        speechInstance.volume = 1;
        speechInstance.rate = 1;
        speechInstance.pitch = 1;
        window.speechSynthesis.speak(speechInstance);

        document.getElementById('readPage').innerHTML = '<i class="fas fa-stop"></i> Stop Reading';
        
        // Reset button text after audio stops
        speechInstance.onend = () => {
            document.getElementById('readPage').innerHTML = '<i class="fas fa-volume-up"></i> Read Page';
        };
    }
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    alert('Thank you, ' + name + '! Your message has been sent.');
    this.reset();
});

// Newsletter Subscribe Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  const emailInput = newsletterForm.querySelector('input[type="email"]');

  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (validateEmail(email)) {
      showToast("✅ Subscribed successfully with: " + email, "success");
      newsletterForm.reset();
    } else {
      showToast("⚠️ Please enter a valid email address.", "error");
    }
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function showToast(message, type) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "15px 20px";
    toast.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545";
    toast.style.color = "white";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    toast.style.zIndex = "9999";
    toast.style.fontSize = "1rem";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";

    document.body.appendChild(toast);
    setTimeout(() => (toast.style.opacity = "1"), 100);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }
}

// free consultancy 
document.getElementById('consultationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you! Our team will contact you shortly for your free consultation.');
    document.getElementById('consultationForm').reset();
});


// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            offsetTop: -80
        });
    });
});
