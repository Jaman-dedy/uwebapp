import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Item, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
import { clearAddMoneyToWallet } from 'redux/actions/walletsAndBanks/addMoneyToWallet';
import { useHistory } from 'react-router';
const ConfirmTopUpFromBank = ({
  step,
  setStep,
  addMoneyData,
  topUpFromBank,
  PIN,
  setPIN,
  openPINModal,
  setOpenPINModal,
}) => {
  const {
    amount,
    WalletNumber,
    WalletCurrency,
    bankAccount: { AccountNumber, AccountName, Currency },
  } = addMoneyData;
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, success } = useSelector(
    ({ walletsAndBanks: { addMoneyToWallet } }) => addMoneyToWallet,
  );

  useEffect(() => {
    if (success) {
      setOpenPINModal(false);
      clearAddMoneyToWallet()(dispatch);
      history.push({
        pathname: '/wallets',
        state: {
          activeTab: history.location.state?.activeTab || 0,
        },
      });
    }
  }, [success, dispatch, history]);

  return (
    <div className="transfer-summary">
      <h3>{global.translate('Top Up summary')}</h3>
      <Item.Group divided>
        <Item style={{ display: 'block' }}>
          <span>{global.translate('Top up amount')}</span>
          <span className="moneyAmount">
            {`${amount} ${Currency}`}
          </span>
        </Item>

        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Bank account name`)}</span>
          <span className="moneyAmount">{`${AccountName}`}</span>
        </Item>

        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Bank account number`)}</span>
          <span className="moneyAmount">{`${AccountNumber}`}</span>
        </Item>
        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Wallet Number`)}</span>
          <span className="moneyAmount">{`${WalletNumber}`}</span>
        </Item>
        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Wallet Currency`)}</span>
          <span className="moneyAmount">{`${WalletCurrency ??
            ''}`}</span>
        </Item>

        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Bank Currency`)}</span>
          <span className="moneyAmount">{`${Currency}`}</span>
        </Item>
      </Item.Group>

      <Button
        className="btn--confirm"
        onClick={() => setOpenPINModal(true)}
      >
        {global.translate('Confirm & Top Up')}
      </Button>
      <Button
        onClick={() => {
          setStep(step - 1);
        }}
        basic
      >
        {global.translate('Back')}
      </Button>

      <PINConfirmationModal
        open={openPINModal}
        setOpen={setOpenPINModal}
        onPinConfirm={topUpFromBank}
        loading={loading}
        onClose={() => setOpenPINModal(false)}
        PIN={PIN}
        setPIN={setPIN}
      />
    </div>
  );
};

ConfirmTopUpFromBank.propTypes = {
  step: PropTypes.bool.isRequired,
  setStep: PropTypes.func.isRequired,
  addMoneyData: PropTypes.instanceOf(Object),
  topUpFromBank: PropTypes.func.isRequired,
};

ConfirmTopUpFromBank.defaultProps = {
  addMoneyData: {},
};

export default ConfirmTopUpFromBank;
