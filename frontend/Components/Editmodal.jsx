
import React,{useState,useEffect} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Textarea,
    Input,
    Center,
    Image,
    Divider,
    Heading,
    useToast
  } from '@chakra-ui/react';
  import { useRouter } from "next/router";
  import axios from "axios"

  export default function Editmodal({id}) {

    const toast = useToast()
    let [img,setimg] = useState("");
    let [body,setbody] = useState("");
    let [title,settitle] = useState("");
    let [category,setsetcategory] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    let x;
    if (typeof window !== "undefined") {
      x = JSON.parse(sessionStorage.getItem("data")) || "";
    
     
    }
    let route = useRouter();
//   this is for edit post
    let editpost = async () => {
      let headersList = {
        Accept: "*/*",
        authorization:`bearer ${x?.token}`,
        "Content-Type": "application/json",
      };
  
      let bodyContent = JSON.stringify({
        title: title,
        img: img,
        body: body,
        category: category,
        author:x.userid,
        details:x.data,
        
      });
  
      let reqOptions = {
        url:`http://localhost:1234/blog/update/${id}`,
        method: "PATCH",
        headers: headersList,
        data: bodyContent,
      };
  
      let response = await axios.request(reqOptions);
      // alert(response);
      toast({
        title: `Posted successfull`,
        status: "success",
        isClosable: true,
      });

      setTimeout(()=>{
        window.location.reload();
       },400)
      console.log(response.data);
      setbody("");
      setimg("");
      setsetcategory("");
      settitle("");
    //   route.push("/");
    };


    return (
      <>
        <Button colorScheme="yellow" h={"36px"} w={"80px"} onClick={onOpen}>Edit</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Modal</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              

            <div style={{ width: "80%", margin: "auto", border: "red" }}>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Heading>Edit a Article</Heading>
          
        </div>
        <Divider borderColor={"teal"} h="20px" />
        {img.length > 0 && (
          <div>
            <Center mt={5}>
              <Image w={"80%"} src={img} alt="dfjkgh" />
            </Center>
          </div>
        )}
        <br />
        {/* {body} */}
        <div>
          <Input
            placeholder="㊉ Topic"
            border={"none"}
            fontSize="md"
            size="md"
            focusBorderColor="white"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
  
        {
          <div>
            <br />
            <Input
              placeholder="㊉ Add Category"
              border={"none"}
              fontSize="md"
              size="md"
              value={category}
              onChange={(e) => setsetcategory(e.target.value)}
              focusBorderColor="white"
            />
          </div>
        }
        {img.length == 0 && (
          <div>
            <br />
            <Input
              placeholder="㊉ Add a Image"
              border={"none"}
              fontSize="md"
              size="md"
              value={img}
              onChange={(e) => setimg(e.target.value)}
              focusBorderColor="white"
            />
          </div>
        )}
  
        <br />
        <div>
          <Textarea
            placeholder="㊉ Tell Your Story"
            border={"none"}
            fontSize="md"
            size="md"
            height={"150px"}
            focusBorderColor="white"
            value={body}
            onChange={(e) => setbody(e.target.value)}
          />
        </div>
      </div>


            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={editpost} colorScheme="green" variant='solid'>Post</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }