import ReactModal from 'react-modal';

const CustomModal = ({ isOpen, onClose, content }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </ReactModal>
  );
};

export default CustomModal;
