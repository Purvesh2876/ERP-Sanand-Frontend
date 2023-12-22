[{ "cameraname": "Cam 1", "cameraid": "9b48e25c-6149-ed11-9129-d05099d384f7", "streamname": ["8b522279-587d-4079-8408-3aa42c1ea751"], "planname": "DVR-30", "plandisplayname": "DVR-30", "email": "wittags@gmail.com", "cameraurl": "media1.ambicam.com:1938/dvr30/", "deviceid": "KKKK-822318-VVVVV", "createdDate": "\/Date(1665491804733)\/", "islive": false, "callflag": 2, "plandays": 30, "isptz": false, "isfhd": false, "is360": false, "isnumplate": false }, { "cameraname": "Karjan Site Cam 1", "cameraid": "37fc990c-197a-ed11-9129-d05099d384f7", "streamname": ["717c1abd-eaaf-4bae-b705-4b3f14840673"], "planname": "DVR-30", "plandisplayname": "DVR-30", "email": "wittags@gmail.com", "cameraurl": "media1.ambicam.com:1938/dvr30/", "deviceid": "KKKK-820119-VVVVV", "createdDate": "\/Date(1670848353240)\/", "islive": false, "callflag": 2, "plandays": 30, "isptz": false, "isfhd": false, "is360": false, "isnumplate": false }, { "cameraname": "MNB55 Ankleshwar Cam.1 ", "cameraid": "b4885e77-a68d-ed11-912f-d05099d384f7", "streamname": ["de247fd4-e4b0-404a-8958-3c8b5486595d"], "planname": "DVR-30", "plandisplayname": "DVR-30", "email": "wittags@gmail.com", "cameraurl": "media1.ambicam.com:1938/dvr30/", "deviceid": "KKKK-822756-VVVVV", "createdDate": "\/Date(1672998163513)\/", "islive": false, "callflag": 2, "plandays": 30, "isptz": false, "isfhd": false, "is360": false, "isnumplate": false }, { "cameraname": "MNB55 Ankleshwar cam 2", "cameraid": "9cc0d4f4-ac8d-ed11-912f-d05099d384f7", "streamname": ["eb00eaa1-828b-4456-a362-f2468b54b0d4"], "planname": "DVR-30", "plandisplayname": "DVR-30", "email": "wittags@gmail.com", "cameraurl": "media1.ambicam.com:1938/dvr30/", "deviceid": "KKKK-820687-VVVVV", "createdDate": "\/Date(1673000950983)\/", "islive": false, "callflag": 2, "plandays": 30, "isptz": false, "isfhd": false, "is360": false, "isnumplate": false }, { "cameraname": "Karjan B.N 146 cam 1", "cameraid": "3ebccde7-6fa7-ed11-912f-d05099d384f7", "streamname": ["4f0bfbe0-d5e9-4769-8ca9-3f1f11314497"], "planname": "LIVE", "plandisplayname": "LIVE", "email": "wittags@gmail.com", "cameraurl": "media5.ambicam.com:1938/live/", "deviceid": "KKKK-824402-VVVVV", "createdDate": "\/Date(1675833460057)\/", "islive": false, "callflag": 2, "plandays": 0, "isptz": false, "isfhd": false, "is360": false, "isnumplate": false },


{ "cameraname": "Scrap Yard Cam 2", "cameraid": "818e406b-70a7-ed11-912f-d05099d384f7", "streamname": ["be36a4c8-2b22-4e56-b761-cb1dcf6a45b2"], "planname": "DVR-30", "plandisplayname": "DVR-30", "email": "wittags@gmail.com", "cameraurl": "media1.ambicam.com:1938/dvr30/", "deviceid": "KKKK-824559-VVVVV", "createdDate": "\/Date(1675833680593)\/", "islive": true, "callflag": 2, "plandays": 30, "isptz": false, "isfhd": false, "is360": false, "isnumplate": false },




{ "cameraname": "Karjan B.N 167 cam 1", "cameraid": "76d5cc06-71a7-ed11-912f-d05099d384f7", "streamname": ["2191c599-fc6e-4dde-a284-e4b1e41a15eb"], "planname": "DVR-30", "plandisplayname": "DVR-30", "email": "wittags@gmail.com", "cameraurl": "media1.ambicam.com:1938/dvr30/", "deviceid": "KKKK-822192-VVVVV", "createdDate": "\/Date(1675833941557)\/", "islive": false, "callflag": 2, "plandays": 30, "isptz": false, "isfhd": false, "is360": false, "isnumplate": false }, { "cameraname": "Karjan B.N 167 cam 2", "cameraid": "e81b7862-e0a9-ed11-912f-d05099d384f7", "streamname": ["ee952f3e-d776-4734-a9ad-1b2c3760368a"], "planname": "DVR-30", "plandisplayname": "DVR-30", "email": "wittags@gmail.com", "cameraurl": "media1.ambicam.com:1938/dvr30/", "deviceid": "ABCD-800255-BBBBB", "createdDate": "\/Date(1676101671817)\/", "islive": false, "callflag": 2, "plandays": 30, "isptz": true, "isfhd": true, "is360": false, "isnumplate": false }, { "cameraname": "Scrap yard Cam 1", "cameraid": "fa016f7e-6af8-ed11-9132-d05099d384f8", "streamname": ["984137a1-9653-4974-9cfd-65bf0dfaa70e"], "planname": "DVR-30", "plandisplayname": "DVR-30", "email": "wittags@gmail.com", "cameraurl": "media1.ambicam.com:1938/dvr30/", "deviceid": "ABCD-800448-BBBBB", "createdDate": "\/Date(1684737179963)\/", "islive": true, "callflag": 2, "plandays": 30, "isptz": false, "isfhd": false, "is360": false, "isnumplate": false }]




import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-hls';
import withAuth from '@component/withAuth';
import { Box } from '@chakra-ui/react';


const LiveFeed = ({source}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadPlayer = async () => {
      const videoElement = videoRef.current;
      const player = videojs(videoElement);

    
      class HlsTech extends videojs.getTech('Html5') {
        static canPlayType(type) {
          return videojs.getTech('Html5').canPlayType(type);
        }

        src(_, src) {
          if (src) {
            this.el_.src = src;
            this.el_.setAttribute('type', 'application/x-mpegURL');
          }
        }
      }

      videojs.registerTech('HlsTech', HlsTech);
      player.src({
        src: source,
        type: 'application/x-mpegURL'
      });

      return () => {
        player.dispose();
      };
    };

    loadPlayer();
  }, [source]);

  return(
    <Box width="100%" height="auto" borderRadius="md" overflow="hidden">
    <video  ref={videoRef} controls className="video-js" style={{ position:'relative',aleft: 0, width: '100%',  }} />
  </Box>

  ) ;
};

export default withAuth(LiveFeed);
