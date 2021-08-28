main.templates["Dashboard"] = () => {
    let html = ``;

    return new Promise((resolve, reject) => {
        html += `
        <div class="container">
            <div class="card mt-5">
                <div class="card-body">
                    <h1 class="card-title">SPA-Manager</h1>
                    <p class="card-text">
                        This is a SPA-Template built from scratch. It allows for developement using js (compiled with babel) and scss.
                        The custum script Handler allows for just in time loading for necessary scripts and helps to improve the first page load.
                    </p>
                </div>
            </div>
            <div class="card mt-5">
                <div class="card-body">
                    <h1 class="card-title">Versions</h1>
                    <p class="card-text">
                        <br>Version 0.1:
                        <br>- SPA-Functionality
                        <br>- ScriptHandler
                    </p>
                </div>
            </div>
        </div>`;
        resolve({html: html, callback: () => {

        }});
    })
}