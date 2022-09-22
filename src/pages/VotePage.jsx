import { Typography, Slider, Avatar, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { parameters } from "../labels";
import { httpService, voter } from "../services";
import Swal from "sweetalert2";

function VotePage() {
  const [instructors, setInstructors] = useState([]);
  const [ratings, setRatings] = useState([]);

  // console.log(voter);
  const getFacilitators = async () => {
    const path = "getFacilitators";

    const res = await httpService.get(path);
    if (res) {
      setInstructors(res.data);
    }
  };

  useEffect(() => {
    getFacilitators();
    getVotes();
  }, []);

  const [inputs, setInputs] = useState({});
  const [inTotals, setTotals] = useState([]);

  const rowGrade = (field) => {
    if (inputs[field]) return inputs[field];
    return 0;
  };
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: Math.floor((e.target.value / 100) * 5),
    });

    individualTotal();
  };

  const individualTotal = () => {
    let totals = [];

    instructors.forEach((c, i) => {
      let instructorTotal = 0;
      parameters.forEach((d, o) => {
        if (inputs[`instructor_${i}_parameter_${o}`]) {
          instructorTotal += inputs[`instructor_${i}_parameter_${o}`];
        }
      });
      totals.push(Math.floor(instructorTotal / parameters.length));
    });

    setTotals(totals);
  };

  const rateFacilitator = async (facilitator, votes) => {
    console.log({ facilitator, votes });
    const path = `rateFacilitator/${voter._id}`;
    const res = await httpService.post(path, { facilitator, votes });
    if (res) {
      setRatings((old) => [...old, res.data]);

      if (ratings.length === instructors.length) {
        // Swal.fire({ icon: "success" });
        Swal.fire({
          icon: "success",
          title: "RATINGS COMPLETE",
          text: "Thank you for taking out time to rate the facilitators",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  };

  const disabled = (facilitator) => {
    const exists = ratings.find((c) => c.facilitator === facilitator);
    if (exists) {
      return true;
    }
    return false;
  };

  const getVotes = async () => {
    const path = "getVotes";

    const res = await httpService.get(path);
    setRatings(res.data);
  };
  return (
    <div>
      <div className="container">
        <div className="row  text-white">
          {instructors.map((c, index) => (
            <div
              key={index}
              className={`fac${index} p-4 col-md-5 mb-2 me-2 d-flex align-items-end `}
            >
              <div className="col-12">
                <div className="mb-4">
                  <Typography fontFamily={"Anton"} variant="h4">
                    {c.instructor}
                  </Typography>
                  <Typography
                    fontFamily={"Lato"}
                    variant="body2"
                    textTransform={"uppercase"}
                  >
                    {c.topic}
                  </Typography>
                </div>
                <div className="">
                  {parameters.map((parameter, index2) => (
                    <div>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        fontWeight={300}
                        fontFamily={"Lato"}
                      >
                        {parameter}
                      </Typography>

                      <div className="d-flex justify-content-between">
                        <div className="col-8">
                          {" "}
                          <Slider
                            defaultValue={0}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            name={`instructor_${index}_parameter_${index2}`}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <Avatar>
                            <Typography>
                              {rowGrade(
                                `instructor_${index}_parameter_${index2}`
                              )}
                              /5
                            </Typography>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Typography>
                    Total Assessment: {inTotals[index] || 0}/5
                  </Typography>
                  <div className="mt-3">
                    <Button
                      variant="contained"
                      disabled={disabled(c._id)}
                      onClick={() => rateFacilitator(c._id, inTotals[index])}
                    >
                      rate this facilitator
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VotePage;
