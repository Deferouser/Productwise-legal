document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Document Tabs & Switchers
  const tabBtnPrivacy = document.getElementById('tabBtnPrivacy');
  const tabBtnTerms = document.getElementById('tabBtnTerms');
  const docPrivacy = document.getElementById('docPrivacy');
  const docTerms = document.getElementById('docTerms');
  
  // Scroll and Progress Elements - Privacy
  const privacyContent = document.getElementById('privacyContent');
  const privacyProgressFill = document.getElementById('privacyProgressFill');
  const privacyReadIndicator = document.getElementById('privacyReadIndicator');
  
  // Scroll and Progress Elements - Terms
  const termsContent = document.getElementById('termsContent');
  const termsProgressFill = document.getElementById('termsProgressFill');
  const termsReadIndicator = document.getElementById('termsReadIndicator');
  
  // Initialize Theme
  initTheme();
  
  // --- 1. Theme Management ---
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeIcon.className = 'bi bi-moon-stars';
    } else {
      document.body.classList.remove('light-theme');
      themeIcon.className = 'bi bi-sun';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeIcon.className = isLight ? 'bi bi-moon-stars' : 'bi bi-sun';
  });

  // --- 2. Tab Navigation ---
  function switchTab(target) {
    if (target === 'privacy') {
      tabBtnPrivacy.classList.add('active');
      tabBtnTerms.classList.remove('active');
      docPrivacy.classList.remove('d-none');
      docTerms.classList.add('d-none');
    } else {
      tabBtnTerms.classList.add('active');
      tabBtnPrivacy.classList.remove('active');
      docTerms.classList.remove('d-none');
      docPrivacy.classList.add('d-none');
    }
  }

  tabBtnPrivacy.addEventListener('click', () => switchTab('privacy'));
  tabBtnTerms.addEventListener('click', () => switchTab('terms'));

  // --- 3. Scroll & Read Progress Tracking Helper ---
  function trackScroll(contentElement, fillElement, indicatorElement) {
    if (!contentElement) return;
    
    // Initial call to set to 0%
    fillElement.style.width = '0%';
    
    contentElement.addEventListener('scroll', () => {
      const scrollTop = contentElement.scrollTop;
      const scrollHeight = contentElement.scrollHeight;
      const clientHeight = contentElement.clientHeight;
      
      const totalScrollable = scrollHeight - clientHeight;
      const scrollPercentage = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      
      fillElement.style.width = `${scrollPercentage}%`;
      
      // Update read indicator status
      if (scrollPercentage >= 90) {
        indicatorElement.innerHTML = '<span class="badge bg-success"><i class="bi bi-check-circle-fill me-1"></i> Read Completed</span>';
      } else {
        indicatorElement.innerHTML = '<i class="bi bi-book me-1"></i> Scroll to read';
      }
    });
  }

  trackScroll(privacyContent, privacyProgressFill, privacyReadIndicator);
  trackScroll(termsContent, termsProgressFill, termsReadIndicator);
});
