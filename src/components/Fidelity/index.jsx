/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Tab } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import './Fidelity.scss';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import PREVIOUS_ICON from 'assets/images/back.png';
import MyReferrals from './MyReferrals';
import MyRewards from './MyRewards';

const Fidelity = ({
  userData,
  activeTabIndex,
  setActiveTabIndex,
  referrals,
}) => {
  const history = useHistory();
  const { data } = userData;
  const { referreesList } = referrals;

  const panes = [
    {
      menuItem: global.translate('My rewards'),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane rewards"
          attached={false}
        >
          <MyRewards userData={userData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: `${global.translate('My referral List')}`,
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane referral-contacts"
          attached={false}
        >
          <MyReferrals
            userData={userData}
            referrals={referreesList}
          />
        </Tab.Pane>
      ),
    },

    {
      menuItem: global.translate('Transactions overview'),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane transactions-overview"
          attached={false}
        >
          {/* <Security
            securityQuestions={securityQuestions}
            changePassword={changePassword}
            changePIN={changePIN}
            changeDOB={changeDOB}
            changeGender={changeGender}
            target={target}
          /> */}
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Documents overview'),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane documents-overview"
          attached={false}
        >
          {/* <Documents userData={userData} documents={documents} /> */}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            Hey <span className="bold">{data && data.FirstName}</span>
            , {global.translate('Thanks for your fidelity')}
          </span>
        </WelcomeBar>
        <Image
          src={PREVIOUS_ICON}
          height={30}
          className="goBack"
          onClick={() => history.goBack()}
        />
        <div className="fidelity-container">
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            activeIndex={activeTabIndex}
            onTabChange={(_, { activeIndex }) =>
              setActiveTabIndex(activeIndex)
            }
            className="bottom-tab"
          />
        </div>
      </DashboardLayout>
    </>
  );
};

Fidelity.propTypes = {
  userData: PropTypes.instanceOf(Object),
  activeTabIndex: PropTypes.number,
  setActiveTabIndex: PropTypes.func,
  referrals: PropTypes.instanceOf(Object).isRequired,
};

Fidelity.defaultProps = {
  userData: {
    data: {},
  },
  activeTabIndex: 0,
  setActiveTabIndex: () => null,
};

export default Fidelity;
