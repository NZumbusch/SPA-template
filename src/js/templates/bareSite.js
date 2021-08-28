var currentSiteTemplate = 'f';

function bareSite (main) {
    let html = ``;


    return new Promise((resolve, reject) => {
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
                        html += `${values[0].html}`;

                        document.getElementById("app").innerHTML = html;


                        values.forEach((element, index) => {
                            if (element.callback !== undefined && element.callback !== null) {
                                element.callback();
                            }
                        })


                        // DOESNT WORK AND ISNT NEEDED?? document.querySelector(".site-content").style.top = document.querySelector(".navbar").clientHeight + 'px';


                        currentSiteTemplate = current_route;
                        resolve();
                    }, (mistake) => {main.debug("Unable to get HTML code. (" + e + ")"); reject({type: "Scripterror", error: e})})
                    .catch((e) => {main.debug("Unable to get HTML code. (" + e + ")"); reject({type: "Scripterror", error: e})})
            })
            .catch((e) => {main.debug("Unable to include libraries code. (" + e + ")"); reject({type: "Includeerror", error: e})})
    })
}