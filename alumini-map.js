// Global Alumni Achievements & Map Interaction
document.addEventListener('DOMContentLoaded', () => {
  const mapHubs = document.querySelectorAll('.map-hub');
  const alumniName = document.getElementById('alumni-name');
  const alumniRole = document.getElementById('alumni-role');
  const alumniQuote = document.getElementById('alumni-quote');
  const alumniBatch = document.getElementById('alumni-batch');
  const alumniLocation = document.getElementById('alumni-location');
  const spotlightCard = document.getElementById('spotlightCard');
  
  // Alumni data repository
  const alumniData = {
    na: {
      name: "Arun Prasath",
      role: "Staff Software Engineer at Google",
      quote: "\"The solid foundation in computer science and the open development culture of the clubs at PSG CAS gave me the confidence to take on large scale challenges in tech.\"",
      batch: "2015 - B.Sc Computer Science",
      location: "Mountain View, California"
    },
    eu: {
      name: "Priya Sundar",
      role: "Investment Banker at Barclays",
      quote: "\"PSG was more than just books; the business hackathons and finance societies prepared me for the fast-paced global capital markets in London.\"",
      batch: "2018 - B.Com Professional Accounting",
      location: "London, United Kingdom"
    },
    in: {
      name: "Sanjay Krishnan",
      role: "Co-Founder & CEO, TechVantage India",
      quote: "\"The startup incubator cell at PSG supported my ideas when they were just outlines. They connected me to seed funding and our first enterprise clients.\"",
      batch: "2012 - B.B.A. Business Administration",
      location: "Coimbatore & Bengaluru, India"
    },
    sg: {
      name: "Dr. Michelle Chen",
      role: "Principal Virologist, A*STAR Singapore",
      quote: "\"The biology research labs at PSG CAS were top-tier. Doing hands-on biotechnology experiments early in college shaped my desire for academic research.\"",
      batch: "2010 - B.Sc Biotechnology",
      location: "Singapore Science Park"
    },
    au: {
      name: "Dr. David Warner",
      role: "Lead Climate Analyst, CSIRO Australia",
      quote: "\"PSG's cross-disciplinary physics and environment curriculum gave me a unique outlook on environmental systems and mathematical models.\"",
      batch: "2007 - B.Sc Physics",
      location: "Sydney, Australia"
    }
  };
  
  let currentHubKey = 'na';
  let rotationInterval;
  
  function updateSpotlight(hubKey) {
    const data = alumniData[hubKey];
    if (!data) return;
    
    // Add flip/fade animation class to card
    spotlightCard.style.opacity = '0';
    spotlightCard.style.transform = 'translateY(10px) scale(0.98)';
    
    setTimeout(() => {
      // Update text details
      alumniName.textContent = data.name;
      alumniRole.textContent = data.role;
      alumniQuote.textContent = data.quote;
      alumniBatch.textContent = data.batch;
      alumniLocation.textContent = data.location;
      
      // Fade back in
      spotlightCard.style.opacity = '1';
      spotlightCard.style.transform = 'translateY(0) scale(1)';
    }, 250);
  }
  
  // Interactive Pin Clicks
  mapHubs.forEach(hub => {
    hub.addEventListener('click', () => {
      clearInterval(rotationInterval); // Stop auto-rotation when user clicks
      
      if (hub.classList.contains('active')) return;
      
      mapHubs.forEach(h => h.classList.remove('active'));
      hub.classList.add('active');
      
      const hubKey = hub.getAttribute('data-hub');
      currentHubKey = hubKey;
      updateSpotlight(hubKey);
      
      // Resume slow rotation after 15 seconds of inactivity
      startAutoRotation(15000);
    });
  });
  
  // Auto-rotating hubs
  const hubKeys = Object.keys(alumniData);
  
  function rotateHubs() {
    let currentIndex = hubKeys.indexOf(currentHubKey);
    let nextIndex = (currentIndex + 1) % hubKeys.length;
    let nextKey = hubKeys[nextIndex];
    
    // Update hub classes
    mapHubs.forEach(hub => {
      if (hub.getAttribute('data-hub') === nextKey) {
        hub.classList.add('active');
      } else {
        hub.classList.remove('active');
      }
    });
    
    currentHubKey = nextKey;
    updateSpotlight(nextKey);
  }
  
  function startAutoRotation(delayMs = 6000) {
    rotationInterval = setInterval(rotateHubs, delayMs);
  }
  
  // Launch rotation
  startAutoRotation();
});
