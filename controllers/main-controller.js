'use strict';
const $ = require("jquery");
import BaseController from "./base-controller.js";
import AffMaker from "@aff/aff-maker.js";
import SkipQC from "@mytskip/skipqc.js"
//let skipQcRun = require('@mytskip/skipqc.js');
export default class MainController extends BaseController {
    constructor() {
        super();
        this.pageRun = true;
        this.affMaker = new AffMaker();
    }

    run() {
        $(document).ready(async function() {
            this.affMaker.runAff();
            this.main();
        }.bind(this));
    }

    async main() {
        await Settings.setup();
        var appActive = Settings.getValue('appActive', true);
        if (appActive) {
            SkipQC.skip();
        }
    }
}

let controller = new MainController();
controller.run();