import React from 'react';
import { useNetlifyIdentity } from 'react-netlify-identity';
import { Media, Image, Help, Content, Title } from 'rbx';
import { AvatarSvg } from '../../../../components/themedSvgs';
import AccountMetadata from './AccountMetadata';
import styles from './AccountInformation.module.scss';

export default function AccountInformation() {
  const {
    user: {
      id,
      email,
      app_metadata: appMetadata,
      created_at: createdAt,
      updated_at: updatedAt,
      confirmed_at: confirmedAt,
      confirmation_sent_at: confirmationSentAt,
      _fromStorage: fromLocalStorage,
      user_metadata: userMetadata,
    },
  } = useNetlifyIdentity();

  const { provider } = appMetadata;
  const { avatar_url: avatar, full_name: name } = userMetadata;

  return (
    <Media className={styles.media}>
      <Media.Item as="figure" align="left">
        <Image.Container as="p" size={128}>
          {avatar ? <Image alt="avatar" rounded src={avatar} /> : <AvatarSvg />}
        </Image.Container>
      </Media.Item>
      <Media.Item align="content">
        <Content>
          {name && <Title size={3}>{name}</Title>}
          <Title subtitle size={5} color="primary">
            {email}
          </Title>
          <Help>
            <code>ID {id}</code>
          </Help>

          <AccountMetadata
            provider={provider}
            confirmedAt={confirmedAt}
            confirmationSentAt={confirmationSentAt}
            createdAt={createdAt}
            updatedAt={updatedAt}
            fromLocalStorage={fromLocalStorage}
          />
        </Content>
      </Media.Item>
    </Media>
  );
}
