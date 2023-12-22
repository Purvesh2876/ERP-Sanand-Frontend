import React, { useState, useEffect } from 'react';
import { createCamera, getCustomerCameraList, updateCamera, deleteCamera, getBox, createBox, deleteShelf, getShelf, createShelf } from '@/pages/api/getcamera';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const ShelfList = () => {
  const [shelfList, setShelfList] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const [editableCameraID, setEditableCameraID] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sdCard, setsdCard] = useState('');

  const [chargerChecked, setChargerChecked] = useState(false);
  const [sdCardChecked, setSdCardChecked] = useState(false);
  const [simCardChecked, setSimCardChecked] = useState(false);

  const handleChargerChange = () => {
    setChargerChecked((prev) => !prev);
  };
  
  const handleSdCardChange = () => {
    setSdCardChecked((prev) => !prev);
  };
  
  const handleSimCardChange = () => {
    setSimCardChecked((prev) => !prev);
  };
  

  const handleEditClick = (itemId) => {
    setEditableCameraID(itemId);
  };

  const handleUpdateClick = async (deviceid, email) => {
    try {
      const updatedCamera = {
        cameraurl: updatedFields[deviceid].cameraurl,
        plandisplayname: updatedFields[deviceid].plandisplayname,
      };

      // Make an API call to update the camera information
      await updateProduct( updatedCamera.plandisplayname,updatedCamera.cameraurl, deviceid, email);
      
      // Reset the editing state after successful update
      setEditableFields({ [deviceid]: false });
      console.log(`Camera with Device ID ${deviceid} has been updated.`);

      window.location.reload();
      
    } catch (error) {
      // Handle errors if the update request fails
      console.error('Error updating camera:', error);
    }
  };

  const handleFieldChange = (deviceid, field, value) => {
    setUpdatedFields({
      ...updatedFields,
      [deviceid]: {
        ...updatedFields[deviceid],
        [field]: value
      }
    });
  };


  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this camera?");

    if (confirmDelete) {
      // Call the deleteUser function with the userId
      // Add your delete logic here
      await deleteShelf(id)
        .then(() => {
          console.log(`Camera with ID ${id} has been deleted.`);
          window.location.reload();
          // Perform actions after successful deletion if necessary
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          // Handle error if the delete request fails
        });
    } else {
      // User clicked Cancel, do nothing or perform actions if necessary
    }
  };


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // Extract data from the form
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
  
    try {
      // Use your createCamera function to make the POST request
      const response = await createShelf(formObject);
      console.log('Form submitted successfully:', response.data);
      // Add logic to handle the response as needed
      
      // Reset the modal or close it after successful submission
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle the error
    }
  };
  



  useEffect(() => {

  //   const fetchShelfList = async () => {
  //     try {
  //       const response = await getShelf();

  //       // Check if the response is an array before setting the state
  //       if (Array.isArray(response.data.data)) {
  //         setShelfList(response.data.data);
  //       } else {
  //         console.error('Invalid response format. Expected an array.');
  //       }

  //       console.log("Khaja",response);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchShelfList();
  // }, []);

  const fetchShelfList = async () => {
        try {
          const response = await getShelf();
          const boxList = await getBox();
          const shelves = response.data.data.map((shelf) => {
            const cameraCount = boxList.data.data.filter((camera) => camera.shelfNo === shelf.shelfName).length;
            console.log(`Shelf ${shelf.shelfNumber} has ${cameraCount} boxes.`);
            return {
              ...shelf,
              cameraCount: cameraCount,
            };
          });
          setShelfList(shelves);
          console.log("lele",cameraCount);
        } catch (error) {
          // Handle error
        }
      };
    
      fetchShelfList();
      }, []);


  return (
    <div>
      <Box p={{ base: '2rem', md: '4rem' }}>
        {/* Table */}

        <Button onClick={handleOpenModal} colorScheme="teal" mb={4}>
          Add New Shelf
        </Button>

        <div style={{ height: '400px', overflow: 'auto' }}>



<TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Shelf Name</Th>
                  <Th>Shelf No.</Th>
                  <Th>Rack No.</Th>
                  <Th>Total Boxes</Th>
                  {/* <Th>Sim Card</Th>
                  <Th>Box No.</Th> */}
                  <Th>Edit/Delete</Th>
                </Tr>
             
              </Thead>
              <Tbody>
                {shelfList.map((shelf) => (
                  <Tr key={shelf.deviceId}>
                    <Td>{shelf.shelfName}</Td>
                    <Td>{shelf.shelfNumber}</Td>
                    <Td>{shelf.rackNo}</Td>
                    <Td>{shelf.cameraCount}</Td>
                   
                    {/* <Td>
                      <input
                        type="checkbox"
                        checked={box.simcard }
                        disabled={editableCameraID !== box.deviceId}
                        onChange={handleSimCardChange}
                      />
                    </Td>
                    <Td>{box.boxNo}</Td> */}
                    <Td>
                      {editableCameraID === shelf.deviceId ? (
                        <Button onClick={() => handleUpdateClick(box.deviceId)} colorScheme="green">
                          Update
                        </Button>
                      ) : (
                        <>
                          <Button
                            marginLeft={2}
                            marginRight={2}
                            onClick={() => handleEditClick(box.deviceId)}
                            colorScheme="blue"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteClick(box._id) 
                            
                            }
                            colorScheme="red"
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>


        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Camera</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Camera Form */}
              <form onSubmit={handleFormSubmit}>

                <FormControl mb={4}>
                  <FormLabel>Shelf Name</FormLabel>
                  <Input type="text" name="shelfName" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Shelf Number</FormLabel>
                  <Input type="text" name="shelfNumber" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Rack No.</FormLabel>
                  <Input type="text" name="rackNo" />
                </FormControl>
              
                <Button type="submit" colorScheme="teal" mr={3}>
                  Submit
                </Button>
                <Button onClick={handleCloseModal}>Cancel</Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>

      </Box>
    </div>
  );
};

export default ShelfList;