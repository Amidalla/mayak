// blocks/common/articles-content/articles-content.js

export function articlesContent(context = document) {
    const root = context.querySelector('.articles-content');
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    // Кнопка "Еще"
    const moreBtn = root.querySelector('#showMoreArticles');
    const hiddenItems = root.querySelectorAll('.article-card--hidden');

    if (!moreBtn || !hiddenItems.length) return;

    const textMore = moreBtn.dataset.textMore || 'Ещё';
    const textLess = moreBtn.dataset.textLess || 'Скрыть';
    let isOpen = false;

    moreBtn.addEventListener('click', function() {
        isOpen = !isOpen;

        hiddenItems.forEach(item => {
            item.classList.toggle('is-visible');
        });

        // Добавляем/убираем класс на секцию
        if (isOpen) {
            root.classList.add('is-expanded');
        } else {
            root.classList.remove('is-expanded');
        }

        this.textContent = isOpen ? textLess : textMore;
    });


    root.addEventListener(
        "destroy",
        () => {

        },
        { once: true }
    );
}