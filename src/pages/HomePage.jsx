import React, { useState } from "react";
import "./HomePage.css";
import { Button, TextField, Typography } from "@mui/material";
import { httpService } from "../services";
import { Spinner } from "react-bootstrap";

function HomePage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const register = async () => {
    const path = "register";
    setLoading(true);
    const res = await httpService.post(path, data);

    if (res) {
      localStorage.setItem("voter", JSON.stringify(res.data));
      window.location.assign("/vote");
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="homeBanner d-flex align-items-center justify-content-center">
        <div>
          <div className="d-none d-md-block">
            <Typography fontFamily={"Anton"} variant="h2" color="white">
              SEMINAR VOTING
            </Typography>
          </div>
          <div className="d-sm-block d-md-none">
            <Typography fontFamily={"Anton"} variant="h4" color="white">
              SEMINAR VOTING
            </Typography>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <Typography fontFamily={"Lato"} gutterBottom>
              Enter your name and phone number
            </Typography>

            <div className="mb-3">
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                type="number"
                onChange={handleChange}
              />
            </div>
            <div className="mt-3">
              <Button fullWidth variant="contained" onClick={register}>
                {loading ? <Spinner /> : "Register to vote"}
              </Button>
            </div>
          </div>
          <div className="col-md-3 border-start"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
