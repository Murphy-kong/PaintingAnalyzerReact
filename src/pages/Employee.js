import React, { useState, useEffect } from "react";
import defaultImageSrc from "./placeholder.jpg";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const initialFieldValues = {
  employeeID: 0,
  employeeName: "",
  occupation: "Analyze",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function Employee(props) {
  const { addOrEdit, recordForEdit } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const { currentColor } = useStateContext();

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target)
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        console.log(values);
        setValues({
          ...values,
          imageFile: imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName == "" ? false : true;
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      formData.append("imageName", values.employeeName);
      formData.append("occupation", values.occupation);
      formData.append("imageFile", values.imageFile);
      formData.append("releaseDate", today)
      formData.append("imageSrc", "");
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] == false ? " invalid-field" : "";

  return (
    <>
      <div className="container text-left mb-5">
        <p className="lead text-3xl font-extrabold tracking-tight text-slate-900">
          Uploaded Picture:{" "}
        </p>
      </div>
        <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
          <div className="card">
            <img
              src={values.imageSrc}
              className="card-img-top md:w-96 h-50"
              alt="description"
            />
            <div className="card-body">
              <div className="form-group">
                <input
                  type="file"
                  accept="image/*"
                  className={
                    "form-control-file p-3 mt-2 " + applyErrorClass("imageSrc")
                  }
                  onChange={showPreview}
                  id="image-uploader"
                />
              </div>
              <div className="form-group">
                <input
                  className={
                    "form-control p-3 mt-2 border" +
                    applyErrorClass("employeeName")
                  }
                  placeholder="Picture Name"
                  name="employeeName"
                  value={values.employeeName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-left mt-2">
              <FormControl>
              <FormLabel>Gender</FormLabel>
                <RadioGroup aria-label="gender" name="occupation" value={values.occupation} onChange={handleChange}>
                  <FormControlLabel value="Analyze"control={<Radio />} label="Analyze" />
                  <FormControlLabel value="Avatar" control={<Radio />} label="Avatar" />
                </RadioGroup>
              </FormControl>
              </div>
              <div className="form-group text-left mt-2">
                <button
                  type="submit"
                  style={{
                    backgroundColor: currentColor,
                    borderRadius: "10px",
                  }}
                  className="p-3"
                >
                  Submit Image
                </button>
              </div>
              <div className="form-group text-left mt-2">
                <button
                  type="button"
                  style={{
                    backgroundColor: currentColor,
                    borderRadius: "10px",
                  }}
                  className="p-3"
                  onClick={resetForm}
                >
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </form>
        {/*  <div>
          <p>TEST</p>
        </div>
                     <div className="form-group">
                <input
                  className="form-control p-3 mt-2 border"
                  placeholder="Analyze or Avatar"
                  name="occupation"
                  value={values.occupation}
                  onChange={handleInputChange}
                />
              </div>


                */}
   
    </>
  );
}
