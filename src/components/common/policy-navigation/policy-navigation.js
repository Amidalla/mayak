export function policyNavigation(context = document) {
    const root = context.querySelector('[data-component="policy-navigation"]');
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    const controller = new AbortController();
    const { signal } = controller;

    const links = root.querySelectorAll(".list a[href^='#']");
    if (!links.length) return;

    const sections = [];
    links.forEach((link) => {
        const id = link.getAttribute("href").slice(1);
        const section = document.getElementById(id);
        if (section) {
            sections.push({ el: section, li: link.closest("li") });
        }
    });

    if (!sections.length) return;

    const getHeaderHeight = () => {
        const header = document.querySelector(".header");
        return header ? header.offsetHeight : 0;
    };

    // Плавный скролл по клику
    links.forEach((link) => {
        link.addEventListener(
            "click",
            (e) => {
                e.preventDefault();
                const id = link.getAttribute("href").slice(1);
                const target = document.getElementById(id);
                if (!target) return;

                const top = target.getBoundingClientRect().top + window.scrollY - getHeaderHeight() - 20;
                window.scrollTo({ top, behavior: "smooth" });
            },
            { signal }
        );
    });

    // Подсветка активного раздела при скролле
    const setActive = () => {
        const scrollY = window.scrollY + getHeaderHeight() + 40;
        let activeIndex = 0;

        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].el.offsetTop <= scrollY) {
                activeIndex = i;
                break;
            }
        }

        sections.forEach((s, i) => {
            s.li.classList.toggle("is-active", i === activeIndex);
        });
    };

    window.addEventListener("scroll", setActive, { signal, passive: true });
    setActive();

    root.addEventListener("destroy", () => controller.abort(), { once: true });
}
