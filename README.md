# SPA-template

Client-side Single-Page-Application Template

## Usage

### Install dependencies

NodeJS >= v14.17.3

```shell
npm install
```

### Run developement server

Install gulp Task Runner globally: `npm install gulp -g`

```shell
gulp
```

### Info

* Links with `data-link` attribute prevent a reload of the page which is useful for links linking to an intern page
  
  ```html
  <a href="#settings" data-link>Einstellungen</a>
  ```

* Bootstrap Icons can be used everywhere (Webfont Method) https://icons.getbootstrap.com/:
  
  ```html
  <i class="bi bi-person-circle"></i>
  ```
