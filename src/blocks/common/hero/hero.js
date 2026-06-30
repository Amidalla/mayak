import Swiper from "swiper";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

export function hero(context = document) {
    const root = context.querySelector(".hero");
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    const swiper = new Swiper(root.querySelector(".slider"), {
        modules: [Navigation, Pagination, EffectFade, Autoplay],
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        loop: true,
        autoplay: {
            delay: 5500,
            disableOnInteraction: false
        },
        effect: "fade",
        watchSlidesProgress: true,
        pagination: {
            el: root.querySelector(".swiper-pagination"),
            clickable: true,
            renderBullet(index, className) {
                return `<span class="${className}"><span class="number">${index + 1}</span></span>`;
            }
        },
        on: {
            init(swiperInstance) {
                const bullets = Array.from(swiperInstance.pagination?.bullets || []);
                bullets.forEach((b) => b.style.setProperty("--progress", 0));
            },
            slideChange(swiperInstance) {
                const bullets = Array.from(swiperInstance.pagination?.bullets || []);
                bullets.forEach((b) => b.style.setProperty("--progress", 0));
            },
            autoplayTimeLeft(swiperInstance, time, progress) {
                const bullets = Array.from(swiperInstance.pagination?.bullets || []);
                const idx = swiperInstance.realIndex;
                const activeBullet = bullets[idx];
                bullets.forEach((b) => b.style.setProperty("--progress", 0));
                if (activeBullet) activeBullet.style.setProperty("--progress", progress);
            },
            resize(swiperInstance) {
                if (swiperInstance.autoplay && !swiperInstance.autoplay.running) {
                    swiperInstance.autoplay.start();
                }
            }
        }
    });

    root.addEventListener(
        "destroy",
        () => {
            swiper.destroy(true, true);
        },
        { once: true }
    );
}
