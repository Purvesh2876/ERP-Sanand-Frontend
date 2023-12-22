
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
  } from '@chakra-ui/react';
  import PropTypes from 'prop-types';

  import React, { useState, useEffect } from 'react';

  const NotificationDialog = ({ isOpen, onClose, notificationCount, onMarkAsRead }) => {

    const [message, setMessage] = useState('');
   

      
    const handleMarkAsRead = () => {
      onMarkAsRead();
      setMessage('');
      onClose();
    };
  
    return (
      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Notifications
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {/* You have {notificationCount} new notifications. */}
              {message}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="teal" backgroundColor={"#63b3ed"} onClick={handleMarkAsRead}>
                Mark as Read
              </Button>
              <Button ml={4} variant="outline" onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };
  
  NotificationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    notificationCount: PropTypes.number.isRequired,
    onMarkAsRead: PropTypes.func.isRequired,
 
  };
  
  export default NotificationDialog;
  