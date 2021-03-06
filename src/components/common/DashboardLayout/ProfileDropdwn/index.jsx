/* eslint-disable  */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import logout from 'redux/actions/users/logout';
import VerifiedIcon from 'assets/images/verified.png';
import { CONTACT_PRESENCE_CHANGED } from 'constants/events/userPresence';
import { OFFLINE, ONLINE, LOGIN_RETURN_URL } from 'constants/general';
import createNotification from 'redux/actions/users/createNotification';
import Img from 'components/common/Img';
import ImageLevel from './ImageLevel';
import LoaderComponent from 'components/common/Loader';
import { closeProfileDropDown } from 'redux/actions/dashboard/dashboard';
import convertNumber from 'utils/convertNumber';
import avatarPlaceholder from 'assets/images/avatar-placeholder.svg';

import './ProfileDropdown.scss';

const ProfileDropdown = ({
  openProfile,
  profileData,
  trigger,
  icon,
}) => {
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    allContacts: { data },
  } = useSelector(state => state.contacts);

  const { open } = useSelector(
    ({ dashboard }) => dashboard.profileDropDown,
  );
  const {
    logout: { loading },
  } = useSelector(state => state.user);

  const handleUserLogout = () => {
    localStorage.removeItem('userWasIdle');
    const notificationPayload = {
      PID: data
        ?.filter(item => item.ContactPID)
        .map(item => item.ContactPID),
      type: CONTACT_PRESENCE_CHANGED,
      data: {
        contact: profileData?.PID,
        action: {
          PresenceStatus: OFFLINE,
        },
      },
      save: false,
    };
    if (profileData?.PresenceStatus === ONLINE) {
      createNotification(notificationPayload)(dispatch);
    }
    logout()(dispatch);
  };
  return (
    <>
      <div>
        {!trigger && Object.keys(profileData).length ? (
          <Thumbnail
            avatar={profileData.PictureURL}
            size="small"
            name={profileData.FirstName}
            secondName={profileData.LastName}
            circular
            className="header_2u_avatar"
            style={{
              height: '36px',
              width: '36px',
              marginRight: '4px',
              borderRadius: '50%',
              marginTop: '-2px',
            }}
            setHasError={setHasError}
          />
        ) : (
          trigger
        )}

        {profileData && profileData.AccountVerified === 'YES' && (
          <Img
            format="png"
            height="15px"
            width="15px"
            style={{ width: '0px', height: '0px' }}
            compress
            src={VerifiedIcon}
            className="top-verified-icon"
            hasError={hasError}
            setHasError={setHasError}
          />
        )}
      </div>
      <Dropdown
        disabled={loading}
        closeOnChange={false}
        closeOnBlur={false}
        open={openProfile}
        className="profile-dropdown"
        icon={icon ? icon : null}
      >
        <Dropdown.Menu direction="left">
          <Dropdown.Header className="dropdown-header">
            {Object.keys(profileData).length && (
              <div
                className="dropdown-header__content"
                title={global.translate('My Profile')}
              >
                {Object.keys(profileData).length !== 0 ? (
                  <Thumbnail
                    avatar={profileData.PictureURL}
                    size="small"
                    name={profileData.FirstName}
                    secondName={profileData.LastName}
                    circular
                    className="header_2u_avatar"
                    style={{
                      height: '55px',
                      width: '55px',
                      marginRight: '0px',
                    }}
                    setHasError={setHasError}
                  />
                ) : (
                  <Image
                    src={avatarPlaceholder}
                    className="animate-placeholder"
                    style={{ width: '27%' }}
                  />
                )}

                {profileData &&
                  profileData.AccountVerified === 'YES' && (
                    <div
                      className="verified-icon"
                      title={global.translate(
                        'Account verified'
                      )}
                    >
                      <Image src={VerifiedIcon} />
                    </div>
                  )}
                {profileData && (
                  <div className="name">
                    {`${profileData.FirstName} ${profileData &&
                      profileData.LastName}`}
                  </div>
                )}
                <div className="default-wallet">
                  <img
                    src={profileData && profileData.CurrencyFlag}
                    alt={profileData && profileData.currency}
                  />
                  <span>
                    {profileData && profileData.DefaultWallet}
                  </span>
                </div>
                {profileData && (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      closeProfileDropDown(dispatch);
                      history.push('/fidelity');
                    }}
                    className="my-rewards"
                  >
                    <ImageLevel
                      imageLevelNumber={
                        profileData?.Rewards?.StatusCode
                      }
                    />
                    {profileData && (
                      <span>
                        {profileData?.Rewards?.StatusText}
                        {',  '}
                        <strong>
                          {convertNumber(
                            profileData?.Rewards?.TotalPoints
                              ?.PointsValue,
                          )}
                        </strong>{' '}
                        {global.translate('points')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </Dropdown.Header>
          {[
            {
              label: global.translate('Dashboard'),
              to: '/',
              icon: 'home',
            },
            {
              label: global.translate('My profile'),
              to: '/account-management',
              icon: 'user',
            },
            {
              label: global.translate('Marketplace'),
              to: `/marketplace`,
              icon: 'buysellads',
            },
            {
              label: global.translate('My wallets'),
              to: '/wallets',
              icon: 'money',
            },
            {
              label: global.translate('2U and I'),
              to: '/fidelity',
              icon: 'gift',
            },
          ].map(({ label, to, icon }) => (
            <Dropdown.Item
              key={label}
              onClick={() => {
                closeProfileDropDown(dispatch);
                history.push({
                  pathname: profileData ? to : '/login',
                  search: !profileData
                    ? `${LOGIN_RETURN_URL}=${to}`
                    : '',
                  state: {
                    [LOGIN_RETURN_URL]: to,
                  },
                });
              }}
              className="dropdown_list"
            >
              <Link>
                <div>
                  <Icon name={icon} /> {label}
                </div>
              </Link>
            </Dropdown.Item>
          ))}
          <Dropdown.Item
            onClick={e => {
              handleUserLogout(e);
            }}
            className="dropdown_list"
          >
            {loading && (
              <LoaderComponent
                loaderContent={global.translate(
                  'Please wait a moment.',
                )}
              />
            )}
            {profileData ? (
              <>
                {!loading && (
                  <div>
                    <Icon name="sign-out" />
                    {global.translate('Log out')}
                  </div>
                )}
              </>
            ) : (
              <div>
                <Icon name="sign-out" />
                {global.translate('Log in')}
              </div>
            )}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

ProfileDropdown.defaultProps = {
  profileData: null,
  onClick: () => null,
};

ProfileDropdown.propTypes = {
  profileData: PropTypes.instanceOf(Object),
  onClick: PropTypes.func,
};

export default ProfileDropdown;
