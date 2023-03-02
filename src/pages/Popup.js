import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  TextField,
} from "@material-ui/core";
import Controls from "../pages/controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from 'react-router-dom';

function Popup(props) {

  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    textfieldprops,
    radiogroup,
    formcontrol,
    radiogroup_Title,
    apifunction,
    cookies,
    initialvalues,
    userid,
    img_pop
  } = props;
  const [formValues, setFormValues] = useState(initialvalues);
  const navigate = useNavigate();

  const setPop = (e) => {
    console.log("Test")
    setOpenPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    apifunction(formValues, cookies,userid, navigate)
    setOpenPopup(false)
  };

  return (
    <Dialog open={openPopup} >
      <form onSubmit={handleSubmit} >
        <Grid container alignItems="center" justify="center" direction="column">
          <Controls.Button
            text=""
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={setPop}
            color="error"
          ></Controls.Button>
          <DialogTitle>
            <div>{`${title}`}</div>
          </DialogTitle>
          <DialogContent >
          { img_pop ? 
          <div className="flex flex-row">
             <img class="object-contain h-48 w-96" src={img_pop}/>
          </div>
          : <></>}
            {textfieldprops.map((textfieldobject) => (
              <Grid item container direction="row" justifyContent="center"  alignItems="center">
                <TextField
                  id={`${textfieldobject.id}`}
                  name={`${textfieldobject.name}`}
                  label={`${textfieldobject.label}`}
                  type={`${textfieldobject.type}`}
                  value={formValues[textfieldobject.value]}
                  onChange={handleInputChange}
                />
              </Grid>
            ))}
            <FormControl>
              <FormLabel className="mt-10" >{`${radiogroup_Title}` }</FormLabel>
              {radiogroup.map((radiogroupobject) => (
                <RadioGroup
                  name={`${radiogroupobject.name}`}
                  value={formValues[radiogroupobject.value]}
                  onChange={handleInputChange}
                  row

                >
                  {formcontrol.map((formcontrobject) => (
                    <FormControlLabel
                      key={`${formcontrobject.key}`}
                      value={`${formcontrobject.value}`}
                      control={<Radio size="small" />}
                      label={`${formcontrobject.label}`}
                    />
                  ))}
                </RadioGroup>
              ))}
            </FormControl>
          </DialogContent>
          <Controls.Button
            variant="contained"
            type="submit"
            size="large"
            text="Submit"
          >
            Submit
          </Controls.Button>
        </Grid>
      </form>
    </Dialog>
  );
}

export default Popup;

/*
       <img  class="basis-1/2" src="http://localhost:20336/Images/Caravaggio220618561.jpg"/>
 <Grid item>
              <TextField
                id="userName"
                name="userName"
                label="Username"
                type="text"
                value={formValues.userName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="text"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="repeatpassword"
                name="repeatpassword"
                label="Repeat Password"
                type="password"
                value={formValues.repeatpassword}
                onChange={handleInputChange}
              />
            </Grid>
            <FormControl>
              <FormLabel className="mt-10">{`${radiogroup_Title}`}</FormLabel>
              <RadioGroup
                name="role"
                value={formValues.role}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel
                  key="user"
                  value="registerd user"
                  control={<Radio size="small" />}
                  label="User"
                />
                <FormControlLabel
                  key="admin"
                  value="admin"
                  control={<Radio size="small" />}
                  label="Admin"
                />
              </RadioGroup>
            </FormControl>
            */
