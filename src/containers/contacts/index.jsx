/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import queryString from 'query-string';

import getContactList from 'redux/actions/contacts/getContactList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import locateUser, {
  clearFoundUser,
} from 'redux/actions/contacts/locateUser';
import addNewContact from 'redux/actions/contacts/addNewContact';
import ManageContacts from 'components/contacts';
import deleteContact, {
  clearDeleteContact,
} from 'redux/actions/contacts/deleteContact';
import addRemoveFromFavoriteAction, {
  clearFavoritesSuccess,
} from 'redux/actions/contacts/addRemoveFromFavorite';

import countryCodes from 'utils/countryCodes';

const Contacts = () => {
  const [form, setForm] = useState({});
  const [editForm, setEditForm] = useState({});
  const [editErrors, setEditErrors] = useState(null);

  const {
    isSendingCash,
    isManagingContacts,
    isSendingMoney,
  } = useSelector(state => state.dashboard.contactActions);
  const [sendCashOpen, setSendCashOpen] = useState(false);
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const { userLocationData } = useSelector(({ user }) => user);
  const [country, setCountry] = useState({});
  const defaultCountry = countryCodes.find(
    country => country.flag === userLocationData.CountryCode,
  );

  useEffect(() => {
    if (defaultCountry) {
      setCountry(defaultCountry);
    }
  }, [defaultCountry]);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const { userData } = useSelector(state => state.user);
  const [destinationContact, setDestinationContact] = useState(null);

  const [isSharingNewWallet, setIsSharingNewWallet] = useState(false);

  const [isDetail, setIsDetail] = useState(false);
  const DefaultWallet = useSelector(
    state =>
      state.user.userData.data &&
      state.user.userData.data.DefaultWallet,
  );
  const { allContacts, activeContacts } = useSelector(
    state => state.contacts,
  );
  const { data, loading, error } = allContacts;
  const searchData = useSelector(state => state.contacts.locateUser);
  const { addRemoveFavorite } = useSelector(state => state.contacts);

  const { walletList } = useSelector(state => state.user.myWallets);
  const {
    newContact: addNewUserData,
    deleteContact: deleteContactData,
  } = useSelector(state => state.contacts);

  const [open, setOpen] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [contact, setContact] = useState(null);

  const handleCreateExternalContact = () => {
    const phonePrefix = country.value;
    const countryCode = country.key.toUpperCase();
    const currency = '';

    const phoneNumber =
      phonePrefix && phonePrefix.replace('+', '') + form.phoneNumber;

    if (
      Array.isArray(allContacts.data) &&
      allContacts.data.some(item => item.PhoneNumber === phoneNumber)
    ) {
      toast.error(global.translate('Contact already exists'));
      return false;
    }
    const externalContactData = {
      CountryCode: countryCode,
      DestPhoneNum:
        phonePrefix &&
        phonePrefix.replace('+', '') + form.phoneNumber,
      Currency: currency,
      FirstName: form.firstName,
      LastName: form.lastName,
      PhonePrefix: phonePrefix,
      PhoneNumber: phoneNumber,

      Phone: form.phoneNumber,
    };

    addNewContact(
      externalContactData,
      '/AddToExternalContact',
    )(dispatch);
  };

  const removeUserContact = contact => {
    if (contact.ContactType === 'INTERNAL') {
      deleteContact(
        { Criteria: 'PID', ContactData: contact.ContactPID },
        '/DeleteContact',
      )(dispatch);
    } else {
      deleteContact(
        { ContactPhoneNum: contact.PhoneNumber },
        '/DeleterExternalContact',
      )(dispatch);
    }
  };
  const clearRemoveContact = () => {
    clearDeleteContact()(dispatch);
  };

  const handleFavouriteStatusChange = contact => {
    if (contact.ContactType === 'INTERNAL') {
      const requestData = {
        Action: contact.Favorite === 'YES' ? 'REMOVE' : 'ADD',
        ContactsPID: [contact.ContactPID],
        ContactsPhone: [],
      };

      addRemoveFromFavoriteAction(requestData, contact)(dispatch);
    } else {
      const requestData = {
        Action: contact.Favorite === 'YES' ? 'REMOVE' : 'ADD',
        ContactsPID: [],
        ContactsPhone: [contact.PhoneNumber],
      };

      addRemoveFromFavoriteAction(requestData, contact)(dispatch);
    }
  };
  useEffect(() => {
    if (addRemoveFavorite.success) {
      setContact(addRemoveFavorite.contact);
      toast.success(
        global.translate(addRemoveFavorite.data[0].Description),
      );
      clearFavoritesSuccess()(dispatch);
    }
  }, [addRemoveFavorite]);

  const getContacts = (forceRefresh = false) => {
    if (forceRefresh) {
      getContactList()(dispatch);
    }
    if (!data || error) {
      getContactList()(dispatch);
    }
  };

  useEffect(() => {
    if (walletList.length === 0) {
      getMyWallets()(dispatch);
    }
  }, []);

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (searchData.error) {
      setLocalError(searchData.error && searchData.error.Description);
    }
  }, [searchData.error]);

  useEffect(() => {
    if (queryParams.ref === 'send-money' && queryParams.PID) {
      const contact =
        allContacts.data &&
        allContacts.data.find(
          ({ ContactPID }) => ContactPID === queryParams.PID,
        );

      if (contact) {
        setSendMoneyOpen(true);
        setDestinationContact(contact);
        history.push('/contacts');
      }
    }
  }, [allContacts]);

  useEffect(() => {
    if (queryParams.ref === 'contact-info' && queryParams.PID) {
      const contact =
        allContacts.data &&
        allContacts.data.find(
          ({ ContactPID }) => ContactPID === queryParams.PID,
        );

      if (contact) {
        setIsDetail(true);
        setContact(contact);
        history.push('/contacts');
      }
    }
  }, [allContacts]);

  const walletsArr =
    form &&
    form.wallets &&
    form.wallets.map((wallet, index) => {
      const key = `Wallet${index + 1}`;
      return {
        [key]: wallet,
      };
    });
  const contactData = {
    contactToAdd: searchData.data,
    Criteria: 'PID',
    ContactData: form && form.PID && form.PID.toUpperCase(),
  };

  const newobj =
    walletsArr &&
    walletsArr.map((item, index) => {
      return item[`Wallet${index + 1}`];
    });

  if (newobj) {
    for (let i = 0; i < newobj.length; i += 1) {
      const element = newobj[i];
      const key = `Wallet${i + 1}`;
      contactData[key] = element;
    }
  }

  const addToContact = () => {
    addNewContact(contactData, '/AddToContact')(dispatch);
  };
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const checkExists = () => {
    let exists = false;
    if (
      allContacts.data &&
      allContacts.data[0] &&
      allContacts.data[0].ContactsFound !== 'NO'
    ) {
      allContacts.data.forEach(element => {
        if (
          element.ContactPID &&
          element.ContactPID.toLowerCase() ===
            form.PID.trim().toLowerCase()
        ) {
          exists = true;
        }
      });
    }
    return exists;
  };

  const onSearchUser = () => {
    if (form.PID && userData.data) {
      if (
        form.PID.trim().toLowerCase() ===
        userData.data.PID.toLowerCase()
      ) {
        setLocalError(
          global.translate('You cannot be your own contact', 1197),
        );
        return;
      }
      if (checkExists()) {
        setLocalError(
          form.PID.trim() +
            global.translate(' is already in your contacts'),
        );
        return;
      }
      setLocalError(null);
      locateUser({
        PID: form.PID.trim(),
        userPID: userData.data && userData.data.PID,
      })(dispatch);
    }
  };

  const clearSuccess = () => {
    setForm({});
    setOpen(false);
    clearFoundUser()(dispatch);
  };

  useEffect(() => {
    if (addNewUserData.success) {
      if (addNewUserData.data.ContactType === 'EXTERNAL') {
        setOpen(false);
        setContact(addNewUserData.data);
        toast.success(
          global.translate(
            'Your contact is added successfully.',
            996,
          ),
          setIsDetail(true),
        );
      }
    }

    if (addNewUserData.success) {
      if (
        addNewUserData.data &&
        addNewUserData.data[0] &&
        addNewUserData.data[0].ContactPID
      ) {
        getContacts(true);
        setContact(addNewUserData.data[0]);

        if (isSharingNewWallet) {
          toast.success(
            global.translate('Wallet Lists updated successfully'),
          );
          setIsSharingNewWallet(false);
        } else {
          setOpen(false);
          toast.success(
            global.translate(
              'Your contact is added successfully.',
              996,
            ),
            setIsDetail(true),
          );
        }
      }

      clearSuccess();
    }
  }, [addNewUserData.success]);

  const onEditChange = (e, { name, value }) => {
    setEditForm({ ...editForm, [name]: value });
  };
  const handleEditInfo = (type, contact) => {
    switch (type) {
      case 'external':
        if (!editForm.firstName || editForm.firstName === '') {
          setEditErrors(
            global.translate(
              'Please provide the first and last names',
            ),
          );
          break;
        } else {
          setEditErrors(null);
        }
        if (!editForm.lastName || editForm.lastName === '') {
          setEditErrors(
            global.translate(
              'Please provide the recipient’s first and last names',
              762,
            ),
          );
          break;
        } else {
          setEditErrors(null);
        }

        if (!editForm.phoneNumber || editForm.phoneNumber === '') {
          setEditErrors(
            global.translate('Please provide the phone number.'),
          );
          break;
        } else {
          setEditErrors(null);
        }

        if (!editErrors) {
          const externalContactData = {
            ...contact,
            FirstName: editForm.firstName,
            LastName: editForm.lastName,
          };
          addNewContact(
            externalContactData,
            '/AddToExternalContact',
            'isEditingExternal',
          )(dispatch);
          setContact(externalContactData);
        }
        break;
      case 'default':
        if (editForm.wallets.length === 0) {
          toast.error(
            global.translate(
              'You must select at least one wallet to make visible to ',
              633,
            ) + contact.FirstName,
          );
          break;
        }
        const walletsArr =
          editForm &&
          editForm.wallets &&
          editForm.wallets.map((wallet, index) => {
            const key = `Wallet${index + 1}`;
            return {
              [key]: wallet,
            };
          });
        const contactData = {
          contactToAdd: contact,
          Criteria: 'PID',
          ContactData: contact.ContactPID,
        };
        const newobj =
          walletsArr &&
          walletsArr.map((item, index) => {
            return item[`Wallet${index + 1}`];
          });

        if (newobj) {
          for (let i = 0; i < newobj.length; i += 1) {
            const element = newobj[i];
            const key = `Wallet${i + 1}`;
            contactData[key] = element;
          }

          addNewContact(
            contactData,
            '/AddToContact',
            'isEditing',
          )(dispatch);
        }
        break;

      default:
        return null;
    }
  };

  return (
    <ManageContacts
      setEditForm={setEditForm}
      editForm={editForm}
      walletList={walletList}
      history={history}
      onEditChange={onEditChange}
      onChange={onChange}
      addToContact={addToContact}
      open={open}
      userData={userData}
      loading={loading}
      error={error}
      form={form}
      setEditErrors={setEditErrors}
      editErrors={editErrors}
      handleEditInfo={handleEditInfo}
      setForm={setForm}
      setOpen={setOpen}
      data={data}
      searchData={searchData}
      getContacts={getContacts}
      handleFavouriteStatusChange={handleFavouriteStatusChange}
      addNewUserData={addNewUserData}
      activeContacts={activeContacts}
      clearSuccess={clearSuccess}
      onSearchUser={onSearchUser}
      country={country}
      setCountry={setCountry}
      localError={localError}
      isManagingContacts={isManagingContacts}
      isSendingCash={isSendingCash}
      sendCashOpen={sendCashOpen}
      setSendCashOpen={setSendCashOpen}
      destinationContact={destinationContact}
      setDestinationContact={setDestinationContact}
      DefaultWallet={DefaultWallet}
      setLocalError={setLocalError}
      isSendingMoney={isSendingMoney}
      sendMoneyOpen={sendMoneyOpen}
      setSendMoneyOpen={setSendMoneyOpen}
      removeUserContact={removeUserContact}
      deleteContactData={deleteContactData}
      clearDeleteContact={clearRemoveContact}
      contact={contact}
      setContact={setContact}
      isDetail={isDetail}
      setIsDetail={setIsDetail}
      setIsSharingNewWallet={setIsSharingNewWallet}
      isSharingNewWallet={isSharingNewWallet}
      addRemoveFavorite={addRemoveFavorite}
      allContacts={allContacts}
      handleCreateExternalContact={handleCreateExternalContact}
    />
  );
};

export default Contacts;
