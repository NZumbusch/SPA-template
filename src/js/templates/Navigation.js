main.templates["Navigation"] = () =>{
    let html = ``;

    return new Promise((resolve, reject) => {
        resolve({html: `
        <header class="navbar">
            <a href="#" data-link class="logo">SPA-Template</a>
            <input class="menu-btn" type="checkbox" id="menu-btn" />
            <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
            <ul class="menu">
                <li><a href="#login" data-link><i class="bi bi-bell"></i>Login</a></li>
                <li><a href="#impressum" data-link><i class="bi bi-bell"></i>Impressum</a></li>
            </ul>
        </header>

        <div class="navbar-sidebar-container">
            <div class="navbar-sidebar">
                <img class="navbar-sidebar-logo" src="/client/assets/img/logo.png">
                <h1 class="navbar-sidebar-heading"><span onclick="window.location.hash='';">SPA-Template</span></h1>
                <ul class="navbar-sidebar-list">
                    <li class="navbar-sidebar-list-link"><a class="navbar-sidebar-list-link-element" href="#login" data-link onclick="hide_navbar();"><i class="bi bi-bell navbar-sidebar-list-link-element-icon"></i>Login</a></li>
                    <li class="navbar-sidebar-list-link"><a class="navbar-sidebar-list-link-element" href="#impressum" data-link onclick="hide_navbar();"><i class="bi bi-chat-dots navbar-sidebar-list-link-element-icon"></i>Impressum</a></li>
                </ul>
            </div>
        </div>
        `, callback: () => {
            document.querySelector(".menu-icon").addEventListener("click", (e) => {
                document.querySelector(".navbar-sidebar-container").classList.toggle("shown");
            })

            document.querySelector(".navbar-sidebar-container").addEventListener("click", (e) => {
                e = e || window.event;

                let targ = e.target  ||  e.srcElement  ||  e;
                if (targ.nodeType == 3) targ = targ.parentNode; // Safari bug
                
                if (targ !== e.currentTarget) {
                    return;
                }

                document.querySelector(".navbar-sidebar-container").classList.toggle("shown");
            })
        }});
    })
}


function hide_navbar () {
    document.querySelector(".navbar-sidebar-container").classList.remove("shown");
}