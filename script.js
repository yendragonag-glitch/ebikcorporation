document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".main-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const revealEls = document.querySelectorAll(".reveal");
  const burger = document.querySelector(".burger");
  const mainNav = document.querySelector(".main-nav");
  const scrollTriggers = document.querySelectorAll("[data-scroll]");

  // Плавный скролл по клику на меню и кнопки с data-scroll
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href");
      smoothScrollTo(id);

      // Закрываем мобильное меню
      mainNav.classList.remove("open");
      burger.classList.remove("open");
    });
  });

  scrollTriggers.forEach(el => {
    el.addEventListener("click", (e) => {
      const target = el.getAttribute("data-scroll");
      if (target) {
        e.preventDefault();
        smoothScrollTo(target);
      }
    });
  });

  // Появление блоков при скролле
  function handleReveal() {
    const viewportHeight = window.innerHeight;

    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight * 0.85) {
        el.classList.add("visible");
      }
    });
  }

  // Подсветка активного пункта меню
  function handleActiveNav() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let currentId = "home";

    sections.forEach(section => {
      const offsetTop = section.offsetTop - 140;
      if (scrollY >= offsetTop) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute("href").replace("#", "");
      if (href === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Изменение хедера при прокрутке
  function handleHeader() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function handleScroll() {
    handleReveal();
    handleActiveNav();
    handleHeader();
  }

  // Бургер-меню
  if (burger && mainNav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      mainNav.classList.toggle("open");
    });
  }

  // Первый запуск
  handleScroll();

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleReveal);
});
