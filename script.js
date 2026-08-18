(function () {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const header = document.querySelector(".site-header");
  const form = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const year = document.querySelector("#year");
  const heroVideo = document.querySelector(".hero-video");
  const motionButton = document.querySelector(".hero-motion-toggle");
  const motionPreference = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

  if (year) year.textContent = String(new Date().getFullYear());

  function updateHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (heroVideo && motionButton) {
    let userPaused = false;
    let userOverrodeMotionPreference = false;
    let resumeAfterVisibility = false;
    const motionLabel = motionButton.querySelector(".motion-label");

    function updateMotionControl() {
      const isPaused = heroVideo.paused;
      motionButton.dataset.state = isPaused ? "paused" : "playing";
      motionButton.setAttribute("aria-pressed", String(isPaused));
      motionButton.setAttribute("aria-label", isPaused ? "Reproducir video de fondo" : "Pausar video de fondo");
      if (motionLabel) motionLabel.textContent = isPaused ? "Reproducir video" : "Pausar video";
    }

    function playHeroVideo() {
      const playback = heroVideo.play();
      if (playback && typeof playback.catch === "function") playback.catch(updateMotionControl);
    }

    function applyMotionPreference() {
      if (motionPreference && motionPreference.matches && !userOverrodeMotionPreference) {
        heroVideo.pause();
      } else {
        if (!userPaused && !document.hidden) playHeroVideo();
      }
      motionButton.hidden = false;
      updateMotionControl();
    }

    motionButton.addEventListener("click", function () {
      if (heroVideo.paused) {
        userPaused = false;
        userOverrodeMotionPreference = true;
        playHeroVideo();
      } else {
        userPaused = true;
        heroVideo.pause();
      }
      updateMotionControl();
    });

    heroVideo.addEventListener("play", updateMotionControl);
    heroVideo.addEventListener("pause", updateMotionControl);
    heroVideo.addEventListener("error", function () { motionButton.hidden = true; });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        resumeAfterVisibility = !heroVideo.paused;
        heroVideo.pause();
      } else if (resumeAfterVisibility && !userPaused && (!(motionPreference && motionPreference.matches) || userOverrodeMotionPreference)) {
        playHeroVideo();
      }
      updateMotionControl();
    });

    if (motionPreference) {
      if (typeof motionPreference.addEventListener === "function") motionPreference.addEventListener("change", applyMotionPreference);
      else if (typeof motionPreference.addListener === "function") motionPreference.addListener(applyMotionPreference);
    }
    applyMotionPreference();
  }

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
