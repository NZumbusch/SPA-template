main.templates["Footer"] = () => {
    let html = ``;

    return new Promise((resolve, reject) => {
        resolve({html: `
            <footer class="footer-bar">
                <a href="#impressum" data-link>See the Impressum!</a>

                <a href="#impressum" data-link>&copy 2021 NZumbusch</a>
            </footer>
        `});
    })
}