document.addEventListener("DOMContentLoaded", function () {
  const sections = Array.from(document.querySelectorAll("header, section[id]")).map(el => ({
    id: el.id,
    el,
    link: document.querySelector(`.nav-link[href="#${el.id}"]`)
  }));

  const navLinks = document.querySelectorAll(".nav-link");

  function getNavHeight() {
    const nav = document.querySelector(".navbar");
    return nav ? nav.offsetHeight : 0;
  }

  function onScroll() {
    const scrollPos = window.scrollY + getNavHeight() + 5;
    let activeSection = sections[0];

    for (const s of sections) {
      if (scrollPos >= s.el.offsetTop) {
        activeSection = s;
      }
    }

    // 👇 Si llegamos al final, forzar contacto
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      const contacto = sections.find(s => s.id === "contacto");
      if (contacto) activeSection = contacto;
    }

    navLinks.forEach(l => l.classList.remove("nav-active"));
    if (activeSection && activeSection.link) {
      activeSection.link.classList.add("nav-active");
    }
  }

  // 👇 Nuevo: al hacer click en los links, marcar activo directamente
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("nav-active"));
      link.classList.add("nav-active");
    });
  });

  window.addEventListener("scroll", onScroll);
  onScroll();
});

