import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export function delivery(context = document) {
    const roots = context.querySelectorAll(".delivery");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const controller = new AbortController();

        // Инициализация FancyBox для изображений
        const images = root.querySelectorAll('[data-fancybox="delivery"]');
        if (images.length) {
            Fancybox.bind(images, {});
        }

        // Очистка
        root.addEventListener(
            "destroy",
            () => {
                Fancybox.unbind(images);
                controller.abort();
            },
            { once: true }
        );
    });
}
