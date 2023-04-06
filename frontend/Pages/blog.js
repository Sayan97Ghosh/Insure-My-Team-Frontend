
import Blogpost from "../Components/Blogpost";
import withAuth from "./withauth";

 function blog(){
    
    return(
        <>
         <Blogpost/>
        </>
    )
}
export default withAuth(blog)