import loadable from '@loadable/component';
import { runtimeConfig } from '@plone/volto/runtime_config';
import * as addonReducers from './reducers';

import infoSVG from '@plone/volto/icons/info.svg';

const applyConfig = (config) => {
  const appExtras = config.settings.appExtras || [];

  config.settings.stagingBanner = {
    demoIdentifiers: ['True', 'true', 'Yes', 'yes', 'On', 'on'],
    parentNodeSelector: '.skiplinks-wrapper',
    envRuntimeVariable: 'RAZZLE_DEMO_SITE',
    bannerIcon: infoSVG,
    bannerIconColor: 'black',
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

  config.addonReducers = {
    ...config.addonReducers,
    ...addonReducers,
  };

  return config;
};

export default applyConfig;
