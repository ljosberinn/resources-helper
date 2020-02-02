import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section, Column, Title, Box } from 'rbx';
import { useUser } from '../../../hooks';
import { PriceRangeSelection, TemplatedHelmet } from '../../../components';

export default function LandingPage() {
  const { t } = useTranslation('routes');

  const user = useUser();

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
              <PriceRangeSelection />
            </Box>
          </Column>
        </Column.Group>
      </Section>
    </>
  );
}
