import React, { useEffect, useState } from "react";
import {
  Toolbar,
  FormControlLabel,
  Tooltip,
  Menu,
  Switch,
  MenuItem,
  TextField,
  InputLabel,
  Select,
  FormControl,
  IconButton,
  Typography,
  Button,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
// import { Toolbar,TextField ,Container,FormControl,Tooltip,Menu, MenuItem, IconButton, Typography,Button,ListItemIcon, ListItemText, OutlinedInput, InputAdornment, colors } from '@mui/material';
import Iconify from "../../src/components/Iconify";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { editable_config } from "../editable_config";
import { convertDateForOrder } from "../global/globalFunctions";
import { UseContextState } from "src/global/GlobalContext/GlobalContext";
import CustomizedSnackbars from "../global/Snackbar/CustomSnackbar";
import axios from "axios";
import LoadingSpinner from "src/components/Spinner";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

// import { useState } from 'react';

function Website({ orderDetail }) {
  const [aboutPhoneDetails, setAboutPhoneDetails] = useState({
    app_link: "",
    whatsapp_link: "",
    phone_number: "",
    aboutus: "",
    term_and_condition: "",
    privacy_policy: "",
    email: ""
  });
  const [message, setMessage] = useState({ type: "", message: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [render, setRender] = useState(false);
  const { authState, fetchAuthuser } = UseContextState();
  console.log("aboutPhoneDetails-----------", aboutPhoneDetails);

  let sub_total = 0;
  for (let i = 0; i < orderDetail?.products?.length; i++) {
    sub_total =
      sub_total +
      orderDetail?.products[i]?.product_sale_price *
        orderDetail?.products[i]?.product_quantity;
  }

  useEffect(() => {
    setPageLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/get/users/about/phone/details/${authState?.user?.app_id}`,
        {
          headers: {
            Authorization: `token ${editable_config.FRONTEND_VALIDATOR}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("details", res?.data);
        setAboutPhoneDetails((prev) => ({
          ...prev,
          aboutus: res?.data?.details?.aboutus,
          term_and_condition: res?.data?.details?.term_and_condition,
          privacy_policy: res?.data?.details?.privacy_policy,
          app_link: res?.data?.details?.app_link,
          whatsapp_link: res?.data?.details?.whatsapp_link,
          phone_number: res?.data?.details?.phone_number,
          email: res?.data?.details?.email
        }));
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  // handle submit invoice details
  const handleSubmitAboutPhone = async (e) => {
    e.preventDefault();
    // https://api.whatsapp.com/send/?phone=+918700885827&text=Hello
    await axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/edit/about/phone/details/for/app/${authState?.user?.app_id}`,
        { ...aboutPhoneDetails },
        {
          headers: {
            Authorization: `token ${editable_config.FRONTEND_VALIDATOR}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res?.data);
        if (res?.data?.status === true) {
          setAboutPhoneDetails((prev) => ({
            ...prev,
            aboutus: "",
            term_and_condition: "",
            privacy_policy: "",
            email: ""
          }));
          setMessage((prev) => ({
            ...prev,
            type: "success",
            message: "About Phone Updated Successfully !!",
          }));
          setSnackbarOpen(true);
          fetchAuthuser();
          setRender((prev) => !prev);
        }
        if (res?.data?.status === false) {
          setMessage((prev) => ({
            ...prev,
            type: "error",
            message: "About Phone Updated Failed !!",
          }));
          setSnackbarOpen(true);
          setRender((prev) => !prev);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ##################### SNACK BAR FUNCTIONs ##################
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  // ##################### SNACK BAR FUNCTIONs ##################

  return (
    <>
      <LoadingSpinner loading={pageLoading} />

      {/* #################### SANCKBAR MESSAGE ######################## */}
      <CustomizedSnackbars
        onOpen={snackbarOpen}
        type={message?.type}
        handleClose={handleCloseSnackbar}
        message={message?.message}
      />

      {/* #################### SANCKBAR MESSAGE ######################## */}
      <div className="invoice_details_form">
        <form
          onSubmit={handleSubmitAboutPhone}
          className="about_phone_fields"
          style={{ boxShadow: "none" }}
        >
          <h2>About the Website</h2>       
{/* 
          <label className="invoice_input_label">About Us*</label>
          <TextField
            placeholder="About Us"
            type="text"
            className="invoice_input_fields"
            multiline
            rows={5}
            variant="outlined"
            value={aboutPhoneDetails?.aboutus}
            onChange={(e) =>
              setAboutPhoneDetails((prev) => ({
                ...prev,
                aboutus: e.target.value,
              }))
            }
          />

          <label className="invoice_input_label">Terms & Conditions*</label>
          <TextField
            placeholder="Terms & Conditions"
            type="text"
            className="invoice_input_fields"
            multiline
            rows={5}
            id="outlined-basic"
            variant="outlined"
            value={aboutPhoneDetails?.term_and_condition}
            onChange={(e) =>
              setAboutPhoneDetails((prev) => ({
                ...prev,
                term_and_condition: e.target.value,
              }))
            }
          /> */}

          {/* <label className="invoice_input_label">Privacy Policy*</label>
          <TextField
            placeholder="Privacy Policy"
            type="text"
            className="invoice_input_fields"
            multiline
            rows={5}
            id="outlined-basic"
            variant="outlined"
            value={aboutPhoneDetails?.privacy_policy}
            onChange={(e) =>
              setAboutPhoneDetails((prev) => ({
                ...prev,
                privacy_policy: e.target.value,
              }))
            }
          /> */}

<label className="invoice_input_label">About Us*</label>
<ReactQuill
style={{lineHeight: '25px'}}
  className="invoice_input_fields"
  modules={modules}
  formats={formats}
  value={aboutPhoneDetails?.aboutus}
  onChange={(value) =>
    setAboutPhoneDetails((prev) => ({
      ...prev,
      aboutus: value,
    }))
  }
/>

<label className="invoice_input_label">Terms & Conditions*</label>
<ReactQuill
  style={{lineHeight: '25px'}}
  className="invoice_input_fields"
  modules={modules}
  formats={formats}
  value={aboutPhoneDetails?.term_and_condition}
  onChange={(value) =>
    setAboutPhoneDetails((prev) => ({
      ...prev,
      term_and_condition: value,
    }))
  }
/>


<label className="invoice_input_label">Privacy Policy*</label>
<ReactQuill
style={{lineHeight: '25px'}}
  className="invoice_input_fields"
  modules={modules}
  formats={formats}
  value={aboutPhoneDetails?.privacy_policy}
  onChange={(value) =>
    setAboutPhoneDetails((prev) => ({
      ...prev,
      privacy_policy: value,
    }))
  }
/>

          <div className="invoice_btn">
            <Button
              type="submit"
              variant="contained"
              startIcon={
                <Iconify icon="material-symbols:check-circle-rounded" />
              }
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Website;
