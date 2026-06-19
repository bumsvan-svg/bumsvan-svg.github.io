const yearElement = document.getElementById("year");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("primary-navigation");
const resumeMenu = document.getElementById("resume-menu");
const resumeTriggers = document.querySelectorAll("[data-resume-trigger]");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const setResumeMenu = (isOpen) => {
  if (!resumeMenu) {
    return;
  }

  resumeMenu.hidden = !isOpen;
  resumeTriggers.forEach((trigger) => {
    trigger.setAttribute("aria-expanded", String(isOpen));
  });
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (resumeMenu && resumeTriggers.length) {
  resumeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      setResumeMenu(resumeMenu.hidden);
    });
  });

  resumeMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setResumeMenu(false);
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    const clickedTrigger = Array.from(resumeTriggers).some((trigger) => trigger.contains(target));
    const clickedMenu = resumeMenu.contains(target);

    if (clickedTrigger || clickedMenu) {
      return;
    }

    setResumeMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setResumeMenu(false);
    }
  });
}
