main.templates["Login"] = () => {
    let html = ``;

    return new Promise((resolve, reject) => {
        html += `
        <div class="wrapper login-wrapper">
            <div class="form-box">
                <div class="login-container">
                    <h1 class="login-welcome-text">Welcome</h1>
                    
                    <form class="form login-form">
                        <input type="text" placeholder="Username" class="login-username">
                        <input type="password" placeholder="Password" class="login-password">
                        <button id="login-button">Login</button>
                    </form>
                </div>
            </div>
            
            <ul class="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>`;
        
        resolve({html: html, callback: () => {
            document.getElementById("login-button").addEventListener("click", (e) => {
                e.preventDefault();

                document.querySelector(".login-username").value = document.querySelector(".login-username").value.replace(/ /g, '')

                let form = new FormData();
                form.append("type", "login");
                form.append("password", document.querySelector(".login-password").value);
                form.append("mail", document.querySelector(".login-username").value);

                axios
                    .post("API-Endpoint", form)
                    .then((resolve) => {
                        if (resolve.data.success === true) {
                            main.utility.fadeOutEffect(document.querySelector(".login-form"));
                            document.querySelector(".login-wrapper").classList.add("form-success")
                            setTimeout((e) => {document.querySelector(".login-welcome-text").innerHTML += "."}, 500)
                            setTimeout((e) => {document.querySelector(".login-welcome-text").innerHTML += "."}, 1000)
                            setTimeout((e) => {document.querySelector(".login-welcome-text").innerHTML += "."}, 1500)
                            setTimeout((e) => {document.querySelector(".login-welcome-text").innerHTML += "."}, 2000)
                            setTimeout((e) => {window.location.hash = '';}, 2500)
                        }
                    }, (reject) => {throw new Error(reject)})
                    .catch((e) => main.debug)
            })
        }});
    })
}