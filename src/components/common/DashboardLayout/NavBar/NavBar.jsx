import React from 'react';
import { Icon, Image, Label, Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import SelectLanguage from 'components/common/SelectLanguage';
import BoyIcon from 'assets/images/male.png';
import './NavBar.scss';
import QuestionIcon from 'assets/images/question.png';
import toggleSideBar from 'redux/actions/dashboard/dashboard';
import Thumbnail from 'components/common/Thumbnail';

const NavBar = () => {
  const dispatch = useDispatch();

  const {
    userData: { data },
  } = useSelector(state => state.user);
  return (
    <>
      <header className="header large-v-padding">
        <button
          type="button"
          className="menu-icon cursor-pointer no-border no-outline transparent"
          onClick={() => toggleSideBar(dispatch)}
        >
          <Icon name="bars" size="big" />
        </button>

        <span className="search_icon">
          <Icon name="search" size="small" />
        </span>
        <span className="header__search navbar_item_icon">
          <Input
            placeholder={global.translate('Search...')}
            style={{ width: '250px', marginRight: '50px' }}
          />
        </span>
        <span className="navbar_item_icon">
          <Image src={QuestionIcon} className="header__icon" />
        </span>
        <span className="navbar_item_icon">
          <SelectLanguage
            white={false}
            hasLabel={false}
            position="static"
          />
        </span>

        <span className="notification navbar_item_icon">
          <Icon name="bell outline" className="u_bell" size="small" />
          <Label color="red" className="u_bell_badge" size="small">
            2
          </Label>
        </span>

        <span className="header__avatar navbar_item_icon">
          {data && (
            <Thumbnail
              avatar={data && data.PicURL}
              size="small"
              name={data && data.FirstName}
              secondName={data && data.LastName}
              circular
              className="header_2u_avatar"
              style={{ height: '40px', width: '40px' }}
            />
          )}
        </span>
      </header>
    </>
  );
};

export default NavBar;
