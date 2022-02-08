import OptionController from "@ext-landing/controllers/option-controller.js";

function route() {
    let pagePath = document.URL.clearUrl().basename('.html');
    let controller = null;
    switch (pagePath) {
        case 'option':
            controller = new OptionController();
            break;
        default:
            controller = new OptionController();
            break;
    }
    controller.run();
}
route();