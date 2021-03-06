import React, { useState } from 'react';
import { Modal, Form, Button, Image } from 'semantic-ui-react';

import UploadImgButton from 'components/common/uploadImgButton';
import './style.scss';
import ZoomDocIcon from 'assets/images/profile/zoom-doc.svg';
import EditDoc from 'assets/images/profile/edit-doc.svg';
import PreviewImgModal from 'components/common/PreviewImgModal';
import Img from 'components/common/Img';

const SupportingDocModal = ({
  open,
  setOpen,
  nameImgToUpload,
  supportingDocuments,
}) => {
  const [openPreview, setOpenPreview] = useState(false);
  const {
    onImageChange,
    handleSubmit,
    userIdUrlData,
    uploadingDoc,
    submittingDoc,
  } = supportingDocuments;
  return (
    <Modal onOpen={() => setOpen(true)} open={open} size="tiny">
      <div className="upload-other-docs">
        <h3>{global.translate('Supporting document')}</h3>
        <div className="doc-img-content">
          <div>{global.translate('Document')}</div>
          {userIdUrlData ? (
            <>
              <div className="id-copy">
                <div
                  className="images-doc-actions"
                  onClick={() => setOpenPreview(true)}
                >
                  <Image src={ZoomDocIcon} />
                </div>
                <div className="edit-delete-doc">
                  <UploadImgButton
                    name={nameImgToUpload}
                    onChooseFile={onImageChange}
                    img
                    src={EditDoc}
                    loading={uploadingDoc}
                    uploadedImg={userIdUrlData?.MediaSourceURL}
                  />
                </div>
                <div className="overlay" />
                <Img
                  className="user-doc-img"
                  src={userIdUrlData?.MediaSourceURL}
                  compress
                  format="png"
                  not_rounded
                  style={{ width: '100%', height: '217px' }}
                />
              </div>
            </>
          ) : (
            <UploadImgButton
              name={nameImgToUpload}
              onChooseFile={onImageChange}
              title={global.translate('Browse document')}
              loading={uploadingDoc}
              uploadedImg={userIdUrlData?.MediaSourceURL}
            />
          )}
        </div>
        <div className="update-info-actions">
          <Button
            className="btn--cancel"
            onClick={() => setOpen(false)}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            disabled={!userIdUrlData}
            className="btn--confirm"
            loading={submittingDoc}
            onClick={handleSubmit}
          >
            {global.translate('upload')}
          </Button>
        </div>
      </div>
      <PreviewImgModal
        setOpen={setOpenPreview}
        open={openPreview}
        imgToPreview={userIdUrlData?.MediaSourceURL}
      />
    </Modal>
  );
};

export default SupportingDocModal;
