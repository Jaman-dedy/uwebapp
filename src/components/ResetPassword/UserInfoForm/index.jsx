import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Loader } from 'semantic-ui-react';

import PhoneInput from 'components/common/PhoneInput';
import DatePicker from 'components/common/DatePicker';
import countries from 'utils/countryCodes';
import { getDateFromNow } from 'utils';

import './UserInfoForm.scss';
import AlertDanger from 'components/common/Alert/Danger';

const UserInfoForm = ({
  resetPasswordData,
  onInputChange,
  screenOne,
}) => {
  const {
    errors,
    onSubmit,
    handleNext,
    clearError,
    userLocationData,
    resetPasswordPrequalification,
    phoneValue,
    setPhoneValue,
  } = screenOne;
  const [country, setCountry] = useState({});
  const [focused, setFocused] = useState(false);
  const history = useHistory();

  const defaultCountry = resetPasswordData.countryCode
    ? countries.find(
        country => country.value === resetPasswordData.countryCode,
      )
    : countries.find(
        country => country.flag === userLocationData.CountryCode,
      );

  useEffect(() => {
    if (defaultCountry) {
      setCountry(defaultCountry);
    }
  }, [defaultCountry]);

  useEffect(() => {
    onInputChange({
      target: {
        name: 'countryCode',
        value: country && country.value,
      },
    });
  }, [country]);

  const handleDOB = ({ value }) => {
    onInputChange({ target: { name: 'DOB', value } });
  };

  const minDate = useMemo(() => getDateFromNow(-100), []);
  const maxDate = useMemo(() => getDateFromNow(-13), []);

  return (
    <>
      <Container className="userinfo">
        <div className="auth-sub-text">
          {global.translate('Please tell us about yourself')}
        </div>
        {errors.Description && (
          <AlertDanger
            message={global.translate(errors.Description)}
          />
        )}

        <Form
          onSubmit={onSubmit}
          className="form-information"
          autoComplete="off"
        >
          <Form.Field>
            <span>{global.translate('Username')}</span>
            <Form.Input
              placeholder={global.translate('Username')}
              error={errors.personalId || false}
              name="personalId"
              type="text"
              required
              value={resetPasswordData.personalId}
              onChange={e => {
                onInputChange(e);
                clearError();
              }}
            />
          </Form.Field>
          <span>{global.translate('Phone number')}</span>
          <Form.Field>
            <div className="user-phone-number">
              <PhoneInput
                focused={focused}
                setFocused={setFocused}
                setPhoneNumber={setPhoneValue}
                phoneValue={resetPasswordData.phoneNumber}
                country={country}
              />
            </div>
          </Form.Field>
          <span>{global.translate('Date of  birth')}</span>
          <Form.Field>
            <DatePicker
              name="dob"
              maxDate={maxDate}
              onDateChange={date => {
                handleDOB({ value: date });
                clearError();
              }}
              minDate={minDate}
              date={resetPasswordData.DOB}
              dateFormat="yyyy-MM-dd"
              placeholder={global.translate('YYYY-MM-DD')}
              dropdownMode="select"
            />
          </Form.Field>
          <button
            type="submit"
            className="btn-auth btn-primary"
            onClick={() => handleNext()}
            disabled={
              !resetPasswordData.DOB ||
              !phoneValue ||
              phoneValue?.length < 11
            }
          >
            {(resetPasswordPrequalification.loading && (
              <Loader inverted active inline size="small" />
            )) ||
              global.translate('continue').toUpperCase()}
          </button>
          <br />
          <div>
            <div>{global.translate('Want to login?')} </div>
            <button
              type="button"
              className="login-link"
              onClick={() => history.push('/login')}
            >
              {global.translate('login').toUpperCase()}
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
};

UserInfoForm.propTypes = {
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  screenOne: PropTypes.instanceOf(Object).isRequired,
};

UserInfoForm.defaultProps = {
  onInputChange: () => null,
};

export default UserInfoForm;
