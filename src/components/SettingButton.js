import React from 'react';

const SettingButton = ({ onOpenModal, cid }) => {
  const handleClick = () => {
    // Call the function to open the modal with the cid value
    onOpenModal(cid);
  };

  return (
    <button onClick={handleClick}>
      Settings
    </button>
  );
};

export default SettingButton;
