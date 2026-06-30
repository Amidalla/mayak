export function productQuantity(context = document) {
    const roots = context.querySelectorAll("[data-quantity]");

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;

        const controller = new AbortController();
        const { signal } = controller;

        const input = root.querySelector("[data-quantity-input]");
        const minusBtn = root.querySelector("[data-quantity-minus]");
        const plusBtn = root.querySelector("[data-quantity-plus]");
        const submitBtn = root.parentElement?.querySelector("[data-quantity-submit]");

        if (!input || !minusBtn || !plusBtn) return;

        const getValue = () => {
            const v = parseInt(input.value, 10);
            return isNaN(v) ? null : v;
        };

        const updateButtons = () => {
            const min = parseInt(input.min, 10) || 0;
            const max = parseInt(input.max, 10) || 99999999;
            const value = getValue();

            minusBtn.classList.toggle("disabled", value === null || value <= min);
            plusBtn.classList.toggle("disabled", value !== null && value >= max);

            if (submitBtn) submitBtn.disabled = value === null || value <= 0;
        };

        const dispatchChange = () => {
            root.dispatchEvent(
                new CustomEvent("product-quantity:change", {
                    bubbles: true,
                    detail: { value: getValue() ?? 0 }
                })
            );
        };

        minusBtn.addEventListener(
            "click",
            () => {
                const min = parseInt(input.min, 10) || 0;
                const value = getValue();
                if (value !== null && value > min) {
                    input.value = value - 1;
                    updateButtons();
                    dispatchChange();
                }
            },
            { signal }
        );

        plusBtn.addEventListener(
            "click",
            () => {
                const max = parseInt(input.max, 10) || 99999999;
                const value = getValue() ?? 0;
                if (value < max) {
                    input.value = value + 1;
                    updateButtons();
                    dispatchChange();
                }
            },
            { signal }
        );

        const clampValue = () => {
            const min = parseInt(input.min, 10) || 0;
            const raw = input.value;

            if (raw.length > 8) input.value = raw.slice(0, 8);

            const value = getValue();
            if (value !== null && value < min) input.value = min;

            updateButtons();
            dispatchChange();
        };

        input.addEventListener("input", clampValue, { signal });
        input.addEventListener("change", clampValue, { signal });

        root.dataset.init = "true";
        updateButtons();

        root.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}
