import loadable from '@loadable/component';
import { runtimeConfig } from '@plone/volto/runtime_config';

const applyConfig = (config) => {
  const appExtras = config.settings.appExtras || [];

  config.settings.stagingBanner = {
    // alternative in other addons ['dev', 'staging']
    demoIdentifiers: ['True', 'true', 'Yes', 'yes', 'On', 'on'],
    parentNodeSelector: '.skiplinks-wrapper',
    extraClasses: ['ui warning message'],
    envRuntimeVariable: 'RAZZLE_DEMO_SITE',
    envBannerHeader: 'RAZZLE_BANNER_HEADER',
    envBannerMessage: 'RAZZLE_BANNER_MESSAGE', //'apiPath' for match from host path
    ...(config.settings.stagingBanner || {}),
  };

  const demoIdentifiers = config.settings.stagingBanner.demoIdentifiers;
  const env_var =
    runtimeConfig[config.settings.stagingBanner.envRuntimeVariable];
  const isDev =
    !env_var ||
    (env_var &&
      demoIdentifiers.reduce(
        (acc, identifier) => acc || env_var.includes(identifier),
        false,
      ));

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
