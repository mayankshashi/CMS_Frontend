import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";
import Background from "./assets/background.jpg";
import "./Home.css";
import Navbar from "./Navbar";
import Signup from "./Signup";

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { addUser, setAddUser } = useContext(adddata);

  const { updata, setUPdata } = useContext(updatedata);

  const { dltdata, setDLTdata } = useContext(deldata);

  const getdata = async () => {
    const res = await fetch("https://cms-backend-pnlo.onrender.com/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
    });

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

    const deletedata = res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

  if (localStorage.getItem("token")) {
    return (
      <>
        <Navbar />
        <div
          style={{
            backgroundImage: `url(${Background})`,
            height: "90vh",
          }}
        >
          {addUser ? (
            <>
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>{addUser.name}</strong> added succesfully!
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </>
          ) : (
            ""
          )}
          {updata ? (
            <>
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>{updata.name}</strong> updated succesfully!
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </>
          ) : (
            ""
          )}

          {dltdata ? (
            <>
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>{dltdata.name}</strong> deleted succesfully!
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="mt-5">
            <div className="container">
              <div className="add_btn mt-2 mb-2">
                <NavLink to="/register" className="add">
                  Add data
                </NavLink>
              </div>

              <table className="table">
                <thead>
                  <tr className="head">
                    <th scope="col">ID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">email</th>
                    <th scope="col">Work</th>
                    <th scope="col">Number</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {getuserdata.map((element, id) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">{id + 1}</th>
                          <td>{element.name}</td>
                          <td>{element.email}</td>
                          <td>{element.work}</td>
                          <td>{element.mobile}</td>
                          <td className="d-flex justify-content-between">
                            <NavLink to={`view/${element._id}`}>
                              {" "}
                              <button className="view">View</button>
                            </NavLink>
                            <NavLink to={`edit/${element._id}`}>
                              {" "}
                              <button className="edit">Edit</button>
                            </NavLink>
                            <button
                              className="delete"
                              onClick={() => deleteuser(element._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Signup />
      </div>
    );
  }
};

export default Home;
