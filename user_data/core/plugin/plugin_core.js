let __replitDesktop = {ien: false, dil: false};

(function() {
    // https://repl.it/~
    setInterval(function patch() {
        if(location.href == "https://repl.it/~") {
            try {
                if(__replitDesktop.dil == false) { // so it doesn't remove custom menu items when they get clicked ;D
                    let sb = document.querySelector('.sidebar-layout-nav-item-active');
                    sb.remove();

                    __replitDesktop.dil = true;
                }
            } catch(e) {0;};
        }
    }, 100);
    /**
     * @deprecated This function has been moved and is now ran by default
     * @description This function is required to be called before using the addSidebarItem function
     * @returns {null}
     */
    __replitDesktop.init = function() {
        // if(!__replitDesktop.ien) {
        //     __replitDesktop.ien = true;
        //     try { // bug fix
        //         // jsx-2607100739 
        //         let sb = document.querySelector('.sidebar-layout-nav-item-active');
        //         sb.remove();
        //     } catch(e) {0;};
        // }
    };
    /**
     * @description Add an item to the sidebar
     * @param {string} text
     * @param {string:function} url 
     * @param {boolean} enabled 
     * @returns {HTMLAnchorElement} The element created
     */
    __replitDesktop.addSidebarItem = function(text, url="/~", enabled=false) {
        const item = document.querySelector('.jsx-2607100739');
        const sidebar = document.querySelector('.sidebar-layout-nav-top');

        let nn = item.cloneNode(true); // create "new node"
        nn.querySelector('.label').innerText = text;

        // .idebar-layout-nav-item-active

        nn.removeAttribute("href");
        nn.classList.add('__replitLayer_item');
        if(typeof url != "function") {nn.href = url;} else {nn.addEventListener('click', ()=>{
            try{
            let sl = document.querySelector('.sidebar-layout-nav-item-active');
            sl.classList.remove('sidebar-layout-nav-item-active');

            if(!sl.classList.contains('__replitLayer_item')) {sl.addEventListener('click', ()=>{location.reload();});}} catch(e) {0}

            nn.classList.add("sidebar-layout-nav-item-active");
            url(nn);
        });};

        if(!enabled) {nn.classList.remove('sidebar-layout-nav-item-active')} else {nn.classList.add('sidebar-layout-nav-item-active');};
        sidebar.appendChild(nn);
        console.log(nn);

        document.querySelectorAll('.jsx-2607100739')?.[15].remove();

        return nn;
    };

    __replitDesktop.createAndLoadPage = function() {
        // .jsx-132086333 .content || document.querySelectorAll('.jsx-132086333 .content')[3];
        try {
            document.querySelectorAll('.jsx-2888589246')[1].innerHTML = "";
            return document.querySelectorAll('.jsx-2888589246')[1];
        } catch(e) {0;};
        try {
            document.querySelectorAll('.jsx-132086333 .content')[3].innerHTML = "";
            return document.querySelectorAll('.jsx-132086333 .content')[3];
        } catch(e) {0;};
    }
})();