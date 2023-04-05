import React, { useEffect, useState } from "react";
import Styles from './profile.module.css';
import {
  Text,
  Box,
  Avatar,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import Editmodal from "./Editmodal";

const initState = {
  img: "",
  name: "",
  bio: "",
};
function UserProfile() {
    const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  let x;
  if (typeof window !== "undefined") {
    x = JSON.parse(sessionStorage.getItem("data"));
    console.log(x.data.name);
    

  }






 
  const [blogdata, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1234/blog/data/${x.userid}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `berer ${x?.token}`,
      },
    })
      .then((res) => 
      res.json())
      .then((r) => {
        setData(r);
      });
  }, []);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
//   delte my vlog
 const handleDelete = async(id)=>{
    
    const apiUrl = 'http://localhost:1234/blog/delete';
    const resourceId = id;
    const headers = {
      'Authorization': `Bearer ${x?.token}` ,
      'Content-Type': 'application/json'
    };
    
    axios.delete(`${apiUrl}/${resourceId}`, { headers })
      .then(response => {
        toast({
            title: `Deleted Successfully`,
            status:"success",
            isClosable: true,
          })
          setTimeout(()=>{
           window.location.reload();
          },400)
        console.log('Resource deleted successfully');
      })
      .catch(error => {
        toast({
            title: `Deleted Unsuccessfull`,
            status: "error",
            isClosable: true,
          })
        console.error('Error deleting resource:', error.message);
      });
    
}
// update my vlog



  return (
    <>
      <div className={Styles.mainDiv}>
        <div className={Styles.leftDiv}>
          <Text mt="60px" fontSize="36px" fontWeight="bold">
            {/* {x.data.name} */}
          </Text>
          <Heading  mt="30px">Your Posts</Heading>
          <div style={{ marginTop: "30px" }}>
            {blogdata.map((e,i) => (
              <div

                key={i}
                style={{
                  display: "flex",
                  marginTop: "30px",
                  padding: "10px",
                  gap: "20px",
                }}
              >
                <Image w={"40%"} height="150px" src={e.img} />
                <div>
                  <Text mt={1} fontSize={"md"} fontWeight="bold">
                    {e.title}
                  </Text>
                  <Text fontWeight="normal" textAlign="left">
                        {months[e.date.split("T")[0].split("-")[1] - 1]}{" "}
                        {e.date.split("T")[0].split("-")[2]}
                        {" , "}
                        {e.date.split("T")[0].split("-")[0]}
                      </Text>
                  <HStack mt={2}>
                    <Button onClick={()=>handleDelete(e._id)} size={"sm"} colorScheme="red">Delete</Button>
                    <Editmodal id = {e._id}/>
                  </HStack>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className={Styles.rightDiv}>
          <Box
            borderRadius="50px"
            w="280px"
            p="5px"
            textAlign="center"
            bg="black"
            color="white"
          >
            Get unlimited access
          </Box>
          {/* <Avatar mt="20px" size="xl" src={userData.img} cursor="pointer" /> */}
          <Text mt="10px" fontWeight="bold">
            {/* {x.data.name} */}
          </Text>
          {/* <Text mt="15px">{userData.bio}</Text> */}

          <Text
            cursor="pointer"
            mt="15px"
            bg="white"
            color="green"
            onClick={onOpen}
          >
            Edit Profile
          </Text>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Profile information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Photo</FormLabel>
                  <Avatar
                    mt="5px"
                    size="lg"
                    src=""
                    cursor="pointer"
                  />
                  <Text
                    borderBottom="1px solid grey"
                    noOfLines={1}
                    overflow="hidden"
                    mt="10px"
                  >
                    {/* {userData.img} */}
                  </Text>
                </FormControl>
                <FormControl mt="20px" isRequired>
                  <FormLabel>Name</FormLabel>
                  {/* <Text borderBottom="1px solid grey">{userData.name}</Text> */}
                  <Text mt="5px" fontSize="14px">
                    Appears on your Profile page, as your byline, and in your
                    responses.
                  </Text>
                </FormControl>
                <FormControl mt="20px">
                  <FormLabel>Bio</FormLabel>
                  {/* <Text borderBottom="1px solid grey">{userData.bio}</Text> */}
                  <EditIcon />
                  <Text mt="5px" fontSize="14px">
                    Appears on your Profile and next to your stories.
                  </Text>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  border="1px solid green"
                  bg="white"
                  borderRadius="50px"
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                {/* <Button onClick={handleSubmit} borderRadius="50px" bg="green" _hover={{color:"green"}} variant='ghost'>Save</Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
