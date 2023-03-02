import React, {useState} from "react";
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
import Paper from '@material-ui/core/Paper';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FilterIcon from '@material-ui/icons/Filter';
import Controls from "../pages/controls/Controls";
import Popup from "../pages/Popup";
import {textfieldprops_AddAnalyze, radiogroup_AddAnalyze, formcontrol_AddAnalyze, title_AddAnalyze , radiogroup_Title_AddAnalyze, initialvalues_AddAnalyze,APISubmit_AddAnalyze} from "../pages/PopupProps";
import { useCookies } from "react-cookie";



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

const ImageView = (props) => {
  const location = useLocation();
  const { state } = location;
  const classes = useStyles();
  const[openPopup, setOpenPopup] = useState(false)
  const [cookies] = useCookies(["Token"]);

  const setPop = e => {
    setOpenPopup(true)
  }

  return (
    <div className=" m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="display-4  text-lg text-gray-400">ImageView: </h1>
      <div className="container text-left mb-10 flex flex-row flex-wrap justify-around">
        <img
          src={state.item.imageSrc}
          className="md:w-96 h-50 object-cover grow "
          alt="description"
        />
        <div>
        <Paper className={classes.paper}>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="ImageID" secondary={state.item.imageID} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="ImageName" secondary={state.item.imageName} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FilterIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Type" secondary={state.item.occupation} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DateRangeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Upload Date" secondary={state.item.releaseDate} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Uploaded By" secondary={state.item.userName} />
            </ListItem>
          </List>
          <Controls.Button
            variant="contained"
            type="button"
            size="large"
            text="Click here for Analyze"
            onClick={setPop}
          >
            Analyze
          </Controls.Button>
          <Popup
          openPopup= {openPopup}
          setOpenPopup = {setOpenPopup} 
          apifunction = {APISubmit_AddAnalyze}
          initialvalues = {initialvalues_AddAnalyze}
          textfieldprops = {textfieldprops_AddAnalyze}
          radiogroup = {radiogroup_AddAnalyze}
          formcontrol = {formcontrol_AddAnalyze}
          title = {title_AddAnalyze}
          radiogroup_Title = {radiogroup_Title_AddAnalyze}
          cookies = {cookies.Token}
          userid = {state.item.imageID}
          img_pop = {state.item.imageSrc}
          >

          </Popup>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ImageView;
