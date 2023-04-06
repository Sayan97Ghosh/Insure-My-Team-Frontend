import '../styles/globals.css';
import React,{useEffect}from "react";
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from "./_navbar";
import { useRouter } from 'next/router'
export default function App({Component,pageProps}) {
  const router = useRouter()
  useEffect(() => {
    // Check if the user is authenticated
    
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated && router.pathname !== '/') {
    router.push('/')
    }
    }, [router.pathname])
  return (
    <ChakraProvider>
      <Navbar/>
      <Component {...pageProps}/>
    </ChakraProvider>
  )
}