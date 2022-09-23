import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { httpService } from "../services";

export default function PeopleThatVoted({ facilitator }) {
  const [votes, setVotes] = useState(0);
  const getData = async () => {
    const res = await httpService.post("peopleThatVoted", { facilitator });

    if (res) {
      setVotes(res.data);
    }
  };

  useEffect(() => {
    getData();

    setInterval(() => {
      getData();
    }, 30 * 1000);
  }, []);
  return (
    <Typography variant="caption" textAlign={"right"}>
      {votes} votes counted
    </Typography>
  );
}
