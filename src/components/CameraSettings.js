import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Spinner, Text, Switch, Flex, Select, Slider, SliderMark,Checkbox,Button,VStack,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box, Tabs, TabList, TabPanels, Tab, TabPanel,
  FormControl, FormLabel, Input, InputGroup, InputRightElement, IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

import { getSetting } from '../pages/api/getsetting';
import { setSetting } from '../pages/api/setsetting';

const CameraSettings = ({cameraid}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraSetting, setCameraSetting] = useState({
    
  });
  const [editedCameraSetting, setEditedCameraSetting] = useState({
  
  });



  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  useEffect(() => {
    const fetchData = async () => {
      // JSON.parse(localStorage.getItem('userDetails'));
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      // console.log(userDetails)
  
      const customerId = userDetails.userId;
      const username = userDetails.email;
      const langflag = 'en';
      // const cameraId = cameraid;
      try {
        const result = await getSetting(cameraid);
        // console.log("sharelist:",result)
        const parsedResult = JSON.parse(result);
        setCameraSetting(parsedResult);
        setEditedCameraSetting(parsedResult);
        setIsLoading(false);
        console.log('camerasetting', parsedResult);
      } catch (error) {
        console.error('Error fetching camera list:', error);
        setIsLoading(false);
      }
    }
    

    fetchData();
  }, []);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      // Call the API function to save the edited camera settings
      const result = await setSetting(cameraid, editedCameraSetting);
      if (result === "SUCCESS:Setting successfully updated!!") {
        // If it's a success message, update state and display alert
        setCameraSetting(editedCameraSetting);
        setIsLoading(false);
        setIsSaving(false);
        setIsSuccessMessageVisible(true); // Set the success message visibility
        setTimeout(() => {
          setIsSuccessMessageVisible(false); // Hide the success message after 2-3 seconds
        }, 2000); // Adjust the timeout duration as needed
        // alert('Settings saved successfully');
        console.log(editedCameraSetting);
      } else {
        // If it's not a success message, handle the error
        console.error('Error saving camera settings:', result);
        setIsLoading(false);
        setIsSaving(false);
      }

    } catch (error) {
      console.error('Error saving camera settings:', error);
      setIsLoading(false);
      setIsSaving(false);
    }
  };

    const handleInputChange = (key, value) => {
      setEditedCameraSetting((prevSetting) => ({
        ...prevSetting,
        [key]: value,
      }));
    };

    
  return (
    <Box p={4}  borderRadius="lg" >
      
      <VStack spacing={4} align="stretch">
        <Box textAlign="center">
          {isSuccessMessageVisible && (
            <Text color="green.500" fontWeight="bold">
              Settings saved successfully!
            </Text>
          )}
        </Box>

    {isLoading ? (
      <Flex align="center" justify="center" height="100%">
      <Spinner size="md" thickness="3px" color="blue.500" emptyColor="gray.200" /> </Flex>
    ) : (
      <Box >
        
        <Tabs isFitted variant="enclosed" colorScheme="blue">
      <TabList flexWrap="wrap" overflowX="auto" overflowY="hidden">
            <Tab>Info</Tab>
            <Tab>Video</Tab>
            <Tab>Controls</Tab>
            {/* <Tab>Motion</Tab> */}
            <Tab>Audio</Tab>
          </TabList>

        <TabPanels>

              <TabPanel>
                  <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center" >
                      <FormLabel>Camera Name</FormLabel>
                      <InputGroup  width="75%">
                        <Input
                          defaultValue={cameraSetting.osdCfg} 
                          onChange={(e) => handleInputChange('osdCfg', e.target.value)}
                        />
                        <InputRightElement>
                          <IconButton
                            icon={<EditIcon />}
                            aria-label="Edit Camera Name"
                          />
                        </InputRightElement>
                      </InputGroup>
                  </FormControl>

                  <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                    <FormLabel>Plan Info</FormLabel>
                    <Text>{cameraSetting.plan}</Text>
                  </FormControl>

                  <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                    <FormLabel>Wifi Info</FormLabel>
                    <Text>{cameraSetting.wifiinfo}</Text>
                  </FormControl>

                  <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                    <FormLabel>Time-Zone</FormLabel>
                    <Select
                        width="75%"
                        value={cameraSetting.timeZone}
                        onChange={(e) => handleInputChange('timeZone', e.target.value)}
                      >
                    
                            <option value="Etc/GMT-12" id="TimezoneInternationalDateLineWestSpan">(GMT-12:00) International
                                                            Date Line West</option>
                            <option value="Pacific/Apia" id="TimezoneMidwayIslandSamoaSpan">(GMT-11:00) Midway Island,
                                                            Samoa</option>
                            <option value="Pacific/Honolulu" id="TimezoneHawaiiSpan">(GMT-10:00) Hawaii</option>
                            <option value="America/Anchorage" id="TimezoneAlaskaSpan">(GMT-09:00) Alaska</option>
                            <option value="America/Los_Angeles" id="TimezonePacificTimeUSCanadaTijuanaSpan">(GMT-08:00)
                                                            Pacific Time (US &amp; Canada); Tijuana</option>
                            <option value="America/Denver" id="TimezoneMountainTimeUSCanadaSpan">(GMT-07:00) Mountain
                                                            Time (US &amp; Canada)</option>
                            <option value="America/Tegucigalpa" id="TimezoneChihuahuaLaPazMazatlanSpan">(GMT-07:00)
                                                            Chihuahua, La Paz, Mazatlan</option>
                            <option value="America/Phoenix" id="TimezoneArizonaSpan">(GMT-07:00) Arizona</option>
                            <option value="America/Winnipeg" id="TimezoneSaskatchewanSpan">(GMT-06:00) Saskatchewan</option>
                            <option value="America/Mexico_City" id="TimezoneGuaddlajaraMexicoCityMonterreySpan">
                                                            (GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                            <option value="America/Chicago" id="TimezoneCentralTimeUSCanadaSpan">(GMT-06:00) Central
                                                            Time (US &amp; Canada)</option>
                            <option value="America/Costa_Rica" id="TimezoneCentralAmericaSpan">(GMT-06:00) Central
                                                            America</option>
                            <option value="America/Indianapolis" id="TimezoneIndianaEastSpan">(GMT-05:00) Indiana
                                                            (East)</option>
                            <option value="America/New_York" id="TimezoneEasternTimeUSCanadaSpan">(GMT-05:00) Eastern
                                                            Time (US &amp; Canada)</option>
                            <option value="America/Bogota" id="TimezoneBogotaLimaQuitoSpan">(GMT-05:00) Bogota,
                                                            Lima, Quito</option>
                            <option value="America/Santiago" id="TimezoneSantiagoSpan">(GMT-04:00) Santiago</option>
                            <option value="America/Caracas" id="TimezoneCaracasLaPazSpan">(GMT-04:00) Caracas, La
                                                            Paz</option>
                            <option value="America/Montreal" id="TimezoneAtlanticTimeCanadaSpan">(GMT-04:00) Atlantic
                                                            Time (Canada)</option>
                            <option value="America/St_Johns" id="TimezoneNenfoundLandSpan">(GMT-03:30) Newfoundland</option>
                            <option value="America/Thule" id="TimezoneGreenlandSpan">(GMT-03:00) Greenland</option>
                            <option value="America/Buenos_Aires" id="TimezoneBuenosAiresGeorgentownSpan">(GMT-03:00)
                                                            Buenos Aires, Georgetown</option>
                            <option value="America/Sao_Paulo" id="TimezoneBrasiliaSpan">(GMT-03:00) Brasilia</option>
                            <option value="Atlantic/South_Georgia" id="TimezoneMidAtlanticSpan">(GMT-02:00) Mid-Atlantic</option>
                            <option value="Atlantic/Cape_Verde" id="TimezoneCapeVerdeIsSpan">(GMT-01:00) Cape Verde
                                                            Is.</option>
                            <option value="Atlantic/Azores" id="TimezoneAzoresSpan">(GMT-01:00) Azores</option>
                            <option value="Europe/Dublin" id="TimezoneGreenwichMeanTimeDublinEdinburghLisbonLondonSpan">
                                                            (GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                            <option value="Africa/Casablanca" id="TimezoneCasablancamonroviaSpan">(GMT) Casablanca,
                                                            Monrovia</option>
                            <option value="Europe/Amsterdam" id="TimezoneAmsterdamBerlinBernRomeStockholmViennaSpan">
                                                            (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                            <option value="Europe/Belgrade" id="TimezoneBelgradeBratislavaBudapestLjubljanaPragueSpan">
                                                            (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                            <option value="Europe/Brussels" id="TimezoneBrusselsCopenhagenMadridParisSpan">(GMT+01:00)
                                                            Brussels, Copenhagen, Madrid, Paris</option>
                            <option value="Europe/Warsaw" id="TimezoneSarajevoSkopjeWarsawZagrebSpan">(GMT+01:00)
                                                            Sarajevo, Skopje, Warsaw, Zagreb</option>
                            <option value="Africa/Lagos" id="TimezoneWestCentralAfricaSpan">(GMT+01:00) West Central
                                                            Africa</option>
                            <option value="Europe/Athens" id="TimezonehensIstanbulMinskSpan">(GMT+02:00) Athens,
                                                            Istanbul, Minsk</option>
                            <option value="Europe/Bucharest" id="TimezoneBucharestSpan">(GMT+02:00) Bucharest</option>
                            <option value="Africa/Cairo" id="TimezoneCairoSpan">(GMT+02:00) Cairo</option>
                            <option value="Africa/Harare" id="TimezonerarePretoriaSpan">(GMT+02:00) Harare, Pretoria</option>
                            <option value="Europe/Helsinki" id="TimezoneHelsinkiKyivRigaSofiaTallinnVilniusSpan">
                                                            (GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                            <option value="Asia/Jerusalem" id="TimezoneJerusalemSpan">(GMT+02:00) Jerusalem</option>
                            <option value="Asia/Baghdad" id="TimezoneBaghdadSpan">(GMT+03:00) Baghdad</option>
                            <option value="Asia/Kuwait" id="TimezoneKuwaitRiyadhSpan">(GMT+03:00) Kuwait, Riyadh</option>
                            <option value="Europe/Moscow" id="TimezoneMoscowStPetersburgVolgogradSpan">(GMT+03:00)
                                                            Moscow, St. Petersburg, Volgograd</option>
                            <option value="Africa/Nairobi" id="TimezoneNairobiSpan">(GMT+03:00) Nairobi</option>
                            <option value="Asia/Tehran" id="TimezoneTehranSpan">(GMT+03:30) Tehran</option>
                            <option value="Asia/Dubai" id="TimezoneAbuDhabiMuscatSpan">(GMT+04:00) Abu Dhabi, Muscat</option>
                            <option value="Asia/Baku" id="TimezoneBakuTbilisiYerevanSpan">(GMT+04:00) Baku, Tbilisi,
                                                            Yerevan</option>
                            <option value="Asia/Kabul" id="TimezoneKabulSpan">(GMT+04:30) Kabul</option>
                            <option value="Asia/Yekaterinburg" id="TimezoneEkaterinburgSpan">(GMT+05:00) Ekaterinburg</option>
                            <option value="Asia/Karachi" id="TimezoneIslamabadKarachiTashkentSpan">(GMT+05:00) Islamabad,
                                                            Karachi, Tashkent</option>
                            <option selected="selected" value="Asia/Calcutta" id="TimezoneChennaiKolkataMumbaiNewDelhiSpan">
                                                            (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                            <option value="Asia/Katmandu" id="TimezoneKathmanduSpan">(GMT+05:45) Kathmandu</option>
                            <option value="Asia/Almaty" id="TimezoneAlmatyNovosibirskSpan">(GMT+06:00) Almaty, Novosibirsk</option>
                            <option value="Asia/Dhaka" id="TimezoneAstanaDhakaSpan">(GMT+06:00) Astana, Dhaka</option>
                            <option value="Asia/Colombo" id="TimezoneSriJayawardenepuraSpan">(GMT+06:00) Sri Jayawardenepura</option>
                            <option value="Asia/Rangoon" id="TimezoneRangoonSpan">(GMT+06:30) Rangoon</option>
                            <option value="Asia/Bangkok" id="TimezoneBangkokHanoiJakartaSpan">(GMT+07:00) Bangkok,
                                                            Hanoi, Jakarta</option>
                            <option value="Asia/Krasnoyarsk" id="TimezoneKrasnoyarskSpan">(GMT+07:00) Krasnoyarsk</option>
                            <option value="Asia/Hong_Kong" id="TimezoneBeijingChongqingHongKongUrumqiSpan">(GMT+08:00)
                                                            Beijing, Chongqing, Hong Kong, Urumqi</option>
                            <option value="Asia/Irkutsk" id="TimezoneIrkutskUlaanBataarSpan">(GMT+08:00) Irkutsk,
                                                            Ulaan Bataar</option>
                            <option value="Asia/Kuala_Lumpur" id="TimezoneKualaLumpurSingaporeSpan">(GMT+08:00)
                                                            Kuala Lumpur, Singapore</option>
                            <option value="Australia/Perth" id="TimezonePerthSpan">(GMT+08:00) Perth</option>
                            <option value="Asia/Taipei" id="TimezoneTaipeiSpan">(GMT+08:00) Taipei</option>
                            <option value="Asia/Tokyo" id="TimezoneOsakaSapporoTokyoSpan">(GMT+09:00) Osaka, Sapporo,
                                                            Tokyo</option>
                            <option value="Asia/Seoul" id="TimezoneSeoulSpan">(GMT+09:00) Seoul</option>
                            <option value="Asia/Yakutsk" id="TimezoneYakutskSpan">(GMT+09:00) Yakutsk</option>
                            <option value="Australia/Adelaide" id="TimezoneAdelaideSpan">(GMT+09:30) Adelaide</option>
                            <option value="Australia/Brisbane" id="TimezoneBrisbaneSpan">(GMT+10:00) Brisbane</option>
                            <option value="Australia/Sydney" id="TimezoneCanberraMelbourneSydneySpan">(GMT+10:00)
                                                            Canberra, Melbourne, Sydney</option>
                            <option value="Pacific/Guam" id="TimezoneGuamPortMoresbySpan">(GMT+10:00) Guam, Port
                                                            Moresby</option>
                            <option value="Australia/Hobart" id="TimezoneHobartSpan">(GMT+10:00) Hobart</option>
                            <option value="Asia/Vladivostok" id="TimezoneVladivostokSpan">(GMT+10:00) Vladivostok</option>
                            <option value="Asia/Magadan" id="TimezoneMagadanSolomonIsNewSpan">(GMT+11:00) Magadan,
                                                            Solomon Is., New Caledonia</option>
                            <option value="Pacific/Auckland" id="TimezoneAucklandWellingtonSpan">(GMT+12:00) Auckland,
                                                            Wellington</option>
                            <option value="Pacific/Fiji" id="TimezoneFijiKamchatkaMarshallIsSpan">(GMT+12:00) Fiji,
                                                            Kamchatka, Marshall Is.</option>
                            <option value="Pacific/Tongatapu" id="TimezoneNukualofaSpan">(GMT+13:00) Nuku'alofa</option>
        
                    </Select>
                  </FormControl>
              </TabPanel>


              <TabPanel>
                  <FormControl mb={4} display="flex" justifyContent="space-between">
                    <FormLabel>Brightness</FormLabel>
                    <Slider  width="200px" alignItems="end" aria-label='slider-ex-6' 
                    value={editedCameraSetting.hf_imgbright} // Use the edited value
                    onChange={(val) => handleInputChange('hf_imgbright', val)} // Update the value in the state
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb width="1.7rem" height="1rem" fontSize="11px" >{editedCameraSetting.hf_imgbright}%</SliderThumb>
                    </Slider>
                  
                  </FormControl>

                  <FormControl mb={4} display="flex" justifyContent="space-between">
                    <FormLabel>Hue</FormLabel>
                    <Slider width="200px"alignItems="end" aria-label='slider-ex-6'
                     value={editedCameraSetting.hf_imghue} // Use the edited value
                     onChange={(val) => handleInputChange('hf_imghue', val)} // Update the value in the state
                    >
                     
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb width="1.7rem" height="1rem" fontSize="11px" > {editedCameraSetting.hf_imghue}%</SliderThumb>
                    </Slider>
                  
                  </FormControl>

                  <FormControl mb={4} display="flex" justifyContent="space-between">
                    <FormLabel>Contrast</FormLabel>
                    <Slider width="200px"alignItems="end" aria-label='slider-ex-6'
                    value={editedCameraSetting.hf_imgcontrast} // Use the edited value
                    onChange={(val) => handleInputChange('hf_imgcontrast', val)}
                    >
                      
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb width="1.7rem" height="1rem" fontSize="11px" > {editedCameraSetting.hf_imgcontrast}%</SliderThumb>
                    </Slider>
                  
                  </FormControl>

                  <FormControl mb={4} display="flex" justifyContent="space-between">
                    <FormLabel>Saturation</FormLabel>
                    <Slider width="200px"alignItems="end" aria-label='slider-ex-6'
                    value={editedCameraSetting.hf_imgsaturation} // Use the edited value
                    onChange={(val) => handleInputChange('hf_imgsaturation', val)}
                    >
        
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb width="1.7rem" height="1rem" fontSize="11px" > {editedCameraSetting.hf_imgsaturation}%</SliderThumb>
                    </Slider>
                  
                  </FormControl>

                  <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                    <FormLabel>WDR</FormLabel>
                    <Select
                      width="25%"
                      defaultValue={cameraSetting.wdr}
                      onChange={(e) => handleInputChange('wdr', e.target.value)}
                    >
                      <option value="0">Off</option>
                      <option value="1">Low</option>
                      <option value="2">Mid</option>
                      <option value="3">High</option>
                      <option value="4">Higher</option>
                    </Select>
                  
                  </FormControl>

                  <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                    <FormLabel>Quality</FormLabel>
                    <Select
                      width="25%"
                      defaultValue={cameraSetting.quality_level}
                      onChange={(e) => handleInputChange('quality_level', e.target.value)}
                    >
                      <option value="0">Very High</option>
                      <option value="1">High</option>
                      <option value="2">Medium</option>
                      <option value="3">Low</option>
                      <option value="4">Very Low</option>
                    </Select>
                  
                  </FormControl>

              </TabPanel>
          

              <TabPanel>
                
                <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                  <FormLabel>IR Cut</FormLabel>
                  <Select
                    width="30%"
                    value={cameraSetting.ircut}
                    onChange={(e) => handleInputChange('wdr', e.target.value)}
                  >
                    <option value="0">Day & Night</option>
                    <option value="1">Color</option>
                    <option value="2">Black & White</option>
                    
                  </Select>          
                </FormControl>

                <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                  <FormLabel>Flip</FormLabel>
                  <Checkbox
                   defaultChecked={cameraSetting.flip_on_off}
                    
                    onChange={(e) => handleInputChange('flip_on_off', e.target.checked)}
                  >
                  </Checkbox>
                </FormControl>

                <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                  <FormLabel>Mirror</FormLabel>
                  <Checkbox
                  defaultChecked={cameraSetting.mirror_on_off}
                   
                    onChange={(e) => handleInputChange('mirror_on_off', e.target.checked)}
                  >
                  </Checkbox>
                </FormControl>

                <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                  <FormLabel>Publish</FormLabel>
                  <Checkbox
                   defaultChecked={cameraSetting.publish_on_off}
                   
                    onChange={(e) => handleInputChange('publish_on_off', e.target.checked)}
                  >
                  
                  </Checkbox>
                </FormControl>

                <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                  <FormLabel>Recording</FormLabel>
                  <Checkbox
                  defaultChecked={cameraSetting.record_on_off}
                    
                    onChange={(e) => handleInputChange('record_on_off', e.target.checked)}
                  >
                  
                  </Checkbox>
                </FormControl>
              
              </TabPanel>


              {/* <TabPanel>
              
                <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                  <FormLabel>Motion Detection</FormLabel>
                  <Checkbox
                   defaultChecked={cameraSetting.motion_on_off}
                   
                    onChange={(e) => handleInputChange('motion_on_off', e.target.checked)}
                  >
                
                  </Checkbox>
                </FormControl>
              
                <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                  <FormLabel>Email</FormLabel>
                  <Checkbox
                    defaultChecked={cameraSetting.email_on_off}
                    
                    onChange={(e) => handleInputChange('email_on_off', e.target.checked)}
                  >
                    
                  </Checkbox>
                </FormControl>
              </TabPanel> */}


              <TabPanel>
            
                <FormControl mb={4} display="flex" justifyContent="space-between" alignItems="center">
                  <FormLabel>Audio</FormLabel>
                  <Checkbox
                    defaultChecked={cameraSetting.audio_on_off}
                    onChange={(e) => handleInputChange('audio_on_off', e.target.checked)}
                  >
                  
                  </Checkbox>
                </FormControl>
                
              </TabPanel>
        
        </TabPanels>
      </Tabs>
    </Box>
    )}
     

     

     <Box mt={4} ml='85%' textAlign="center" display="flex">

      
        <Button colorScheme="blue" onClick={handleSaveClick} disabled={isSaving} >
        {isSaving ? <Spinner size="sm" /> : 'Save'}
        </Button>
        
      </Box>

      </VStack>
  </Box>
  );
};

export default CameraSettings;
