import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const apiBaseUrl = '/camapi';

export async function setSetting(cameraid,editedCameraSetting) {
  const url = `${apiBaseUrl}/`;
// alert(editedCameraSetting.wdr)
  // Set the SOAP request body
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Header>
      <AuthHeader xmlns="http://tempuri.org/">
      <UserName>vmukti</UserName>
      <Password>5zqLSce7YhbyBxAwb14wc8G3R84iWXfg:yLsAV3mSMNVnW++aM7TlkJ6N+k83E1xQ</Password>
      </AuthHeader>
    </soap12:Header>
      <soap12:Body>
        <setSetting xmlns="http://tempuri.org/">
            <cameraid>${cameraid}</cameraid>
            <osdCfg>${editedCameraSetting.osdCfg}</osdCfg>
            <plan>${editedCameraSetting.plan}</plan>
            <wifiinfo>${editedCameraSetting.wifiinfo}</wifiinfo>
            <quality_level>${editedCameraSetting.quality_level}</quality_level>
            <publish_on_off>${editedCameraSetting.publish_on_off}</publish_on_off>
            <audio_on_off>${editedCameraSetting.audio_on_off}</audio_on_off>
            <motion_on_off>${editedCameraSetting.motion_on_off}</motion_on_off>
            <timeZone>${editedCameraSetting.timeZone}</timeZone>
            <hf_imghue>${editedCameraSetting.hf_imghue}</hf_imghue>
            <hf_imgbright>${editedCameraSetting.hf_imgbright}</hf_imgbright>
            <hf_imgcontrast>${editedCameraSetting.hf_imgcontrast}</hf_imgcontrast>
            <hf_imgsaturation>${editedCameraSetting.hf_imgsaturation}</hf_imgsaturation>
            <wdr>${editedCameraSetting.wdr}</wdr>
            <ircut>${editedCameraSetting.ircut}</ircut>
            <flip_on_off>${editedCameraSetting.flip_on_off}</flip_on_off>
            <mirror_on_off>${editedCameraSetting.mirror_on_off}</mirror_on_off>
        </setSetting>
      </soap12:Body>
      </soap12:Envelope>
      `;

  try {
    const response = await axios.post(url, soapRequest, {
      headers: {
        'Content-Type': 'application/soap+xml',
        'Content-Length': 'length',
        // SOAPAction: 'http://tempuri.org/GetCustomerCameraList',
      },
    });

    const xmlResponse = response.data;
    (xmlResponse)

    const cameraSetting = await extractCameraSetting(xmlResponse);
//     console.log(cameraSetting)
// alert(cameraSetting)
    return cameraSetting;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred');
  }
}


async function extractCameraSetting(xmlResponse) {
  const result = await parseStringPromise(xmlResponse, {
    explicitArray: false,
    ignoreAttrs: true,
  });
  const envelope = result['soap:Envelope'];
  const body = envelope['soap:Body'];
  const setSettingResponse = body.setSettingResponse;
  const SettingResult = setSettingResponse.setSettingResult;
  // Handle the cameraListResult as per your requirements
  // ...

  return SettingResult;
}
