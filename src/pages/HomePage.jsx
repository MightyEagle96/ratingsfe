import React, { useState } from "react";
import "./HomePage.css";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import { Person, Phone } from "@mui/icons-material";
import { httpService } from "../services";
import { Spinner } from "react-bootstrap";

function HomePage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [closeRegistration, setCloseRegistration] = useState(false);

  const closeTime = new Date(2022, 8, 24, 9, 0, 0);
  const int = setInterval(() => {
    if (Date.now() >= Date.parse(closeTime)) {
      setCloseRegistration(true);

      clearInterval(int);
    }
  }, 1000);

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
              RATE YOUR FACILITATORS
            </Typography>
          </div>
          <div className="d-sm-block d-md-none">
            <Typography fontFamily={"Anton"} variant="h4" color="white">
              RATE YOUR FACILITATORS
            </Typography>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="d-none d-md-block">
          <div className="d-flex justify-content-center ">
            {closeRegistration ? (
              <Typography fontFamily={"Anton"} variant="h4">
                VOTING HAS ENDED
              </Typography>
            ) : (
              <div className="col-md-4">
                <Typography
                  fontFamily={"Lato"}
                  color="GrayText"
                  fontWeight={600}
                  textAlign={"center"}
                  gutterBottom
                >
                  Enter your name and phone number
                </Typography>

                <div className="mb-3">
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="mt-3">
                  <Button fullWidth variant="contained" onClick={register}>
                    {loading ? <Spinner animation="grow" /> : "Register"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="d-sm-block d-md-none">
          {closeRegistration ? (
            <Typography fontFamily={"Anton"} variant="h4">
              VOTING HAS ENDED
            </Typography>
          ) : (
            <div className="col-md-4">
              <Typography
                fontFamily={"Lato"}
                color="GrayText"
                fontWeight={600}
                textAlign={"center"}
                gutterBottom
              >
                Enter your name and phone number
              </Typography>

              <div className="mb-3">
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="mb-3">
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  type="number"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="mt-3">
                <Button fullWidth variant="contained" onClick={register}>
                  {loading ? <Spinner animation="grow" /> : "Register"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
