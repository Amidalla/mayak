import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function feedback(context = document) {
    const sections = context.querySelectorAll(".feedback");
    if (!sections.length) return;

    sections.forEach((section) => {
        if (section.dataset.init === "true") return;
        section.dataset.init = "true";

        const plane = section.querySelector(".bg picture");
        if (!plane) return;

        const controller = new AbortController();

        // Начальная позиция - самолет вдалеке (маленький, полупрозрачный)
        gsap.set(plane, { scale: 0.1, opacity: 0 });

        // Анимация при появлении секции - прилет из глубины
        gsap.to(plane, {
            scale: 1,
            opacity: 1,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            }
        });

        // Очистка
        section.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}
