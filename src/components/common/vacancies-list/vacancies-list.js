export function vacanciesList(context = document) {
    const roots = context.querySelectorAll('[data-component="vacancies-list"]');
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const controller = new AbortController();
        const { signal } = controller;

        const items = root.querySelectorAll(".item");
        if (!items.length) return;

        const toggle = (targetItem) => {
            const isActive = targetItem.classList.contains("is-active");
            items.forEach((item) => item.classList.remove("is-active"));
            if (!isActive) {
                targetItem.classList.add("is-active");
            }
        };

        items.forEach((item) => {
            const top = item.querySelector(".top");
            if (!top) return;

            top.addEventListener(
                "click",
                (e) => {
                    if (e.target.closest(".button")) return;
                    toggle(item);
                },
                { signal }
            );
        });

        root.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}
