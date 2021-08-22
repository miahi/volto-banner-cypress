import StagingBanner from './StagingBanner';

const applyConfig = (config) => {
  const appExtras = config.settings.appExtras || [];

  config.settings.stagingBanner = {
    demoIdentifiers: ['dev', 'demo', 'staging', 'localhost'],
    parentNodeSelector: '.skiplinks-wrapper',
    extraClasses: ['ui icon warning message'],
  };

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
