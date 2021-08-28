var currentSiteTemplate = 'f';

function Site (main) {
    let html = ``;

    if (document.querySelectorAll(".site-content").length <= 0) {
        // No Navbar/Footer set, doing everything from scratch
        return new Promise((resolve, reject) => {
            main.scriptHandler.promisesLoad([
                "./dist/script/templates/Navigation.js",
                "./dist/script/templates/" + routes[current_route].js + ".js",
                "./dist/script/templates/Footer.js"
            ])
                .then((values) => {
                    Promise.all(
                        [
                            main.templates["Navigation"](),
                            main.templates[routes[current_route].js](),
                            main.templates["Footer"]()
                        ]
                    )
                        .then((values) => {
                            
                            html += values[0].html;
                            html += `<div class="site-content">${values[1].html}</div>`;
                            html += values[2].html;

                            document.getElementById("app").innerHTML = html;

                            values.forEach((element, index) => {
                                if (element.callback !== undefined && element.callback !== null) {
                                    element.callback();
                                }
                            })

                            let navbar = document.querySelector("header");

                            /*
                            let navheight = navbar.offsetHeight;
                            navheight += parseInt(window.getComputedStyle(navbar).getPropertyValue('margin-top'));
                            navheight += parseInt(window.getComputedStyle(navbar).getPropertyValue('margin-bottom'));
                            */

                            currentSiteTemplate = current_route;
                            resolve();
                        }, (mistake) => {main.debug("Unable to get HTML code. (" + e + ")"); reject({type: "Scripterror", error: e})})
                        .catch((e) => {main.debug("Unable to get HTML code. (" + e + ")"); reject({type: "Scripterror", error: e})})
                })
                .catch((e) => {main.debug("Unable to include libraries code. (" + e + ")"); reject({type: "Includeerror", error: e})})
        })
    } else {
        // Already set Navigation and Footer, no need to do it again

        return new Promise((resolve, reject) => {
            if (currentSiteTemplate == current_route) {
                resolve();
            } else {
                main.scriptHandler.promisesLoad([
                    "./dist/script/templates/" + routes[current_route].js + ".js",
                ])
                    .then((values) => {
                        Promise.all(
                            [
                                main.templates[routes[current_route].js]()
                            ]
                        )
                            .then((values) => {
                                document.querySelector(".site-content").innerHTML = values[0].html;
    
                                values.forEach((element, index) => {
                                    if (element.callback !== undefined && element.callback !== null) {
                                        element.callback();
                                    }
                                })
    
                                
                                currentSiteTemplate = current_route;
                                resolve();
                            }, (mistake) => {main.debug("Unable to get HTML code. (" + e + ")"); reject({type: "Scripterror", error: e})})
                            .catch((e) => {main.debug("Unable to get HTML code. (" + e + ")"); reject({type: "Scripterror", error: e})})
                    })
                    .catch((e) => {main.debug("Unable to include libraries code. (" + e + ")"); reject({type: "Includeerror", error: e})})
            }       
        })
    }
}