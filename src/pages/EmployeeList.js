import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import Employee from "./Employee";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useCookies } from "react-cookie";

//import styled from 'styled-components'

export default function EmployeeList() {
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

  // refreshEmployeeList = () => , geht nicht mit useEffect als arrow function, deshalb muss es konventionell geschrieben sein
  function refreshEmployeeList() {
    employeeAPI()
      .fetchAll()
      .then((res) => setEmployeeList(res.data))
      .catch((err) => console.log(err));
  }

  const addOrEdit = (formData, onSuccess) => {
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
      employeeAPI()
        .create(formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeList();
          console.log(res)
        })
        .catch((err) => console.log(err));
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
            <h1 className="display-4  text-lg text-gray-400">Picture Upload</h1>
          </div>
          <div>
            <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
          </div>
          {gallery_user()}
        </div>
      </div>
    </>
  );
}

{
  /* <div className='card' onClick={() =>{showRecordDetails(data)}}>
    <img src={data.imageSrc} className="card-img-top rounded-circle"   ></img>
        <div className='card-body'>
          <h5>{data.employeeName}</h5>
          <span>{data.occupation}</span> <br/>
          <button className='btn btn-light delete-button' onClick = {e => onDelete(e, parseInt(data.employeeID))}>
            <AiFillDelete/>
          </button>
        </div>
    </div>

    <div className="col-md-8">
          <table class="table-auto">
            <tbody>
              {
                // tr > 3 td
                [...Array(Math.ceil(employeeList.length / 3))].map((e, i) => (
                  <tr key={i}>
                    <td> {imageCard(employeeList[3 * i])}</td>
                    <td>
                      {" "}
                      {employeeList[3 * i + 1]
                        ? imageCard(employeeList[3 * i + 1])
                        : null}
                    </td>
                    <td>
                      {" "}
                      {employeeList[3 * i + 2]
                        ? imageCard(employeeList[3 * i + 2])
                        : null}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    */
}
