import { Section, Box, Column, Title } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TemplatedHelmet } from '../../../components';
import { useUser } from '../../../hooks';

export default function APIPage() {
  const { t } = useTranslation('routes');
  const { meta } = useUser();

  return (
    <>
      <TemplatedHelmet>
        <title>{t('title')}</title>
      </TemplatedHelmet>
      <Section className="api-bg" aria-labelledby="section-title">
        <Column.Group centered multiline>
          <Column size={10}>
            <Box>
              <Title id="section-title">{t('title')}</Title>
            </Box>
          </Column>
        </Column.Group>
      </Section>
    </>
  );
}
