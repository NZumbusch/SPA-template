
class ScriptHandler  {
    /*

    Used in order to manage the including of different scripts, 
    f.e. to include the /components/login.js script when the login is 
    showed, else the script wont be loaded in order to minimize the sent 
    data & file size.
    Use the constructor in order to setup the initial scripts to include, 
    after that include more scripts by using the loadScripts function with its optional 
    parameter (custumScripts=[]) set to an array of script paths you want to be loaded.

    */




    constructor (main, scripts) {
        this.main = main;

        // Takes main object and array of script paths

        // Scripts in array, each script as dictionary with path
        this.scripts = scripts;

        // scripts already executed
        this.executedScripts = [];

        // Create directory for scripts
        if (document.querySelectorAll("body > .scripts").length <= 0) {
            document.querySelector("body").innerHTML += `<div class="scripts"></div>`;
        }

        
        // Loads all necessary scripts at startup
        this.loadScripts();
    }


    // Load all included scripts
    loadScripts (custumScripts=false) {
        // CustumScripts is an array of dictionaries with the path and the optional callback entry and replaces normal usage of included scripts in this.scripts and appends loaded paths to this.custumScripts in order to prevent double usage

        if (custumScripts === false) {
            this.scripts.forEach((element, index) => {
                this.loadScript(element.path);
            })
        } else if (typeof custumScripts === "object") {
            try {
                custumScripts.forEach((element, index) => {
                    // If callback function set execute it on resolve, else just load Script and exit
                    if (element.callback !== undefined) {
                        this.loadScript(element.path)
                            .then(element.callback, (reject) => {throw new Error(reject);})
                            .catch((e) => this.main.debug(e, 1))
                    } else {
                        this.loadScript(element.path);
                    }
                });
            } catch (e) {
                this.main.debug(e, 1)
            }
        }
    }


    // Internal function to load script, path loaded in context of index.html, which means ./dist/ or ./dist/components/
    loadScript (path) {
        try {
            if (document.querySelectorAll("body > .scripts").length <= 0) {
                document.querySelector("body").innerHTML += `<div class="scripts"></div>`;
            }

            if (this.checkScriptLoaded(path)) {
                if (this.executedScripts.indexOf(path) === -1) {
                    return new Promise((resolve, reject) => {

                        // Similar to .checkScriptLoaded()
                        for (let element of document.querySelectorAll("body > .scripts > script")) {
                            if (element.getAttribute("src") === path) {
                                element.addEventListener("load", () => {
                                    resolve();
                                }, false);
                            }
                        }
                    })
                } else {
                    return new Promise((resolve, reject) => {
                        // Instantly resolve Promise as script is already loaded
                        resolve();
                    })
                }
            }

            // Actually create and load script
            let newScript = document.createElement("script");
            newScript.src = path;
            document.querySelector("body > .scripts").appendChild(newScript);

            // Return promise on load of script in order to be able to use .then(callback)
            return new Promise((resolve, reject) => {
                newScript.addEventListener("load", () => {
                    this.executedScripts.push(path);
                    resolve();
                }, false);
            })
        } catch (e) {
            this.main.debug(e, 1);
        }
    }



    functionLoad (callback, custumScripts) {
        // Used to load libraries if needed and always execute callback after. custumScripts is array of paths

        let promises = []; // promises for callbacks
        custumScripts.forEach((element, index) => {promises.push(this.loadScript(element));})

        // Execute callback when all promises resolved
        Promise
            .all(promises)
            .then((values) => {
                callback();
            }, (reject) => {throw new Error(reject)})
            .catch((error) => {this.main.debug(error, 1)})
    }


    promiseLoad (custumScript)  {
        return this.loadScript(custumScript);
    }


    promisesLoad (custumScripts)  {
        let promises = []; // promises for callbacks
        custumScripts.forEach((element, index) => {promises.push(this.loadScript(element));})

        return Promise.all(promises);
    }


    checkScriptLoaded (path) {
        // Checks if script with path is already loaded (in body > .scripts)

        for (let element of document.querySelectorAll("body > .scripts > script")) {
            // Using .getAttribute as .src would fill out the relational path
            if (element.getAttribute("src") === path) {
                return true;
            }
        }
        return false;
    }
}
