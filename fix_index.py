# Write the complete index.html using Python
file_path = "C:/Users/Aditya/rangphujan-website/bca-management-skills/index.html"

# Read current file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the marker and replace from there
marker = 'career-card card card-strong reveal reveal-delay-3'
if marker in content:
    idx = content.rindex(marker)
    # Find the start of this article tag
    article_start = content.rfind('<article', 0, idx)
    if article_start != -1:
        # Replace from article_start to end with complete content
        missing = '''
        <article class="career-card card card-strong reveal reveal-delay-3" role="listitem"><div class="career-stats" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></svg><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></svg><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></svg><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></svg><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></svg></div><p class="career-text">"The strategic planning and organizational behavior modules gave me the framework to build my own startup. The capstone project became our MVP. Now we're a team of 8, backed by Sequoia."</p><div class="career-author"><div class="career-avatar" aria-hidden="true">AP</div><div class="career-info"><h4>Arjun Patel</h4><p>Founder & CEO, TechStart • Class of 2021</p></div></div></article>
      </div>
    </div>
  </section>

  <section id="resources" class="section resources" aria-labelledby="resources-title">
    <div class="container">
      <header class="section-header"><span class="section-badge badge badge-primary">Resources & Certifications</span><h2 id="resources-title" class="reveal reveal-delay-1">Certifications & Learning Resources</h2><p class="reveal reveal-delay-2">Industry-recognized certifications and curated resources to continue your management education journey.</p></header>
      <div class="resources-grid" role="list">
        <article class="resource-card reveal reveal-delay-1" role="listitem"><div class="resource-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><h3>Business Communication</h3><p>Master executive writing, stakeholder presentations, and technical storytelling for diverse audiences.</p><div class="resource-tags"><span class="resource-tag">PSM I</span><span class="resource-tag">CAPM</span><span class="resource-tag">Business Writing Cert</span></div></article>
        <article class="resource-card reveal reveal-delay-2" role="listitem"><div class="resource-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div><h3>Project Management</h3><p>Agile, Scrum, Kanban, Waterfall — end-to-end delivery mastery with industry tool certifications.</p><div class="resource-tags"><span class="resource-tag">PSM I</span><span class="resource-tag">CSM</span><span class="resource-tag">PMP Prep</span></div></article>
        <article class="resource-card reveal reveal-delay-3" role="listitem"><div class="resource-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><h3>Leadership & Teams</h3><p>Emotional intelligence, conflict resolution, delegation, and inclusive leadership development.</p><div class="resource-tags"><span class="resource-tag">DISC Assessment</span><span class="resource-tag">Leadership 360</span><span class="resource-tag">EQ-i 2.0</span></div></article>
        <article class="resource-card reveal reveal-delay-4" role="listitem"><div class="resource-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div><h3>Strategic Planning</h3><p>SWOT analysis, OKRs, KPIs, roadmapping, and data-driven decision making frameworks.</p><div class="resource-tags"><span class="resource-tag">OKR Certification</span><span class="resource-tag">Strategy Tools</span><span class="resource-tag">KPI Mastery</span></div></article>
        <article class="resource-card reveal reveal-delay-5" role="listitem"><div class="resource-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><h3>Organizational Behavior</h3><p>Motivation theories, culture design, change management, and decision-making psychology.</p><div class="resource-tags"><span class="resource-tag">Change Mgmt Cert</span><span class="resource-tag">Culture Design</span><span class="resource-tag">Org Psych</span></div></article>
        <article class="resource-card reveal reveal-delay-6" role="listitem"><div class="resource-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div><h3>Integrated Capstone</h3><p>Real-world consulting projects with industry partners. Portfolio building and career preparation.</p><div class="resource-tags"><span class="resource-tag">Portfolio Review</span><span class="resource-tag">Interview Prep</span><span class="resource-tag">Network Access</span></div></article>
      </div>
    </div>
  </section>

  <section id="contact" class="section cta" aria-labelledby="cta-title">
    <div class="cta-inner">
      <h2 id="cta-title" class="reveal reveal-delay-1">Ready to Lead Technology?</h2>
      <p class="reveal reveal-delay-2">Join the next cohort of BCA Management Skills graduates. Applications open quarterly — limited seats available.</p>
      <div class="cta-actions reveal reveal-delay-3"><a href="mailto:admissions@bca-management.example.com" class="btn btn-primary btn-large">Apply Now</a><a href="#pillars" class="btn btn-secondary btn-large">Explore Curriculum</a></div>
    </div>
  </section>

  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="#" class="logo" aria-label="BCA Management Skills Home"><span class="logo-mark" aria-hidden="true">BCA</span><span>BCA Management Skills</span></a>
          <p>The definitive curriculum bridging computer applications and technology leadership. Five pillars, industry-aligned, capstone consulting.</p>
        </div>
        <nav class="footer-column" aria-label="Curriculum">
          <h4>Curriculum</h4>
          <ul class="footer-links">
            <li><a href="#pillars">Five Pillars</a></li>
            <li><a href="#curriculum">Semester Breakdown</a></li>
            <li><a href="#resources">Certifications</a></li>
            <li><a href="#career">Career Outcomes</a></li>
          </ul>
        </nav>
        <nav class="footer-column" aria-label="Resources">
          <h4>Resources</h4>
          <ul class="footer-links">
            <li><a href="#">Student Portal</a></li>
            <li><a href="#">Alumni Network</a></li>
            <li><a href="#">Industry Partners</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </nav>
        <nav class="footer-column" aria-label="Connect">
          <h4>Connect</h4>
          <ul class="footer-links">
            <li><a href="mailto:admissions@bca-management.example.com">Admissions</a></li>
            <li><a href="mailto:partners@bca-management.example.com">Partnerships</a></li>
            <li><a href="mailto:careers@bca-management.example.com">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </nav>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 BCA Management Skills. All rights reserved.</p>
        <div class="footer-social">
          <a href="https://linkedin.com" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="https://twitter.com" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
          <a href="https://github.com" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path></svg></a>
          <a href="mailto:admissions@bca-management.example.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
        </div>
      </div>
    </div>
  </footer>

  <script type="module" src="hero-3d.js"></script>
  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle?.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  </script>
</body>
</html>
'''
        new_content = content[:article_start] + missing
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully appended missing sections")
    else:
        print("Could not find article start")
else:
    print("Marker not found")