'use client';

import {
  Badge,
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  VStack,
  IconButton,
  CloseButton,
  Link,
  Icon,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import ambicam from '@img/ambicam.png'
import Image from 'next/image'
import NotificationDialog from '@component/NotificationDialog';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router';
import { BsCameraVideo, BsBell, BsCloudArrowDown, BsPeople, BsFillCarFrontFill } from 'react-icons/bs';
import { TbFaceId, TbArrowsDiff } from 'react-icons/tb'; // Replace with the actual import for TbFaceId and TbArrowsDiff
import { AiOutlineHeatMap } from 'react-icons/ai';
import { GrMultiple } from 'react-icons/gr';
import { FiMenu,FiChevronDown, FiSettings, FiBell, FiX } from 'react-icons/fi';
const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};
const LinkItems = [
  { name: 'Cameras', icon: BsCameraVideo ,path:'/dashboard'},
  { name: 'Box', icon: BsCameraVideo ,path:'/box'},
  { name: 'Shelf', icon: BsCameraVideo ,path:'/shelf'},
  { name: 'Rack', icon: BsCameraVideo ,path:'/rack'},
  { name: 'Multiple', icon: GrMultiple ,path: '/multiple'},
  // { name: 'Events', icon: BsBell },
  // { name: 'Archive Export', icon: BsCloudArrowDown },
  // { name: 'Faces', icon: TbFaceId },
  // { name: 'Heatmap', icon: AiOutlineHeatMap },
  // { name: 'People', icon: BsPeople },
  // { name: 'Visitors', icon: TbArrowsDiff },
  // { name: 'ANPR', icon: BsFillCarFrontFill },
  { name: 'Settings', icon: FiSettings },
];

export default function Header() {
  const router = useRouter();
  const handleLogout = () => {
    // Perform logout logic here
    // ...

    // Delete logged-in details from localStorage
    localStorage.removeItem('isLoggedIn');

    // Redirect to the homepage after logout
    router.push('/');
  };


  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  
  const handleNotificationOpen = () => {
    // Increase the notification count and open the dialog
    setNotificationCount(prevCount => prevCount + 1);
    setNotificationOpen(true);
  };
  
  const handleNotificationClose = () => {
    // Close the dialog
    setNotificationOpen(false);
  };
  
  const handleMarkAsRead = () => {
    // Reset the notification count
    setNotificationCount(0);
    handleNotificationClose();
  };
  const [email, setEmail] = useState('');


  useEffect(() => {
    // Retrieve user details from local storage
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      console.log(userDetails)
      // alert(userDetails.langflag)
      setEmail(localStorage.email);
    }
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


  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        bg={'gray.100'}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: '5rem' }}
        pos="fixed"
        h="full"
        {...rest}
      >
        {/* <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
        </Flex> */}
        
          {/* <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} /> */}
        {LinkItems.map((link) => (
           
           <NavItem key={link.name} path={link.path} icon={link.icon} >
           <Link style={{ textDecoration: 'none' }} href={link.path}>{link.name}</Link>
         </NavItem>
         
        ))}
      </Box>
    );
  };
  const NavItem = ({ icon, children,path, ...rest }) => {
    return (
      <Box
        as="a"
        href={path}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          direction="column" // Set direction to 'column'
          align="center"
          pt="4"
          pb="4"
          pl="6"
          pr="6"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              fontSize="20" // Set icon size to 20
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          <Text fontSize="10" >{children}</Text> {/* Set text size to 10 */}
        </Flex>
      </Box>
    );
  };
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} boxShadow={'base'} zIndex={9999}>


        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box> <Image style={{width:"50%"}} src={ambicam} alt='ambicam logo' /> </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
  
              <HStack spacing={{ base: '0', md: '6' }}>

              <Box position="relative" display="inline-block">
                <Badge
                  colorScheme="blue"
                  borderRadius="full"
                  px={2}
                  py={1}
                  fontSize="0.8em"
                  position="absolute"
                  top="-5px"
                  right="-5px"
                  zIndex={1}
                >
                {notificationCount}
                  </Badge>
                      <IconButton
                      aria-label="Notifications"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={handleNotificationOpen}
                    >
                  <FiBell />
                </IconButton>
              </Box>

            <NotificationDialog
            isOpen={isNotificationOpen}
            onClose={handleNotificationClose}
            notificationCount={notificationCount}
            onMarkAsRead={handleMarkAsRead}
          />
        <Flex alignItems="center">
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size="sm"
                  name={email}
                  bg="blue.200"
                  // src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                />
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">{email}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Ambicam
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg="white" borderColor="gray.200">
              {/* <MenuItem  align="center" display="flex" justifyContent="space-between"  >

                <Text>jhsajkhfdjk</Text>
                <Avatar size="sm" name="John Doe" src="/avatar.jpg" />
              </MenuItem>
              <MenuDivider /> */}
              <MenuItem>Settings</MenuItem>

              <MenuItem onClick={handleCallSupport}>
                  Call Support
              </MenuItem>

              <MenuItem onClick={handleOpenFAQ}>                
                  FAQ
              </MenuItem>

              <MenuItem onClick={handleSendEmail}>               
                  Email Support                
              </MenuItem>
              
              {/* <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem onClick={handleLogout} >Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>

            </Stack>
          </Flex>
        </Flex>
      </Box>
<SidebarContent mt={0.5}  onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
    </>
  );
}
