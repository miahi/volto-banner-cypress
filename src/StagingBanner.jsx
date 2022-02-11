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

const StagingBanner = ({ banner, location, token, dispatch }) => {
  const pathname = location.pathname.replace(/\/$/, '');
  const bannerConfig = {
    ...(config.settings.stagingBanner || {}),
    ...(banner.config || {}),
  };
  const visibleToAll = bannerConfig.visible_to_all;
  const visibleOnLogin = bannerConfig.visible_on_login;
  const banneractive = bannerConfig.active ?? true;
  const bannerType = bannerConfig.type || 'warning';
  const bannerTitle = bannerConfig.title || 'This is a demo/test instance';
  const bannerMessage = bannerConfig.message || [
    'Do not use it for operational purposes. All changes will be regularly overwritten',
  ];
  const stacksStatus = bannerConfig.stacks_status;
  const stacksStatusTemplate =
    bannerConfig.stacks_status_message_template ||
    'Web admins says: the system is {}';

  React.useEffect(() => {
    dispatch(getBannerConfig());
    /* eslint-disable-next-line */
  }, []);

  const [node, setNode] = React.useState('');
  React.useEffect(() => {
    setNode(document.querySelector(bannerConfig.parentNodeSelector));
  }, [bannerConfig.parentNodeSelector]);

  if (!banneractive || !banner.loaded) return '';
  if (
    (!visibleToAll && !token && pathname !== '/login') ||
    (!visibleToAll && !visibleOnLogin && !token && pathname === '/login')
  )
    return '';

  if (node) {
    return (
      <Portal node={node}>
        <BodyClass className="has-banner" />
        <Message className={cx('stagingBanner', bannerType)} icon>
          <Container>
            <Message.Content>
              <Message.Header>{bannerTitle}</Message.Header>
              {bannerMessage.map((message, index) => (
                <p
                  key={`banner-message-${index}`}
                  dangerouslySetInnerHTML={{
                    __html: message,
                  }}
                />
              ))}
              {stacksStatus ? (
                <p>{stacksStatusTemplate.replace('{}', stacksStatus)}</p>
              ) : (
                ''
              )}
            </Message.Content>
            {bannerConfig.bannerIcon ? (
              <Icon
                name={bannerConfig.bannerIcon}
                color={bannerConfig.bannerIconColor || 'black'}
                size="32px"
              />
            ) : (
              ''
            )}
          </Container>
        </Message>
      </Portal>
    );
  }

  return '';
};

export default connect((state) => ({
  banner: state.banner,
  objectActions: state.actions.actions.object,
  token: state.userSession.token,
}))(StagingBanner);
