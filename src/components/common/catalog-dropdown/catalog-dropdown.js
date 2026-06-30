export function catalogDropdown(context = document) {
    const root = context.querySelector("#menu-catalog-button");
    if (!root || root.dataset.init === "true") return;
    root.dataset.init = "true";

    const controller = new AbortController();
    const { signal } = controller;

    const menuCatalog = context.querySelector(".menu-catalog");
    if (!menuCatalog) return;

    function closeMenu() {
        root.classList.remove("is-active");
        menuCatalog.classList.remove("is-open");
    }

    function openMenu() {
        root.classList.add("is-active");
        menuCatalog.classList.add("is-open");
    }

    // Toggle menu
    root.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (menuCatalog.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        },
        { signal }
    );

    // Close button
    const closeBtn = menuCatalog.querySelector(".menu-catalog-close");
    if (closeBtn) {
        closeBtn.addEventListener(
            "click",
            () => {
                closeMenu();
            },
            { signal }
        );
    }

    // Accordion toggles
    const itemToggles = menuCatalog.querySelectorAll(".item-toggle");
    itemToggles.forEach((toggle) => {
        toggle.addEventListener(
            "click",
            (event) => {
                event.preventDefault();
                event.stopPropagation();
                const item = toggle.closest(".item");
                if (item) {
                    item.classList.toggle("is-open");
                }
            },
            { signal }
        );
    });

    // Close on outside click
    document.addEventListener(
        "click",
        (event) => {
            if (!root.contains(event.target) && !menuCatalog.contains(event.target)) {
                closeMenu();
            }
        },
        { signal }
    );

    root.addEventListener("destroy", () => controller.abort(), { once: true });
}
