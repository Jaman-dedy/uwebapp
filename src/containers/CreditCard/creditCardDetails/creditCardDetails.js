/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import editCreditCard, {
  clearChangeCard,
} from 'redux/actions/credit-card/changeCreditCardPin';
import activateMyCard, {
  clearActivateCard,
} from 'redux/actions/credit-card/activateMyCard';
import enableMycard, {
  clearEnableCard,
} from 'redux/actions/credit-card/enableMyCreditCard';
import getCreditCards from 'redux/actions/credit-card/getCreditCards';

export default wallet => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [cardPin, setCardPin] = useState(null);
  const [confirmPin, setConfirmPin] = useState(null);
  const [error, setError] = useState(null);
  const [pinError, setPinError] = useState(null);
  const [pin, setPin] = useState(null);
  const [shouldClear, setShouldClear] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmPinOpen, setConfirmPinOpen] = useState(false);
  const [isActivatingCard, setIsActivatingCard] = useState(false);
  const [isEnablingCard, setIsEnablingCard] = useState(false);
  const [isChangingPwd, setIsChangingPwd] = useState(false);
  const [loadOnEnable, setLoadOnEnable] = useState(false);
  const [loadOnActivate, setLoadOnActivate] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);

  const {
    changeCreditCardPin,
    activateCreditCard,
    enableCreditCard,
    creditCardList,
  } = useSelector(({ creditCard }) => creditCard);

  const [pinDigit, setPinDigit] = useState('');
  const [confirmPinDigit, setConfirmPinDigit] = useState('');
  const [userPinDigit, setUserPinDigit] = useState('');

  const getCreditCardLoading = creditCardList.loading;
  useEffect(() => {
    if (activateCreditCard.data) {
      setShouldClear(true);
      setIsActivatingCard(false);
      clearActivateCard()(dispatch);
      setIsActivatingCard(false);
    }
  }, [activateCreditCard.data]);
  useEffect(() => {
    if (enableCreditCard.data) {
      setShouldClear(true);
      setIsEnablingCard(false);
      clearEnableCard()(dispatch);
      setIsEnablingCard(false);
    }
  }, [enableCreditCard.data]);
  useEffect(() => {
    if (activateCreditCard.error) {
      setShouldClear(true);
      setIsActivatingCard(false);
      clearActivateCard()(dispatch);
    }
  }, [activateCreditCard.error]);
  useEffect(() => {
    if (enableCreditCard.error) {
      setShouldClear(true);
      setIsEnablingCard(false);
      clearEnableCard()(dispatch);
    }
  }, [enableCreditCard.error]);

  useEffect(() => {
    if (changeCreditCardPin.data) {
      setShouldClear(true);
      setIsChangingPwd(false);
      clearChangeCard()(dispatch);
      setOpenPinModal(false);
    }
  }, [changeCreditCardPin.data]);

  useEffect(() => {
    if (changeCreditCardPin.error) {
      setShouldClear(true);
      clearChangeCard()(dispatch);
      setIsChangingPwd(false);
    }
  }, [changeCreditCardPin.error]);
  useEffect(() => {
    if (shouldClear) {
      setShouldClear(false);
    }
  }, [shouldClear]);
  const checkSequence = thisPin => {
    const numbers = '123456789';
    const numbersRev = '987654321';
    if (thisPin.length) {
      return (
        numbers.includes(String(thisPin.trim())) ||
        numbersRev.includes(String(thisPin.trim()))
      );
    }
  };
  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = pinDigit;
    setCardPin(`${digit0}${digit1}${digit2}${digit3}`);
  }, [pinDigit]);

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = confirmPinDigit;
    setConfirmPin(`${digit0}${digit1}${digit2}${digit3}`);
  }, [confirmPinDigit]);

  useEffect(() => {
    setPin(userPinDigit);
  }, [userPinDigit]);

  useEffect(() => {
    setForm({
      ...form,
      CardPin: cardPin,
    });
  }, [cardPin]);
  useEffect(() => {
    setForm({
      ...form,
      PIN: pin,
    });
  }, [pin]);
  useEffect(() => {
    if (wallet) {
      setForm({
        ...form,
        CardNumber: wallet.CardNumber,
        Enable: wallet.Enabled === 'NO' ? 'YES' : 'NO',
      });
    }
  }, [wallet]);
  const pinIsValid = () => cardPin && cardPin.length === 4;
  const MyPinIsValid = () => pin && pin.length === 4;
  const validateMyPin = () => {
    if (!MyPinIsValid()) {
      setPinError(
        global.translate('Please provide your PIN number.'),
      );
      return true;
    }
    return false;
  };
  const validate = () => {
    if (cardPin !== confirmPin) {
      setError(
        global.translate('The PIN number does not match'),
      );
      return true;
    }
    if (
      cardPin.search(/[A-Z]/) === 0 ||
      cardPin.search(/[a-z]/) === 0 ||
      cardPin.search(/[@!#$%^&*]/) === 0
    ) {
      setPinError(
        global.translate('PIN should only contain numbers'),
      );
      return true;
    }
    if (checkSequence(cardPin)) {
      setPinError(
        global.translate(
          'Consecutive numbers are not allowed.',

        ),
      );
      return true;
    }
    if (!pinIsValid()) {
      setPinError(
        global.translate('Please provide your PIN number.'),
      );
      return true;
    }

    return false;
  };
  const handleChangeCreditCardPin = () => {
    const data = {
      CardNumber: form?.CardNumber,
      CardPIN: form?.CardPIN ?? cardPin,
      PIN: form?.PIN,
    };
    if (!validate()) {
      setPinError(null);
      editCreditCard(data, '/ChangeCardPIN')(dispatch);
    }
  };
  const handleActivateCard = () => {
    const data = {
      CardNumber: form?.CardNumber,
      PIN: form?.PIN,
    };
    if (!validateMyPin()) {
      setError(null);
      activateMyCard(data, '/CreditCardReceived')(dispatch);
    }
  };
  const handleEnableCard = () => {
    const data = {
      CardNumber: form?.CardNumber,
      Enable: form?.Enable,
      PIN: form?.PIN,
    };
    if (!validateMyPin()) {
      setError(null);
      enableMycard(data, '/EnableCreditCard')(dispatch);
    }
  };
  useEffect(() => {
    setLoadOnEnable(enableCreditCard.loading);
  }, [enableCreditCard]);
  useEffect(() => {
    setLoadOnActivate(activateCreditCard.loading);
  }, [activateCreditCard]);

  return {
    wallet,
    handleChangeCreditCardPin,
    handleActivateCard,
    setError,
    error,
    setForm,
    setPinDigit,
    setConfirmPinDigit,
    pinDigit,
    confirmPinDigit,
    form,
    setUserPinDigit,
    userPinDigit,
    changeCreditCardPin,
    shouldClear,
    setShouldClear,
    checked,
    setChecked,
    confirmPinOpen,
    setConfirmPinOpen,
    isActivatingCard,
    setIsActivatingCard,
    isEnablingCard,
    setIsEnablingCard,
    isChangingPwd,
    setIsChangingPwd,
    validate,
    pinError,
    setPinError,
    handleEnableCard,
    loadOnActivate,
    loadOnEnable,
    openPinModal,
    setOpenPinModal,
    getCreditCardLoading,
  };
};
