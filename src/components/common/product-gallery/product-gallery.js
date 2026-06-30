import Swiper from "swiper";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

function pauseRutubeVideo(iframe) {
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({ type: "player:pause" }), "*");
    }
}

export function productGallery(context = document) {
    const root = context.querySelector('[data-component="product-gallery"]');
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    const mainContainer = root.querySelector(".main .swiper");
    if (!mainContainer) return;

    const controller = new AbortController();
    const { signal } = controller;

    // Инициализация Fancybox для галереи
    const fancyboxSelector = `[data-component="product-gallery"][data-init="true"] [data-fancybox="product-gallery"]`;

    Fancybox.bind(fancyboxSelector, {
        Carousel: {
            Thumbs: {
                type: "classic",
                Carousel: {
                    center: (ref) => {
                        return ref.getTotalSlideDim() > ref.getViewportDim();
                    },
                    vertical: false
                }
            },
            Toolbar: {
                display: {
                    left: ["counter"],
                    middle: ["zoomIn", "zoomOut", "toggle1to1", "reset"],
                    right: ["close"]
                }
            }
        },
        on: {
            "Carousel.change": (fancybox, carousel) => {
                if (carousel && carousel.slides) {
                    carousel.slides.forEach((slide) => {
                        if (slide && slide.$el) {
                            const iframe = slide.$el.querySelector("iframe");
                            if (iframe) {
                                pauseRutubeVideo(iframe);
                            }
                        }
                    });
                }
            },
            close: () => {
                root.querySelectorAll(".rt-container.loaded iframe").forEach((iframe) => {
                    pauseRutubeVideo(iframe);
                });
            }
        }
    });

    // Инициализация основного слайдера
    const mainSwiper = new Swiper(mainContainer, {
        modules: [Navigation, Pagination, EffectFade],
        loop: true,
        effect: "fade",
        watchSlidesProgress: true,
        navigation: {
            nextEl: root.querySelector(".swiper-button-next"),
            prevEl: root.querySelector(".swiper-button-prev")
        },
        pagination: {
            el: root.querySelector(".swiper-pagination"),
            clickable: true
        }
    });

    // Очистка при удалении компонента
    root.addEventListener(
        "destroy",
        () => {
            controller.abort();
            Fancybox.unbind(fancyboxSelector);
            mainSwiper.destroy();
        },
        { once: true, signal }
    );
}
