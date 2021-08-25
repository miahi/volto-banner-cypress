import React from 'react';
import { Portal } from 'react-portal';
import './less/stagingBanner.less';
import config from '@plone/volto/registry';
import cx from 'classnames';

const StagingBanner = () => {
  const stagingBannerConfig = config.settings.stagingBanner;

  const [node, setNode] = React.useState('');
  React.useEffect(() => {
    setNode(document.querySelector(stagingBannerConfig.parentNodeSelector));
  }, [stagingBannerConfig.parentNodeSelector]);

  if (node) {
    return (
      <Portal node={node}>
        <div className={cx('stagingBanner', stagingBannerConfig.extraClasses)}>
          <div
            className={cx('container icon', stagingBannerConfig.extraClasses)}
          >
            <i aria-hidden="true" className="exclamation circle icon"></i>
            <div className="content">
              <div className="header">This is a demo/test instance.</div>
              <p>
                Do not use it for operational purposes. All changes will be
                regularly overwritten.
              </p>
            </div>
          </div>
        </div>
      </Portal>
    );
  }

  return null;
};

export default StagingBanner;
