import React, { useState, useEffect } from 'react';
import { createCamera, getCustomerCameraList, updateCamera, deleteCamera, getBox } from '@/pages/api/getcamera';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const CameraList = () => {
  const [cameraList, setCameraList] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const [editableCameraID, setEditableCameraID] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sdCard, setsdCard] = useState('');

  const [chargerChecked, setChargerChecked] = useState(false);
  const [sdCardChecked, setSdCardChecked] = useState(false);
  const [simCardChecked, setSimCardChecked] = useState(false);

  const [cameraCountByBox, setCameraCountByBox] = useState({});


  const handleChargerChange = () => {
    setChargerChecked((prev) => !prev);
  };

  const handleSdCardChange = () => {
    setSdCardChecked((prev) => !prev);
  };

  const handleSimCardChange = () => {
    setSimCardChecked((prev) => !prev);
  };


  // const handleEditClick = (cameraID) => {
  //   setEditableCameraID(cameraID);

  //   if (!updatedFields[cameraID]) {
  //     const user = cameraList.find((camera) => camera._id === cameraID);
  //     console.log("hekkkk", cameraID);

  //     setUpdatedFields((prev) => ({
  //       ...prev,
  //       [cameraID]: {
  //         isCharger: user.isCharger === 1,
  //         isSdcard: user.isSdcard === 1,
  //         isSimcard: user.isSimcard === 1,
  //       },
  //     }));
  //   }
  // };


  // const handleUpdateClick = async (deviceid, email) => {
  //   try {
  //     const updatedCamera = {
  //       isCharger: updatedFields[deviceid].isCharger ? 1 : 0,
  //       isSdcard: updatedFields[deviceid].isSdcard ? 1 : 0,
  //       isSimcard: updatedFields[deviceid].isSimcard ? 1 : 0,
  //       // Add other fields as needed
  //     };

  //     // Make an API call to update the camera information
  //     await updateCamera(deviceid, updatedCamera.isCharger,updateCamera.isSdcard,updateCamera.isSimcard);

  //     // Reset the editing state after successful update
  //     setEditableCameraID(null);
  //     setUpdatedFields({});
  //     console.log(`Camera with Device ID ${deviceid} has been updated.`);

  //     // Refresh the camera list
  //   } catch (error) {
  //     // Handle errors if the update request fails
  //     console.error('Error updating camera:', error);
  //   }
  // };



  const handleEditClick = (cameraID) => {
    setEditableCameraID(cameraID);

    if (!updatedFields[cameraID]) {
      const user = cameraList.find((camera) => camera._id === cameraID);
      console.log("hekkkk", cameraID);

      setUpdatedFields((prev) => ({
        ...prev,
        [cameraID]: {
          charger: user.charger === 1,
          sdcard: user.sdcard === 1,
          simcard: user.simcard === 1,
          boxNo: user.boxNo === 1,
        },
      }));
    }
  };

  const handleUpdateClick = async (deviceid, email) => {
    try {
      const updatedCamera = {
        charger: updatedFields[deviceid].charger ? 1 : 0,
        sdcard: updatedFields[deviceid].sdcard ? 1 : 0,
        simcard: updatedFields[deviceid].simcard ? 1 : 0,
        boxNo: updatedFields[deviceid].boxNo,
        // Add other fields as needed
      };

      // Make an API call to update the camera information
      await updateCamera(deviceid, updatedCamera.charger, updatedCamera.sdcard, updatedCamera.simcard, updatedCamera.boxNo);

      // Reset the editing state after successful update
      setEditableCameraID(null);
      setUpdatedFields({});
      console.log(`Camera with Device ID ${deviceid} has been updated.`);
      window.location.reload();
      // Refresh the camera list
    } catch (error) {
      // Handle errors if the update request fails
      console.error('Error updating camera:', error);
    }
  };


  const handleFieldChange = (cameraID, field, value) => {
    setUpdatedFields((prevFields) => {
      const updatedCameraFields = {
        ...prevFields[cameraID],
        [field]: value,
      };
      return {
        ...prevFields,
        [cameraID]: updatedCameraFields,
      };
    });
  };


  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this camera?");

    if (confirmDelete) {
      // Call the deleteUser function with the userId
      // Add your delete logic here
      await deleteCamera(id)
        .then(() => {
          console.log(`Camera with ID ${id} has been deleted.`);
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

    const formData = new FormData(event.target);
    const formObject = {
      charger: chargerChecked ? 1 : 0,
      sdcard: sdCardChecked ? 1 : 0,
      simcard: simCardChecked ? 1 : 0,
    };

    formData.forEach((value, key) => {
      // Handle checkbox values
      if (key === 'charger' || key === 'sdcard' || key === 'simcard') {
        formObject[key] = value === '1' ? 1 : 0;
      } else {
        formObject[key] = value;
      }
    });

    // if (cameraCountByBox >= 40) {
    //   console.error('Cannot add more cameras to this box. Maximum camera count reached.');
    //   console.log("lala", cameraCountByBox);
    //   return;
    // }

    const selectedBox = formData.get('boxNo');
    const cameraCountForSelectedBox = cameraCountByBox[selectedBox] || 0;

    if (cameraCountForSelectedBox >= 40) {
      console.error('Cannot add more cameras to this box. Maximum camera count reached.');
      console.log("lala", cameraCountForSelectedBox);
      return;
    }

    try {
      // Use your createCamera function to make the POST request
      const response = await createCamera(formObject);
      console.log('Form submitted successfully:', response.data);
      // Add logic to handle the response as needed

      // Reset the modal or close it after successful submission
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle the error
    }
  };




  useEffect(() => {
    // const fetchCameraList = async () => {
    //   try {
    //     const response = await getCustomerCameraList();

    //     // Check if the response is an array before setting the state
    //     if (Array.isArray(response.data.data)) {
    //       setCameraList(response.data.data);
    //     } else {
    //       console.error('Invalid response format. Expected an array.');
    //     }

    //     console.log("jaja", response);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // };

    const fetchCameraList = async () => {
      try {
        const response = await getCustomerCameraList();

        // Check if the response is an array before setting the state
        if (Array.isArray(response.data.data)) {
          setCameraList(response.data.data);

          // Calculate camera count for each box
          const cameraCountByBox = {};
          response.data.data.forEach((camera) => {
            const boxNo = camera.boxNo;
            if (!cameraCountByBox[boxNo]) {
              cameraCountByBox[boxNo] = 1;
            } else {
              cameraCountByBox[boxNo]++;
            }
          });

          setCameraCountByBox(cameraCountByBox);
        } else {
          console.error('Invalid response format. Expected an array.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };


    fetchCameraList();
  }, []);

  const [data, setData] = useState([]);
  const fetchBoxList = async () => {
    try {
      const result = await getBox();
      console.log("result", result.data.data)
      setData(result.data.data)

    } catch (error) {
      // Handle error
    }
  };
  useEffect(() => {
    fetchBoxList();
  }, []);

  // useEffect(() => {
  //   const firstCamera = cameraList[0]; // Assuming there is at least one camera in the list

  //   if (firstCamera) {
  //     setChargerChecked(firstCamera.charger === 1);
  //   }
  // }, [cameraList]);



  return (
    <div>
      <Box p={{ base: '2rem', md: '4rem' }}>
        {/* Table */}

        <Button onClick={handleOpenModal} colorScheme="teal" mb={4}>
          Add New Camera
        </Button>

        <div style={{ height: '400px', overflow: 'auto' }}>


          {/* <TableContainer >
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Device Id</Th>
                <Th>Charger</Th>
                <Th>SD Card</Th>
                <Th>Sim Card</Th>
                <Th>Box No.</Th>
                <Th>Edit/Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cameraList.map((camera) => (
                <Tr key={camera.deviceId}>
                  <Td>{camera.deviceId}</Td>
                  <Td>
                    <input
                      type="checkbox"
                      checked={camera.charger === 1}
                      disabled={editableCameraID !== camera.cameraID}
                    />
                  </Td>
                  <Td>
                    <input
                      type="checkbox"
                      checked={camera.sdcard === 1}
                      // readOnly={!editingItemId || editingItemId === camera.deviceId}
                      disabled={editableCameraID !== camera.cameraID}
                    />
                  </Td>
                  <Td>
                    <input
                      type="checkbox"
                      checked={camera.simcard === 1}
                      disabled={editableCameraID !== camera.cameraID}
                      // Disable the checkbox when not in edit mode or editing a different row
                    />
                  </Td>
                 
                  <Td>{camera.boxNo}</Td>
                  <Td>
                    {editableCameraID === camera.deviceId ? (
                      <Button onClick={() => handleUpdateClick(camera.deviceId)} colorScheme="green">
                        Update
                      </Button>
                    ) : (
                      <>
                        <Button
                          marginLeft={2}
                          marginRight={2}
                          onClick={() => handleEditClick(camera.deviceId)}
                          colorScheme="blue"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(camera.deviceId)}
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
        </TableContainer> */}



          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Device Id</Th>
                  <Th>Charger</Th>
                  <Th>SD Card</Th>
                  <Th>Sim Card</Th>
                  <Th>Box No.</Th>
                  <Th>Edit/Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cameraList.map((camera) => (
                  <Tr key={camera._id}>
                    <Td>{camera.deviceId}</Td>
                    <Td>
                      <input
                        type="checkbox"
                        disabled={editableCameraID !== camera._id}
                        checked={updatedFields[camera._id] ? updatedFields[camera._id].charger : camera.charger === 1}
                        onChange={(e) => handleFieldChange(camera._id, 'charger', e.target.checked)}
                      />
                    </Td>
                    <Td>
                      <input
                        type="checkbox"
                        disabled={editableCameraID !== camera._id}
                        checked={updatedFields[camera._id] ? updatedFields[camera._id].sdcard : camera.sdcard === 1}
                        onChange={(e) => handleFieldChange(camera._id, 'sdcard', e.target.checked)}
                      />
                    </Td>
                    <Td>
                      <input
                        type="checkbox"
                        disabled={editableCameraID !== camera._id}
                        checked={updatedFields[camera._id] ? updatedFields[camera._id].simcard : camera.simcard === 1}
                        onChange={(e) => handleFieldChange(camera._id, 'simcard', e.target.checked)}
                      />
                    </Td>
                    <Td>
                      {editableCameraID === camera._id ? (
                        <Select
                          name="boxNo"
                          defaultValue={updatedFields[camera._id] ? updatedFields[camera._id].boxNo : camera.boxNo}
                          placeholder="Select a box"
                          onChange={(e) => handleFieldChange(camera._id, 'boxNo', e.target.value)}
                        >
                          {data.map((box) => (
                            <option key={box._id} value={box.boxName}>
                              {box.boxName}
                            </option>
                          ))}
                        </Select>
                      ) : (
                        camera.boxNo
                      )}
                    </Td>
                    <Td>
                      {editableCameraID === camera._id ? (
                        <Button onClick={() => handleUpdateClick(camera._id)} colorScheme="green">
                          Update
                        </Button>
                      ) : (
                        <>
                          <Button
                            marginLeft={2}
                            marginRight={2}
                            onClick={() => handleEditClick(camera._id)}
                            colorScheme="blue"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteClick(camera._id)

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
                  <FormLabel>Device ID</FormLabel>
                  <Input type="text" name="deviceId" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Charger</FormLabel>
                  <Checkbox checked={chargerChecked} onChange={handleChargerChange} />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>SD Card</FormLabel>
                  <Checkbox checked={sdCardChecked} onChange={handleSdCardChange} />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Sim Card</FormLabel>
                  <Checkbox checked={simCardChecked} onChange={handleSimCardChange} />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Box Number</FormLabel>
                  <Select name="boxNo" defaultValue="" placeholder="Select a box">
                    {data.map((box) => (
                      <option key={box._id} value={box.boxName}>
                        {box.boxName}
                      </option>
                    ))}
                  </Select>
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

export default CameraList;
