document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryMenu = document.getElementById('primary-menu');
    
    if (menuToggle && primaryMenu) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            primaryMenu.classList.toggle('active');
        });
    }
    
    // Text size adjustment
    const increaseTextBtn = document.getElementById('increase-text');
    const decreaseTextBtn = document.getElementById('decrease-text');
    let currentFontSize = 100;
    
    if (increaseTextBtn) {
        increaseTextBtn.addEventListener('click', function() {
            if (currentFontSize < 150) {
                currentFontSize += 10;
                document.body.style.fontSize = currentFontSize + '%';
                announceChange('Text size increased');
            }
        });
    }
    
    if (decreaseTextBtn) {
        decreaseTextBtn.addEventListener('click', function() {
            if (currentFontSize > 70) {
                currentFontSize -= 10;
                document.body.style.fontSize = currentFontSize + '%';
                announceChange('Text size decreased');
            }
        });
    }
    
    // High contrast toggle
    const contrastToggle = document.getElementById('toggle-contrast');
    
    if (contrastToggle) {
        contrastToggle.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            const isHighContrast = document.body.classList.contains('high-contrast');
            announceChange(isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled');
        });
    }
    
    // Read aloud functionality
    const readPageBtn = document.getElementById('read-page');
    let speechSynthesis = window.speechSynthesis;
    let utterance = null;
    let isReading = false;
    let readingPosition = 0;
    let contentToRead = [];
    
    if (readPageBtn) {
        readPageBtn.addEventListener('click', function() {
            if (!isReading) {
                startReading();
            } else {
                stopReading();
            }
        });
    }
    
    function startReading() {
        if (isReading) return;
        
        // Collect content to read if not already collected
        if (contentToRead.length === 0) {
            collectContent();
        }
        
        if (contentToRead.length === 0) return;
        
        // Create a new utterance starting from the current position
        utterance = new SpeechSynthesisUtterance(contentToRead.slice(readingPosition).join('. '));
        
        // Set properties
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Handle end of speech
        utterance.onend = function() {
            stopReading();
            readingPosition = 0; // Reset position when finished
        };
        
        // Handle errors
        utterance.onerror = function(event) {
            console.error('SpeechSynthesis error:', event);
            stopReading();
        };
        
        // Start speaking
        speechSynthesis.speak(utterance);
        isReading = true;
        
        // Update UI
        readPageBtn.classList.add('active');
        readPageBtn.setAttribute('aria-label', 'Stop reading');
        readPageBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        announceChange('Reading page content');
    }
    
    function stopReading() {
        if (!isReading) return;
        
        speechSynthesis.cancel();
        isReading = false;
        
        // Update UI
        readPageBtn.classList.remove('active');
        readPageBtn.setAttribute('aria-label', 'Read page content');
        readPageBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        
        announceChange('Stopped reading');
    }
    
    function collectContent() {
        contentToRead = [];
        
        // Get page title
        contentToRead.push(document.title);
        
        // Get main content
        const mainContent = document.querySelector('main') || document.body;
        
        // Get all headings and paragraphs
        const headings = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const paragraphs = mainContent.querySelectorAll('p');
        const listItems = mainContent.querySelectorAll('li');
        
        // Add headings
        headings.forEach(heading => {
            if (heading.textContent.trim()) {
                contentToRead.push(heading.textContent.trim());
            }
        });
        
        // Add paragraphs
        paragraphs.forEach(paragraph => {
            if (paragraph.textContent.trim()) {
                contentToRead.push(paragraph.textContent.trim());
            }
        });
        
        // Add list items
        listItems.forEach(item => {
            if (item.textContent.trim()) {
                contentToRead.push(item.textContent.trim());
            }
        });
    }
    
    // Utility function to announce changes for screen readers
    function announceChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('sr-only');
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        // Remove after announcement is read
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
});