import axios from "axios"
import { useEffect,useState } from "react"
import './Displaycard.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';

function DisplayUser(props) {
    const [updated, setupdated] = useState(false) 
    const [cardData, setCardData] = useState([])

 //use dispaly user data fetching
    useEffect(() => {
        const getUserUrl='http://3.6.93.159:7883/machstatz/get_all_users'
        const getData= async() => {
         const respData=await axios.get(getUserUrl)
          setCardData(respData.data)

        }
        getData()

    }, [updated])  //[updated]  update only when state changes

   
    //delete user


   const deleteUser=async(email)=>{
  const deleteUrl='http://3.6.93.159:7883/machstatz/delete_existing_user'
 
  const resp=await axios.delete(deleteUrl,{params: {email}})
  if(resp.data.status==="Deleted"){
    swal({
        title:resp.data.status,
        text: resp.data.message,
        icon: "success",
        button: "Done",
      }).then(() => {
  //  window.location.reload(false);  // other way is to add a state and add to useEffect
    //  setupdated(updated===false?true:false)   //update the state
       setupdated(!updated)
      })}
      else if(resp.data.status==="Error"){
        swal({
            title:resp.data.status,
            text: resp.data.message,
            icon: "warning",
            button: "Retry",
          });
    }
   }
  
    //single card section
    const singlecard=cardData?.map(({fist_name,first_name,last_name,email},i)=>{
        return(
       < div key={i} className="single-card">
           <div  style={{backgroundColor: "#"+ Math.floor(Math.random()*16777215).toString(16)}} 
           className="name-icon">
               <h6>{first_name?.charAt(0)||fist_name?.charAt(0)}
               </h6>
               </div>
            <p className="name" >{fist_name||first_name} {last_name}</p>
            <div className="icons">
                <EditIcon style={{marginRight:'15px'}} />
              <DeleteIcon className="delete-btn" onClick={()=>deleteUser(email)}  />
            </div>
        </div>
        )
    })
    return (
      
        <div className="display-user">
            {singlecard}
            
        </div>
       
       
    )
}

export default DisplayUser
