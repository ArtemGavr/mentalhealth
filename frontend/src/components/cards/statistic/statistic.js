import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
  import React from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Grid, Card, CircularProgress } from "@material-ui/core";
import { useStyles} from "./statistic.styles"
import { getUserParams } from "../../../api/body-params";
import toast from "../../toast";

const Statistic = () => {
    const classes = useStyles();
    const { t } = useTranslation();
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const { status, data } = useQuery("allParams", getUserParams, {
    onError: () => {
      notify("error", "An error occured, please reload this page!");
    },
  });
  console.log(data);
    return (
        <Grid container>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && (
        <Grid justifyContent="center" container>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
      {status === "success" && (
          <Card className={classes.paper}>
        <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="height" stroke="#82ca9d" />
      </LineChart>
      </Card>
      )
      }
      </Grid>
    )
}

export default Statistic;