import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Button,
  Image,
  Message,
  Input,
} from 'semantic-ui-react';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import './modal.scss';
import Thumbnail from 'components/common/Thumbnail';

import VerifiedIcon from 'assets/images/verified.png';
import AddStoreAgentAction from 'redux/actions/stores/addStoreAgents';
import { clearDeleteContact } from 'redux/actions/contacts/deleteContact';
import { clearFoundUser } from 'redux/actions/contacts/locateUser';

const AddNewContactModal = ({
  open,
  setOpen,
  onChange,
  form,
  onSubmit,
  addNewUserData,
  localError,
  onSearchUser,
  searchData: { error, data, loading },
  setForm,
  setLocalError,
  currentStore,
}) => {
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (form.PID && form.PID.length === 1) {
      clearFoundUser()(dispatch);
    }
  }, [form.PID]);

  const { error: locateError } = useSelector(
    state => state.contacts.locateUser,
  );
  const { data: addAgent, loading: addAgentLoading } = useSelector(
    state => state.stores.addStoreAgents,
  );

  useEffect(() => { }, [locateError]);

  return (
    <>
      <Modal
        onClose={() => {
          clearDeleteContact()(dispatch);
          setOpen(false);
        }}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Modal.Header className="modal-title">
          {global.translate('Add an agent')}
        </Modal.Header>
        <Modal.Content className="modal-main">
          <div>
            <Form
              onSubmit={onSearchUser}
              autoComplete="off"
              className="form-information top-form"
            >
              <Input
                fluid
                label={
                  <Button
                    content={global.translate('Search')}
                    positive
                    disabled={loading}
                    loading={loading}
                    name="search"
                    link
                    onClick={onSearchUser}
                    style={{ margin: '0px' }}
                  />
                }
                labelPosition="right"
                className="input"
                placeholder={global.translate(
                  'Provide the username ',

                )}
                disabled={addNewUserData?.loading}
                name="PID"
                value={form.PID || ''}
                onChange={onChange}
                ange={onChange}
              />
            </Form>
            {loading && (
              <div className="search-form-loading">
                <>
                  <LoaderComponent
                    className="loading"
                    loaderContent={global.translate(
                      'Please wait a moment.',

                    )}
                  />
                </>
              </div>
            )}
            {localError && !data && !loading && (
              <Message error content={localError} />
            )}
            {locateError && (
              <Message error content={locateError?.Description} />
            )}
            <Form
              onSubmit={onSubmit}
              autoComplete="off"
              loading={addNewUserData?.loading}
              className="form-information "
            >
              {data &&
                data[0].Result === 'Success' &&
                !loading &&
                !error &&
                !localError &&
                form.PID &&
                form.PID !== '' && (
                  <div className="results">
                    <Thumbnail
                      name={data[0].FirstName}
                      secondName={data[0].LastName}
                      avatar={data[0].PictureURL}
                      style={{
                        height: 95,
                        width: 95,
                        marginRight: -2,
                      }}
                      hasError={hasError}
                      setHasError={setHasError}
                    />
                    <p className="firstLastName">
                      {`${data[0].FirstName}  ${data[0].LastName}`}
                      {data &&
                        data[0] &&
                        data[0].AccountVerified === 'YES' && (
                          <span>
                            <Image
                              src={VerifiedIcon}
                              height={15}
                              style={{ display: 'inline' }}
                              width={15}
                              className="user-verified-icon"
                            />
                          </span>
                        )}
                    </p>
                    <p className="address">
                      {data[0].City} {data[0].Country}
                    </p>
                  </div>
                )}
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <>
            <Button
              className="btn--cancel"
              onClick={() => {
                clearFoundUser()(dispatch);
                setForm({});
                setLocalError(null);
                setOpen(false);
              }}
              disabled={addAgentLoading}
              content={global.translate('Cancel')}
            >
              {global.translate('Cancel')}
            </Button>

            <Button
              className="btn--confirm"
              disabled={
                !data ||
                (data && data[0] && data[0]?.Result !== 'Success') ||
                addAgentLoading
              }
              onClick={() => {
                if (data && data[0]?.Result === 'Success') {
                  AddStoreAgentAction({
                    StoreID: currentStore?.StoreID,
                    AgentPID: form.PID,
                  })(dispatch)(() => {
                    setOpen(false);
                  });
                }
              }}
              loading={addAgentLoading}
            >
              {global.translate(
                addAgentLoading ? 'Please wait ' : 'Submit',
              )}
            </Button>
          </>
        </Modal.Actions>
      </Modal>
    </>
  );
};

AddNewContactModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,

  onChange: PropTypes.func.isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmit: PropTypes.func.isRequired,
  addNewUserData: PropTypes.objectOf(PropTypes.any).isRequired,
  onSearchUser: PropTypes.func.isRequired,
  searchData: PropTypes.objectOf(PropTypes.any).isRequired,
  localError: PropTypes.string,
  setForm: PropTypes.func,
  setLocalError: PropTypes.func,
};

AddNewContactModal.defaultProps = {
  open: false,
  localError: null,
  setOpen: () => { },
  setForm: () => { },
  setLocalError: () => { },
};

export default AddNewContactModal;
