import loadable from '@loadable/component';
import { runtimeConfig } from '@plone/volto/runtime_config';

const applyConfig = (config) => {
  const appExtras = config.settings.appExtras || [];

  config.settings.stagingBanner = {
    demoIdentifiers: ['dev', 'demo', 'staging', 'localhost'],
    parentNodeSelector: '.skiplinks-wrapper',
    extraClasses: ['ui warning message'],
    envApiUrl: 'apiPath',
    ...(config.settings.stagingBanner || {}),
  };

  const demoIdentifiers = config.settings.stagingBanner.demoIdentifiers;
  const path = runtimeConfig[config.settings.stagingBanner.envApiUrl];
  const isDev =
    path &&
    demoIdentifiers.reduce(
      (acc, identifier) => acc || path.includes(identifier),
      false,
    );

  if (isDev) {
    const StagingBanner = loadable(() => import('./StagingBanner'));
    config.settings.appExtras = [
      ...appExtras,

      {
        match: '',
        component: StagingBanner,
      },
    ];
  }

  return config;
};

export default applyConfig;
