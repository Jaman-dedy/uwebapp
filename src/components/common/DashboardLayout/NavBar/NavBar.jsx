/* eslint-disable */
import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SelectLanguage from 'components/common/SelectLanguage';
import StorePublicity from 'components/common/DashboardLayout/StorePublicity';
import './NavBar.scss';
import toggleSideBar, {
  closeProfileDropDown,
} from 'redux/actions/dashboard/dashboard';
import { openChatList } from 'redux/actions/chat/globalchat';
import ProfileDropdown from '../ProfileDropdwn';
import Help from '../HelpDropDown';
import Notifications from '../NotificationDropdown';
import Trigger from '../Messages/Trigger';
import OutsideClickHandler from 'react-outside-click-handler';
import GButton from './GButton';
import {
  setIsendingCash,
  setIsSendingMoney,
} from 'redux/actions/dashboard/dashboard';

const NavBar = ({
  openStorePublicity,
  publicityOpen,
  publicityData,
  setTourStep,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isSidebarActive } = useSelector(
    ({ dashboard }) => dashboard.dashboardData,
  );

  const { open } = useSelector(
    ({ dashboard }) => dashboard.profileDropDown,
  );

  const {
    userData: { data },
    notifications,
  } = useSelector(state => state.user);

  const [storePublicityOpen, setStorePublicityOpen] = useState(false);
  const [storePublicityData, setStorePublicityData] = useState({});
  const [openProfile, setOpenProfile] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);

  const openNotifStorePublicity = (open, linkData) => {
    if (open) setStorePublicityData(linkData);
    setStorePublicityOpen(open);
    openStorePublicity(open);
  };

  const goToSendMoney = () => {
    history.push('/contacts?ref=send-money');
    setIsSendingMoney(dispatch);
  };
  const goToQuickPay = () => {
    history.push('/quick-pay');
  };
  const goToGetPaid = () => {
    history.push('/get-paid');
  };
  const goToSendCash = () => {
    history.push('/contacts?ref=send-cash');
    setIsendingCash(dispatch);
  };
  const goToSendVoucher = () => {
    history.push({
      pathname: '/contacts',
      search: '?ref=send-voucher',
    });
  };
  const goToWithdraw = () => {
    history.push('/withdraw-money');
  };
  return (
    <>
      <header
        className="app-header"
        onClick={() => {
          if (open) {
            closeProfileDropDown(dispatch);
          }
        }}
      >
        <div className="btns-shortcut">
          <GButton
            goToSendMoney={goToSendMoney}
            goToQuickPay={goToQuickPay}
            goToGetPaid={goToGetPaid}
            goToSendCash={goToSendCash}
            goToSendVoucher={goToSendVoucher}
            goToWithdraw={goToWithdraw}
          />
        </div>
        <div className="btns-header-actions">
          <ul>
            <li>
              <StorePublicity
                open={publicityOpen || storePublicityOpen}
                setOpen={openNotifStorePublicity}
                publicityData={
                  Object.keys(publicityData).length
                    ? publicityData
                    : storePublicityData
                }
              />
            </li>
            <li>
              <button
                type="button"
                className="menu-icon cursor-pointer no-border no-outline transparent"
                onClick={() => toggleSideBar(dispatch)}
              >
                <Icon name="bars" size="big" />
              </button>
            </li>
            <li>
              <span className="navbar_item_icon cursor-pointer">
                <Trigger
                  onClick={() => {
                    openChatList()(dispatch);
                  }}
                />
              </span>
            </li>
            <li>
              <span className="notification navbar_item_icon cursor-pointer">
                <Notifications
                  openStorePublicity={openNotifStorePublicity}
                  notifications={notifications}
                />
              </span>
            </li>
            {/* <li> // DO NOT REMOVE THIS CODE
              <span className="notification navbar_item_icon">
                <Help setTourStep={setTourStep} />
              </span>
            </li> */}
            <li>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setOpenProfile(false);
                }}
              >
                <span
                  className="avatar-profile navbar_item_icon  cursor-pointer"
                  onClick={() => {
                    closeProfileDropDown(dispatch);
                    if (!openProfile) {
                      setOpenProfile(true);
                    } else {
                      setOpenProfile(false);
                    }
                  }}
                >
                  {data && Object.keys(data).length ? (
                    <ProfileDropdown
                      setOpenProfile={setOpenProfile}
                      openProfile={openProfile}
                      profileData={data}
                    />
                  ) : null}
                </span>
              </OutsideClickHandler>
            </li>
          </ul>
        </div>
      </header>
      <button
        onClick={() => toggleSideBar(dispatch)}
        label="dark-layer"
        className={`${isSidebarActive ? 'darken-side' : 'hide'}`}
        type="button"
      />
    </>
  );
};

NavBar.propTypes = {
  openStorePublicity: PropTypes.func,
  publicityOpen: PropTypes.bool,
  publicityData: PropTypes.instanceOf(Object),
  setTourStep: PropTypes.func,
};

NavBar.defaultProps = {
  openStorePublicity: () => null,
  publicityOpen: false,
  publicityData: {},
  setTourStep: () => {},
};

export default NavBar;
