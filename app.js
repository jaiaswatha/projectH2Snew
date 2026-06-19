// Core Application Logic - Animations, Counters, Tabs, and Carousel
document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Mobile Navigation Menu Toggle
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
    
    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
  /* ==========================================================================
     2. Scroll Reveal Animations & Navigation Highlight
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-up');
  const sections = document.querySelectorAll('section');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after revealing to prevent repeated triggers
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  // Highlight active link in header based on scroll position
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150; // offset for sticky header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  /* ==========================================================================
     3. Statistics Counter Animation
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();
    
    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      
      let currentValue = Math.floor(easedProgress * target);
      
      // Formatting values
      if (target >= 1000) {
        el.textContent = currentValue.toLocaleString() + '+';
      } else if (target === 100) {
        el.textContent = currentValue + '%';
      } else if (target === 79) {
        el.textContent = currentValue + '+';
      } else {
        el.textContent = currentValue;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        // Guarantee exact target matches at completion
        if (target >= 1000) {
          el.textContent = target.toLocaleString() + '+';
        } else if (target === 100) {
          el.textContent = target + '%';
        } else if (target === 79) {
          el.textContent = target + '+';
        } else {
          el.textContent = target;
        }
      }
    }
    
    requestAnimationFrame(updateCount);
  }
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  statNumbers.forEach(num => {
    statsObserver.observe(num);
  });
  /* ==========================================================================
     4. Placement / Infographics Tabs Manager
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  function triggerChartAnimations(tabId) {
    if (tabId === 'placements') {
      const fills = document.querySelectorAll('#tab-placements .bar-fill');
      fills.forEach(fill => {
        // Read parent style attributes or presets to set width
        const width = fill.parentElement.parentElement.parentElement.style.width || fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
          // Restore from style tags defined in index.html
          if (fill.parentElement.parentElement.parentElement.querySelector('.bar-label').textContent.includes('Highest')) {
            fill.style.width = '100%';
          } else if (fill.parentElement.parentElement.parentElement.querySelector('.bar-label').textContent.includes('Top 15%')) {
            fill.style.width = '65%';
          } else {
            fill.style.width = '32%';
          }
        }, 100);
      });
    } else if (tabId === 'internships') {
      const circleFill = document.querySelector('#tab-internships .circle-fill');
      if (circleFill) {
        circleFill.style.strokeDashoffset = '251.2';
        setTimeout(() => {
          circleFill.style.strokeDashoffset = '62.8'; // Animates to 75%
        }, 100);
      }
    }
  }
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      
      if (targetPane) {
        targetPane.classList.add('active');
        triggerChartAnimations(targetTab);
      }
    });
  });
  // Initial trigger for load state
  triggerChartAnimations('placements');
  /* ==========================================================================
     5. Campus Life & Clubs Filters
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const campusCards = document.querySelectorAll('.campus-card');
  const campusGrid = document.getElementById('campusGrid');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      campusCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Custom transitions for grid filtering
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
  /* ==========================================================================
     6. Testimonials Tabs & Carousel
     ========================================================================== */
  const testBtns = document.querySelectorAll('.test-tab-btn');
  const testPanes = document.querySelectorAll('.testimonial-pane');
  let activeTestIndex = 0;
  let testRotationInterval;
  function switchTestimonial(index) {
    testBtns.forEach(b => b.classList.remove('active'));
    testPanes.forEach(p => p.classList.remove('active'));
    
    testBtns[index].classList.add('active');
    testPanes[index].classList.add('active');
    activeTestIndex = index;
  }
  testBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      clearInterval(testRotationInterval); // Stop auto rotate on manual click
      switchTestimonial(index);
      startTestRotation(); // restart with standard delay
    });
  });
  function rotateTestimonials() {
    let nextIndex = (activeTestIndex + 1) % testBtns.length;
    switchTestimonial(nextIndex);
  }
  function startTestRotation() {
    testRotationInterval = setInterval(rotateTestimonials, 8000); // Rotate every 8s
  }
  startTestRotation();
  /* ==========================================================================
     7. Form Submission Handler
     ========================================================================== */
  const ctaForm = document.getElementById('ctaForm');
  const formSuccess = document.getElementById('formSuccess');
  if (ctaForm && formSuccess) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Animate hide form
      ctaForm.style.opacity = '0';
      ctaForm.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        ctaForm.classList.add('hide');
        formSuccess.classList.add('show');
        
        // Animate show success message
        setTimeout(() => {
          formSuccess.style.opacity = '1';
          formSuccess.style.transform = 'translateY(0)';
        }, 50);
      }, 300);
    });
  }
});