__replitDesktop.init();
__replitDesktop.addSidebarItem("Plugins", ()=>{
    const page = __replitDesktop.createAndLoadPage();
    page.innerHTML = `<style>
    #__replitLayer_plugin {
        margin: 30px 10px 0px;
    }
    #__replitLayer_plugins {
        display: flex;
        flex-flow: column;
    }
    .__replitLayer_plugin {
        margin-bottom: 8px;
        height: 50px;
        width: calc(70vw - 5px);
        background: #fff;
        border-radius: 5px;
        font-size: 30px;
        padding-left: 5px;
        display: grid;
        align-content: center;
        font-family: Consolas;
        color: #333;
    }
    #__replitLayer_open {
        width: 200px;
        height: 32pt;
        background: #fff;
        outline: none;
        border-radius: 5px;
        border: 0;
        transition: 300ms box-shadow;
        position: relative;
        top: -32pt;
        cursor: pointer;
        left: 220px;
    }
    #__replitLayer_open:hover {
        box-shadow: 2px 3px #333;
    }
</style>
<div id="__replitLayer_plugin">
    <h1>Plugins</h1> <!-- __replitDesktop.plugins; -->
    <button id="__replitLayer_open">Open</button>
    <div id="__replitLayer_plugins">
        
    </div>
</div>`;
    for(var i = 0; i<__replitDesktop.plugins.length; i++) {
        cp = __replitDesktop.plugins[i].split('.');
        cp.splice(cp.length-1, 1);

        let item = document.createElement("div");
        item.classList.add("__replitLayer_plugin");

        item.innerText = cp.join('.');

        document.querySelector("#__replitLayer_plugins").appendChild(item);

        delete cp;
    }
}).children[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" class="iconify iconify--clarity" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36" style="transform: rotate(360deg);"><path d="M29.81 16H29V8.83a2 2 0 0 0-2-2h-6A5.14 5.14 0 0 0 16.51 2A5 5 0 0 0 11 6.83H4a2 2 0 0 0-2 2V17h2.81A3.13 3.13 0 0 1 8 19.69A3 3 0 0 1 7.22 22A3 3 0 0 1 5 23H2v8.83a2 2 0 0 0 2 2h23a2 2 0 0 0 2-2V26h1a5 5 0 0 0 5-5.51A5.15 5.15 0 0 0 29.81 16zm2.41 7A3 3 0 0 1 30 24h-3v7.83H4V25h1a5 5 0 0 0 5-5.51A5.15 5.15 0 0 0 4.81 15H4V8.83h9V7a3 3 0 0 1 1-2.22A3 3 0 0 1 16.31 4A3.13 3.13 0 0 1 19 7.19v1.64h8V18h2.81A3.13 3.13 0 0 1 33 20.69a3 3 0 0 1-.78 2.31z" class="clr-i-outline clr-i-outline-path-1" fill="currentColor"></path></svg>`;

__replitDesktop.addSidebarItem("Themes", ()=>{
    const page = __replitDesktop.createAndLoadPage();
    page.innerHTML = `<style>
    #__replitLayer_plugin {
        margin: 30px 10px 0px;
    }
    #__replitLayer_plugins1 {
        display: flex;
        flex-flow: column;
    }
    .__replitLayer_plugin {
        margin-bottom: 8px;
        height: 50px;
        width: calc(70vw - 5px);
        background: #fff;
        border-radius: 5px;
        font-size: 30px;
        padding-left: 5px;
        display: grid;
        align-content: center;
        font-family: Consolas;
        color: #333;
    }
    #__replitLayer_open1 {
        width: 200px;
        height: 32pt;
        background: #fff;
        outline: none;
        border-radius: 5px;
        border: 0;
        transition: 300ms box-shadow;
        position: relative;
        top: -32pt;
        cursor: pointer;
        left: 220px;
    }
    #__replitLayer_open1:hover {
        box-shadow: 2px 3px #333;
    }
</style>
<div id="__replitLayer_plugin">
    <h1>Themes</h1> <!-- __replitDesktop.themes; -->
    <button id="__replitLayer_open1">Open</button>
    <div id="__replitLayer_plugins1">
        
    </div>
</div>`;
    for(var i = 0; i<__replitDesktop.themes.length; i++) {
        cp = __replitDesktop.plugins[i].split('.');
        cp.splice(cp.length-1, 1);

        let item = document.createElement("div");
        item.classList.add("__replitLayer_plugin");

        item.innerText = cp.join('.');

        document.querySelector("#__replitLayer_plugins1").appendChild(item);

        delete cp;
    }
}).children[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`;