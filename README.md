[![Netlify Status][netlify-image] ][netlify-url]

[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]

[dependencies-image]: https://david-dm.org/ljosberinn/resources-helper.png
[dependencies-url]: https://david-dm.org/ljosberinn/resources-helper
[devdependencies-image]: https://david-dm.org/ljosberinn/resources-helper/dev-status.png
[devdependencies-url]: https://david-dm.org/ljosberinn/resources-helper#info=devDependencies
[netlify-image]: https://api.netlify.com/api/v1/badges/b9e81f31-f592-434d-a137-20c710743c2d/deploy-status
[netlify-url]: https://app.netlify.com/sites/resources-helper/deploys

# Technologies

## Host

- [Netlify](https://netlify.com)

## Cron

- [cron-job.org](https://cron-job.org/en/)

## i18n

- [react-i18next](https://github.com/i18next/react-i18next)
- client-side detection via [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)
- caching via [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend)
- retrieving via [i18next-xhr-backend](https://github.com/i18next/i18next-xhr-backend)

## Error Tracking

- [Sentry](https://sentry.io/)
- [LogRocket](https://logrocket.com/)

## Styling

- SCSS via node-sass
- [bulma](https://bulma.io/) via [rbx](https://github.com/dfee/rbx)
- themed via [bulmaswatch](https://github.com/jenil/bulmaswatch)
- Icons via FontAwesome through [react-fontawesome](https://github.com/FortAwesome/react-fontawesome)

## Backend

- [Netlify Functions](https://www.netlify.com/products/functions/)
- [FaunaDB](https://fauna.com/)

## Auth

- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/) (GitHub & Google & mail as provider)
- implemented via [react-netlify-identity](https://github.com/sw-yx/react-netlify-identity)

## SEO

- [react-helmet](https://github.com/nfl/react-helmet)

## Misc

- [react-countup](https://github.com/glennreyes/react-countup)
- [react-reveal](https://www.react-reveal.com/docs/) & [react-awesome-reveal](https://github.com/dennismorello/react-awesome-reveal)
- [react-router](https://reacttraining.com/react-router/web/guides/quick-start)

## Help translating

- fork the repo
- in /fauna-translation, navigate to the language you want to change
- or add your language folder (copy over the file from another language and adapt the names)
- well, translate...
- file a Pull Request

# Development

## Requirements

- [Node.js](https://nodejs.org/en/)
- preferably [yarn](https://yarnpkg.com/en/)
- preferably [VSCode](https://code.visualstudio.com/insiders/)

```bash
git clone https://github.com/ljosberinn/resources-helper
cd resources-helper
yarn install
code .
```
