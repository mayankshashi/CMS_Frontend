import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Profile from "../Components/assets/user.png";
import "./Details.css";
import Back from "./assets/back.png";
import Edit from "./assets/edit.png";
import bin from "./assets/bin.png";
import Navbar from "./Navbar";

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { id } = useParams("");
  console.log(id);

  const history = useNavigate();

  const getdata = async () => {
    const res = await fetch(
      `https://cms-backend-pnlo.onrender.com/getuser/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(
      `https://cms-backend-pnlo.onrender.com/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    const deletedata = await res2.json();
    console.log(deletedata);
    alert("data deleted");

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      history("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h3>Customer Details</h3>
        <NavLink to="/">
          <img src={Back} alt="Home" className="logo" />
        </NavLink>

        <Card sx={{ maxWidth: 600 }} className="card">
          <CardContent>
            <div className="icon">
              <NavLink to={`/edit/${getuserdata._id}`}>
                {" "}
                <img src={Edit} alt="Edit" className="logo" />
              </NavLink>
              <img
                src={bin}
                alt="Delete"
                className="logo"
                onClick={() => deleteuser(getuserdata._id)}
              />
            </div>
            <div className="row">
              <div className="left_view col-lg-6 col-md-6 col-12">
                <img src={Profile} style={{ width: 50 }} alt="profile" />
                <h3 className="mt-3">
                  Name: <span>{getuserdata.name}</span>
                </h3>
                <h3 className="mt-3">
                  Age: <span>{getuserdata.age}</span>
                </h3>
                <p className="mt-3">
                  <MailOutlineIcon />
                  Email: <span>{getuserdata.email}</span>
                </p>
                <p className="mt-3">
                  <WorkIcon />
                  Occuption: <span>{getuserdata.work}</span>
                </p>
              </div>
              <div className="right_view  col-lg-6 col-md-6 col-12">
                <p className="mt-5">
                  <PhoneAndroidIcon />
                  mobile: <span>+91 {getuserdata.mobile}</span>
                </p>
                <p className="mt-3">
                  <LocationOnIcon />
                  location: <span>{getuserdata.add}</span>
                </p>
                <p className="mt-3">
                  Description: <span>{getuserdata.desc}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Details;
