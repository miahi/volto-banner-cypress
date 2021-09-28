# volto-staging-banner

[![Releases](https://img.shields.io/github/v/release/eea/volto-staging-banner)](https://github.com/eea/volto-staging-banner/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-staging-banner%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-staging-banner/job/master/display/redirect)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-staging-banner%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-staging-banner/job/develop/display/redirect)

[Volto](https://github.com/plone/volto) add-on

## Features

A customizable banner to highlight to the user that the website is in demo, dev
or staging state.

It is configurable through the `settings.stagingBanner.demoIdentifiers`
(list of identifiers such as e.g. `true`, `dev`, `demo` discoverable from reading
the value of `settings.stagingBanner.envRuntimeVariable` which by default reads
the value of `RAZZLE_DEMO_SITE` environment variable), the parent element
where to add the banner (`settings.stagingBanner.parentNodeSelector`) and through
the addition of extra css classes (`settings.stagingBanner.classes`).

If you want to customize the banner header and content, you can use `RAZZLE_BANNER_HEADER` and `RAZZLE_BANNER_MESSAGE` env vars, respectively.

### Enabled by default

If you add this addon to `package.json` `addons` sections by default it will be
enabled and banner will show up on the site.

To disable it start your volto instance as such:

```
    RAZZLE_DEMO_SITE=false yarn start
```

as by default we either check if `RAZZLE_DEMO_SITE` is not found or if it's set
to any of the values from `settings.StagingBanner.demoIdentifiers`.

This environment variable can also be set from Rancher templates so that you
don't need to manually add or remove it.

Have a look at the configuration options in `src/index.js` as you can override
the settings to use other environment variables and demo identifiers if needed
in order to display the banner in other conditions.

![image](https://user-images.githubusercontent.com/38378382/130647224-754af234-2de8-4d31-8eaa-6fa673df08a4.png)

## Getting started

### Try volto-staging-banner with Docker

1. Get the latest Docker images

   ```
   docker pull plone
   docker pull plone/volto
   ```

1. Start Plone backend

   ```
   docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone
   ```

1. Start Volto frontend

   ```
   docker run -it --rm -p 3000:3000 --link plone -e ADDONS="@eeacms/volto-staging-banner" plone/volto
   ```

1. Go to http://localhost:3000

### Add volto-staging-banner to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
  "addons": [
      "@eeacms/volto-staging-banner"
  ],

  "dependencies": {
      "@eeacms/volto-staging-banner": "^1.0.0"
  }
  ```

- If not, create one:

  ```
  npm install -g yo @plone/generator-volto
  yo @plone/volto my-volto-project --addon @eeacms/volto-staging-banner
  cd my-volto-project
  ```

1. Install new add-ons and start Volto:

   ```
   yarn
   yarn start
   ```

2. Go to http://localhost:3000

3. Banner with demo message will appear by default before the header section.

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-staging-banner/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-staging-banner/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
