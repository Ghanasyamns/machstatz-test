import axios from 'axios';
import { useState } from 'react';
import './AddUser.css'
import swal from 'sweetalert';

function AddUser(props) {
    const [email, setemail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [pwd, setPwd] = useState('')
    const [userName, setUserName] = useState('')
const uploadUser= async(e)=>{
    e.preventDefault();
const url="http://3.6.93.159:7883/machstatz/add_new_user";
const userData={
    email,
    fist_name: firstName,
    last_name: lastname,
    pwd,
    username:userName
}
const resp=await axios.post(url,userData)

if(resp.data.status==="Success"){
    swal({
        title:resp.data.status,
        text: resp.data.message,
        icon: "success",
        button: "Done",
      }).then(() => {
   window.location.reload(false);
       
      });
   setemail('') 
   setFirstName('')
   setLastName('')
   setPwd('')
   setUserName('')
       
}
else if(resp.data.status==="Error"){
    swal({
        title:resp.data.status,
        text: resp.data.message,
        icon: "warning",
        button: "Retry",
      });
}
}

    return (
       <div className="form-section">
      <h1 className='heading'>Add User</h1>
      <form className='form' onSubmit={uploadUser}>
          <label>First Name</label>
          <input onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter your First Name" type="text"/>
          <label>Last Name</label>
          <input onChange={(e)=>setLastName(e.target.value)} placeholder="Enter your Last Name" type="text"/>
          <label>Profiles</label>
          <select id="select"  name="cars">
            <option value="select">Select...</option>
            <option value="saab">Front-end Developer</option>
            <option value="fiat">Back-end Developer</option>
            <option value="audi">Full-stack developer</option>
          </select>
          <label>Username</label>
          <input onChange={(e)=>setUserName(e.target.value)} placeholder="Enter your User Name" type="text"/>
          <label>Email Address</label>
          <input onChange={(e)=>setemail(e.target.value)} placeholder="Enter your Email Address " type="text"/>
          <label>Password</label>
          <input onChange={(e)=>setPwd(e.target.value)} placeholder="Enter your Password" type="text"/>
          <div className="buttons">
            <button type='reset'>Cancel</button>
            <button className="add-btn" type="submit">Add</button>
          </div>
      </form>

       </div>
        
    )
}

export default AddUser;

// {
//     email: "test@gmail.com"
//     fist_name: "test"
//     last_name: "user"
//     pwd: "1234"
//     username: "test user"
//     }