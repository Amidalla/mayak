export function productsTable(context = document) {
    const roots = context.querySelectorAll("[data-component='products-table']");

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;

        const controller = new AbortController();
        const { signal } = controller;

        const table = root.querySelector(".table");
        if (!table) return;

        const rows = table.querySelectorAll("tbody tr");

        rows.forEach((row) => {
            const input = row.querySelector(".quantity input");
            const button = row.querySelector(".add-to-cart");
            const label = button?.querySelector(".added-label");

            if (!input || !button || !label) return;
            if (row.querySelector(".stock .is-pending")) return;

            const confirm = (_cartCount) => {
                label.textContent = "добавлено";
                row.classList.remove("is-focus");
                row.classList.remove("has-quantity");
                row.classList.add("is-added");
                input.blur();

                setTimeout(() => {
                    row.classList.remove("is-added");
                    label.textContent = "";
                }, 1500);
            };

            const reject = () => {
                input.focus();
                input.classList.add("is-error");
            };

            const handleFocus = () => {
                if (row.classList.contains("is-added")) return;
                row.classList.add("is-focus");
                label.textContent = "в корзину";
            };

            const handleBlur = () => {
                if (row.classList.contains("is-added")) return;
                row.classList.remove("is-focus");
                input.classList.remove("is-error");
                label.textContent = "";
            };

            const handleInput = () => {
                const value = input.value.toString();
                if (value.length > 8) {
                    input.value = value.slice(0, 8);
                }

                input.classList.remove("is-error");

                const quantity = parseInt(input.value, 10);
                row.classList.toggle("has-quantity", quantity > 0);
            };

            const handleButtonMousedown = (e) => {
                e.preventDefault();
            };

            const handleButtonClick = () => {
                const quantity = parseInt(input.value, 10);

                if (!quantity || quantity <= 0) {
                    input.focus();
                    input.classList.add("is-error");
                    return;
                }

                /*
                 * Событие "products-table:add" для бэкенда.
                 *
                 * jQuery-пример:
                 *
                 * $(document).on('products-table:add', '.products-table tbody tr', function(e) {
                 *     e.preventDefault(); // отключает авто-confirm
                 *     var detail = e.originalEvent.detail;
                 *     $.post('/ajax/cart/add', { id: $(this).data('product-id'), qty: detail.quantity })
                 *         .done(function(res) { detail.confirm(res.cartCount); }) // res.cartCount — новое кол-во в корзине
                 *         .fail(function() { detail.reject(); });
                 * });
                 */
                const event = new CustomEvent("products-table:add", {
                    bubbles: true,
                    cancelable: true,
                    detail: { quantity, confirm, reject }
                });

                row.dispatchEvent(event);

                // Если никто не вызвал e.preventDefault() — авто-confirm для статической верстки
                if (!event.defaultPrevented) {
                    confirm();
                }
            };

            input.addEventListener("focus", handleFocus, { signal });
            input.addEventListener("blur", handleBlur, { signal });
            input.addEventListener("input", handleInput, { signal });
            button.addEventListener("mousedown", handleButtonMousedown, { signal });
            button.addEventListener("click", handleButtonClick, { signal });
        });

        root.dataset.init = "true";

        root.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}
