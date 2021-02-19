const { BrowserWindow, app, shell, Notification } = require("electron");
const cm = require("electron-context-menu");
const fs = require('fs');
const fse = require('fs-extra');
const asar = require('asar');

function getAppRoot() {
    if(process.platform === 'win32') {
        return app.getAppPath()+'\\..\\..\\';
    }  else {
        return app.getAppPath()+'\\..\\..\\';
    }
}

let window;
const appDataPath = app.getPath("appData");
const appPath = getAppRoot();

function isInNode() {
    if(fs.existsSync(appPath+'\\repl.it.exe') || fs.existsSync(appPath+'\\repl.it.desktop')) {
        return true;
    }
    return false;
}

console.log(isInNode());

const install = function() { // changes made for usage with the executables
    if(!fs.existsSync(appDataPath+"/.repldesktop")) { // we need to "install" files
        if(!isInNode()) {
            console.log("Installing files.");

            fs.mkdirSync(appDataPath+'/.repldesktop');

            fse.copySync('user_data', appDataPath+'/.repldesktop/user_data');
            fse.copySync('preloads', appDataPath+'/.repldesktop/preloads');

            console.log("Files installed.");
        } else {
            console.log("Installing files.");

            console.log(appPath);
            let dst = appPath+'/resources/installation';
            console.log('Unpacking into: '+dst);
            asar.extractAll(appPath+'/resources/app.asar', dst);

            fs.mkdirSync(appDataPath+'/.repldesktop');

            fse.copySync(dst+'/user_data', appDataPath+'/.repldesktop/user_data');
            fse.copySync(dst+'/preloads', appDataPath+'/.repldesktop/preloads');

            if(!fs.existsSync(appDataPath+'/.repldesktop/user_data/plugins')) {
                fs.mkdirSync(appDataPath+'/.repldesktop/user_data/plugins');
            }
            if(!fs.existsSync(appDataPath+'/.repldesktop/user_data/themes')) {
                fs.mkdirSync(appDataPath+'/.repldesktop/user_data/themes');
            }

            fs.rmdir(dst, { recursive: true }, ()=>{});

            console.log("Files installed.");
        }
    }
}
install();

const uninstall = function() {
    if(fs.existsSync(appDataPath+'/.repldesktop')) {
        console.log("Uninstalling files.");

        fs.rmdir(appDataPath+'/.repldesktop', { recursive: true }, (err)=>{
            if(err) throw err;
            console.log("Uninstalled, reinstalling now.")

            install();
    
            console.log("Reinstalled.");
        });
    }
}

cm({
    showCopyImageAddress: true,
    showSaveImage: true,
    showSaveImageAs: true,
    prepend: (params, bwin)=>[
        {
            role: "zoomIn",
            label: "Zoom In"
        },
        {
            role: "zoomOut",
            label: "Zoom Out"
        },
        {
            role: "resetZoom",
            label: "Reset Zoom (to Default)"
        },
        {
            label: "Reinstall Files",
            visible: true,
            click: ()=>{
                uninstall();
                window.webContents.reload();
            }
        }
    ],
    labels: {
        cut: "Cut Text",
        copy: "Copy Text",
        paste: "Paste Text",
        save: "Save Text",
        saveImage: "Save Image",
        saveImageAs: "Save Image As ...",
        copyLink: "Copy Link",
        copyImageAddress: "Copy Address",
        inspect: "Inspect Element"
    }
});

const regexEscape = function(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
const ig = (string, char) => {
    const regex = new RegExp(regexEscape(char), "gmi");
    return string.replace(regex, `\\${char}`);
}
const f = (path)=>{
    return fs.readFileSync(path, "utf-8");
}
const injectHtml = function(window, body, at="end") {
    /*if(at=="end") {
        document.body.innerHTML += code;
    } else {
        let __replitElectroBody = document.body.innerHTML;
        document.body.innerHTML = code+__replitElectroBody;
    }*/
    if(at=="end") {
        window.webContents.executeJavaScript("document.body.innerHTML+=`"+ig(body, "`")+"`;");
    } else {
        window.webContents.executeJavaScript("const __replBody = document.body.innerHTML; document.body.innerHTML=`"+ig(body, '`')+"` + __replBody;");
    }
}
const storeSessionCookies = function(session={cookies:{get:()=>{return [];}}}) {
    session.cookies.get({}).then(cookies=>{
        console.log("Cookies,", JSON.stringify(cookies));
        fs.writeFileSync(appDataPath+'/.repldesktop/user_data/cookies.json', JSON.stringify(cookies), "utf-8");
    });
}

const getFiles = function(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = files[i];
        console.log(name);
        if (fs.statSync(dir+'/'+name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(dir+"/"+name);
        }
    }
    return files_;
}
const getFileNames = function(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = files[i];
        console.log(name);
        if (fs.statSync(dir+'/'+name).isDirectory()){
            getFileNames(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

const start = function() {
    // new Notification({
    //     title: "Hi",
    //     body: getAppRoot()
    // }).show();
    console.log(getAppRoot());
    window = new BrowserWindow({
        backgroundColor: "#eeeeee",
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 800,
        webPreferences: {
            // nodeIntegration: true,
            // enableRemoteModule: true,
            preload: appDataPath+"/.repldesktop/preloads/load.js",
            enableRemoteModule: true,
            partition: "persist:replit"
        }
    });

    window.loadURL("https://repl.it");

    function loadScripts() {
        console.log("Loading scripts.");

        // Load PLUGIN modules
        window.webContents.insertCSS(f(appDataPath+'/.repldesktop/user_data/core/theme/theme_core.css'));
        let allPlugins = '[]';
        let allThemes = '[]';
        try {
            allPlugins = JSON.stringify(getFileNames(appDataPath+"/.repldesktop/user_data/plugins/"));
        } catch(e) {console.log(e);};
        try {
            allThemes = JSON.stringify(getFileNames(appDataPath+"/.repldesktop/user_data/themes/"));
        } catch(e) {console.log(e);};
        window.webContents.executeJavaScript(f(appDataPath+'/.repldesktop/user_data/core/plugin/plugin_core.js')+"\n__replitDesktop.plugins="+allPlugins+";\n__replitDesktop.themes="+allThemes+";");

        // Insert CSS and JS
        window.webContents.insertCSS(f(appDataPath+"/.repldesktop/preloads/load.css"));

        // Load plugins
        let files = getFiles(appDataPath+"/.repldesktop/user_data/plugins/"); // [file_name, file_name]
        let builtin = getFiles(appDataPath+'/.repldesktop/user_data/core/plugin/builtin-plugins/');

        for(i in builtin) {
            let cf = builtin[i];
            // console.log(cf); // file_name
            console.log(cf);
            let fc = f(cf);

            window.webContents.executeJavaScript(fc);
        }
        for(i in files) {
            let cf = files[i];
            // console.log(cf); // file_name
            let fc = f(cf);
            
            window.webContents.executeJavaScript(fc);
        }
    }
    
    // On Website Load
    window.webContents.on("did-navigate-in-page", loadScripts);

    window.on('ready-to-show', ()=>{
        window.show();
    });

    window.webContents.on("new-window", (event, url)=>{
        event.preventDefault();

        shell.openExternal(url);
    });
    window.on("close", (event)=>{
        storeSessionCookies(window.webContents.session);
    });

    window.show();

    for (let cookie of storedCookies) {
        let pageUrl = 'https://' + cookie.domain.replace(/^\./, '') + '/'
        let cookiedata = {
            url: pageUrl,
            name: cookie.name,
            value: cookie.value,
            path: cookie.path || '/',
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
        }
        window.webContents.session.cookies.set(cookiedata);
    }
    window.webContents.on('did-navigate', (event, url) => {
        storeSessionCookies(window.webContents.session);
    });

    window.webContents.on('did-navigate-in-page', (event, url, isMainFrame) => {
        storeSessionCookies(window.webContents.session);
    });
}

app.whenReady().then(start);
app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length === 0) {
        start();
    }
});