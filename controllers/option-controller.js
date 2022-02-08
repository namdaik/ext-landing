'use strict';
const $ = require("jquery");
import BaseController from "./base-controller.js";

export default class OptionController extends BaseController {
    constructor() {
        super();
        this.pageRun = true;
    }

    run() {
        $(document).ready(async function() {
            this.main();
            this.addOtherQueryEvent();
        }.bind(this));
    }

    async main() {
        await Settings.setup();
        this.appActive = Settings.getValue('appActive', true);
        $('#cbskip').prop('checked', this.appActive);
    }
    // thêm các jquery event, JavaScript event
    addOtherQueryEvent() {
        ////////////////
        $(document).on('change', '#cbskip', function(e) {
            Settings.update({
                appActive: this.checked
            });
        });
        
        // $(document).on('click', '#close', function(e) {
        //     window.close();
        //   });
    }
}
//export default FbAccountController;
let controller = new OptionController();
controller.run();