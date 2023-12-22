import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const apiBaseUrl = '/api';

export async function getShareCameraList(customerId, username, langflag) {
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
      <GetCustomerShareCameraList xmlns="http://tempuri.org/">
        <userEmail>${username}</userEmail>
        <langflag>${langflag}</langflag>
      </GetCustomerShareCameraList>
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

    const cameraList = await extractCameraList(xmlResponse);
// alert(cameraList)
    return cameraList;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred');
  }
}


async function extractCameraList(xmlResponse) {
  const shareResult = await parseStringPromise(xmlResponse, {
    explicitArray: false,
    ignoreAttrs: true,
  });
  const envelope = shareResult['soap:Envelope'];
  const body = envelope['soap:Body'];
  const getCustomerShareCameraListResponse = body.GetCustomerShareCameraListResponse;
  const cameraListResult = getCustomerShareCameraListResponse.GetCustomerShareCameraListResult;
  // Handle the cameraListResult as per your requirements
  // ...

  return cameraListResult;
}
