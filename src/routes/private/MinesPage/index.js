import React from 'react';
import { useUser } from '../../../hooks';
import { Table, Section, Generic, Column, Box, Title } from 'rbx';
import { DebouncedInput, TemplatedHelmet } from '../../../components';
import { useTranslation } from 'react-i18next';
import MineUtil from '../../../utils/mine';

/**
 * @returns {React.FC} MinesPage
 */
export default function MinesPage() {
  const { t } = useTranslation('mines');

  const {
    mines,
    setMineRate,
    setMineAmount,
    meta: { level },
  } = useUser();

  const totalAmountOfMines = mines.reduce(
    (carry, mine) => (carry += mine.amount),
    0,
  );

  return (
    <>
      <TemplatedHelmet>
        <title>{t('mines')}</title>
      </TemplatedHelmet>
      <Section
        className="mines-bg"
        aria-labelledby="section-title"
        style={{ width: '100%' }}
      >
        <Column.Group centered multiline>
          <Column size={11}>
            <Box>
              <Title id="section-title">{t('title')}</Title>
              <Table narrow fullwidth bordered striped hoverable>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Rate/hour</th>
                    <th>Amount</th>
                    <Generic as="th" textAlign="right">
                      $/hour
                    </Generic>
                    <Generic as="th" textAlign="right">
                      <abbr title="the price of a new mine of this type">
                        Price
                      </abbr>
                    </Generic>
                    <Generic as="th" textAlign="right">
                      $/hour @ 100% quality
                    </Generic>
                    <th>
                      <abbr title="return on investment in days at 100% quality">
                        ROI (d) 100%
                      </abbr>
                    </th>
                    <th>
                      <abbr title="return on investment in days at 100% quality + tech upgrades">
                        ROI (d) 505%
                      </abbr>
                    </th>
                    <th>
                      <abbr title="return on investment in days at 100% quality + tech upgrades within headquarter">
                        ROI (d) 505% + HQ
                      </abbr>
                    </th>
                    <Generic as="th" textAlign="right">
                      <abbr title="in how many % of the world can this resource be found">
                        Rarity
                      </abbr>
                    </Generic>
                    <Generic as="th" textAlign="right">
                      Unlocked at level
                    </Generic>
                  </tr>
                </thead>
                <tbody>
                  {mines.map(mine => (
                    <MineTableRow
                      {...mine}
                      key={mine.resourceId}
                      onRateChange={setMineRate}
                      onAmountChange={setMineAmount}
                      totalAmountOfMines={totalAmountOfMines}
                      active={level ? mine.minUserLevel >= level : true}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td />
                    <td />
                    <Generic as="td" textAlign="right">
                      {totalAmountOfMines.toLocaleString()}
                    </Generic>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </tfoot>
              </Table>
            </Box>
          </Column>
        </Column.Group>
      </Section>
    </>
  );
}

function MineTableRow({
  resourceId,
  maxRate,
  amount,
  ratePerHour,
  basePrice,
  name,
  resourceName,
  mineId,
  rarity,
  minUserLevel,
  onRateChange,
  onAmountChange,
  totalAmountOfMines,
  active,
}) {
  return (
    <tr>
      <td>
        {resourceId} | {resourceName} | {mineId}
      </td>
      <td>
        <DebouncedInput
          size="small"
          type="number"
          value={ratePerHour}
          min={0}
          max={MineUtil.MAX_RATE_PER_HOUR}
          onChange={onRateChange(resourceId)}
          disabled={!active}
        />
      </td>
      <td>
        <DebouncedInput
          size="small"
          type="number"
          value={amount}
          min={0}
          max={MineUtil.MAX_MINES}
          onChange={onAmountChange(resourceId)}
          disabled={!active}
        />
      </td>
      <td />
      <Generic as="td" textAlign="right">
        {MineUtil.calcPriceOfNextMine(
          totalAmountOfMines,
          basePrice,
        ).toLocaleString()}
      </Generic>
      <td />
      <td />
      <td />
      <td />
      <Generic as="td" textAlign="right">
        {rarity * 100}%
      </Generic>
      <Generic as="td" textAlign="right">
        {minUserLevel}
      </Generic>
    </tr>
  );
}
