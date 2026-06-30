import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export function productDelivery(context = document) {
    const roots = context.querySelectorAll(".product-delivery");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const controller = new AbortController();

        const images = root.querySelectorAll('[data-fancybox="delivery"]');
        if (images.length) {
            Fancybox.bind(images, {});
        }

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
