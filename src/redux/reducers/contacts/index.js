import initialState from 'redux/initial-states/contacts';
import getAllContacts from './getAllContacts';
import locateUser from './locateUser';
import addNewContact from './addNewContact';
import getRecentActiveContacts from './getRecentActiveContacts';
import getExternalContactList from './getExternalContacts';
import deleteContact from './deleteContact';
import updateContactPicture from './updateContactPicture';
import getRecentActiveExternalContacts from './getActiveExternalContacts';
import getReferreesList from './getReferreesList';
import adddRemoveFavorite from './adddRemoveFavorite';
import getFavoritesList from './favoritesList';
import blockUnblock from './blockUnblockContact';
import getBlockedContactsList from './getBlockedContacts';
import getBlockedBy from './getBlockedBy';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getAllContacts(state, action),
  ...locateUser(state, action),
  ...addNewContact(state, action),
  ...getRecentActiveContacts(state, action),
  ...getRecentActiveExternalContacts(state, action),
  ...getExternalContactList(state, action),
  ...deleteContact(state, action),
  ...updateContactPicture(state, action),
  ...getReferreesList(state, action),
  ...adddRemoveFavorite(state, action),
  ...getFavoritesList(state, action),
  ...blockUnblock(state, action),
  ...getBlockedContactsList(state, action),
  ...getBlockedBy(state, action),
});
