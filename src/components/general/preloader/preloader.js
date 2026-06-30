export function preloader() {
    const root = document.querySelector("[data-preloader]");
    if (!root) return;

    const counter = root.querySelector("[data-preloader-counter]");
    if (!counter) return;

    let progress = 0;
    let targetProgress = 0;
    let animationId = null;

    const images = Array.from(document.images);
    const totalResources = images.length + 1; // +1 для шрифтов
    let loadedResources = 0;

    const updateProgress = () => {
        loadedResources++;
        targetProgress = Math.round((loadedResources / totalResources) * 100);
    };

    const animateCounter = () => {
        if (progress < targetProgress) {
            progress += Math.ceil((targetProgress - progress) / 10) || 1;
            if (progress > targetProgress) progress = targetProgress;
            counter.textContent = progress;
        }

        if (progress < 100) {
            animationId = requestAnimationFrame(animateCounter);
        } else {
            finishLoading();
        }
    };

    const finishLoading = () => {
        cancelAnimationFrame(animationId);
        counter.textContent = "100";

        setTimeout(() => {
            root.classList.add("is-hidden");
            document.body.classList.remove("is-loading");

            // Событие для запуска анимаций после прелоадера
            document.dispatchEvent(new CustomEvent("preloaderComplete"));
        }, 300);
    };

    const init = () => {
        document.body.classList.add("is-loading");

        // Отслеживаем загрузку изображений
        if (images.length === 0) {
            targetProgress = 50;
        } else {
            images.forEach((img) => {
                if (img.complete) {
                    updateProgress();
                } else {
                    img.addEventListener("load", updateProgress, { once: true });
                    img.addEventListener("error", updateProgress, { once: true });
                }
            });
        }

        // Отслеживаем загрузку шрифтов
        document.fonts.ready.then(() => {
            updateProgress();
        });

        // Fallback - если всё уже загружено
        if (loadedResources >= totalResources) {
            targetProgress = 100;
        }

        // Запускаем анимацию счётчика
        animateCounter();

        // Гарантированное завершение через 5 сек
        setTimeout(() => {
            if (progress < 100) {
                targetProgress = 100;
            }
        }, 5000);
    };

    init();
}
