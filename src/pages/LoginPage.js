import { Box, Button, Collapse, InputGroup,Alert,AlertIcon, InputRightElement, Text, Flex, useColorModeValue, Stack, Heading, Checkbox, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '@img/logo.png';
import { login, signup, forgotPassword, updatePassword,verify,reverify } from './api/login';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {HStack, PinInput, PinInputField } from '@chakra-ui/react'

const LoginPage = () => {
  const [otp, setOTP] = useState(['', '', '', '','','','','','','','','']); // Initialize an array for 4 OTP digits
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false); // Add this state variable
  
  const handleChange = (e, index) => {
    if (!isOtpSubmitted) {
    const value = e.target.value.trim(); // Remove leading/trailing spaces
    const updatedOTP = [...otp];
    updatedOTP[index] = value;
    setOTP(updatedOTP);
    }else{
      setOTP(['', '', '', '','','','','','','','','']);
      setIsOtpSubmitted(false);
    }
  };
 

  const handleSubmitOTP = async() => {
    const emails = localStorage.getItem('email');
    const otpValue = otp.join(''); // Join without a delimiter
    console.log('OTP submitted:', otpValue);
    
    try {
      setErrorMessage('');
      setIsLoading(true); // Show the loader

      // Call the login function and pass the email, password, and langflag
      const verifyResult  = await verify(emails, otpValue);

      if (verifyResult.message === 'Email verification successfully') {
        setTimeout(() => {
          // Reload the page to go back to the login page
          window.location.reload();
        }, 2000);
      } else {
        setIsLoading(false);
        setErrorMessage(verifyResult.message);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(verifyResult.message);
      // Handle any errors that occur during the login process
      console.error('Error:', error);
    }
  };

  const [isLoginOpen, setLoginOpen] = useState(true);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [langflag, setLangFlag] = useState('');
  const [loginResult, setLoginResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isVerificationMessageVisible, setVerificationMessageVisible] = useState(false);
  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      router.push('/dashboard');
    }

    // Check for a small screen based on window height
    function handleResize() {
      setIsSmallScreen(window.innerHeight < 676);
    }

    // Add an event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLoginClick = () => {
    setLoginOpen(true);
    setSignUpOpen(false);
    setForgotPasswordOpen(false);
  };

  const handleSignUpClick = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
    setForgotPasswordOpen(false);
  };

  const handleForgotPasswordClick = () => {
    setLoginOpen(false);
    setSignUpOpen(false);
    setForgotPasswordOpen(true);
  };

  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    // Check if "rememberMe" was previously selected and set the state accordingly
    const rememberMeStatus = localStorage.getItem('rememberMe');
    if (rememberMeStatus === 'true') {
      setRememberMe(true);
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, []);

  // const handleRememberMe = () => {
  //   setRememberMe(!rememberMe);
  // };

  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    if (rememberMe) {
      localStorage.setItem('rememberMe', true);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('email');
    }

    try {
      setErrorMessage('');
      setIsLoading(true); // Show the loader

      // Call the login function and pass the email, password, and langflag
      localStorage.setItem('email', email);
      const loginResult = await login(email, password);
      if (loginResult.success) {
       
        localStorage.setItem('userDetails', JSON.stringify(loginResult.user));
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('email', loginResult.user.email);
        localStorage.setItem('accessToken', loginResult.accessToken);
        localStorage.setItem('userId', loginResult.user.customerid);
        localStorage.setItem('langflag', 'en');

        // Redirect to the dashboard page
        router.push('/dashboard');
      } else {
        setIsLoading(false);
        setErrorMessage(loginResult.message);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(loginResult.message);
      console.error('Error:', error);
    }
  };

  const handleSignUp = async () => {
   
    if (rememberMe) {
      localStorage.setItem('rememberMe', true);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('email');
    }

    try {
      setErrorMessage('');
      setIsLoading(true); // Show the loader

      // Call the login function and pass the email, password, and langflag
      const signupResult  = await signup(email, password);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      if (signupResult.success) {

        setSignUpOpen(false);
        setIsLoading(false);
        // Redirect to the dashboard page
        setVerificationMessageVisible(true);
        // router.push('/dashboard');
      } else {
        setIsLoading(false);
        setErrorMessage(signupResult.message);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(signupResult.message);
      // Handle any errors that occur during the login process
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setErrorMessage('');
      setIsLoading(true); // Show the loader

      // Call the forgotPassword function and pass the email
      const forgotPasswordResult = await forgotPassword(email);

      if (forgotPasswordResult.success) {
        // Redirect to the login page
        setErrorMessage('Password reset email sent successfully');
        // router.push('/');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Invalid email or password');
      // Handle any errors that occur during the forgot password process
      console.error('Error:', error);
    }
  }


  const verifyhere =async () =>{
    setErrorMessage('');
    setIsLoading(false);
    setLoginOpen(false);
    const emails = localStorage.getItem('email');
    
    try {
      setErrorMessage('');

      // Call the login function and pass the email, password, and langflag
      const reverifi  = await reverify(emails);
      console.log(reverifi)
      if (reverifi.message) {
        
      } else {
        setIsLoading(false);
        setErrorMessage(reverifi.message);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(reverifi.message);
      // Handle any errors that occur during the login process
      console.error('Error:', error);
    }
    setVerificationMessageVisible(true);
    
  }


  return (
    <Flex
      overflowY={'hidden'}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <VStack spacing={4} mx={'auto'} maxW={'lg'} p={6} w="100%">
        <Image src={logo} alt='ambicam logo' width={isSmallScreen ? 100 : undefined}
          height={isSmallScreen ? 'auto' : undefined} />
        <Heading fontSize={'2xl'} textAlign="center">Sign in to your account</Heading>
        <Text fontSize={'md'} color={'gray.600'} textAlign="center">
          to enjoy all of our cool <span style={{ color: "#4299E1" }}>features</span>
        </Text>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={6}
          w="100%"
        >
          {isLoginOpen && (
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          )}
          {isLoginOpen && (
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          )}
          {/* <Checkbox isChecked={rememberMe} onChange={handleRememberMe}>Remember me</Checkbox> */}
          {errorMessage && (
            <Text color="red.500" fontSize="md" mt={2}>
              {errorMessage}
            </Text>
          )}
          
          {errorMessage ==="Your account is not verified." && (

              <Button bg={'green.400'} color={'white'} _hover={{bg: 'green.500',}} onClick={verifyhere} isLoading={isLoading} w="100%" >
              {isLoading ? 'Sending Verification OTP...!' : 'Click to Verify'}
            </Button>
          )}

          <Stack spacing={4}>
            {isLoginOpen ? (
              <>
                <Text color={'blue.400'} textAlign="right" onClick={handleForgotPasswordClick}>
                  Forgot password?
                </Text>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isLoading}
                  onClick={handleLogin}
                  w="100%"
                >
                  {isLoading ? 'Logging in...' : 'Sign in'}
                </Button>
                <Text
                  color={'blue.400'}
                  textAlign="center"
                  onClick={handleSignUpClick}
                  cursor="pointer"
                >
                  Don't have an account? Sign up
                </Text>
              </>
            ) : isSignUpOpen ? (
              <Collapse in={isSignUpOpen}>
                {/* Registration form */}
                <FormControl id="register-email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    // Add necessary state and onChange for registration email
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="register-password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    // Add necessary state and onChange for registration password
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  isLoading={isLoading}
                  // Add onClick handler for registration
                  onClick={handleSignUp}
                  w="100%" mt={4}
                >
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </Button>
                <Text
                  color={'blue.400'}
                  textAlign="center"
                  onClick={handleLoginClick}
                  cursor="pointer"
                >
                  Already have an account? Log in
                </Text>
    
              </Collapse>
            ) : isVerificationMessageVisible ? (
                <Collapse in={isVerificationMessageVisible}>

                    <FormControl id="">
                      <FormLabel>Enter OTP</FormLabel>
                        <HStack spacing={1}>
                            <PinInput size="sm" variant="filled"  placeholder='*'>
                            {otp.map((digit, index) => (
                              <PinInputField
                                key={index}
                                value={digit}  // Set the value of the field to the corresponding digit in the OTP array
                                onChange={(value) => handleChange(value, index)}  // Handle changes in the OTP field
                                isLast={index === otp.length - 1}
                              />
                            ))}
                            </PinInput>
                          </HStack>
                    </FormControl>

                    <Button
                          bg={'green.400'}
                          color={'white'}
                          _hover={{
                            bg: 'green.500',
                          }}
                          w="100%" mt={4} onClick={handleSubmitOTP}
                        >
                        {isLoading ? 'Verifying...' : 'Submit'}
                    </Button>
                        <Alert status="success" mt={2}>
                       <AlertIcon />
                       We have sent you an OTP to your email for verification. Please check your inbox.
                     </Alert>
                 </Collapse>
            )
            
            : isForgotPasswordOpen ? (
              <Collapse in={isForgotPasswordOpen}>
                {/* Forgot password form */}
                <FormControl id="forgot-password-email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    // Add necessary state and onChange for forgot password email
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isLoading}
                  // Add onClick handler for sending reset password email
                  onClick={handleForgotPassword}
                  w="100%"
                >
                  {isLoading ? 'Sending email...' : 'Send reset email'}
                </Button>
                <Text
                  color={'blue.400'}
                  textAlign="center"
                  onClick={handleLoginClick}
                  cursor="pointer"
                >
                  Remember your password? Log in
                </Text>
              </Collapse>
            ) : null}
          </Stack>
        </Box>
      </VStack>
    </Flex>
  );
};

export default LoginPage;
