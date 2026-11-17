/**
 * VirusAI Landing Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Showcase Tab Switching
  const showcaseTabs = document.querySelectorAll('.tab-btn');
  const showcaseImg = document.getElementById('showcase-image');
  const captionTitle = document.getElementById('caption-title');
  const captionDesc = document.getElementById('caption-desc');

  const showcaseData = {
    'ide': {
      src: 'assets/screenshots/ide-split-editor.png',
      title: 'Unified Tri-Pane IDE & Markdown Split Editor',
      desc: 'Monaco code editor side-by-side with live markdown rendering, integrated file tree, and detachable AI copilot HUD.'
    },
    'proxy': {
      src: 'assets/screenshots/proxy-workbench.png',
      title: 'Proxy Workbench & Fail-Closed Scope Gate',
      desc: 'Built-in TLS MitM interception proxy on port 8791. Inspects, edits, replays requests, and strictly drops out-of-scope traffic.'
    },
    'terminal': {
      src: 'assets/screenshots/terminal-workspace.png',
      title: 'Multi-Shell PTY Terminal Manager',
      desc: 'Native pseudo-console terminal running PowerShell, Command Prompt, and WSL side-by-side in independent process tabs.'
    },
    'browser': {
      src: 'assets/screenshots/security-browser.png',
      title: 'Security Instrumented Webview Browser',
      desc: 'Embedded browser auto-routed through the local recording proxy, enabling instant DOM inspection and traffic capture.'
    },
    'agents': {
      src: 'assets/screenshots/agents.png',
      title: 'Autonomous Omni-Agent Collective',
      desc: 'Built-in planner, goal decomposer, pentest worker, report writer, and re-test agents operating concurrently.'
    },
    'findings': {
      src: 'assets/screenshots/findings.png',
      title: 'Evidence-Based Findings Matrix',
      desc: 'Vulnerabilities recorded with strict control-vs-attack diffs, reproducible HTTP replays, and severity scoring.'
    },
    'skills': {
      src: 'assets/screenshots/skills.png',
      title: 'Modular Security Skill Library',
      desc: 'agentskills.io compliant skill library covering API recon, code auditing, EDR bypass, patch diffing, and reverse engineering.'
    },
    'dashboard': {
      src: 'assets/screenshots/dashboard.png',
      title: 'System-Wide Status & Telemetry-Free Metrics',
      desc: 'Real-time overview of active tasks, asset nodes, token usage, and live proxy traffic exchanges.'
    }
  };

  showcaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      if (!showcaseData[target]) return;

      // Update active tab button
      showcaseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Fade out image
      showcaseImg.classList.remove('visible');

      setTimeout(() => {
        showcaseImg.src = showcaseData[target].src;
        captionTitle.textContent = showcaseData[target].title;
        captionDesc.textContent = showcaseData[target].desc;
        showcaseImg.classList.add('visible');
      }, 150);
    });
  });

  if (showcaseImg) {
    showcaseImg.classList.add('visible');
  }

  // 3. OS Auto-Detection & Download Tabs
  const osButtons = document.querySelectorAll('.os-tab-btn');
  const osPanels = document.querySelectorAll('.download-panel');

  function detectOS() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator?.userAgentData?.platform?.toLowerCase() || window.navigator.platform.toLowerCase();

    if (platform.includes('win') || userAgent.includes('windows')) {
      return 'windows';
    }
    if (platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os')) {
      return 'macos';
    }
    if (platform.includes('linux') || userAgent.includes('linux') || userAgent.includes('x11')) {
      return 'linux';
    }
    return 'windows';
  }

  function setActiveOS(osName) {
    osButtons.forEach(btn => {
      if (btn.getAttribute('data-os') === osName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    osPanels.forEach(panel => {
      if (panel.id === `os-${osName}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  }

  const detected = detectOS();
  const detectedBtn = document.querySelector(`.os-tab-btn[data-os="${detected}"]`);
  if (detectedBtn) {
    const badge = document.createElement('span');
    badge.className = 'os-detected-badge';
    badge.textContent = 'Detected';
    detectedBtn.appendChild(badge);
    setActiveOS(detected);
  }

  osButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const os = btn.getAttribute('data-os');
      setActiveOS(os);
    });
  });

  // 4. Copy to Clipboard
  window.copySnippet = function(elementId, btnElement) {
    const codeEl = document.getElementById(elementId);
    if (!codeEl) return;

    const textToCopy = codeEl.innerText.trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = btnElement.innerHTML;
      btnElement.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27C93F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg> Copied!
      `;
      setTimeout(() => {
        btnElement.innerHTML = originalText;
      }, 2000);
    });
  };
});
