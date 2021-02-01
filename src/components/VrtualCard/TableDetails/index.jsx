import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import './style.scss';

const TableDetails = ({
  card,
  onUpdateCardStatus,
  onRenewVirtualCard,
  loadOnChangeStatus,
  loadOnRenew,
  isExpired,
  setAddMoneyOpen,
  setIsRedeeming,
  loadOnRedeem,
  loadOnAddMoney,
}) => {
  const handleAddMoneyModal = () => {
    setAddMoneyOpen(true);
  };
  const handleRedeemMoneyModal = () => {
    setIsRedeeming(true);
    setAddMoneyOpen(true);
  };

  const creationDate = moment(card?.CreationDate).format('ll');
  return (
    <div className="all-details">
      <Table unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <span className="action-heading">
                {global.translate('Status')}
              </span>
              <Button
                loading={loadOnChangeStatus}
                onClick={onUpdateCardStatus}
                style={{
                  backgroundColor: '#343657',
                  color: '#ffff',
                }}
                className="table-button"
              >
                {card?.Enabled === 'NO'
                  ? global.translate('Enable', 2047)
                  : global.translate('Disable', 1762)}
              </Button>
            </Table.Cell>
            <Table.Cell textAlign="right">
              {card?.Enabled === 'NO' &&
                global.translate('Card is disabled', 2135)}
              {card?.Enabled === 'YES' &&
                global.translate('Card is enabled', 2136)}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <span className="action-heading">
                {global.translate('Add money', 89)}
              </span>
              <span>
                {global.translate('Add money to your wallet', 173)}
              </span>
            </Table.Cell>

            <Table.Cell textAlign="right">
              <Button
                loading={loadOnAddMoney}
                onClick={handleAddMoneyModal}
                style={{
                  backgroundColor: '#343657',
                  color: '#ffff',
                }}
                className="table-button"
              >
                {global.translate('Add money', 89)}
              </Button>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <span className="action-heading">
                {global.translate('Redeem Money')}
              </span>
              <span />
              {global.translate(
                'Redeem money form this card to your wallet',
                2150,
              )}
            </Table.Cell>

            <Table.Cell textAlign="right">
              <Button
                loading={loadOnRedeem}
                onClick={handleRedeemMoneyModal}
                style={{
                  backgroundColor: '#343657',
                  color: '#ffff',
                }}
                disabled={card?.Balance === '0.00'}
                className="table-button"
              >
                {global.translate('Redeem money', 1689)}
              </Button>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <span className="table-wallet-section">
                {global.translate('Currency')}
              </span>
              <span className="table-wallet-number">
                {card?.Currency}
              </span>
            </Table.Cell>
            <Table.Cell textAlign="right" />
          </Table.Row>
          <Table.Row>
            <Table.Cell>{global.translate('CVV')}</Table.Cell>
            <Table.Cell textAlign="right">{card?.CVV}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Expiration date', 492)}
            </Table.Cell>
            <Table.Cell textAlign="right">{`${card?.MM}-${card?.YYYY}`}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Creation date', 738)}
            </Table.Cell>
            <Table.Cell textAlign="right">{creationDate}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Card type', 2139)}
            </Table.Cell>
            <Table.Cell textAlign="right">
              {card?.CardType === 1 ? 'Visa' : 'Master card'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <span className="action-heading">
                {global.translate('Renew your O-Card', 1691)}
              </span>
              <span>
                {global.translate(
                  'You can renew an expired O-Card',
                  2140,
                )}
              </span>
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button
                style={{ backgroundColor: '#343657', color: '#ffff' }}
                onClick={onRenewVirtualCard}
                loading={loadOnRenew}
                disabled={!isExpired}
              >
                {global.translate('Renew O-Card', 2141)}
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

TableDetails.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  onRenewVirtualCard: PropTypes.func.isRequired,
  onUpdateCardStatus: PropTypes.func.isRequired,
  loadOnChangeStatus: PropTypes.bool.isRequired,
  loadOnRenew: PropTypes.bool.isRequired,
  isExpired: PropTypes.bool.isRequired,
  setAddMoneyOpen: PropTypes.func.isRequired,
  setIsRedeeming: PropTypes.func.isRequired,
  loadOnAddMoney: PropTypes.bool.isRequired,
  loadOnRedeem: PropTypes.bool.isRequired,
};
TableDetails.defaultProps = {};

export default React.memo(TableDetails);