import lozad from "lozad";
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
import { header } from "../blocks/general/header/header.js";
import { showToast } from "../components/general/toast/toast.js";
import { showPopup } from "./utils/popup.js";
import { productsTable } from "../components/common/products-table/products-table.js";
import { showAddedToCart } from "./utils/show-added-to-cart.js";
import { searchForm } from "../components/general/search-form/search-form.js";
import { searchResult } from "../blocks/common/search-result/search-result.js";
import { initCustomScroll } from "./utils/custom-scroll.js";
import { catalogContent } from "../blocks/common/catalog-content/catalog-content.js";
import { filterToggle } from "../components/general/filter/filter.js";
import { productCard } from "../blocks/common/product-card/product-card.js";
import { similarProducts } from "../blocks/common/similar-products/similar-products.js";
import { popupFeedbackSuccess } from "../components/common/popup-feedback-success/popup-feedback-success.js";
import { gallerySlider } from "../components/general/gallery-slider/gallery-slider.js";
import { certificates } from "../blocks/common/certificates/certificates.js";
import { photos } from "../blocks/common/photos/photos.js";
import { articlesContent } from "../blocks/common/articles-content/articles-content.js";

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
    feedback,
    searchForm,
    searchResult,
    catalogContent,
    filterToggle,
    productCard,
    similarProducts,
    popupFeedbackSuccess,
    gallerySlider,
    certificates,
    photos,
    articlesContent
];

function init(context = document) {
    components.forEach((fn) => fn(context));
    initCustomScroll(context); // Инициализируем кастомный скролл
}

document.addEventListener("DOMContentLoaded", () => {
    // global services
    lozad(".lazy", {
        rootMargin: "1200px 1200px",
        threshold: 0.1,
        enableAutoReload: true
    }).observe();

    // UI components
    init();
});

window.showToast = showToast;
window.showPopup = showPopup;
window.showAddedToCart = showAddedToCart;

window.reinit = (context = document) => {
    init(context);
};