import {
    Box,
    Flex,
    Avatar,
    Heading,
    Text,
    Divider,
    VStack,
    Badge,
    Button, Collapse,Stack
  } from '@chakra-ui/react';
  import DesktopHeader from '@component/DesktopHeader';
import MobileHeader from '@component/MobileHeader';
import { useState ,useEffect} from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Router } from 'next/router';
import { useRouter } from 'next/router';

  const ProfilePage = () => {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [isEmailVisible, setEmailVisible] = useState(false);
    const [isContactVisible, setContactVisible] = useState(false);
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');

    const [loading, setLoading] = useState(true);


    const handleToggleEmail = () => {
      setEmailVisible(!isEmailVisible);
    };
    const handleToggleContact = () => {
        setContactVisible(!isContactVisible);
      };
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      handleResize(); // Initial check
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleCallSupport = () => {
        // Replace the phone number with the desired support number
        window.location.href = 'tel:+91 96876 72555';
      };
      const handleSendEmail = () => {
        const email = 'contact@vmukti.com'; // Replace with the desired support email address
        const subject = 'Support Request';
        const body = 'Hello, I need support with...'; // Replace with the desired email body
      
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl);
      };
      const handleOpenFAQ = () => {
        // Replace the URL with the desired FAQ page URL
        const faqUrl = 'https://ambicam.com/faq';
        window.open(faqUrl, '_blank');
      };

      useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await response.json();
                const cityName = data.address.city;
                const areaName = data.address.neighbourhood || data.address.suburb || data.address.town;
                setCity(cityName);
                setArea(areaName);
                setLoading(false);
              } catch (error) {
                console.error('Error fetching location:', error);
              }
            },
            (error) => {
              console.error('Error fetching location:', error.message);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }, []);
      
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      // console.log(userDetails)
  
      const customerId = userDetails.userId;
      const username = userDetails.email;
      const handleLogout = () => {
        // Perform logout logic here
        // ...
    
        // Delete logged-in details from localStorage
        localStorage.removeItem('isLoggedIn');
    
        // Redirect to the homepage after logout
        router.push('/');
      };
      
    return (
        <Box >
        {/* Mobile Header */}
        {isMobile && (<>
         <MobileHeader headerText={"Profile"} />
         </>
       )}
 
       {/* Desktop Header */}
       {!isMobile && (
         <DesktopHeader/>  )}

         
    <Box align="center" marginTop={isMobile ? '6rem' : '0'} paddingLeft={3} paddingRight={3}>
          
           <Flex direction="column" align="center" mt={20}>
                <Avatar  name={username} bg="blue.200" size="xl" />
                <Heading mt={4} size="lg">
                Account Info
                </Heading>
                {/* <Text color="gray.500">Email</Text> */}
            </Flex>
            
            <Divider my={8} />

    <VStack spacing={4} >
    <Box p={4}>
      {/* Other profile information */}
      
      <Button  mb={4}>
        {username}
      </Button>

    </Box>

  {/* <Box>
    <Text fontWeight="bold">Location:</Text>
    {loading ? (
        <Text>Loading location...</Text>
      ) : (
        <Text>{area},{city}</Text>
      )}
  </Box> */}

  <Box p={4}>
      {/* Other profile information */}
        <Button
          onClick={handleToggleContact}
          variant="outline"
          size="sm"
          fontWeight="bold"
          rounded="md"
          mb={4}
          // leftIcon={isContactVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          Contact Support
        </Button>
      
      {/* <Collapse in={isContactVisible} animateOpacity> */}
        <Flex flexWrap="wrap">
          <Stack direction="row" spacing={4}>
            <Button onClick={handleCallSupport}> 
              Call Support
            </Button>
            <Button onClick={handleOpenFAQ}>
              FAQ
            </Button>
            <Button onClick={handleSendEmail}>
              Email Support
            </Button>
          </Stack>
        </Flex>
      {/* </Collapse> */}
      <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          fontWeight="bold"
          rounded="md"
          mt={4}
          // leftIcon={isContactVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          Logout
        </Button>
    </Box>

  {/* <Box>
    <Text fontWeight="bold">Bio:</Text>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
      malesuada mauris ac mi auctor, vitae fermentum felis posuere. Nulla
      aliquet lacus vel dolor consequat consectetur. Curabitur nec nunc
      sed velit aliquam semper. Donec nec finibus lectus.
    </Text>
  </Box> */}

  {/* <Button colorScheme="teal">Edit Profile</Button> */}
</VStack>
     </Box>
     </Box>
    );
  };
  
  export default ProfilePage;
  