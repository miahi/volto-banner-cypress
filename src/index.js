import StagingBanner from './StagingBanner';

const applyConfig = (config) => {
  const appExtras = config.settings.appExtras || [];

  config.settings.appExtras = [
    ...appExtras,
    {
      match: '',
      component: StagingBanner,
    },
  ];

  return config;
};

export default applyConfig;
