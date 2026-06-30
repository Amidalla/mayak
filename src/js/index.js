import lozad from "lozad";
import { preloader } from "../components/general/preloader/preloader.js";
import { menu } from "../components/general/menu/menu.js";
import { form } from "../components/general/form/form.js";
import { input } from "../components/general/input/input.js";
import { select } from "../components/general/select/select.js";
import { inputFile } from "../components/general/input-file/input-file.js";
import { tabs } from "../components/general/tabs/tabs.js";
import { accordion } from "../components/general/accordion/accordion.js";
import { consentNotice } from "../components/general/consent-notice/consent-notice.js";
import { navigationMobile } from "../components/general/navigation-mobile/navigation-mobile.js";
import { catalogDropdown } from "../components/common/catalog-dropdown/catalog-dropdown.js";
import { vacanciesList } from "../components/common/vacancies-list/vacancies-list.js";
import { productNavigation } from "../components/common/product-navigation/product-navigation.js";
import { productGallery } from "../components/common/product-gallery/product-gallery.js";
import { productQuantity } from "../components/common/product-quantity/product-quantity.js";
import { popupOrder } from "../components/common/popup-order/popup-order.js";
import { popupCallback } from "../components/common/popup-callback/popup-callback.js";
import { popupFeedback } from "../components/common/popup-feedback/popup-feedback.js";
import { popupPrice } from "../components/common/popup-price/popup-price.js";
import { popupInvoice } from "../components/common/popup-invoice/popup-invoice.js";
import { policyNavigation } from "../components/common/policy-navigation/policy-navigation.js";
import { hero } from "../blocks/common/hero/hero.js";
import { feedback } from "../blocks/common/feedback/feedback.js";
import { delivery } from "../blocks/common/delivery/delivery.js";
import { seo } from "../blocks/common/seo/seo.js";
import { productDelivery } from "../components/common/product-delivery/product-delivery.js";
import { widgetProductDelivery } from "../components/common/widget-product-delivery/widget-product-delivery.js";
import { header } from "../blocks/general/header/header.js";
import { showToast } from "../components/general/toast/toast.js";
import { showPopup } from "./utils/popup.js";
import { productsTable } from "../components/common/products-table/products-table.js";
import { showAddedToCart } from "./utils/show-added-to-cart.js";
import { animate } from "./utils/animate.js";

const components = [
    productsTable,
    menu,
    form,
    input,
    select,
    inputFile,
    tabs,
    accordion,
    consentNotice,
    navigationMobile,
    catalogDropdown,
    vacanciesList,
    productNavigation,
    productGallery,
    productQuantity,
    popupOrder,
    popupCallback,
    popupFeedback,
    popupPrice,
    popupInvoice,
    policyNavigation,
    hero,
    header,
    delivery,
    productDelivery,
    seo,
    widgetProductDelivery
];

// Анимации запускаются отдельно после прелоадера
const animateComponents = [animate, feedback];

function init(context = document) {
    components.forEach((fn) => fn(context));
}

function initAnimations(context = document) {
    animateComponents.forEach((fn) => fn(context));
}

// Preloader (вызываем сразу)
preloader();

document.addEventListener("DOMContentLoaded", () => {
    // global services
    lozad(".lazy", {
        rootMargin: "1200px 1200px",
        threshold: 0.1,
        enableAutoReload: true
    }).observe();

    // UI components
    init();

    // Если прелоадера нет - запускаем анимации сразу
    if (!document.querySelector("[data-preloader]")) {
        initAnimations();
    }
});

// Анимации запускаются после завершения прелоадера
document.addEventListener("preloaderComplete", () => initAnimations(), { once: true });

window.showToast = showToast;
window.showPopup = showPopup;
window.showAddedToCart = showAddedToCart;

window.reinit = (context = document) => {
    init(context);
    initAnimations(context);
};
