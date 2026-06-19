// Holographic AI Admission Guide Chatbot Logic
document.addEventListener('DOMContentLoaded', () => {
  const chatbotWidget = document.getElementById('chatbotWidget');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSuggestions = document.getElementById('chatbotSuggestions');
  
  // Suggestion chips configuration
  const defaultSuggestions = [
    "Admission Process",
    "Courses Offered",
    "Placement Record",
    "Hostel Facilities"
  ];
  
  // Chatbot knowledge base
  const botAnswers = {
    admissions: {
      text: "The PSG CAS admission process is entirely online. Candidates can apply via the official admissions portal (psgcas.ac.in). Admission is merit-based, determined by Class 12 board marks. Once registration closes, category-wise rank lists are published, followed by counselling rounds. Would you like to check out available courses next?",
      suggestions: ["Courses Offered", "Fee Structure", "Apply Now Help"]
    },
    courses: {
      text: "PSG CAS offers 40+ Undergraduate and 25+ Postgraduate programs across Commerce, Science, Humanities, and Media. Popular programs include B.Sc Computer Science, B.Sc Cognitive Systems (developed with TCS), B.Com Professional Accounting, B.A. English Literature, and B.Sc Biotechnology. What stream interests you the most?",
      suggestions: ["Computer Science Streams", "Commerce Streams", "Humanities Streams"]
    },
    placements: {
      text: "PSG CAS has a stellar placement record. Over 98% of eligible students secure placement offers. Our highest package reached ₹22 LPA this year, with an overall average CTC of ₹7.1 LPA. Over 450+ companies recruit annually, including Deloitte, Goldman Sachs, Amazon, and Zoho.",
      suggestions: ["Internship Support", "Placement Process", "Top Recruiters"]
    },
    hostel: {
      text: "Yes, we provide separate hostel facilities for boys and girls. The hostels feature spacious rooms, Wi-Fi connectivity, common recreational rooms, and a modern kitchen providing organic, hygienic vegetarian and non-vegetarian meals. Campus security is active 24/7.",
      suggestions: ["Hostel Fees", "Campus Safety", "Clubs & Activities"]
    },
    fees: {
      text: "Fee structures vary by course. Aided (Government) streams have subsidized nominal fees (approx ₹5,000 - ₹15,000 per year). Self-financing courses range from ₹40,000 to ₹75,000 per semester depending on the specialization (like B.Sc Cognitive Systems or B.Com PA). Let me know if you have a specific course in mind!",
      suggestions: ["Admission Process", "Aided vs Self-Financed"]
    },
    aided_vs_self: {
      text: "Aided courses are subsidized by the government, run in the morning shift (8:30 AM - 1:10 PM), and admissions are highly competitive. Self-Financing courses run in the afternoon shift (1:30 PM - 6:10 PM) with standard tuition fees. Both streams share the same campus, curriculum excellence, and placement opportunities.",
      suggestions: ["Courses Offered", "Admission Process"]
    },
    fallback: {
      text: "I want to make sure you get the most accurate answer! For specific queries about mark calculations, reservation quotas, or document uploads, please submit your name and email in the admission form below. Our counseling desk will contact you. Alternatively, you can ask about: Admissions, Courses, Placements, or Hostels.",
      suggestions: ["Admission Process", "Courses Offered", "Placement Record"]
    }
  };
  // Toggle chatbot state
  chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('open');
    if (chatbotWidget.classList.contains('open')) {
      chatbotInput.focus();
      // Render initial chips if messages are fresh
      if (chatbotMessages.children.length === 1) {
        renderSuggestions(defaultSuggestions);
      }
    }
  });
  chatbotClose.addEventListener('click', () => {
    chatbotWidget.classList.remove('open');
  });
  // Render Suggestion Chips
  function renderSuggestions(suggestionsList) {
    chatbotSuggestions.innerHTML = '';
    suggestionsList.forEach(text => {
      const chip = document.createElement('button');
      chip.type = "button";
      chip.className = 'suggest-chip';
      chip.textContent = text;
      chip.addEventListener('click', () => handleUserInput(text));
      chatbotSuggestions.appendChild(chip);
    });
  }
  // Add Message to window
  function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // Support bold markers
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    messageDiv.innerHTML = `<p>${formattedText}</p>`;
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  // Simulate Bot Thinking
  function botResponse(userQuery) {
    // Add temporary loading indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message typing-indicator';
    typingIndicator.innerHTML = '<p>Analyzing query<span class="dot-loading">...</span></p>';
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    const queryLower = userQuery.toLowerCase();
    
    setTimeout(() => {
      // Remove typing indicator
      typingIndicator.remove();
      
      let answerKey = 'fallback';
      
      // Intent Classification using keyword matching
      if (queryLower.includes('admis') || queryLower.includes('apply') || queryLower.includes('how to join') || queryLower.includes('process')) {
        answerKey = 'admissions';
      } else if (queryLower.includes('course') || queryLower.includes('degree') || queryLower.includes('bsc') || queryLower.includes('bcom') || queryLower.includes('ba ') || queryLower.includes('stream') || queryLower.includes('program')) {
        answerKey = 'courses';
      } else if (queryLower.includes('placement') || queryLower.includes('job') || queryLower.includes('salary') || queryLower.includes('lpa') || queryLower.includes('recruit') || queryLower.includes('company')) {
        answerKey = 'placements';
      } else if (queryLower.includes('hostel') || queryLower.includes('stay') || queryLower.includes('room') || queryLower.includes('mess')) {
        answerKey = 'hostel';
      } else if (queryLower.includes('fee') || queryLower.includes('cost') || queryLower.includes('price')) {
        answerKey = 'fees';
      } else if (queryLower.includes('aided') || queryLower.includes('self-finance') || queryLower.includes('difference')) {
        answerKey = 'aided_vs_self';
      }
      
      const response = botAnswers[answerKey];
      appendMessage('bot', response.text);
      renderSuggestions(response.suggestions);
      
    }, 800); // 800ms natural response latency
  }
  // Handle Input Form Submissions
  function handleUserInput(text) {
    const cleanText = text.trim();
    if (!cleanText) return;
    
    appendMessage('user', cleanText);
    botResponse(cleanText);
  }
  chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatbotInput.value;
    handleUserInput(query);
    chatbotInput.value = '';
  });
});