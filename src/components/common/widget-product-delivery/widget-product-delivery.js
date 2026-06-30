import { showToast } from "../../general/toast/toast.js";

export function widgetProductDelivery(context = document) {
    const roots = context.querySelectorAll('[data-component="widget-product-delivery"]');

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const copyBtn = root.querySelector(".send-request .copy");
        if (!copyBtn) return;

        const controller = new AbortController();
        const { signal } = controller;

        copyBtn.addEventListener(
            "click",
            async () => {
                const emailLink = root.querySelector('.send-request a[href^="mailto:"]');
                const email = emailLink ? emailLink.textContent.trim() : "";

                if (!email) return;

                try {
                    await navigator.clipboard.writeText(email);
                    showToast("Почта скопирована в буфер обмена", { type: "success" });
                } catch {
                    showToast("Не удалось скопировать", { type: "error" });
                }
            },
            { signal }
        );

        root.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}
