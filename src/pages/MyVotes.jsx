import { Button, Typography, Skeleton, Stack } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { httpService, voter } from "../services";
import { Logout, Star, StarBorder } from "@mui/icons-material";

function MyVotes() {
  const [fetching, setFetching] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [perfect, setPerfect] = useState([0, 1, 2, 3, 4]);

  const getVotes = async () => {
    if (voter) {
      setFetching(true);
      const path = "getVotes";

      const res = await httpService.post(path, { voter: voter._id });
      if (res) {
        res.data.forEach((c) => {
          c.voteBox = [];

          for (let i = 0; i < c.votes; i++) {
            c.voteBox.push(i);
          }
        });
        setRatings(res.data);
      }
      setFetching(false);
    }
  };

  const handleExit = () => {
    localStorage.removeItem("voter");
    window.location.assign("/");
  };
  const filtered = (arr) => {
    let notFound = [];
    perfect.forEach((c) => {
      if (!arr.includes(c)) {
        notFound.push(c);
      }
    });

    return notFound;
  };
  useEffect(() => {
    getVotes();
  }, []);
  return (
    <div>
      <div className="container border p-3 mt-3">
        {!fetching ? (
          <div>
            {" "}
            <div className="mb-5">
              <Typography fontFamily="Anton" variant="h4">
                Your Ratings
              </Typography>
            </div>
            {ratings.map((c) => (
              <div className="mb-4">
                <Typography
                  fontFamily={"Lato"}
                  fontWeight={600}
                  variant="h5"
                  gutterBottom
                >
                  {c.facilitator.instructor}
                </Typography>
                <Typography variant="subtitle1">
                  {c.facilitator.topic}
                </Typography>

                <div className="d-flex justify-content-between">
                  <div>
                    {" "}
                    {c.voteBox.map(() => (
                      <Star />
                    ))}
                    {filtered(c.voteBox).map(() => (
                      <StarBorder />
                    ))}
                  </div>
                  <div>
                    <Typography fontFamily={"Lato"} fontWeight={600}>
                      {" "}
                      {c.votes}/{perfect.length}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="contained"
              color="error"
              onClick={handleExit}
              endIcon={<Logout />}
            >
              Exit
            </Button>
          </div>
        ) : (
          <div className=" mb-2">
            <Stack spacing={1}>
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton variant="rectangular" height={60} />
              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="circular" width={60} height={60} />
              <Skeleton variant="rectangular" height={60} />
              <Skeleton variant="rounded" height={60} />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyVotes;
