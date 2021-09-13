import React,{useEffect, useState} from "react"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import {postData,getData, postDataAndImage} from "./FetchNodeServices";
import{isBlank} from "./Checks"
import renderHTML from "react-render-html";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar'; 
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


 
const useStyles = makeStyles((theme) =>({
 root:{
     display:'flex',
     justifyContent:'center',
     alignItems:'center'
 },
 subdiv:{
     padding:20,
     width:700,
     marginTop:20,
     background:'#FFF'
    
 },
 input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 690,
  },
}));
export default function Candidate(props)
{
    const classes = useStyles();
    
    const [candidateFirstName,setCandidateFirstName]=useState('');
    const [candidateLastName,setCandidateLastName]=useState('');
    const [address,setAddress]=useState('');
    const [candidateEmail,setCandidateEmail]=useState('');
    const [candidatePhone,setCandidatePhone]=useState('');
    const [password,setPassword]=useState('');
    const [icon,setIcon]=useState({bytes:'',file:'/noimage.webp'});
    const [gender,setGender]=useState('')

    const handleIcon=(event)=>{
        setIcon({bytes:event.target.files[0],
           file:URL.createObjectURL(event.target.files[0])})
          }
    

  const handleClick=async()=>{
      var error=false
      var msg="<div>"
      if(isBlank(candidateFirstName))
      {error=true
        msg+="<font color='#e74c3c'><b>Candidate FirstName should not be blank</b></font><br>"
      }
      if(isBlank(candidateLastName))
      {error=true
        msg+="<font color='#e74c3c'><b>Candidate LastName should not be blank</b></font><br>"
      }
      if(isBlank(address))
      {error=true
        msg+="<font color='#e74c3c'><b>Address should not be blank</b></font><br>"
      }
      if(isBlank(candidateEmail))
      {error=true
        msg+="<font color='#e74c3c'><b>Candidate Email should not be blank</b></font><br>"
      }
      if(isBlank(candidatePhone))
      {error=true
        msg+="<font color='#e74c3c'><b>Candidate Phone should not be blank</b></font><br>"
      }
      if(isBlank(icon.bytes))
      {error=true
        msg+="<font color='#e74c3c'><b>Please select category icon..</b></font><br>"
      }
      
       msg+="</div>"
      if(error)
      {
          swalhtml(renderHTML(msg))
      }
     else
     {
      var formData=new FormData()
      formData.append("firstname",candidateFirstName)
      formData.append("lastname",candidateLastName)
      formData.append("address",address)
      formData.append("email",candidateEmail)
      formData.append("phone",candidatePhone)
      formData.append("icon",icon.bytes)
      formData.append("password",password)
      formData.append("gender",gender)
      
      var config = {headers:{"content-type":"multipart/form-data"}}
      var result=await postDataAndImage('candidate/addnewcandidate',formData,config)
    if(result)
    {
        swal({
            title: "Candidate Submitted Successfully ",
            icon: "success",
            dangerMode: true,
          })
    }
    }
    }

    return(<div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
                        Candidate Interface
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField onChange={(event)=>setCandidateFirstName(event.target.value)} label="First Name" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField onChange={(event)=>setCandidateLastName(event.target.value)} label="Last Name" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} >
                    <TextField onChange={(event)=>setAddress(event.target.value)} label="Address" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField onChange={(event)=>setCandidateEmail(event.target.value)} label="Email" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField onChange={(event)=>setCandidatePhone(event.target.value)} label="Phone" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <span style={{fontSize:16,fontWeight:300}}>Upload Category Icon</span>
                    <input  onChange={(event)=>handleIcon (event)}accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                      </IconButton>
                    </label>
                </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                       <Avatar variant="rounded" src={icon.file} style={{width:50,height:50}}/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField onChange={(event)=>setPassword(event.target.value)} label="Password" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} >
                <FormControl variant="outlined" fullWidth >
                       <InputLabel id="demo-simple-select-outlined-label" >Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event)=>setGender(event.target.value)}
                            label="Status" defaultValue="Male">
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Male'}>Male</MenuItem>  
                        </Select>
                    </FormControl>
                    </Grid>
                
                    <Grid item xs={12}  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button onClick={()=>handleClick()}fullWidth variant="contained" color="primary">Save</Button>
                    </Grid>
            </Grid> 
        </div>
    </div>)
}