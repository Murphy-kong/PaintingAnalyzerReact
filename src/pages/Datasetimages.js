import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import Datasetform from "./Datasetform";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useCookies } from "react-cookie";

//import styled from 'styled-components'

export default function Datasetimages() {
const initialImageMethodValues = {
  CurrentMethod: 'Upload'
};

  const [employeeList, setEmployeeList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [imageMethod, setImageMethod] = useState(initialImageMethodValues);
  const [cookies] = useCookies(["Token"]);

  const { currentColor } = useStateContext();

   //const host = "http://localhost:20336/"
   const host = "https://paintinganalyzeraspnet.azurewebsites.net/"

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  const employeeAPI = (url = host + "api/User/GetImagesfromUserwithClaim/") => {
    return {
      fetchAll: () => axios.get(url,{
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "text/plain",
          "Authorization": `bearer ${cookies.Token}`
        },
      }),
      create: (newRecord) => axios.post(url = host + "api/ImageUpload", newRecord,{
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
          "Authorization": `bearer ${cookies.Token}`
        },
      }),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord,{
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "text/plain",
          "Authorization": `bearer ${cookies.Token}`
        },
      }),
      delete: (id) => axios.delete(url + id,{
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "text/plain",
          "Authorization": `bearer ${cookies.Token}`
        },
      }),
    };
  };

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  // refreshEmployeeList = () => , geht nicht mit useEffect als arrow function, deshalb muss es konventionell geschrieben sein
  function refreshEmployeeList() {
    const images = importAll(require.context('../DatasetImages', false, /\.(png|jpe?g|svg)$/));
    console.log(typeof images)
    const result = Object.keys(images).map(key => {
      return {employeeID: 0,
        employeeName: "",
        occupation: "Analyze",
        imageName: "",
        imageSrc: images[key],
        imageFile: null,};
    });
    console.log(result)
    setEmployeeList(result)
  }

  const addOrEdit = (formData, onSuccess) => {
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    //if (formData.get("employeeID") == "0")
      employeeAPI()
        .create(formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeList();
        })
        .catch((err) => console.log(err));
    /*else
      employeeAPI()
        .update(formData.get("employeeID"), formData)
        .then((res) => {
          onSuccess();
          console.log("hallo2");
          refreshEmployeeList();
        })
        .catch((err) => console.log(err));*/
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure to delete this record?"))
      employeeAPI()
        .delete(id)
        .then((res) => refreshEmployeeList())
        .catch((err) => console.log(err));
  };

  const imageCard = (data) => (
    <div
      class="flex flex-col rounded-lg shadow-lg bg-white max-w-[10rem] mb-1 mr-1"
      onClick={() => {
        showRecordDetails(data);
      }}
    >
      <div class="h-full w-full p-1 md:p-2">
        <img
          class="rounded-t-lg h-full max-w-full"
          src={data.imageSrc}
          alt=""
        />
      </div>
    </div>
  );

  const gallery_user = () => (
    <div class="flex flex-wrap justify-start mt-2">
      {employeeList.map((e, i) => imageCard(employeeList[i]))}
    </div>
  );

  const gallery_dataset = () => (
    <div class="flex flex-wrap justify-start mt-2">
      {employeeList.map((e, i) => imageCard(employeeList[i]))}
    </div>
  );

  const changeImageMethod = () => {
    if(imageMethod.CurrentMethod == 'Upload')
    setImageMethod({
      CurrentMethod: 'Dataset'
    });
    else
    setImageMethod({
      CurrentMethod: 'Upload'
    });
  };

  let a = "news";

  return (
    <>
      <div className=" m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {console.log('Das ist hier: ' + imageMethod.CurrentMethod)}
        <div>
          <div className="container text-left">
            <h1 className="display-4  text-lg text-gray-400"> Choose one of the Dataset Pictures by clicking on it</h1>
          </div>
          <div>
            <Datasetform addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
          </div>
          { gallery_user()}
        </div>
      </div>
    </>
  );
}