class Animations {
  constructor() {
    this.isMobile = this.checkIfMobile(); // Визначаємо тип пристрою
    this.init();
  }
  checkIfMobile() {
    return (
      /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) ||
      window.matchMedia("(max-width: 1024px)").matches
    );
  }
  init() {
    this.initAnimations();
    this.scrollbarAnimations();
    this.optimizePerformance();
  }

  initAnimations() {
    // Check if .who__list-item exists before applying animation
    if (document.querySelectorAll(".who__list-item").length) {
      gsap.from(".who__list-item", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.4,
        scrollTrigger: {
          once: true,
          trigger: ".who__list",
          start: "top 90%",
          end: "bottom 100%",
          scrub: true,
        },
      });
    }

    // Check if .accordeon exists before applying animation
    if (document.querySelector(".accordeon")) {
      gsap.from(".accordeon", {
        opacity: 0,
        y: 50,
        stagger: 0.4,
        ease: "power3.out",
        duration: 1,
        scrollTrigger: {
          trigger: ".moduls__accordeon",
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
          once: true,
        },
      });
    }

    // Check if .price__list exists before applying animation
    if (document.querySelector(".price__list-item")) {
      gsap.from(".price__container", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".price__container",
          start: "top 90%",
          end: "top 30%",
          scrub: true,
          once: true,
        },
      });
    }

    // Check if .swiper__container exists before applying animation
    if (document.querySelector(".swiper__container")) {
      gsap.from(".swiper__container", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".swiper__container",
          start: "top 90%",
          end: "top 30%",
          scrub: true,
          once: true,
        },
      });
    }

    // Check if .about__list-item exists before applying animation
    if (document.querySelectorAll(".about__list-item").length) {
      gsap.from(".about__list-item", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about__list",
          start: "top 90%",
          end: "bottom 100%",
          scrub: true,
          once: true,
        },
      });
    }

    // Check if .courses__list a exists before applying animation
    if (document.querySelectorAll(".courses__list a").length) {
      gsap.from(".courses__list a", {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".courses__list",
          start: "top 90%",
          end: "bottom 100%",
          scrub: true,
          once: true,
        },
      });
    }
  }

  scrollbarAnimations() {
    const lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
  optimizePerformance() {
    // Підвищуємо пріоритет рендерингу
    performance.mark("start-performance");

    // Battery API – адаптація анімацій до рівня заряду
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        if (battery.level > 0.2 && !battery.savingMode) {
          gsap.globalTimeline.timeScale(1.2);
        } else {
          gsap.globalTimeline.timeScale(0.8);
        }
      });
    }
  }
}
window.addEventListener("DOMContentLoaded", () => {
  new Animations();
});
