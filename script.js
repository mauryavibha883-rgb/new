document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
  }

  // Scroll reveal animation
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));

  // Animated statistics
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 45));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 28);
      obs.unobserve(el);
    });
  }, { threshold: 0.7 });
  counters.forEach(counter => counterObserver.observe(counter));

  // FAQ accordion
  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      document.querySelectorAll(".faq-item").forEach(other => {
        if (other !== item) other.classList.remove("open");
      });
      item.classList.toggle("open");
    });
  });

  // Demo contact form interaction
  const form = document.querySelector("#contact-form");
  const status = document.querySelector(".form-status");
  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      status.textContent = `Thanks${name ? ", " + name : ""}! Your enquiry is ready to be connected to your email/WhatsApp.`;
      form.reset();
    });
  }
});
