(function () {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const header = document.querySelector(".site-header");
  const form = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());

  function updateHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  function closeMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });
    navigation.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeMenu(); });
  }

  if (form && formStatus) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      formStatus.textContent = "El envío estará disponible en la segunda fase. Tus datos no fueron enviados ni almacenados.";
    });
  }
})();
