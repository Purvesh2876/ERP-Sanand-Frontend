
import { useEffect, useState } from 'react';
import withAuth from '@/components/withAuth';
import DesktopHeader from '@component/DesktopHeader';
import MobileHeader from '@component/MobileHeader';
import { getCustomerCameraList } from './api/getcamera';
import LiveFeed from '@/components/LiveFeed';
import {
  Box,Badge,
  Text, SimpleGrid,
  GridItem,
  useColorModeValue,
  HStack,Spinner,Flex,
  Link
} from '@chakra-ui/react';
import OfflineMessage from '@/components/OfflineMessage'
import ReactPaginate from 'react-paginate';

const CameraFeedsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  const [cameraList, setCameraList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // JSON.parse(localStorage.getItem('userDetails'));
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      // console.log(userDetails)
  
      const customerId = userDetails.userId;
      const username = userDetails.email;
      const langflag = 'en';
      try {
        const result = await getCustomerCameraList(customerId, username, langflag);
        console.log(result)
        const startIndex = result.indexOf('SUCCESS:') + 'SUCCESS:'.length;
        const trimmedResult = result.substring(startIndex);
        const parsedResult = JSON.parse(trimmedResult);
        setCameraList(parsedResult);
      } catch (error) {
        console.error('Error fetching camera list:', error);
      }
      finally {
        setIsLoading(false); // Set loading state to false when data fetching is complete
      }
    };

    fetchData();
  }, []);

  
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

  const handleThumbnailGenerated = (thumbnailUrl, cameraId) => {
    const updatedCameraList = cameraList.map((camera) =>
      camera.cameraid === cameraId ? { ...camera, thumbnailUrl } : camera
    );
  
    setCameraList(updatedCameraList);
  };
  function simplifyString(inputString) {
    // Remove non-alphanumeric characters and convert to lowercase
    return inputString.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  const onlineCameraList = cameraList.filter((camera) => camera.islive);
  const sortedCameraList = [...onlineCameraList].sort((a, b) => {
    if (a.islive && !b.islive) return -1;
    if (!a.islive && b.islive) return 1;
    return 0;
  });

  const gridColumnTemplate = {
    base: "1fr",       // 1 column on mobile
    sm: "repeat(2, 1fr)", // 2 columns on tablet (sm)
    md: "repeat(3, 1fr)", // 3 columns on laptops (md) and larger screens
    lg:"repeat(3,1fr)",
  };

  const [page, setPage] = useState(0); // Current page
  const itemsPerPage = 6;

  const pageCount = Math.ceil(sortedCameraList.length / itemsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPage(selectedPage);
  };

  const offset = page * itemsPerPage;
  const currentPageData = sortedCameraList.slice(offset, offset + itemsPerPage);


  // const lastfilename = camera.cameraurl.startsWith('media5') ? `${camera.streamname}.m3u8` : 'index.m3u8';
  return (
 
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
       {/* Mobile Header */}
       {isMobile && (<>
        <MobileHeader headerText="Multiple View" />
        </>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <DesktopHeader/>  )}

        
      <Box paddingTop={isMobile ? '5rem' : '0.8rem'}
      paddingX={3}  marginLeft={isMobile ? '0rem' : '5rem'} 
      overflowY="auto" // Enable vertical scrolling
      maxHeight="calc(100vh - 50px)" // Adjust the maximum height to prevent the whole page from scrolling
      >
        {isLoading ? (
          <Flex align="center" justify="center" height="100vh">
            <Spinner size="xl" thickness="4px" color="blue.500" emptyColor="gray.200" />
          </Flex>
        ) : (  

          <SimpleGrid templateColumns={gridColumnTemplate} gap={isMobile ? 4 : 6} paddingBottom={4}>
          {!isMobile ? currentPageData.map((camera) => (
            <GridItem key={camera.cameraid}>
              <div
              
                bg="white"
                borderRadius="md"
                p={1}
                mb={2}
                boxShadow="md"
                transition="box-shadow 0.3s"
                _hover={{ boxShadow: 'lg' }}
                width={isMobile ? '100%' : '280px'} // Adjust the width for mobile and desktop
                maxW={isMobile ? '100%' : '300px'} // Limit the maximum width of the card
                
              >
                <Box position="relative">
                {/* <Image src="https://via.placeholder.com/240x160" alt="Camera" borderRadius="md" mb={4} /> */}
                {camera.islive ? (  
                <LiveFeed 
                live={`https://${camera.cameraurl.replace(':1938/', ':443/')}${camera.streamname}/${camera.cameraurl.startsWith('media5') ? `${camera.streamname}.m3u8` : 'index.m3u8'}`}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                handleThumbnailGenerated={handleThumbnailGenerated}
                showTimeline={false}  width="280px"  height="160px"
                isOn={camera.islive}
                />
                ):(
                  <OfflineMessage style={{ height: '160px', visibility: 'hidden' }} /> 
                  )}
     {camera.islive ? (
                    <Badge
                      position="absolute" // Position the badge absolutely within the container
                      top={2} // Top position from the edge of the container
                      right={2} // Right position from the edge of the container
                      fontSize="sm"
                      colorScheme="green" // You can adjust the color scheme of the badge
                    >
                      On
                    </Badge>
                  ):(
                    <Badge
                    position="absolute" // Position the badge absolutely within the container
                    top={2} // Top position from the edge of the container
                    right={2} // Right position from the edge of the container
                    fontSize="sm"
                    colorScheme="red" // Set color to red when camera is off
                  >
                    Off
                  </Badge>
                  )
                  }
              
                </Box>
                {isMobile ? (<HStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold" fontSize="small" width="240px" p={1}>
                  {camera.cameraname}
                </Text>
              </HStack>)
                
                :(
                <HStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold" fontSize="l" width="240px" p={1}>
                  {camera.cameraname}
                </Text>
              </HStack>
 )
}
              </div>
            </GridItem>
            )) : 
            sortedCameraList.map((camera) => (
              <GridItem key={camera.cameraid}>
                <div
                
                  bg="white"
                  borderRadius="md"
                  p={1}
                  mb={2}
                  boxShadow="md"
                  transition="box-shadow 0.3s"
                  _hover={{ boxShadow: 'lg' }}
                  width={isMobile ? '100%' : '280px'} // Adjust the width for mobile and desktop
                  maxW={isMobile ? '100%' : '300px'} // Limit the maximum width of the card
                  
                >
                  <Box position="relative">
                  {/* <Image src="https://via.placeholder.com/240x160" alt="Camera" borderRadius="md" mb={4} /> */}
                  {camera.islive ? (  
                  <LiveFeed 
                  live={`https://${camera.cameraurl.replace(':1938/', ':443/')}${camera.streamname}/${camera.cameraurl.startsWith('media5') ? `${camera.streamname}.m3u8` : 'index.m3u8'}`}
                  isPlaying={isPlaying}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  handleThumbnailGenerated={handleThumbnailGenerated}
                  showTimeline={false}  width="280px"  height="160px"
                  isOn={camera.islive}
                  />
                  ):(
                    <OfflineMessage style={{ height: '160px', visibility: 'hidden' }} /> 
                    )}
       {camera.islive ? (
                      <Badge
                        position="absolute" // Position the badge absolutely within the container
                        top={2} // Top position from the edge of the container
                        right={2} // Right position from the edge of the container
                        fontSize="sm"
                        colorScheme="green" // You can adjust the color scheme of the badge
                      >
                        On
                      </Badge>
                    ):(
                      <Badge
                      position="absolute" // Position the badge absolutely within the container
                      top={2} // Top position from the edge of the container
                      right={2} // Right position from the edge of the container
                      fontSize="sm"
                      colorScheme="red" // Set color to red when camera is off
                    >
                      Off
                    </Badge>
                    )
                    }
                
                  </Box>
                  {isMobile ? (<HStack justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold" fontSize="small" width="240px" p={1}>
                    {camera.cameraname}
                  </Text>
                </HStack>)
                  
                  :(
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold" fontSize="l" width="240px" p={1}>
                    {camera.cameraname}
                  </Text>
                </HStack>
   )
  }
                </div>
              </GridItem>

            ))
          
          }




           
          </SimpleGrid>
          )}
    </Box>
    {!isMobile && (
        <div className="pagination-container"> {/* Add a CSS class for styling */}
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      )}
    </Box>
    
  );
};

export default withAuth(CameraFeedsPage);
