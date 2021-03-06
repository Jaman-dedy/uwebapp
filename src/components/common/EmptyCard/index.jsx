import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './style.scss';

const EmptyCard = ({
  header,
  createText,
  body,
  onAddClick,
  disableAdd,
  imgSrc,
}) => {
  return (
    <div className="empty-store small-icon">
      <Image
        src={imgSrc}
        className="empty-store__icon empty-store__icon--small"
      />
      <h2>{header}</h2>
      <div>{body}</div>
      {!disableAdd && (
        <button
          type="button"
          className="btn--primary"
          onClick={onAddClick}
        >
          {createText}
        </button>
      )}
    </div>
  );
};

export default EmptyCard;

EmptyCard.propTypes = {
  body: PropTypes.string.isRequired,
  onAddClick: PropTypes.func.isRequired,
  disableAdd: PropTypes.bool,
  header: PropTypes.string.isRequired,
  createText: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

EmptyCard.defaultProps = {
  disableAdd: false,
};
