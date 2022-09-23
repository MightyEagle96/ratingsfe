import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { httpService } from "../services";

export default function PeopleThatVoted({ facilitator }) {
  const [votes, setVotes] = useState(0);
  const getData = async () => {
    const res = await httpService.post("peopleThatVoted", { facilitator });

    if (res) {
      console.log(res.data);
      setVotes(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Typography variant="caption" textAlign={"center"}>
        {votes} votes counted
      </Typography>
    </div>
  );
}
