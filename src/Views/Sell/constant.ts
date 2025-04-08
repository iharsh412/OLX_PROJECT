import ICONS from '../../assets';

export const CATEGORIES = [
    { id: 'mobile', name: 'Mobile', icon: ICONS.phone },
    { id: 'electronics', name: 'Electronics', icon: ICONS.electronics },
    { id: 'bikes', name: 'Bikes', icon: ICONS.bike },
    { id: 'cars', name: 'Cars', icon: ICONS.car },
];

export const CLASSNAME = {
    SS: {
        WRAPPER: "sell-section__category-container",
        SUBTITLE: "sell-section__subtitle",
        CATEGORIES: "sell-section__categories",
        CATEGORY: "sell-section__category-wrapper",
        CATEGORY_BUTTON: "sell-section__category-button",
        ACTIVE: "sell-section_active",
        CATEGORY_ICON: "sell-section__category-icon",
        CATEGORY_NAME: "sell-section__category-name",
        ARROW: "sell-section__arrow-icon",
        SUBCATEGORIES: "sell-section__subcategories"

    },
    SL: {
        WRAPPER: "sell-section",
        HEADER: "sell-section__header",
        BACK_BUTTON: "sell-section__back-button",
        TITLE: "sell-section__title",
        OUTLET: "sell-section-Outlet",
        FOOTER: "sell-section-footer"
    }


}

export const TEXT = {
    SS: {
        CATEGORY: "Choose A Category",


    },
    SL:{
        ADD:"Post your Ad"
    }
}

