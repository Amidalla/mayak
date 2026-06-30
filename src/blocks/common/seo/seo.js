export function seo(context = document) {
    const roots = context.querySelectorAll('[data-component="seo"]');

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const text = root.querySelector(".text");
        const toggle = root.querySelector(".seo-toggle");
        if (!text || !toggle) return;

        text.classList.add("is-collapsed");

        toggle.addEventListener("click", () => {
            const isCollapsed = text.classList.contains("is-collapsed");
            text.classList.toggle("is-collapsed", !isCollapsed);
            text.classList.toggle("is-expanded", isCollapsed);
            toggle.textContent = isCollapsed ? "Свернуть" : "Читать дальше";
        });
    });
}
