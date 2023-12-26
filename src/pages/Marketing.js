import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, IconButton } from '@mui/material';
import { Card,Box, CardHeader,FormControl,TextField,InputAdornment,Menu,Button,ClickAwayListener } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { fShortenNumber } from 'src/utils/formatNumber';
// components
import Page from '../components/Page';
import {Paper} from '@mui/material';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { editable_config } from 'src/editable_config';
import { getGapBetweenDates } from 'src/global/globalFunctions';
import VideoModal from 'src/global/Modals/VideoModal';
import LoadingSpinner from 'src/components/Spinner';
import { UseContextState } from 'src/global/GlobalContext/GlobalContext';
import SaveAndCancelModal from 'src/global/Modals/SaveAndCancelModal';
import PopupModal from 'src/global/Modals/PopupModal';
import SuccessPayment from './modal_components/SuccessPayment';
import imageImport from 'src/utils/imageImport';


// ----------------------------------------------------------------------

export default function Marketing() {
  const [loading,setLoading]=useState(false)
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [ openDeleteConfimModal, setOpenDeleteConfimModal ] = useState(false)
  const [ openSuccessContactSupportModal, setopenSuccessContactSupportModal ] = useState(false)
  const [ buttonLoading, setButtonLoading ] = useState(false)
  const [ selectService, setselectService ] = useState('')
  const {authState} = UseContextState()

// const service1='Want Any Type of Customization?';
const service2='Run Google Ads For Your App?';
const service3='Want Digital Marketing For Your App?';
const service4='Want Whatsapp Marketing For Your App?';
const service5='Want E-Mail Marketing For Your App?';
const service6='Want SMS Marketing For Your App? ';


//############################# SAVE AND CANCEL MODAL FUNCTION #############################
const handleCloseSaveAndCancelModal=()=>{
  setOpenDeleteConfimModal(false); 
  // setIsOpen2(false)
}
const handleOpenSaveAndCancelModal=(service)=>{
  // setOpenDeleteConfimModal(true); 
  // setselectService(service)
  const url = "https://adiogent.in/contact-support-for-any-query/"
  window.open(url, '_blank', 'noopener,noreferrer');

}

const handleContactUsNow=async()=>{
  const data={
    app_id:authState?.user?.app_id,
    phone_number:authState?.user?.phone_number,
    service_name:selectService
  }
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/get/more/adiogents/serives`,{...data}, {headers: {
    'Authorization': `token ${editable_config.FRONTEND_VALIDATOR}`,
  },withCredentials:true})
  .then(res=>{
    console.log(res?.data);
    handleCloseSaveAndCancelModal()
    handleopenSuccessContactSupportModal()

  })
  .catch(err=>{
    console.log(err)
  })

}
//############################# SAVE AND CANCEL MODAL FUNCTION #############################

  //############################# PAYMENT SUCCESS MODAL FUNCTION #############################
  const handleClosePaymentSuccessPopupModal=()=>{
    setopenSuccessContactSupportModal(false); 
    // setIsOpen2(false)
    onYesFunction()
  }
const handleopenSuccessContactSupportModal=()=>{
    setopenSuccessContactSupportModal(true); 
    // setIsOpen2(false)
  }

const onYesFunction=()=>{
    setopenSuccessContactSupportModal(false)
    // fetchAuthuser()
    // navigate('/dashboard/manage')
}
  //############################# PAYMENT SUCCESS MODAL FUNCTION #############################


  return (
    <Page title={editable_config.Admin_Name}>
       <LoadingSpinner loading={loading} />
 {/*=============== SAVE AND CANCEL MODAL============= */}
 <SaveAndCancelModal open={openDeleteConfimModal} title="Want Marketing For Your App?" message="Are you sure you want to know more about the service?" cancelBtnName='Discard' saveBtnName='Yes, i want' onYes={handleContactUsNow} loading={buttonLoading}  handleClose={handleCloseSaveAndCancelModal}  />

{/*=============== SAVE AND CANCEL MODAL============= */}

 {/*===== Popup Modal  for resubmittion credit payment success====== */}
 <PopupModal handleClose={handleClosePaymentSuccessPopupModal} open={openSuccessContactSupportModal} data={<SuccessPayment onYes={onYesFunction} confirmBtnName='Okay, Got it' title='Thank you!! ' message='Thank you for showing interset in more adiogent services. Our support team will reach you within 24 working hours!!'  />} />
        {/*===== Popup Modal for resubmittion credit payment success ====== */}


   <div className='dashboard_heading_box' >
   <Typography variant="h5" className='font-capitalize-case' >
   Get Digital Marketing Services From Adiogent
        </Typography>
   </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}  >
           <Paper elevation={4} >
            <div className='announcement_card_box' >
            <img src={imageImport.more_service_1} />
            <Typography variant="subtitle1" sx={{paddingTop:2,paddingBottom:0.5}} >{service2}</Typography>
          <Typography variant="body2"  sx={{ color: 'text.secondary' }} >At Adiogent, we tailor our services to meet your preferences.
             Our team of highly developers is dedicated to fulfilling.</Typography>
         <Button sx={{ marginTop: 1 }} onClick={()=>handleOpenSaveAndCancelModal(service2)} fullWidth endIcon={<Iconify icon="solar:arrow-right-linear" />} variant='contained' >Contact Support Now</Button>
          </div>
          </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}  >
           <Paper elevation={4} >
            <div className='announcement_card_box' >
            <img src={imageImport.more_service_2} />
            <Typography variant="subtitle1" sx={{paddingTop:2,paddingBottom:0.5}} >{service3}</Typography>
          <Typography variant="body2"  sx={{ color: 'text.secondary' }} >At Adiogent, we tailor our services to meet your preferences.
             Our team of highly developers is dedicated to fulfilling.</Typography>
         <Button sx={{ marginTop: 1 }} onClick={()=>handleOpenSaveAndCancelModal(service3)} fullWidth endIcon={<Iconify icon="solar:arrow-right-linear" />} variant='contained' >Contact Support Now</Button>
          </div>
          </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}  >
           <Paper elevation={4} >
            <div className='announcement_card_box' >
            <img src={imageImport.more_service_4} />
            <Typography variant="subtitle1" sx={{paddingTop:2,paddingBottom:0.5}} >{service4}</Typography>
          <Typography variant="body2"  sx={{ color: 'text.secondary' }} >At Adiogent, we tailor our services to meet your preferences.
             Our team of highly developers is dedicated to fulfilling.</Typography>
         <Button sx={{ marginTop: 1 }} onClick={()=>handleOpenSaveAndCancelModal(service4)} fullWidth endIcon={<Iconify icon="solar:arrow-right-linear" />} variant='contained' >Contact Support Now</Button>
          </div>
          </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}  >
           <Paper elevation={4} >
            <div className='announcement_card_box' >
            <img src={imageImport.more_service_5} />
            <Typography variant="subtitle1" sx={{paddingTop:2,paddingBottom:0.5}} >{service5}</Typography>
          <Typography variant="body2"  sx={{ color: 'text.secondary' }} >At Adiogent, we tailor our services to meet your preferences.
             Our team of highly developers is dedicated to fulfilling.</Typography>
         <Button sx={{ marginTop: 1 }} onClick={()=>handleOpenSaveAndCancelModal(service5)} fullWidth endIcon={<Iconify icon="solar:arrow-right-linear" />} variant='contained' >Contact Support Now</Button>
          </div>
          </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}  >
           <Paper elevation={4} >
            <div className='announcement_card_box' >
            <img src={imageImport.more_service_6} />
            <Typography variant="subtitle1" sx={{paddingTop:2,paddingBottom:0.5}} >{service6}</Typography>
          <Typography variant="body2"  sx={{ color: 'text.secondary' }} >At Adiogent, we tailor our services to meet your preferences.
             Our team of highly developers is dedicated to fulfilling.</Typography>
         <Button sx={{ marginTop: 1 }} onClick={()=>handleOpenSaveAndCancelModal(service6)} fullWidth endIcon={<Iconify icon="solar:arrow-right-linear" />} variant='contained' >Contact Support Now</Button>
          </div>
          </Paper>
          </Grid>

          </Grid>

    </Page>
  );
}
