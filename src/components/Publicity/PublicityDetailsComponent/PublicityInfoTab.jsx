import React, { useState } from 'react';
import { Grid, Label, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import imagePlaceholder from 'assets/images/placeholder.jpg';
import Img from 'components/common/Img';
import ConfirmExecutePublicity from './ConfirmExecutePublicity';

const PublicityInfoTab = ({
  currentPublicity,
  executeCampaing,
  item,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid stackable columns={2}>
      <Grid.Column width={6}>
        <Label
          ribbon
          color={
            !currentPublicity.Views || currentPublicity.Views === '0'
              ? '#F0F2F4'
              : 'green'
          }
        >
          {`${global.translate(
            'Viewed',
            2012,
          )} ${currentPublicity.Views || 0} ${currentPublicity.Views !== '1'
            ? global.translate('times')
            : global.translate('time')
            }`}
        </Label>
        <Img
          className="publicity-picture"
          hasError
          not_rounded
          alt={
            <Img
              className="publicity-picture"
              hasError
              not_rounded
              alt={
                <Image
                  src={imagePlaceholder}
                  size="small"
                  className="publicity-picture"
                />
              }
              src={currentPublicity.PictureLink}
              size="small"
            />
          }
          src={currentPublicity.PictureURL}
          size="small"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <>
          <ConfirmExecutePublicity
            open={open}
            setOpen={setOpen}
            item={currentPublicity}
            parentItem={item}
            onPositiveConfirm={executeCampaing}
          />
          <div className="details-top-options">
            <div>
              <div className="details-inner-name">
                {currentPublicity.Title}
              </div>
              <div className="executed-count">
                {`${global.translate(
                  'Executed',

                )} ${currentPublicity.ExecutionCount || 0} ${currentPublicity.ExecutionCount !== '1'
                  ? global.translate('times')
                  : global.translate('time')
                  }`}
              </div>
            </div>

            <div className="edit-button ">
              <Button
                basic
                className="btn--primary"
                content={`${global.translate(
                  'Share with my contacts',

                )}`}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
          <p className="description">{currentPublicity.SubTitle}</p>
          <p className="description">
            {currentPublicity.Detail &&
              currentPublicity.Detail.replace(
                /TypeCampaign/g,
                ' TypeCampaign',
              )}
          </p>
        </>
      </Grid.Column>
    </Grid>
  );
};

PublicityInfoTab.propTypes = {
  currentPublicity: PropTypes.objectOf(PropTypes.any),
  item: PropTypes.objectOf(PropTypes.any),
  executeCampaing: PropTypes.func,
};

PublicityInfoTab.defaultProps = {
  currentPublicity: {},
  item: {},
  executeCampaing: () => { },
};

export default PublicityInfoTab;
