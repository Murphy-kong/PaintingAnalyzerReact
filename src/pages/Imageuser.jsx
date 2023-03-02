import React, { useState, useEffect, memo } from "react";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import { defaultavatar, AllUserAvatarAPI, UserDeleteAPI, AllUserImagesAPI, OneUserImageDeleteAPI, CurrentUserImagesAPI } from "../pages/APIcalls";
import { useCookies } from "react-cookie";
import { gridUserAvatarAdminList } from "./Tablesettings";
import useTable from "../pages/useTable";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import { ControlPointSharp, Search } from "@material-ui/icons";
import Controls from "../pages/controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add"
import Toolbar from "@material-ui/core/Toolbar";
import PageviewIcon from '@material-ui/icons/Pageview';
import {
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CachedIcon from '@material-ui/icons/Cached';
import Popup from "../pages/Popup";
import {APISubmit_AddingUser,initialvalues,textfieldprops_AddUser, radiogroup_AddUser, formcontrol_AddUser, title_Adduser, radiogroup_Title_AddUser, title_Changeuser} from "../pages/PopupProps";
import {APISubmit_EditingUser} from "../pages/PopupProps";
import { NavLink } from 'react-router-dom';


const headCells = [
  { id: "imageSrc", label: "Image", disableSorting: true },
  { id: "imageID", label: "ImageID" },
  { id: "imageName", label: "ImageName" },
  { id: "occupation", label: "Type" },
  { id: "releaseDate", label: "Register Date" },
  { id: "userName", label: "Username" },
  { id: "action", label: "Action", disableSorting: true },
];



const Imageuser = () => {
  // API Call to get Users and Avatars of Users
  const [cookies] = useCookies(["Token"]);
  const [data, setData] = useState([{}]);
  const [filter, setFilter] = useState({
    fn: (items) => {
      return items;
    },
  });
  const[category, setCategory] = useState('all')
  const[openPopup, setOpenPopup] = useState(false)
  const[open2Popup, setOpen2Popup] = useState(false)
  const[dataforedit, setDataforedit] = useState()

  async function GetImages() {
    var result = await CurrentUserImagesAPI()
      .GetData(cookies.Token)
      .catch((err) => {
        console.log(err);
      });
     console.log(result)
     console.log("test")
    let mergedata = [];
  
    return result.data;
  }

  useEffect(() => {
    GetImages().then((data) => setData(data));
  }, []);

  function refreshuserlist() {
    GetImages().then((data) => setData(data));
  }
  // Table Design

  const style = {
    searchInput: {
      width: "75%",
    },
  };

  // Table Functions

  const handleSearch = (e) => {
    let target = e.target;
    setFilter({
      fn: (items) => {
        if (target.value == "") return items;
        else {
          if(category === 'all' )
          {
          return items.filter((x) =>{
            let allvalues = ''
            headCells.map((objects, i) => {
              if(objects.id !== 'imagelink' || objects.id !== 'action')
              {
                allvalues+= String(x[objects.id])
              }
            })
            return x.userName.toLowerCase().includes(target.value.toLowerCase())
          }
          );
        }
          if(category === 'imageName' ||category === 'occupation')
          return items.filter((x) =>
            x[category].toLowerCase().includes(target.value.toLowerCase())
          );
          else
          return items.filter((x) =>
            String(x[category]).includes(target.value)
          );
        }
      },
    });
  };

  // Input Toolbar

  const handleChange = e => {
    let target = e.target;
    setCategory(target.value)
  }

  const onClickChange = e => {
    setCategory('all')
    refreshuserlist()
  }

  const setPop = e => {
    setOpenPopup(true)
  }

  const setPop2 = e => {
    setDataforedit(e.userID)
    setOpen2Popup(true)
  }


  // Actionbuttons

  const onClickDelete = (e) => {
      console.log(e.userID)
      OneUserImageDeleteAPI(e.userID)
      .DeleteData(cookies.Token)
      .catch((err) => {
        console.log(err);
      });
  }

 // Propups wurden importiert

  const { TBlContainer, TBlHead, TBlPagination, recordsAfterPagingAndSorting } =
    useTable(data, headCells, filter);


    
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <Toolbar className="mt-10">
            <Controls.ActionButton color="primary" onClick={onClickChange}>
            <CachedIcon fontSize="small" />
            </Controls.ActionButton>
            <Controls.Input
              label="Search Images"
              type="text2"
              className="w-80"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InputLabel id="demo-simple-select-label">Filter: </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={'imagelink'}>Image</MenuItem>
                      <MenuItem value={'imageID'}>ImageID</MenuItem>
                      <MenuItem value={'imageName'}>ImageName</MenuItem>
                      <MenuItem value={'releaseDate'}>Upload Date</MenuItem>
                      <MenuItem value={'occupation'}> Occupation </MenuItem>
                      <MenuItem value={'userName'}>Username</MenuItem>
                      <MenuItem value={'action'}>Action</MenuItem>
                    </Select>
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <NavLink to="/imageupload">
            <Controls.Button text= 'Add Image' variant ='outlined' startIcon = {<AddIcon/>} onClick={setPop}>

            </Controls.Button>
            </NavLink>
          </Toolbar>
          <TBlContainer>
            <TBlHead></TBlHead>
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.imageID}>
                  <TableCell>
                    <img
                      className="rounded-full w-16 h-16"
                      src={item.imageSrc}
                    />
                  </TableCell>
                  <TableCell>{item.imageID}</TableCell>
                  <TableCell>{item.imageName}</TableCell>
                  <TableCell>{item.occupation}</TableCell>
                  <TableCell>{item.releaseDate}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>
                    <Controls.ActionButton color="primary" onClick={()=> {onClickDelete(item)}}>
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                    <NavLink to= {{
                                  pathname: "/imageView",
                                }}  state={{item: item}}>
                    <Controls.ActionButton color="primary">
                      <PageviewIcon fontSize="small" />
                    </Controls.ActionButton>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TBlContainer>
          <TBlPagination />
        </Box>
      </Box>
    </div>
  );
};

export default memo(Imageuser);