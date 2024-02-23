"use client"
import React from 'react'
import { useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
      clientId: 'f4308d5d-6a9b-48de-a123-4ce3685cdd24', // Replace with your client ID
      authority: 'https://login.microsoftonline.com/44c38608-c1f6-4b0d-88ea-17d9f01a8b28', // Replace with your authority URL
      redirectUri: 'http://localhost:3000' // Replace with your redirect URI
  }
};

// Create a new instance of PublicClientApplication
const pca = new PublicClientApplication(msalConfig);

const page = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mfaCode, setMfaCode] = useState('');

    // Define function to handle registration
    const handleRegister = async () => {
        try {
            // Initiate login with Microsoft Authenticator
            const authResult = await pca.loginPopup({
                scopes: ['openid', 'profile', 'user.read']
            });

            // Log the access token to console (for demonstration)
            console.log('Access token:', authResult.accessToken);
            // You should send this access token to your backend for registration
        } catch (error) {
            // Handle login failure
            console.error('Login failed:', error);
        }
    };
  return (
    <div>
       <h3 className={`text-black text-center text-4xl font-normal`}>Signup</h3>
        <form className={`flex flex-col gap-5 my-4`}>
            <input type="text" id='emailorusername' className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`} placeholder='Email/Username' onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" id='password' className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <input type="text" id='mfacode' className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`} value={mfaCode} placeholder='Microsoft Authenticator Code' onChange={(e) => setMfaCode(e.target.value)}/>
            <input type="submit" onClick={handleRegister} value="Submit" className={`bg-secondary text-primary w-1/2 mx-auto rounded-md h-10`} />
        </form>
    </div>
  )
}

export default page