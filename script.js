const navToggle = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (navToggle && menu) {
  navToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => menu?.classList.remove("open"));
});

const slides = [...document.querySelectorAll(".slide")];
let slideIndex = 0;
if (slides.length > 1) {
  setInterval(() => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }, 5200);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("show", window.scrollY > 520);
  document.documentElement.style.setProperty("--scroll", String(window.scrollY * 0.06));
});

backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.querySelectorAll("[data-lightbox]").forEach((image) => {
  image.addEventListener("click", () => {
    const lightbox = document.querySelector(".lightbox");
    const target = lightbox?.querySelector("img");
    if (!lightbox || !target) return;
    target.src = image.src;
    target.alt = image.alt;
    lightbox.classList.add("open");
  });
});

document.querySelector(".lightbox button")?.addEventListener("click", () => {
  document.querySelector(".lightbox")?.classList.remove("open");
});

document.querySelector(".lightbox")?.addEventListener("click", (event) => {
  if (event.target.classList.contains("lightbox")) {
    event.currentTarget.classList.remove("open");
  }
});

function validateForm(form) {
  const message = form.querySelector(".form-message");
  const required = [...form.querySelectorAll("[required]")];
  const invalid = required.find((field) => !field.value.trim());
  if (invalid) {
    invalid.focus();
    if (message) message.textContent = "Please complete the highlighted required field.";
    return false;
  }
  const email = form.querySelector('input[type="email"]');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.focus();
    if (message) message.textContent = "Please enter a valid email address.";
    return false;
  }
  if (message) message.textContent = "Thank you. Your request has been prepared for The Hillcrest BnB team.";
  form.reset();
  return true;
}

document.querySelectorAll("form[data-validate]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateForm(form);
  });
});
