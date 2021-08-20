import React from 'react';
import { Portal } from 'react-portal';
import './less/stagingBanner.less';
import config from '@plone/volto/registry';

const StagingBanner = () => {
  let [isDev, setIsDev] = React.useState(false);

  React.useEffect(() => {
    const demoIdentifiers = config.settings.stagingBanner.demoIdentifiers;
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
    node = document.querySelector(
      config.settings.stagingBanner.parentNodeSelector,
    );
  }

  if (node && isDev) {
    return (
      <Portal node={node}>
        <div>
          <div className="stagingBanner">
            <p>
              {' '}
              <i className="exclamation circle icon"></i> This is a demo/test
              instance. Do not use it for operational purposes. All changes will
              be regularly overwritten.{' '}
            </p>
          </div>
        </div>
      </Portal>
    );
  }

  return null;
};

export default StagingBanner;
