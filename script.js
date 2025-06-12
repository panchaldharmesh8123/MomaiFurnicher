// Furniture Craftsman Website JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Navbar scroll effect
  const navbar = document.getElementById("mainNav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Counter animation for stats
  const counters = document.querySelectorAll(".stat-number");
  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-count"));
      const count = Number.parseInt(counter.innerText);
      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 20);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Trigger counter animation when stats section is visible
  const statsSection = document.querySelector(".hero-section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });

  if (statsSection) {
    observer.observe(statsSection);
  }

  // Skills progress bar animation
  const skillBars = document.querySelectorAll(".progress-bar");
  const animateSkills = () => {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width + "%";
    });
  };

  // Trigger skills animation when about section is visible
  const aboutSection = document.getElementById("about");
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  });

  if (aboutSection) {
    skillsObserver.observe(aboutSection);
  }

  // Portfolio filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category").toLowerCase();
        if (filterValue === "all" || itemCategory === filterValue) {
          //   item.classList.remove("hide")
          item.style.display = "block";
        } else {
          //   item.classList.add("show")
          item.style.display = "none";
        }
      });
    });
  });

  // Portfolio modal functionality
  const portfolioModal = document.getElementById("portfolioModal");
  const modalTitle = document.getElementById("portfolioModalTitle");
  const modalImage = document.getElementById("portfolioModalImage");
  const modalDescription = document.getElementById("portfolioModalDescription");

  document.querySelectorAll('[data-bs-toggle="modal"]').forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const title = this.getAttribute("data-title");
      const image = this.getAttribute("data-image");
      const description = this.getAttribute("data-description");

      modalTitle.textContent = title;
      modalImage.src = image;
      modalImage.alt = title;
      modalDescription.textContent = description;
    });
  });

  // Contact form handling
  // const contactForm = document.getElementById("contactForm");
  // const successMessage = document.getElementById("successMessage");

  // contactForm.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //   Email.send({
  //     Host : "smtp.your-email.com",
  //     // Username : "hasmukhpanchal221277@gmail.com",
  //     Username : "dharmeshpanchal3236@gmail.com",
  //     Password : "Panchal@8123",
  //     To: 'hasmukhpanchal221277@gmail.com',
  //     From: "hasmukhpanchal221277@gmail.com",
  //     Subject: "Contact Form Submission",
  //     Body: "Name: " + contactForm.firstName.value + " " + contactForm.lastName.value + "\nEmail: " + contactForm.email.value + "\nMessage: " + contactForm.message.value
  //   }).then (
  //     message => alert(message)
  //   )
  //   // Get form data
  //   const formData = new FormData(contactForm);
  //   const formObject = {};
  //   formData.forEach((value, key) => {
  //     formObject[key] = value;
  //   });
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    // Validate form data

    var email = document.querySelector("#Email");
    // Validate email format
    var firstName = document.querySelector("#firstName");
    var lastName = document.querySelector("#lastName");
    var email = document.querySelector("#email");
    var massage = document.querySelector("#message");
    var mobile = document.querySelector("#mobile");
    var newsletter = document.querySelector("#newsletter");
    var budget = document.querySelector("#budget");
    var service = document.querySelector("#service");
    var body = `
      Name: ${formObject.firstName} ${formObject.lastName} <br>
      Email: ${formObject.email} <br>
      Message: ${formObject.message} <br>
      Mobile: ${formObject.mobile || "N/A"} <br>
      Newsletter: ${formObject.newsletter ? "Yes" : "No"} <br>
      Budget: ${formObject.budget || "N/A"} <br>
      Service: ${formObject.service || "N/A"} <br>
    `;
    // Send email
    Email.send({
      Host: "smtp.gmail.com", // Replace with actual SMTP host, or use smtp.elasticemail.com or smtp.gmail.com
      Username: "username",
      Password: "password", // ⚠️ NEVER expose passwords in production!
      To: email,
      From: "dharmeshpanchal3236@gmail.com",
      Subject: massage,
      Body: body,
    })
      .then((message) => {
        successMessage.style.display = "block";
        successMessage.textContent = "Message sent successfully!";
        contactForm.reset();
      })
      .catch((error) => {
        alert("Email send failed: " + error);
      });

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      // Reset button
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;

      // Show success message
      successMessage.style.display = "block";
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);

      // Log form data (for development)
      console.log("Form submitted:", formObject);
    }, 2000);
  });

  // Back to top button
  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".hero-section");
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });

  // Form validation
  const forms = document.querySelectorAll(".needs-validation");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Mobile menu handling
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });

  // Testimonials carousel auto-play (if using carousel)
  const testimonialCarousel = document.querySelector("#testimonialCarousel");
  if (testimonialCarousel) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      wrap: true,
    });
  }

  // Add loading animation to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
      if (this.type === "submit") {
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="loading"></span> Loading...';

        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }
    });
  });

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Initialize popovers
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );

  // Add fade-in animation to elements
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  fadeElements.forEach((element) => {
    fadeObserver.observe(element);
  });

  // Preloader (if exists)
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }

  console.log("Furniture Craftsman Website Loaded Successfully!");
});

// Utility functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;

    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Export functions for use in other scripts
window.FurnitureCraftsman = {
  debounce,
  throttle,
};
