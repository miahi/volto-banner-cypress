import React from 'react';
import { Portal } from 'react-portal';
import './less/stagingBanner.less';
import config from '@plone/volto/registry';
import cx from 'classnames';
import { runtimeConfig } from '@plone/volto/runtime_config';
import { Icon } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

const StagingBanner = () => {
  const stagingBannerConfig = config.settings.stagingBanner;
  const bannerHeader = runtimeConfig[stagingBannerConfig.envBannerHeader];
  const bannerMessage = runtimeConfig[stagingBannerConfig.envBannerMessage];

  const [node, setNode] = React.useState('');
  React.useEffect(() => {
    setNode(document.querySelector(stagingBannerConfig.parentNodeSelector));
  }, [stagingBannerConfig.parentNodeSelector]);

  if (node) {
    return (
      <Portal node={node}>
        <BodyClass className="has-banner" />
        <div className={cx('stagingBanner', stagingBannerConfig.extraClasses)}>
          <div
            className={cx('container icon', stagingBannerConfig.extraClasses)}
          >
            {stagingBannerConfig.bannerIcon ? (
              <Icon name={stagingBannerConfig.bannerIcon} size="24px" />
            ) : (
              <i aria-hidden="true" className="exclamation circle icon"></i>
            )}

            <div className="content">
              <div className="header">
                {bannerHeader || 'This is a demo/test instance'}
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    bannerMessage ||
                    'Do not use it for operational purposes. All changes will be regularly overwritten',
                }}
              />
            </div>
          </div>
        </div>
      </Portal>
    );
  }

  return null;
};

export default StagingBanner;
