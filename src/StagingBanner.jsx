import React from 'react';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import cx from 'classnames';
import { Message, Container } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { Icon } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

import { getBannerConfig } from '@eeacms/volto-banner/actions';

import './less/stagingBanner.less';

const types = {
  upgrading: 'warning',
  upgraded: 'warning',
  degraded: 'error',
  stopped: 'error',
  error: 'error',
  inactive: 'error',
};

const bannerIsVisible = (token, enabled, visible_to_all) => {
  if (!enabled) return false;
  if (token || visible_to_all) return true;
  return false;
};

const StagingBanner = ({ banner, location, token, dispatch }) => {
  const bannerConfig = {
    ...(config.settings.stagingBanner || {}),
    ...(banner.config || {}),
  };
  const staticBanner = bannerConfig.static_banner || {};
  const dynamicBanner = bannerConfig.dynamic_banner || {};

  React.useEffect(() => {
    dispatch(getBannerConfig());
    /* eslint-disable-next-line */
  }, []);

  const [node, setNode] = React.useState('');
  React.useEffect(() => {
    setNode(document.querySelector(bannerConfig.parentNodeSelector));
  }, [bannerConfig.parentNodeSelector]);

  if (!node) return '';

  return (
    <Portal node={node}>
      <BodyClass className="has-banner" />
      {bannerIsVisible(
        token,
        staticBanner.enabled,
        staticBanner.visible_to_all,
      ) && (
        <Message
          className={cx('stagingBanner static-banner', staticBanner.type)}
          icon
        >
          <Container>
            <Message.Content>
              <Message.Header>{staticBanner.title}</Message.Header>
              <p
                dangerouslySetInnerHTML={{
                  __html: staticBanner.message,
                }}
              />
            </Message.Content>
            {bannerConfig.bannerIcon && (
              <Icon
                name={bannerConfig.bannerIcon}
                color={bannerConfig.bannerIconColor || 'black'}
                size="32px"
              />
            )}
          </Container>
        </Message>
      )}
      {bannerIsVisible(
        token,
        dynamicBanner.enabled,
        dynamicBanner.visible_to_all,
      ) &&
        dynamicBanner.rancher_stacks_status && (
          <Message
            className={cx(
              'stagingBanner static-banner',
              types[dynamicBanner.rancher_stacks_status],
            )}
            icon
          >
            <Container>
              <Message.Content>
                <Message.Header>{dynamicBanner.title}</Message.Header>
                <p
                  dangerouslySetInnerHTML={{
                    __html: (dynamicBanner.message || '').replace(
                      '{}',
                      dynamicBanner.rancher_stacks_status,
                    ),
                  }}
                />
              </Message.Content>
              {bannerConfig.bannerIcon && (
                <Icon
                  name={bannerConfig.bannerIcon}
                  color={bannerConfig.bannerIconColor || 'black'}
                  size="32px"
                />
              )}
            </Container>
          </Message>
        )}
    </Portal>
  );
};

export default connect((state) => ({
  banner: state.banner,
  objectActions: state.actions.actions.object,
  token: state.userSession.token,
}))(StagingBanner);
