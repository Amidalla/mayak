// blocks/common/photos/photos.js
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export function photos(context = document) {
    const root = context.querySelector('.photos');
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    // Fancybox
    const links = root.querySelectorAll('[data-fancybox="photos"]');
    if (links.length) {
        Fancybox.bind(links, {});
    }

    // Кнопка "Еще"
    const moreBtn = root.querySelector('#showMorePhotos');
    const hiddenItems = root.querySelectorAll('.photo-card--hidden');

    if (!moreBtn || !hiddenItems.length) return;

    const textMore = moreBtn.dataset.textMore || 'Ещё';
    const textLess = moreBtn.dataset.textLess || 'Скрыть';
    let isOpen = false;

    moreBtn.addEventListener('click', function() {
        isOpen = !isOpen;

        hiddenItems.forEach(item => {
            item.classList.toggle('is-visible');
        });

        this.textContent = isOpen ? textLess : textMore;
    });

    // Очистка при уничтожении
    root.addEventListener(
        "destroy",
        () => {
            Fancybox.unbind(links);
        },
        { once: true }
    );
}