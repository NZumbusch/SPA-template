main.templates["Error"] = () => {
    let html = ``;

    return new Promise((resolve, reject) => {
        html += `
        <div class="container">
            <div class="card mt-5">
                <div class="card-body">
                    <h1 class="card-title">Error</h1>
                    <p class="card-text">
                        Rip
                    </p>
                </div>
            </div>
        </div>`;
        
        resolve({html: html, callback: () => {

        }});
    })
}