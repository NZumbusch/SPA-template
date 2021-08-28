main.templates["Impressum"] = () => {
    let html = ``;

    return new Promise((resolve, reject) => {
        resolve({html: `
        <div class="container">
            <div class="card mt-5">
                <div class="card-body">
                    <h1 class="card-title">Impressum</h1>

                    <p class="card-text">
                        This is an Open-Source-Project published under the MIT-Licence. I'am happy for every idea/request sent my way, just sumbit a PR in the public git repository.
                    </p>

                    <p class="card-text">
                        &copy 2021 NZumbusch
                    </p>
                </div>

                ${main.utility.containerFooter()}
            </div>
        </div>
        `});
    })
}