import React from 'react';
import { Portal } from 'react-portal';
import './stagingBanner.css';

const StagingBanner = () => {
  let [isDev, setIsDev] = React.useState(false);

  React.useEffect(() => {
    const demoIdentifiers = ['dev', 'demo', 'staging', 'localhost'];
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

  if (isDev) {
    return (
      <Portal node={document.getElementsByClassName('skiplinks-wrapper')[0]}>
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
