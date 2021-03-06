/* eslint-disable import/no-named-as-default */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddMoneyIcon from 'assets/images/services/paypal-csn.svg';
import payBillsIcon from 'assets/images/services/pay-b-service.svg';
import TopUpIcon from 'assets/images/services/top-u-service.svg';
import bankTransferIcon from 'assets/images/services/bank-t-csn.svg';
import CurrencyExchangeIcon from 'assets/images/services/currency-e-service.svg';
import SendCashIcon from 'assets/images/services/send-c-service.svg';
import MoneyTransferIcon from 'assets/images/services/money-t-service.svg';
import ToOtherIcon from 'assets/images/services/other-n-service.svg';
import sendVoucherIcon from 'assets/images/services/send-v-service.svg';
import CardComponent from 'components/common/BottomMenu/Card';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import PayBills from 'components/PayBills';
import ExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import ComingSoon from 'components/common/BottomMenu/ComingSoon';
import {
  setIsendingCash,
  setIsSendingMoney,
  setIsSendingOhters,
  setIsTopingUp,
} from 'redux/actions/dashboard/dashboard';

const MoneyTransfer = ({ payBills }) => {
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const { openPayBills, setOpenPayBills } = payBills;
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  return (
    <>
      <DashboardLayout>
        <WelcomeBar>
          <div className="head-content">
            {!isAppDisplayedInWebView() && (
              <div className="go-back">
                <GoBack style onClickHandler={onClickHandler} />
              </div>
            )}
            <h2 className="head-title">
              {global.translate('Money transfer')}
            </h2>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="wrap__container">
          <PayBills
            open={openPayBills}
            setOpen={setOpenPayBills}
            payBills={payBills}
          />
          <div className="services-container">
            <h3>{global.translate('Money transfer')}</h3>
            <div className="container-subtitle">
              {global.translate(
                'From your digital wallet to any destination of your choice',
              )}
            </div>
            <div className="services-cards">
              <CardComponent
                image={MoneyTransferIcon}
                onClick={() => {
                  setIsSendingMoney(dispatch);
                  history.push('/contacts?ref=send-money');
                }}
                title={global.translate('Transfer Money')}
                subtitle={global.translate(
                  'Transfer funds to your 2UMoney contacts',
                )}
              />
              <CardComponent
                image={SendCashIcon}
                title={global.translate('Send cash')}
                onClick={() => {
                  setIsendingCash(dispatch);

                  history.push('/contacts?ref=send-cash');
                }}
                subtitle={global.translate(
                  'Send cash to external contact',
                )}
              />
              <CardComponent
                image={sendVoucherIcon}
                title={global.translate('Send a voucher')}
                onClick={() =>
                  history.push('/contacts?ref=send-voucher')
                }
                subtitle={global.translate(
                  'Create a voucher or a gift card',
                )}
              />
              <CardComponent
                image={TopUpIcon}
                onClick={() => {
                  setIsTopingUp(dispatch);
                  history.push('/contacts?ref=to-up');
                }}
                title={global.translate('Buy Airtime')}
                subtitle={global.translate('Buy Airtime')}
              />
              {sendMoneyOpen && (
                <ExchangeContainer
                  setSendMoneyOpen={setSendMoneyOpen}
                  sendMoneyOpen={sendMoneyOpen}
                />
              )}
              <CardComponent
                image={CurrencyExchangeIcon}
                onClick={() => {
                  setSendMoneyOpen(!sendMoneyOpen);
                  setIsSendingMoney(dispatch);
                }}
                title={global.translate('Currency exchange')}
                subtitle={global.translate(
                  'The easiest way to do your currency exchange',
                )}
              />
              <CardComponent
                image={ToOtherIcon}
                title={global.translate('Other networks')}
                onClick={() => {
                  setIsSendingOhters(dispatch);
                  history.push('/contacts?ref=to-others');
                }}
                subtitle={global.translate(
                  'Transfer money from your wallet to other providers',
                )}
              />
              <CardComponent
                image={payBillsIcon}
                title={global.translate('Pay bills')}
                onClick={() => setOpenPayBills(true)}
                subtitle={global.translate(
                  'Pay your bills to registered providers',
                )}
              />
              <CardComponent
                image={payBillsIcon}
                title={global.translate('PayPal')}
                onClick={() => history.push('push-paypal')}
                subtitle={global.translate(
                  'Transfer funds to your PayPal account',
                )}
              />
            </div>
            <h3 className="coming-soon-title">
              {global.translate('Coming soon')}
            </h3>
            <div className="soon-cards">
              <ComingSoon
                image={bankTransferIcon}
                to="/"
                title={global.translate('Bank transfer')}
                subtitle={global.translate(
                  'Transfer fund to a bank account',
                )}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

MoneyTransfer.propTypes = {
  payBills: PropTypes.instanceOf(Object),
};

MoneyTransfer.defaultProps = {
  payBills: {},
};
export default MoneyTransfer;
