import React from 'react';
import { Portal } from 'react-portal';
import './less/stagingBanner.less';
import config from '@plone/volto/registry';
import cx from 'classnames';

const StagingBanner = () => {
  const stagingBannerConfig = config.settings.stagingBanner;
  let [isDev, setIsDev] = React.useState(false);

  React.useEffect(() => {
    const demoIdentifiers = stagingBannerConfig.demoIdentifiers;
    const path = window.location.host;
    if (
      path !== undefined &&
      demoIdentifiers.reduce(
        (acc, identifier) => acc || path.includes(identifier),
        false,
      )
    ) {
      setIsDev(true);
    }
  }, []);

  let node;
  if (typeof window !== 'undefined') {
    node = document.querySelector(stagingBannerConfig.parentNodeSelector);
  }

  if (node && isDev) {
    return (
      <Portal node={node}>
        <div className={cx('stagingBanner', stagingBannerConfig.extraClasses)}>
          <i aria-hidden="true" className="exclamation circle icon"></i>
          <div className="content">
            <div className="header">This is a demo/test instance.</div>
            <p>
              Do not use it for operational purposes. All changes will be
              regularly overwritten.
            </p>
          </div>
        </div>
      </Portal>
    );
  }

  return null;
};

export default StagingBanner;
