import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ApplyLoanComponent from 'components/Microloan/ApplyLoan';
import checkLoanAction, {
  clearCheckEligibility,
} from 'redux/actions/microloan/checkLoan';
import applyLoanAction from 'redux/actions/microloan/applyLoan';
import { clearPayLoan } from 'redux/actions/microloan/payLoan';

const ApplyLoan = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { myWallets } = useSelector(({ user }) => user);
  const {
    checkLoan: {
      data: checkLoanData,
      error: checkLoanError,
      loading: checkLoanLoading,
    },
    applyLoan: {
      data: applyLoanData,
      error: applyLoanError,
      loading: applyLoanLoading,
    },
  } = useSelector(({ microloan }) => microloan);

  const [currentOption, setCurrentOption] = useState(null);
  const [form, setForm] = useState({});
  const [duration, setDuration] = useState('3');
  const [payDay, setPayDay] = useState({
    key: 1,
    text: '1st',
    value: 1,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [PIN, setPIN] = useState('');
  const [pinData, setPinData] = useState(null);
  const [checkLoanErrorMessage, setCheckLoanErrorMessage] = useState(
    null,
  );

  const [pinErrors, setPinErrors] = useState(null);

  const onOptionChange = (e, { name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
    setCheckLoanErrorMessage(null);
  };
  const handleOnClick = day => {
    setDuration(day);
  };

  useEffect(() => {
    clearPayLoan()(dispatch);
  }, []);

  useEffect(() => {
    setPinData(pinData => ({
      ...pinData,
      PIN,
    }));
    setPinErrors(null);
  }, [PIN]);

  const pinIsValid = () => PIN.length === 4;
  const validate = () => {
    if (!pinIsValid()) {
      setPinErrors({
        Description: global.translate(
          'Please provide your PIN number.',

        ),
      });
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!form?.amount || !payDay || !currentOption || !duration) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    clearCheckEligibility()(dispatch);
  }, [form?.amount, payDay, currentOption, duration, dispatch]);

  useEffect(() => {
    if (myWallets?.walletList.length) {
      const selectedWallet = myWallets?.walletList.find(
        wallet => wallet.Default === 'YES',
      );
      if (selectedWallet) {
        setCurrentOption(selectedWallet);
      }
    }
  }, [myWallets?.walletList.length]);

  useEffect(() => {
    if (applyLoanData || applyLoanError) {
      clearCheckEligibility()(dispatch);
      setOpenPinModal(false);
    }
  }, [applyLoanData, applyLoanError]);

  useEffect(() => {
    if (applyLoanData) {
      history.push('/microloan');
    }
  }, [applyLoanData]);

  const checkLoanEligibility = () => {
    const data = {
      WalletNumber: currentOption?.AccountNumber,
      Amount: form?.amount,
      Duration: duration,
    };
    checkLoanAction(data)(dispatch);
  };
  const applyForALoan = () => {
    const data = {
      WalletNumber: currentOption?.AccountNumber,
      Amount: form?.amount,
      Duration: duration,
      PayDay: payDay?.value.toString(),
      PIN: pinData?.PIN,
    };
    if (!validate()) {
      applyLoanAction(data)(dispatch);
    }
  };
  return (
    <ApplyLoanComponent
      walletList={myWallets?.walletList}
      setCurrentOption={setCurrentOption}
      currentOption={currentOption}
      onOptionChange={onOptionChange}
      setDuration={setDuration}
      handleOnClick={handleOnClick}
      duration={duration}
      setPayDay={setPayDay}
      payDay={payDay}
      buttonDisabled={buttonDisabled}
      checkLoanLoading={checkLoanLoading}
      checkLoanData={checkLoanData}
      checkLoanEligibility={checkLoanEligibility}
      checkLoanError={checkLoanError}
      applyForALoan={applyForALoan}
      applyLoanLoading={applyLoanLoading}
      setOpenPinModal={setOpenPinModal}
      openPinModal={openPinModal}
      setPIN={setPIN}
      PIN={PIN}
      pinErrors={pinErrors}
      pinData={pinData}
      clearCheckEligibility={clearCheckEligibility}
      setCheckLoanErrorMessage={setCheckLoanErrorMessage}
      checkLoanErrorMessage={checkLoanErrorMessage}
    />
  );
};

export default ApplyLoan;
