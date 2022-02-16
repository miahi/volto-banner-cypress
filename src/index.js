import StagingBanner from './StagingBanner';
import * as addonReducers from './reducers';

import infoSVG from '@plone/volto/icons/info.svg';

const applyConfig = (config) => {
  const appExtras = config.settings.appExtras || [];

  config.settings.stagingBanner = {
    parentNodeSelector: '.skiplinks-wrapper',
    bannerIcon: infoSVG,
    bannerIconColor: 'black',
    ...(config.settings.stagingBanner || {}),
  };

  config.settings.appExtras = [
    ...appExtras,

    {
      match: '',
      component: StagingBanner,
    },
  ];

  config.addonReducers = {
    ...config.addonReducers,
    ...addonReducers,
  };

  return config;
};

export default applyConfig;
