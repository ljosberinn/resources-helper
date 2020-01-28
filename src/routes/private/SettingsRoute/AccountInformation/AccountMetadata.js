import React, { useState } from 'react';
import { Field, Tab, Table, Generic } from 'rbx';
import { faUser, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../../../../components';

/**
 *
 * @param {Date} timestamp
 */
const calcDiffInDaysFromNow = timestamp =>
  Math.round((new Date() - timestamp) / 1000 / 60 / 60 / 24);

const tabs = [
  {
    title: 'account',
    icon: faUser,
  },
  {
    title: 'site',
    icon: faFileCode,
  },
];

/**
 *
 * @param  props
 *
 * @returns {React.FC<{
 * provider: 'email' | 'google' | 'github';
 * confirmedAt: string;
 * confirmationSentAt: string;
 * createdAt: string;
 * updatedAt: string;
 * fromLocalStorage: boolean;
 * }>} AccountMetadata
 */
export default function AccountMetadata({
  provider,
  confirmedAt,
  confirmationSentAt,
  createdAt,
  updatedAt,
  fromLocalStorage,
}) {
  const [activeTab, setActiveTab] = useState('account');

  function handleTabChange() {
    setActiveTab(activeTab === 'account' ? 'site' : 'account');
  }

  const datasets = [
    {
      title: 'created account at',
      timestamp: createdAt,
    },
    createdAt !== updatedAt && {
      title: 'last updated at',
      timestamp: updatedAt,
    },
    {
      title: 'confirmation mail sent at',
      timestamp: confirmationSentAt,
    },
    {
      title: 'confirmed mail at',
      timestamp: confirmedAt,
    },
  ].filter(Boolean);

  return (
    <>
      <Tab.Group kind="boxed">
        {tabs.map(({ title, icon }) => (
          <Tab
            active={activeTab === title}
            onClick={handleTabChange}
            key={title}
          >
            <Icon icon={icon} />
            <span>{title}</span>
          </Tab>
        ))}
      </Tab.Group>
      <Field kind="group">
        {activeTab === 'account' && (
          <Table hoverable striped>
            <tbody>
              <tr>
                <td>provider</td>
                <Table.Cell textAlign="right">{provider}</Table.Cell>
              </tr>
              <tr>
                <td>recurring user</td>
                <Table.Cell textAlign="right">
                  {fromLocalStorage ? 'yes' : 'no'}
                </Table.Cell>
              </tr>
              {datasets.map(({ title, timestamp }) => {
                const date = new Date(timestamp);

                return (
                  <tr key={title}>
                    <td>{title}</td>
                    <Table.Cell textAlign="right">
                      <Generic
                        as="time"
                        tooltip={`${calcDiffInDaysFromNow(date)} days ago`}
                        dateTime={timestamp}
                      >
                        {date.toLocaleString()}
                      </Generic>
                    </Table.Cell>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Field>
    </>
  );
}
