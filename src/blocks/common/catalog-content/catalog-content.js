export function catalogContent(context = document) {
    const root = context.querySelector(".catalog-content");
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    const moreBtn = root.querySelector("#showMoreBtn");
    const hiddenItems = root.querySelectorAll(".catalog-card--hidden");

    if (!moreBtn || !hiddenItems.length) return;

    const textMore = moreBtn.dataset.textMore || "Ещё";
    const textLess = moreBtn.dataset.textLess || "Скрыть";
    let isOpen = false;

    moreBtn.addEventListener("click", function () {
        isOpen = !isOpen;

        hiddenItems.forEach((item) => {
            item.classList.toggle("is-visible");
        });

        this.textContent = isOpen ? textLess : textMore;
    });
}
