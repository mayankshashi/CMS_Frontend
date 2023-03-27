import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";
import "./Edit.css";
import Back from "./assets/back.png";
import Navbar from "./Navbar";

const Edit = () => {
  const { updata, setUPdata } = useContext(updatedata);

  const history = useNavigate("");

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

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
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, email, work, add, mobile, desc, age } = inpval;

    const res2 = await fetch(
      `https://cms-backend-pnlo.onrender.com/updateuser/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          email,
          work,
          add,
          mobile,
          desc,
          age,
        }),
      }
    );

    const data2 = await res2.json();
    console.log(data2);
    alert("data updated");

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      history("/");
      setUPdata(data2);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3>Edit Customer Details</h3>
        <NavLink to="/">
          <img src={Back} alt="Home" className="logo" />
        </NavLink>
        <form className="container">
          <div className="row">
            <div className="mt-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                value={inpval.name}
                onChange={setdata}
                name="name"
                className="form-control inputField"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                email
              </label>
              <input
                type="email"
                value={inpval.email}
                onChange={setdata}
                name="email"
                className="form-control inputField"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                age
              </label>
              <input
                type="text"
                value={inpval.age}
                onChange={setdata}
                name="age"
                className="form-control inputField"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                value={inpval.mobile}
                onChange={setdata}
                name="mobile"
                className="form-control inputField"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Work
              </label>
              <input
                type="text"
                value={inpval.work}
                onChange={setdata}
                name="work"
                className="form-control inputField"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address
              </label>
              <input
                type="text"
                value={inpval.add}
                onChange={setdata}
                name="add"
                className="form-control inputField"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mt-3 col-lg-12 col-md-12 col-12">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Description
              </label>
              <textarea
                name="desc"
                value={inpval.desc}
                onChange={setdata}
                className="form-control inputField"
                id=""
                cols="30"
                rows="3"
              ></textarea>
            </div>

            <button type="submit" onClick={updateuser} className="btn-edit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
