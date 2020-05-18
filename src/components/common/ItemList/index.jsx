import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import classes from './ItemList.module.scss';
import Thumbnail from '../Thumbnail';
import CustomCheckBox from '../CustomCheckBox';
import FormCheckBox from '../CheckBox';
import checkedMark from '../../../assets/images/checked.png';

const ItemList = ({
  Logo,
  Title,
  Option,
  isThumbNail,
  name,
  secondName,
  onOptionsChange,
  handleItemClicked,
  clickedItem,
}) => (
  <div
    className={classes.Item}
    onClick={() => handleItemClicked(Title)}
  >
    <div className={classes.Provider}>
      <div className={classes.ItemImage}>
        {isThumbNail ? (
          <Thumbnail
            avatar={Logo}
            name={name}
            secondName={secondName}
            style={{
              margin: 'auto',
              width: '2.6rem',
              height: '2.6rem',
            }}
          />
        ) : (
          <img src={Logo} alt="" />
        )}
      </div>
      <div className={classes.ItemTitle}>{Title}</div>
      {Option ? <div className={classes.Option}>{Option}</div> : ''}
    </div>

    <div className={classes.ItemCheck}>
      {clickedItem === Title ? <img src={checkedMark} alt="" /> : ''}
    </div>
  </div>
);

export default ItemList;
