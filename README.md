# volto-banner

[![Releases](https://img.shields.io/github/v/release/eea/volto-banner)](https://github.com/eea/volto-banner/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-banner%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-banner/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-banner-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-banner-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-banner-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-banner-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-banner-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-banner-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-banner-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-banner-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-banner%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-banner/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-banner-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-banner-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-banner-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-banner-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-banner-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-banner-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-banner-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-banner-develop)

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

### Try volto-banner with Docker

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
   docker run -it --rm -p 3000:3000 --link plone -e ADDONS="@eeacms/volto-banner" plone/volto
   ```

1. Go to http://localhost:3000

### Add volto-banner to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
  "addons": [
      "@eeacms/volto-banner"
  ],

  "dependencies": {
      "@eeacms/volto-banner": "^1.0.0"
  }
  ```

- If not, create one:

  ```
  npm install -g yo @plone/generator-volto
  yo @plone/volto my-volto-project --addon @eeacms/volto-banner
  cd my-volto-project
  ```

1. Install new add-ons and start Volto:

   ```
   yarn
   yarn start
   ```

2. Go to http://localhost:3000

3. Banner with demo message will appear by default before the header section.

## Release

### Automatic release using Jenkins

*  The automatic release is started by creating a [Pull Request](../../compare/master...develop) from `develop` to `master`. The pull request status checks correlated to the branch and PR Jenkins jobs need to be processed successfully. 1 review from a github user with rights is mandatory.
* It runs on every commit on `master` branch, which is protected from direct commits, only allowing pull request merge commits.
* The automatic release is done by [Jenkins](https://ci.eionet.europa.eu). The status of the release job can be seen both in the Readme.md badges and the green check/red cross/yellow circle near the last commit information. If you click on the icon, you will have the list of checks that were run. The `continuous-integration/jenkins/branch` link goes to the Jenkins job execution webpage.
* Automated release scripts are located in the `eeacms/gitflow` docker image, specifically [js-release.sh](https://github.com/eea/eea.docker.gitflow/blob/master/src/js-release.sh) script. It  uses the `release-it` tool.
* As long as a PR request is open from develop to master, the PR Jenkins job will automatically re-create the CHANGELOG.md and package.json files to be production-ready.
* The version format must be MAJOR.MINOR.PATCH. By default, next release is set to next minor version (with patch 0).
* You can manually change the version in `package.json`.  The new version must not be already present in the tags/releases of the repository, otherwise it will be automatically increased by the script. Any changes to the version will trigger a `CHANGELOG.md` re-generation.
* Automated commits and commits with [JENKINS] or [YARN] in the commit log are excluded from `CHANGELOG.md` file.

### Manual release from the develop branch ( beta release )

#### Installation and configuration of release-it

You need to first install the [release-it](https://github.com/release-it/release-it)  client.

   ```
   npm install -g release-it
   ```

Release-it uses the configuration written in the [`.release-it.json`](./.release-it.json) file located in the root of the repository.

Release-it is a tool that automates 4 important steps in the release process:

1. Version increase in `package.json` ( increased from the current version in `package.json`)
2. `CHANGELOG.md` automatic generation from commit messages ( grouped by releases )
3. GitHub release on the commit with the changelog and package.json modification on the develop branch
4. NPM release ( by default it's disabled, but can be enabled in the configuration file )

To configure the authentification, you need to export GITHUB_TOKEN for [GitHub](https://github.com/settings/tokens)

   ```
   export GITHUB_TOKEN=XXX-XXXXXXXXXXXXXXXXXXXXXX
   ```

 To configure npm, you can use the `npm login` command or use a configuration file with a TOKEN :

   ```
   echo "//registry.npmjs.org/:_authToken=YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" > .npmrc
   ```

#### Using release-it tool

There are 3 yarn scripts that can be run to do the release

##### yarn release-beta

Automatically calculates and presents 3 beta versions - patch, minor and major for you to choose ( or Other for manual input).

```
? Select increment (next version):
❯ prepatch (0.1.1-beta.0)
  preminor (0.2.0-beta.0)
  premajor (1.0.0-beta.0)
  Other, please specify...
```

##### yarn release-major-beta

Same as `yarn release-beta`, but with premajor version pre-selected.

##### yarn release

Generic command, does not automatically add the `beta` to version, but you can still manually write it if you choose Other.

#### Important notes

> Do not use release-it tool on master branch, the commit on CHANGELOG.md file and the version increase in the package.json file can't be done without a PULL REQUEST.

> Do not keep Pull Requests from develop to master branches open when you are doing beta releases from the develop branch. As long as a PR to master is open, an automatic script will run on every commit and will update both the version and the changelog to a production-ready state - ( MAJOR.MINOR.PATCH mandatory format for version).


## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-banner/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-banner/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
