document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
   
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Accessibility features
    const textSizeIncrease = document.getElementById('text-size-increase');
    const textSizeDecrease = document.getElementById('text-size-decrease');
    const highContrastToggle = document.getElementById('high-contrast-toggle');
    const readPage = document.getElementById('read-page');
    
    let textSizeLevel = 0;
    const body = document.body;
    
    textSizeIncrease.addEventListener('click', function() {
        if (textSizeLevel < 3) {
            textSizeLevel++;
            body.classList.remove('text-large', 'text-xlarge', 'text-xxlarge');
            
            if (textSizeLevel === 1) body.classList.add('text-large');
            if (textSizeLevel === 2) body.classList.add('text-xlarge');
            if (textSizeLevel === 3) body.classList.add('text-xxlarge');
        }
    });
    
    textSizeDecrease.addEventListener('click', function() {
        if (textSizeLevel > 0) {
            textSizeLevel--;
            body.classList.remove('text-large', 'text-xlarge', 'text-xxlarge');
            
            if (textSizeLevel === 1) body.classList.add('text-large');
            if (textSizeLevel === 2) body.classList.add('text-xlarge');
        }
    });
    
    highContrastToggle.addEventListener('click', function() {
        body.classList.toggle('high-contrast');
    });
    
    readPage.addEventListener('click', function() {
        // Simple text-to-speech implementation
        const mainContent = document.querySelector('main') || document.body;
        const text = mainContent.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-IN';
        speechSynthesis.speak(utterance);
    });

    const scrollElements = document.querySelectorAll('.js-scroll');
   
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
   
    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };
   
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
   
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
   
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };
   
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
   
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input .fa-paper-plane');
    const micButton = document.querySelector('.chat-input .fa-microphone');
    const startDemoBtn = document.getElementById('start-demo');
    const languageSelector = document.getElementById('languages');
   
    const aiResponses = {
        hindi: [
            "मैं आपको विभिन्न सरकारी योजनाओं के बारे में जानकारी दे सकता हूं।",
            "कृपया बताएं कि आप किस योजना के बारे में जानना चाहते हैं?",
            "मैं विभिन्न कार्यक्रमों के लिए आपकी पात्रता की जांच कर सकता हूं।",
            "क्या आप पीएम-किसान, आयुष्मान भारत, या अन्य योजनाओं के बारे में जानना चाहेंगे?",
            "मैं आपकी सहायता के लिए यहां हूं ताकि आप आसानी से सरकारी सेवाओं तक पहुंच सकें।"
        ],
        tamil: [
            "பல்வேறு அரசு திட்டங்கள் பற்றிய தகவல்களை நான் உங்களுக்கு வழங்க முடியும்.",
            "தயவுசெய்து நீங்கள் ஆர்வமாக உள்ள திட்டம் எது என்பதைச் சொல்லுங்கள்.",
            "பல்வேறு திட்டங்களுக்கான தகுதியை நான் சரிபார்க்க முடியும்.",
            "பிஎம்-கிசான், ஆயுஷ்மான் பாரத் அல்லது பிற திட்டங்கள் பற்றி அறிய விரும்புகிறீர்களா?",
            "அரசு சேவைகளை எளிதாக அணுக உங்களுக்கு உதவ நான் இங்கே உள்ளேன்."
        ],
        telugu: [
            "నేను వివిధ ప్రభుత్వ పథకాల గురించి మీకు సమాచారం అందించగలను.",
            "దయచేసి మీరు ఆసక్తి కలిగి ఉన్న పథకం ఏది అని చెప్పండి.",
            "నేను వివిధ ప్రోగ్రాములకు మీ అర్హతను తనిఖీ చేయగలను.",
            "మీరు PM-కిసాన్, ఆయుష్మాన్ భారత్ లేదా ఇతర పథకాల గురించి తెలుసుకోవాలనుకుంటున్నారా?",
            "ప్రభుత్వ సేవలను సులభంగా ప్రాప్తి చేసుకోవడానికి మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను."
        ],
        english: [
            "I can help you with information about various government schemes.",
            "Please tell me which scheme you're interested in.",
            "I can check your eligibility for different programs.",
            "Would you like to know about PM-Kisan, Ayushman Bharat, or other schemes?",
            "I'm here to help you access government services easily."
        ]
    };
    
    // Set default language responses
    let currentLanguage = 'hindi';
    let currentResponses = aiResponses.hindi;
    
    // Update responses when language changes
    languageSelector.addEventListener('change', function() {
        currentLanguage = this.value;
        currentResponses = aiResponses[this.value] || aiResponses.hindi;
        
        // Add a message about language change
        addMessage(`Language changed to ${this.options[this.selectedIndex].text}. How can I help you?`, true);
    });

    function getAIResponse() {
        const randomIndex = Math.floor(Math.random() * currentResponses.length);
        return currentResponses[randomIndex];
    }

    function addMessage(text, isAI = true) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (isAI) {
            messageDiv.classList.add('ai-message');
        } else {
            messageDiv.classList.add('user-message');
        }
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Read AI messages aloud
        if (isAI) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = getLanguageCode(currentLanguage);
            speechSynthesis.speak(utterance);
        }
    }
    
    function getLanguageCode(lang) {
        const langCodes = {
            'hindi': 'hi-IN',
            'tamil': 'ta-IN',
            'telugu': 'te-IN',
            'bengali': 'bn-IN',
            'kannada': 'kn-IN',
            'malayalam': 'ml-IN',
            'gujarati': 'gu-IN',
            'marathi': 'mr-IN'
        };
        return langCodes[lang] || 'en-IN';
    }

    sendButton.addEventListener('click', function() {
        if (chatInput.value.trim() !== '') {
            addMessage(chatInput.value, false);
            chatInput.value = '';
            setTimeout(() => {
                addMessage(getAIResponse());
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            addMessage(chatInput.value, false);
            chatInput.value = '';
            setTimeout(() => {
                addMessage(getAIResponse());
            }, 1000);
        }
    });

    // Quick question buttons
    document.querySelectorAll('.quick-btn').forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            chatInput.value = question;
            
            // Simulate sending the question
            addMessage(question, false);
            chatInput.value = '';
            setTimeout(() => {
                addMessage(getAIResponse());
            }, 1000);
        });
    });

    // Start demo button
    startDemoBtn.addEventListener('click', function() {
        addMessage("Hello! I'm JanSevak AI. How can I assist you today?");
    });

    let recognition;
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = getLanguageCode(currentLanguage);
       
        micButton.addEventListener('click', function() {
            recognition.start();
            micButton.style.color = '#4e54c8';
        });
       
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            micButton.style.color = '';
        };
       
        recognition.onerror = function(event) {
            micButton.style.color = '';
            console.error('Speech recognition error', event.error);
        };
       
        recognition.onend = function() {
            micButton.style.color = '';
        };
        
        // Update recognition language when language changes
        languageSelector.addEventListener('change', function() {
            recognition.lang = getLanguageCode(this.value);
        });
    } else {
        micButton.style.display = 'none';
    }
});