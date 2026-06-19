// Future Self Career Visualizer Logic
document.addEventListener('DOMContentLoaded', () => {
  const pathButtons = document.querySelectorAll('.path-btn');
  const pathTitle = document.getElementById('path-title');
  const pathDesc = document.getElementById('path-desc');
  const timelineSteps = document.querySelectorAll('.timeline-step');
  
  // Data Store for different careers pathways
  const pathData = {
    tech: {
      title: "AI & Computational Technologies",
      desc: "How PSGCAS shapes your journey into cutting-edge tech innovation.",
      steps: [
        {
          title: "Year 1: Foundation & Discovery",
          desc: "Dive into core programming languages and computing fundamentals. Join the Coding Club, participate in Hackathons, and complete foundational workshops led by industry tech leaders."
        },
        {
          title: "Year 2: Skill Acceleration",
          desc: "Specialize in Machine Learning, Cloud Architectures, and Full-Stack Development. Build cross-disciplinary projects at the PSGCAS Innovation Hub."
        },
        {
          title: "Year 3: Real-World Immersive",
          desc: "Engage in paid internships at leading tech enterprises. Prepare for global opportunities via placement bootcamps and resume polishing workshops."
        },
        {
          title: "Future Output: Career Launch",
          desc: "Secure top-tier placements (e.g. Amazon, Google, Zoho) or progress directly to premier master's programs worldwide, backed by your strong academic portfolio."
        }
      ]
    },
    business: {
      title: "Global Finance & Business Analytics",
      desc: "Your launchpad to leadership in corporate commerce, investment banking, and startups.",
      steps: [
        {
          title: "Year 1: Markets & Accounting",
          desc: "Acquire fundamental knowledge in financial accounting, statistics, and business economics. Join the Commerce Forum and Mock Trading simulation desks."
        },
        {
          title: "Year 2: Advanced Analyst Specialization",
          desc: "Master fintech tools, business analysis, and corporate law. Work on corporate case-study projects and gain Bloomberg terminal basics."
        },
        {
          title: "Year 3: Industrial Practice & Placement",
          desc: "Complete a semester-long industry apprenticeship. Participate in national case-study competitions and recruitment drives by Big 4 auditing firms."
        },
        {
          title: "Future Output: Corporate Leadership",
          desc: "Graduate directly into analyst roles at Goldman Sachs, Deloitte, or McKinsey, or leverage our incubator to fund your commercial startup."
        }
      ]
    },
    creative: {
      title: "Creative Media & Communication Arts",
      desc: "Become a narrative driver across digital platforms, journalism, visual arts, and design.",
      steps: [
        {
          title: "Year 1: Aesthetics & Communication Core",
          desc: "Understand narrative theory, visual framing, and design elements. Join the Photography Club, Thinkers Forum, and writing workshops."
        },
        {
          title: "Year 2: Production & Portfolio Design",
          desc: "Hands-on work in audio-visual editing, journalism, and scriptwriting. Produce student films, magazines, and manage live college broadcasts."
        },
        {
          title: "Year 3: Agency Internship & Exhibitions",
          desc: "Work as an intern at media agencies, publishing houses, or digital studios. Showcase your portfolio at the annual PSGCAS Media Exhibition."
        },
        {
          title: "Future Output: Narrative Shaper",
          desc: "Launch a career as an Art Director, Creative Journalist, or UI/UX designer at global media networks, or join top design schools internationally."
        }
      ]
    },
    sciences: {
      title: "Biological & Applied Science Research",
      desc: "Translate scientific curiosity into breakthroughs in biotechnology, physics, or research fields.",
      steps: [
        {
          title: "Year 1: Laboratory Techniques & Basics",
          desc: "Master general chemistry, genetics, and lab safety protocols. Engage in research journals club and join the Science Society."
        },
        {
          title: "Year 2: Independent Projects",
          desc: "Carry out supervised research projects in gene editing, nanotechnology, or material science. Access our specialized laboratory facilities."
        },
        {
          title: "Year 3: Global Collaborations & Thesis",
          desc: "Submit credit-exchange papers with corporate biology labs. Present research papers at national seminars and apply for research fellowships."
        },
        {
          title: "Future Output: Research Innovator",
          desc: "Join premier research institutions (IISc, IITs) or enroll directly in PhD pathways at foreign alliance universities."
        }
      ]
    }
  };
  // Switch paths with fade and stagger effects
  function switchPath(pathKey) {
    const data = pathData[pathKey];
    if (!data) return;
    
    // First, fade out the current visual steps
    timelineSteps.forEach(step => {
      step.classList.remove('active');
    });
    
    setTimeout(() => {
      // Update text content
      pathTitle.textContent = data.title;
      pathDesc.textContent = data.desc;
      
      data.steps.forEach((stepItem, index) => {
        const stepElement = document.querySelector(`.timeline-step[data-step="${index + 1}"]`);
        if (stepElement) {
          const stepHeader = stepElement.querySelector('h4');
          const stepText = stepElement.getElementById(`step-${index + 1}-desc`);
          
          stepHeader.textContent = stepItem.title;
          stepText.textContent = stepItem.desc;
        }
      });
      
      // Stagger animate back in
      timelineSteps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add('active');
        }, index * 150); // 150ms delay stagger
      });
      
    }, 300); // Wait for fade out to complete
  }
  // Bind Button Event Listeners
  pathButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      
      // Toggle Active States
      pathButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const selectedPath = btn.getAttribute('data-path');
      switchPath(selectedPath);
    });
  });
  // Initial trigger for tech pathway
  timelineSteps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add('active');
    }, index * 150);
  });
});