import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Header, Image } from 'semantic-ui-react';

import moment from 'moment';
import SelectLanguage from 'components/common/SelectLanguage';
import Logo from 'assets/images/logo.svg';
import bgCoverDefaultImage from 'assets/images/africaLadyWithPhone.jpg';
import './style.scss';
import './spiner.scss';
import validateImg from 'helpers/image/validateImg';

const setCoverImage = {
  backgroundImage: `url("${bgCoverDefaultImage}")`,
};
let isImgCorrect = false;
let setEventImg;

const AuthWrapper = ({ children, rightHeadlineText, authHeader }) => {
  let eventUrl;
  let sideBardWrapper;
  const { dailyEvent } = useSelector(
    ({ authWrapper }) => authWrapper,
  );
  if (!dailyEvent.data) {
    sideBardWrapper = <div className="loader_login">Loading...</div>;
  } else {
    eventUrl =
      dailyEvent.data[0].ResultURL || dailyEvent.data[0].DefaultURL;
    setEventImg = {
      backgroundImage: `url("${eventUrl}")`,
    };
  }
  validateImg(eventUrl).then(
    function fulfilled(img) {
      // console.log('That image is found and loaded', img);
      isImgCorrect = true;
    },

    function rejected() {
      // console.log('That image was not found');
      isImgCorrect = false;
    },
  );
  return (
    <div className="wrapper">
      {!eventUrl ? (
        sideBardWrapper
      ) : (
        <div
          className="wrapperSidebar"
          style={
            isImgCorrect ? setEventImg && setEventImg : setCoverImage
          }
        >
          <div className="header">
            <div className="headerDate">
              <span> {moment(new Date()).format('MMMM DD')}</span>
            </div>
            <div className="headerTitle">Send &amp; Receive</div>
            <div className="headerSubtitle">money worldwide</div>
            <div className="headerContent">Within 45 seconds</div>
            <div className="headerUrl">
              <a href="/">Learn more</a>
            </div>
          </div>
        </div>
      )}

      <Grid.Column className="right-column">
        <Link to="/">
          <div className="logo">
            <Image src={Logo} centered />
          </div>
        </Link>

        <Header className="rightHeaderText">
          {authHeader ? (
            <Header.Content>
              {global.translate(authHeader)}
            </Header.Content>
          ) : (
            <Header.Content>
              {global.translate('Welcome', 1237)}
            </Header.Content>
          )}
        </Header>
        <p className="right-sub-header">{rightHeadlineText}</p>
        <div className="right">{children}</div>
        <SelectLanguage />
      </Grid.Column>
    </div>
  );
};

AuthWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rightHeadlineText: PropTypes.string.isRequired,
  authHeader: PropTypes.string,
};

AuthWrapper.defaultProps = {
  authHeader: '',
};

export default AuthWrapper;
