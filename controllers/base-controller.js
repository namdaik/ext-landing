const $ = require("jquery");
const devtoolsDetect = require("devtools-detect");
import storage from '@helpers/storage';
import dataTable from "@modules/data-table/data-table.js";
import Ruoi from "@ruoi/ruoi.js";
import Tim from "@tim/tim.js";

export default class BaseController {
    constructor() {
        this.dataTable = dataTable;
        this.currentModel = null;
        this.dataTable.createButton = ['show', 'edit', 'delete'];
    }
    run() {
        try {
            global.extPageType = "option";
            $(document).ready(async function() {
                logInfo("AppConfigs:", AppConfigs);
                this.main();
            }.bind(this));
        } catch (e) {
            alert("Đã có lỗi xảy ra. Tải lại trang hoặc cài lại app và liên hệ admin để khắc phục");
            throw e;
        }
    }
    // chạy hàm main ngay sau khi load file js
    //main();
    // hàm chính chạy ngay lúc bắt đầu;
    main() {
        //chạy event

    }

    //lắng nghe sự kiện từ background, trang thường
    chromeListeningEvents() {
        ChromeServices.listenerMessage(
            function(message, sender, sendResponse) {
                if (AppConfigs.SHOW_LOG_CHROME_EVENT) {
                    logInfo('Lắng nghe được sự kiện chrome runtime: ', message);
                }
                return true;
            }.bind(this)
        );
    }
    //lắng nghe sự kiện từ background, trang thường
    chromeListeningDefaultEvents() {
        ChromeServices.listenerMessage(
            function(message, sender, sendResponse) {
                if (AppConfigs.SHOW_LOG_CHROME_EVENT) {
                    logInfo('Default Lắng nghe được sự kiện chrome runtime: ', message);
                }
                switch (message.type) {
                    case 'update-settings':
                        Settings.setData(message.data);
                        if (AppConfigs.SHOW_LOG_UPDATE_SETTINGS) {
                            logInfo('client-setting-updated', Settings);
                        }
                        sendResponse(true);
                        break;
                }
                this.pageAwaitModal(false);
                return true;
            }.bind(this)
        );
    }

    ruoiBay(time = 1) {
        let ruoi = new Ruoi();
        ruoi.run(time);
    }
    mouseTim(numberTim = 3) {
        // setTimeout(() => {
        //     let tim = new Tim();
        //     tim.run(numberTim);
        // }, 100);
        let tim = new Tim();
        tim.run(numberTim);
        
    }
}