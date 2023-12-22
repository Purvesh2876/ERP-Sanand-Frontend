import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router';
import withAuth from '@component/withAuth';
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Spacer,
    useBreakpointValue,
    Image,
    Divider,
    VStack,
  } from '@chakra-ui/react';
import { FiMenu, FiSettings, FiBell, FiX } from 'react-icons/fi';
import DesktopHeader from '@component/DesktopHeader';
import MobileHeader from '@component/MobileHeader';
import LiveFeed from '@/components/LiveFeed';

const CameraView = ( ) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
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
  const { streamname } = router.query;
  const{cameraid} = router.query;

  return (
    <Box>
      
      {/* Mobile Header */}
      {isMobile && (
      
        <MobileHeader />

      )}

      {/* Desktop Header */}
      {!isMobile && (
        
        <DesktopHeader />  
       
        )}

      {/* Main Content */}
      <Box marginTop={isMobile ? '5rem' : '5rem'} paddingLeft={3} paddingRight={3} >
     
      <Heading>Camera View</Heading>
      <LiveFeed
        source={`https://media1.ambicam.com:443/dvr30/${streamname}/index.m3u8`}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
      />
    <ArchiveList  />
      <Divider />
      <Box p={4} textAlign="center" fontSize="sm" color="gray.500">
        &copy; 2023 Smart Home Camera App. All rights reserved.
      </Box>
    </Box>
    </Box>
  );
};
export default withAuth(CameraView);