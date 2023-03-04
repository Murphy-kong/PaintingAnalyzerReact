import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Paper from "@material-ui/core/Paper";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FilterIcon from "@material-ui/icons/Filter";
import Controls from "./controls/Controls";
import Popup from "./Popup";
import {
  textfieldprops_AddAnalyze,
  radiogroup_AddAnalyze,
  formcontrol_AddAnalyze,
  title_AddAnalyze,
  radiogroup_Title_AddAnalyze,
  initialvalues_AddAnalyze,
  APISubmit_AddAnalyze,
} from "./PopupProps";
import { useCookies } from "react-cookie";
import { AnalyzewithData_Single_API } from "../pages/APIcalls";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const initialvalues = {
  session_Artist_Accuracy: [],
  session_Genre_Accuracy: [],
  session_Style_Accuracy: [],
};

const AnalyzeView = (props) => {
  const location = useLocation();
  const { state } = location;
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [data, setData] = useState(initialvalues);
  const [cookies] = useCookies(["Token"]);

  async function GetAnalyze() {
    console.log(state.item.analyzeID);
    var result = await AnalyzewithData_Single_API(state.item.analyzeID)
      .GetData(cookies.Token)
      .catch((err) => {
        console.log(err);
      });
    console.log(result);
    console.log("test");
    let mergedata = [];

    return result.data;
  }

  useEffect(() => {
    GetAnalyze().then((result) => setData(result));
  }, []);

  useEffect(() => {
    console.log(data.session_Artist_Accuracy);
    console.log(data.session_Genre_Accuracy);
    console.log(data.session_Style_Accuracy);
    data.session_Artist_Accuracy.map((Artistsresult) => {
      console.log(Artistsresult.artistName);
    });
  }, [data]);

  const setPop = (e) => {
    setOpenPopup(true);
  };

  const TBlContainer_Artist = (props) => (
    <Paper className={classes.paper}>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="ArtistName"
            secondary={props.props.artistName}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Accuracy" secondary={props.props.accuracy} />
        </ListItem>
      </List>
    </Paper>
  );

  const TBlContainer_Genre = (props) => (
    <Paper className={classes.paper}>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="GenreName" secondary={props.props.genreName} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Accuracy" secondary={props.props.accuracy} />
        </ListItem>
      </List>
    </Paper>
  );

  const TBlContaine_Style = (props) => (
    <Paper className={classes.paper}>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="StyleName" secondary={props.props.styleName} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Accuracy" secondary={props.props.accuracy} />
        </ListItem>
      </List>
    </Paper>
  );

  return (
    <div className=" m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="display-4  text-lg text-gray-400">Analyzeview: </h1>
      <div className="container text-left mb-10 mt-10 flex flex-row flex-wrap justify-around">
        <img
          src={state.item.imageSrc}
          className="md:w-1/4 h-1/4 object-cover rounded-xl"
          alt="description"
        />
        <Paper className={classes.paper}>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="AnalyzeID"
                secondary={state.item.imageID}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="AnalyzeName"
                secondary={state.item.imageName}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DateRangeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Upload Date"
                secondary={state.item.releaseDate}
              />
            </ListItem>
          </List>
        </Paper>
      </div>
      <div>
        <h1 className="display-4  text-lg text-gray-400">
          Results for Artist:{" "}
        </h1>
        <div>
          {data.session_Artist_Accuracy.map((Artistsresult) => (
            <TBlContainer_Artist props={Artistsresult} />
          ))}
        </div>
        <h1 className="display-4  text-lg text-gray-400">
          Results for Artist:{" "}
        </h1>
        <div>
          {data.session_Style_Accuracy.map((Artistsresult) => (
            <TBlContainer_Genre props={Artistsresult} />
          ))}
        </div>
        <h1 className="display-4  text-lg text-gray-400">
          Results for Artist:{" "}
        </h1>
        <div>
          {data.session_Genre_Accuracy.map((Artistsresult) => (
            <TBlContaine_Style props={Artistsresult} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeView;

/*
  <Paper className={classes.paper}>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="ArtistName" secondary={"test"} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Accuracy" secondary={"Test"} />
            </ListItem>
          </List>
          </Paper>

             data.session_Artist_Accuracy.map((Artistsresult) => {
            <Paper className={classes.paper}>
                <List className={classes.root}>
                    <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                        <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    </ListItem>
              </List>
            </Paper>
        })

*/
