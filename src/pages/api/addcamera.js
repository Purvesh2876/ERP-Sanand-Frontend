import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const apiBaseUrl = '/camapi';

export async function addCamera(customerId, cameraname,deviceid, langflag) {
  const url = `${apiBaseUrl}/`;

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
      <AddCamera xmlns="http://tempuri.org/">
        <customerid>${customerId}</customerid>
        <cameraname>${cameraname}</cameraname>
        <deviceid>${deviceid}</deviceid>
        <langflag>${langflag}</langflag>
      </AddCamera>
      </soap12:Body>
      </soap12:Envelope>
      `;

  try {
    const response = await axios.post(url, soapRequest, {
      headers: {
        'Content-Type': 'application/soap+xml',
        'Content-Length': 'length',
        // SOAPAction: 'http://tempuri.org/addCamera',
      },
    });

    const xmlResponse = response.data;
    (xmlResponse)

    // console.log(xmlResponse)
    const cameraList = await extractCameraList(xmlResponse);
    console.log(cameraList)
    return cameraList;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred');
  }
}


async function extractCameraList(xmlResponse) {
  const result = await parseStringPromise(xmlResponse, {
    explicitArray: false,
    ignoreAttrs: true,
  });
  const envelope = result['soap:Envelope'];
  const body = envelope['soap:Body'];
  const addCameraResponse = body.AddCameraResponse;
  const cameraListResult = addCameraResponse.AddCameraResult;
  // alert(cameraListResult)
  // Handle the cameraListResult as per your requirements
  // ...

  return cameraListResult;
}
