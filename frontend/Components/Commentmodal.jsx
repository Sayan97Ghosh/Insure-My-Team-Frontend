
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
    useToast,
    Text
  } from '@chakra-ui/react';
  import { useRouter } from "next/router";
  import axios from "axios";
  import { BiCommentEdit } from "react-icons/bi";

  export default function Commentmodal({id}) {
   
    const toast = useToast()
    const [comment,setcomment] = useState([]);
    let [body,setbody] = useState("");
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    let x;
    if (typeof window !== "undefined") {
      x = JSON.parse(sessionStorage.getItem("data")) || "";
      
     
    }
    let route = useRouter();


// this is for get 


useEffect(()=>{
    fetch(`http://localhost:1234/com/${id}`)
        .then((res) => res.json())
        .then((r) => {
        //   console.log(r.data);
          setcomment(r);
        });
},[])





//   this is for  post
    let editpost = async () => {
      let headersList = {
        Accept: "*/*",
        authorization:`bearer ${x?.token}`,
        "Content-Type": "application/json",
      };
  
      let bodyContent = JSON.stringify({
        comment: body,
      });
  
      let reqOptions = {
       
        url:`http://localhost:1234/com/post/${id}`,
        method: "POST",
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
    //   console.log(response.data);
      setbody("");
      route.push("/");
    };
//   this is for delte vlog

const handleDelete = async(_id) =>{
    let headersList = {
        Accept: "*/*",
        authorization:`bearer ${x?.token}`,
        "Content-Type": "application/json",
      };
  
    //   let bodyContent = JSON.stringify({
    //     comment: body,
    //   });
  
      let reqOptions = {
       
        url:`http://localhost:1234/com/delete/${_id}`,
        method: "DELETE",
        headers: headersList,
        
      };
  
      let response = await axios.request(reqOptions);
      // alert(response);
      toast({
        title: `Deleted successfull`,
        status: "success",
        isClosable: true,
      });

      setTimeout(()=>{
        window.location.reload();
       },400)
    //   console.log(response.data);
      setbody("");
      route.push("/");
}

    return (
      <>
        <BiCommentEdit size={25} onClick={onOpen}>Edit</BiCommentEdit>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Comments</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              
            <div style={{ width: "80%", margin: "auto", border: "red" }}>
        <br />
        
        <Divider borderColor={"teal"} h="20px" />
        
        <br />
        
        {comment.map((el,i)=>(
            <div style={{height:"40px",width:"full",border:"2px solid gray",padding:"3px",marginTop:"2px",display:"flex",gap:"40px"}} key={i}>
               <Text w="90%">{el.comment}</Text>
               <Button onClick={()=>handleDelete(el._id)}  size={"xs"} colorScheme="red">Delete</Button>
            </div>
        ))}
       
        <div>
          <Textarea
            placeholder="㊉ write your comment"
            mt={5}
            fontSize="md"
            size="md"
            border="2px"
            color="gray"
            height={"40px"}
            focusBorderColor="gray"
            value={body}
            onChange={(e) => setbody(e.target.value)}
          />
           <Button mt={2} onClick={editpost} colorScheme="green" variant='solid'>Post</Button>
        </div>
      </div>
     

            </ModalBody>
  
            <ModalFooter>
              <Text>Don't Spam on this Chat!!</Text>
             
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }