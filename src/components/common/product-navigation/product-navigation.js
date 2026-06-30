export function productNavigation(context = document) {
    const roots = context.querySelectorAll('[data-component="product-navigation"]');
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const controller = new AbortController();
        const { signal } = controller;

        // Отслеживание фиксированного состояния панели
        const checkFixedState = () => {
            const rect = root.getBoundingClientRect();
            const topValue = parseFloat(getComputedStyle(root).top) || 0;
            const isFixed = Math.abs(rect.top - topValue) < 1;
            root.classList.toggle("is-fixed", isFixed);
        };

        // Проверяем при скролле
        window.addEventListener("scroll", checkFixedState, { signal, passive: true });
        // Начальная проверка
        checkFixedState();

        const navLinks = root.querySelectorAll("[data-nav-link]");
        const navWrap = root.querySelector(".nav-wrap");

        if (!navLinks.length) return;

        // Флаг блокировки автоматического обновления при программном скролле
        let isProgrammaticScroll = false;
        let scrollTimeout = null;

        // Функция обновления активной ссылки
        const updateActiveLink = (activeHref) => {
            let activeLink = null;
            navLinks.forEach((link) => {
                const isActive = link.getAttribute("href") === activeHref;
                link.classList.toggle("is-active", isActive);
                if (isActive) activeLink = link;
            });

            // Прокручиваем активную кнопку в зону видимости
            if (activeLink && navWrap) {
                const wrapRect = navWrap.getBoundingClientRect();
                const linkRect = activeLink.getBoundingClientRect();

                // Если кнопка не видна полностью
                if (linkRect.left < wrapRect.left || linkRect.right > wrapRect.right) {
                    activeLink.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });
                }
            }
        };

        // Обработка клика по ссылке
        navLinks.forEach((link) => {
            link.addEventListener(
                "click",
                (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute("href");
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        // Блокируем автоматическое обновление
                        isProgrammaticScroll = true;
                        if (scrollTimeout) clearTimeout(scrollTimeout);

                        // Обновляем активную ссылку
                        updateActiveLink(targetId);

                        // Учитываем фиксированную шапку + панель навигации + отступ
                        const gap = 20;
                        const header = document.querySelector(".header");
                        const headerHeight = header ? header.offsetHeight : 0;
                        const navHeight = root.offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerHeight - navHeight - gap;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });

                        // Разблокируем после завершения скролла
                        scrollTimeout = setTimeout(() => {
                            isProgrammaticScroll = false;
                        }, 1000);
                    }
                },
                { signal }
            );
        });

        // Отслеживание активной секции при скролле
        const targetIds = Array.from(navLinks).map((link) => link.getAttribute("href"));
        const targetElements = targetIds.map((id) => document.querySelector(id)).filter(Boolean);

        if (targetElements.length) {
            const gap = 20;
            const header = document.querySelector(".header");

            const updateActiveOnScroll = () => {
                // Пропускаем если идёт программный скролл
                if (isProgrammaticScroll) return;

                const headerHeight = header ? header.offsetHeight : 0;
                const navHeight = root.offsetHeight;
                const triggerPoint = headerHeight + navHeight + gap;

                let activeSection = null;
                let minDistance = Infinity;

                targetElements.forEach((element) => {
                    const rect = element.getBoundingClientRect();
                    const distance = rect.top - triggerPoint;

                    // Ищем секцию, которая прошла выше триггер-точки и ближе всего к ней
                    if (distance <= 0 && Math.abs(distance) < minDistance) {
                        minDistance = Math.abs(distance);
                        activeSection = element;
                    }
                });

                // Если ни одна секция не прошла триггер - берём первую
                if (!activeSection && targetElements.length > 0) {
                    const firstRect = targetElements[0].getBoundingClientRect();
                    if (firstRect.top > triggerPoint) {
                        activeSection = targetElements[0];
                    }
                }

                if (activeSection && activeSection.id) {
                    updateActiveLink(`#${activeSection.id}`);
                }
            };

            window.addEventListener("scroll", updateActiveOnScroll, { signal, passive: true });
            // Начальная проверка
            updateActiveOnScroll();

            // Очистка при уничтожении компонента
            root.addEventListener("destroy", () => controller.abort(), { once: true });
        } else {
            root.addEventListener("destroy", () => controller.abort(), { once: true });
        }
    });
}
