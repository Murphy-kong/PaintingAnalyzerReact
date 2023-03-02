import React, { useState, useEffect, memo } from "react";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import { defaultavatar, AllUserAvatarAPI, UserDeleteAPI } from "../pages/APIcalls";
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

const headCells = [
  { id: "avatarlink", label: "Profilepicture", disableSorting: true },
  { id: "userID", label: "UserID" },
  { id: "userName", label: "Username" },
  { id: "role", label: "Role" },
  { id: "email", label: "Email" },
  { id: "releaseDate", label: "Register Date" },
  { id: "imagecount", label: "Number of Images" },
  { id: "analysecount", label: "Number of Analyses" },
  { id: "action", label: "Action", disableSorting: true },
];


const Customers = () => {
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

  async function GetCustomers() {
    var result = await AllUserAvatarAPI()
      .GetData(cookies.Token)
      .catch((err) => {
        console.log(err);
      });
    // console.log(result)
    let mergedata = [];
    result.data.map((person, index) => {
      /*  console.log(person)
        console.log(person.uploadeImages[0].imageSrc)*/
      //let tmp_avatarlink = person.uploadeImages[0].imageSrc
      let imagecount = 0;
      let analysecount = 0;
      let indexavatar = 0;
      person.uploadeImages.map((x, index) => {
        if (x.occupation !== "Avatar") {
          imagecount++;
        } else if (x.occupation === "Avatar") {
          indexavatar = index;
        }
        x.analyzes.map((t) => {
          analysecount++;
        });
      });
      let tmp_userdata = {
        userID: person.userID,
        userName: person.userName,
        role: person.role,
        email: person.email,
        releaseDate: person.releaseDate,
        avatarlink: person.uploadeImages[indexavatar].imageSrc,
        imagecount: imagecount,
        analysecount: analysecount,
      };

      mergedata[index] = tmp_userdata;
    });
    console.log(mergedata);
    return mergedata;
  }

  useEffect(() => {
    GetCustomers().then((data) => setData(data));
  }, []);

  function refreshuserlist() {
    GetCustomers().then((data) => setData(data));
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
              if(objects.id != 'avatarlink' || objects.id != 'action')
              {
                allvalues+= String(x[objects.id])
              }
            })
            return x.userName.toLowerCase().includes(target.value.toLowerCase())
          }
          );
        }
          if(category === 'userName' || category === 'email' || category === 'role')
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
      UserDeleteAPI()
      .DeleteData(cookies.Token, e.userID)
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
              label="Search Users"
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
                      <MenuItem value={'all'}>All</MenuItem>
                      <MenuItem value={'userID'}>UserID</MenuItem>
                      <MenuItem value={'userName'}>Username</MenuItem>
                      <MenuItem value={'role'}>Role</MenuItem>
                      <MenuItem value={'email'}>Email</MenuItem>
                      <MenuItem value={'releaseDate'}>Date</MenuItem>
                      <MenuItem value={'imagecount'}>Images</MenuItem>
                      <MenuItem value={'analysecount'}>Analyses</MenuItem>
                    </Select>
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <Controls.Button text= 'Add User' variant ='outlined' startIcon = {<AddIcon/>} onClick={setPop}>

            </Controls.Button>
          </Toolbar>
          <TBlContainer>
            <TBlHead></TBlHead>
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.userID}>
                  <TableCell>
                    <img
                      className="rounded-full w-10 h-10"
                      src={item.avatarlink}
                    />
                  </TableCell>
                  <TableCell>{item.userID}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.releaseDate}</TableCell>
                  <TableCell>{item.imagecount}</TableCell>
                  <TableCell>{item.analysecount}</TableCell>
                  <TableCell>
                    <Controls.ActionButton color="primary" onClick={() => {setPop2(item)}}>
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton color="secondary" onClick={()=> {onClickDelete(item)}}>
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TBlContainer>
          <TBlPagination />
          <Popup
          openPopup= {openPopup}
          setOpenPopup = {setOpenPopup} 
          apifunction = {APISubmit_AddingUser}
          initialvalues = {initialvalues}
          textfieldprops = {textfieldprops_AddUser}
          radiogroup = {radiogroup_AddUser}
          formcontrol = {formcontrol_AddUser}
          title = {title_Adduser}
          radiogroup_Title = {radiogroup_Title_AddUser}
          cookies = {cookies.Token}
          >

          </Popup>
          <Popup
          openPopup= {open2Popup}
          setOpenPopup = {setOpen2Popup} 
          apifunction = {APISubmit_EditingUser}
          initialvalues = {initialvalues}
          textfieldprops = {textfieldprops_AddUser}
          radiogroup = {radiogroup_AddUser}
          formcontrol = {formcontrol_AddUser}
          title = {title_Changeuser}
          radiogroup_Title = {radiogroup_Title_AddUser}
          cookies = {cookies.Token}
          userid = {dataforedit}
          >

          </Popup>
        </Box>
      </Box>
    </div>
  );
};

export default memo(Customers);
/*


  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete', 'Search'];
  const editing = { allowDeleting: true, allowEditing: true };
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Users" />
      <GridComponent
        dataSource={data}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        allowFiltering

      >
        <ColumnsDirective>
          {UserGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default memo(Customers);


*/

/*useEffect(() => {
  console.log(userdata)
}, [userdata]);

analysecount
: 
2
avatarlink
: 
"http://localhost:20336/Images/P1280937-b.jpg"
email
: 
"eddy.khalili.sabet@gmail.com"
imagecount
: 
2
releaseDate
: 
"0001-01-01T00:00:00"
userID
: 
1
userName
: 
"Eddy"
*/
