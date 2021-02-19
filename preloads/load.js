const { remote } = require("electron");
let did = false;

setInterval(()=>{
    try {
        document.querySelectorAll("#__replitLayer_open").forEach(elm=>{
            if(!elm.did) {
                elm.addEventListener('click', function clicked() {
                    remote.shell.openPath(remote.app.getPath('appData')+'\\.repldesktop\\user_data\\plugins');
                    console.log("Loading "+remote.app.getPath('appData')+'\\.repldesktop\\user_data\\plugins');
                });
                elm.did = true;
            }
        });
        document.querySelectorAll("#__replitLayer_open1").forEach(elm=>{
            if(!elm.did) {
                elm.addEventListener('click', function clicked() {
                    remote.shell.openPath(remote.app.getPath('appData')+'\\.repldesktop\\user_data\\themes');
                    console.log("Loading "+remote.app.getPath('appData')+'\\.repldesktop\\user_data\\themes');
                });
                elm.did = true;
            }
        });
    } catch(e) {
        return 0;
    }
}, 100);