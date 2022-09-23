import React, { useState, useEffect } from "react";
import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import { httpService } from "../services";
import { blue } from "@mui/material/colors";
import PeopleThatVoted from "./PeopleThatVoted";

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResults = async () => {
    setLoading(true);
    const path = "overallVotes";

    const res = await httpService.get(path);

    if (res && res.data) {
      setResults(res.data);

      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getResults();

    setInterval(() => {
      getResults();
    }, 30 * 1000);
  }, []);
  return (
    <div>
      <div className="container">
        {!loading ? (
          <div>
            <div className="d-none d-md-block">
              <div className="row m-0 border rounded mt-3">
                {results.map((r) => (
                  <div className="col-lg-6 p-3 mb-4">
                    <div className="d-flex justify-content-between">
                      <div>
                        <Typography
                          fontFamily={"Anton"}
                          variant="h4"
                          gutterBottom
                        >
                          {r.instructor}
                        </Typography>
                        <Typography fontFamily={"Lato"} color="GrayText">
                          {r.topic}
                        </Typography>
                      </div>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="d-flex justify-content-center">
                            <Avatar sx={{ backgroundColor: blue[700] }}>
                              <Typography>{r.votes}</Typography>
                            </Avatar>
                          </div>
                          <PeopleThatVoted facilitator={r._id} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-sm-block d-md-none">
              <div className="row m-0  rounded mt-3">
                {results.map((r) => (
                  <div className="col-lg-6 p-3 mb-4">
                    <div className="d-flex justify-content-between">
                      <div>
                        <Typography
                          fontFamily={"Anton"}
                          variant="h4"
                          gutterBottom
                        >
                          {r.instructor}
                        </Typography>
                        <Typography fontFamily={"Lato"} color="GrayText">
                          {r.topic}
                        </Typography>
                      </div>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="d-flex justify-content-center">
                            <Avatar sx={{ backgroundColor: blue[700] }}>
                              <Typography>{r.votes}</Typography>
                            </Avatar>
                          </div>
                          <PeopleThatVoted facilitator={r._id} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="rectangular" height={60} />
                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="rectangular" height={60} />
                <Skeleton variant="rounded" height={60} />
              </Stack>
            </div>
            <div className="col-md-6">
              <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="rectangular" height={60} />
                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="rectangular" height={60} />
                <Skeleton variant="rounded" height={60} />
              </Stack>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
