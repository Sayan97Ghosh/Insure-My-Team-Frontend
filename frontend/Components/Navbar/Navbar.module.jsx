import React, { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { TfiPencilAlt } from "react-icons/tfi";
import { BsBell } from "react-icons/bs";
import Styles from "./Navbar.module.css";
import DrawerExample from "./Menu";
import { Text, Flex, Input, Image, Box } from "@chakra-ui/react";
import Link from "next/link";
import Login from "../Register/Login";
import Logo from "./Logo.png";

function MainNavbar() {
  let [data, setData] = useState("");
  const [searched,setSearched] = useState("");
  const[filterData,setfilterData] = useState([]);


  useEffect(() => {
    setData(sessionStorage.getItem("data"));
  }, [data]);

 
  //  useEffect(()=>{
    
  //  },[searched])


  const handleSearch = ()=>{
      
      fetch(`http://localhost:1234/blog?blog=${searched}`)
    .then((res) => res.json())
    .then((r) => {
      setfilterData(r);
    });
    
  }
  if (typeof window !== 'undefined') {
    
    sessionStorage.setItem("filtered",JSON.stringify(filterData))
}

//  console.log(filterData)

  return (
    <div className={Styles.topnav}>
      <Flex
        borderBottom="1px solid rgba(242, 242, 242, 1)"
        p="10px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex ml="20px" gap="25px" alignItems="center">
          {/* this is the logo section */}

          <Link href="/">
            <Image
              w="90px"
              h="80px"
              src="https://thumbs.dreamstime.com/b/feedback-icon-writing-article-blog-logo-feedback-icon-writing-article-blog-logo-white-background-150648208.jpg"
              alt="logo"
            />
          </Link>
          
          <div className={Styles.search}>
            <SearchIcon onClick={handleSearch} color="rgba(117, 117, 117, 1)" />
            <Input
              type="text"
              size="lg"
              placeholder="Search"
              variant="unstyled"
              ml="10px"
              onChange={(e)=>setSearched(e.target.value)}
            />
          </div>
        </Flex>

        <Box className={Styles.avtar}>
          <Flex gap="25px" alignItems="center">
            <Link href="/blog">
              <Flex gap="10px" cursor="pointer" alignItems="center">
                <TfiPencilAlt color="rgba(117, 117, 117, 1)" size="1.5em" />
                <Text>blog</Text>
              </Flex>
            </Link>
            <BsBell
              cursor="pointer"
              color="rgba(117, 117, 117, 1)"
              size="1.5em"
            />

            {/*****************************  Side Menu **********************************/}
            {data ? <DrawerExample /> : <Login />}
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}

export default MainNavbar;