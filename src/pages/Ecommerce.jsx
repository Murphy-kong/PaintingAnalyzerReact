import React, {useState, useEffect} from 'react';
import { BsImages } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import {  medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { earningData, links_admin, links_user  } from "../pages/Homedata";
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import { defaultavatar, AllUserAvatarAPI, UserDeleteAPI, AllUserImagesAPI,  GetNotificationUserAPI, AllAnaylzesAPI, CurrentUserNameAPI } from "../pages/APIcalls";
import { useCookies } from "react-cookie";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const chatData2 = [
  {
    image: "",
    message: "",
    desc: "",
    time: "",
    avatarlink: "",
  },
];

const User_images_Anlyses_intitalvalues = 
  {
    users_amount: 0,
    uploadeImages_amount: 0,
    analyzes_amount: 0,
  }


const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const [validation, setValidation] = useState();
  const [data_analyzes, setData_analyzes] = useState([{}]);
  const[analyzenumber, setAnalyzenumber] = useState(0)
  const [data_amounts, setData_amounts] = useState(User_images_Anlyses_intitalvalues);
  const [cookies] = useCookies(["Token"]);
  const [notificationdata, setNotificationdata] = useState(chatData2);

  async function GetAnalyzes() {
    var result = await AllAnaylzesAPI()
      .GetData(cookies.Token)
      .catch((err) => {
        console.log(err);
      });
     let mergedata = [];
     let index = 0;
     result.data.map((image) =>{
      image.analyzes.map((analyzes) => {
        
        let tmp_userdata = {
          imageSrc: image.imageSrc,
          analyzeID: analyzes.analyzeID,
          imageID: image.imageID,
          mL_Model: analyzes.mL_Model,
          releaseDate: analyzes.releaseDate,
        };
        mergedata[index++] = tmp_userdata;
      })
    
     })
    return mergedata;
  }

  async function GetImages() {
    var result = await AllUserImagesAPI()
      .GetData(cookies.Token)
      .catch((err) => {
        console.log(err);
      });
    return result.data;
  }

  async function GetAnalyzesperImage() {
    var result = await AllAnaylzesAPI()
      .GetData(cookies.Token)
      .catch((err) => {
        console.log(err);
      });
    return result.data;
  }

  function NotificationAPI() {
    GetNotificationUserAPI()
      .GetData(cookies.Token)
      .then((res) => {
        setNotificationdata(res.data);
      })
      .catch((err) => console.log(err));
  }

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
    return mergedata;
  }

  async function registerAPI() {
    var imagedata = await GetImages()  
    .catch((err) => {
      console.log(err);
    });
    var analyzedata = await GetAnalyzes()  
    .catch((err) => {
      console.log(err);
    });
    var userdata = await   GetCustomers()   
    .catch((err) => {
      console.log(err);
    });

    var ValidationData = await  CurrentUserNameAPI()
    .SendGetNameData (cookies.Token)    
    .catch((err) => {
      console.log(err);
    });
   
    setValidation({
      role: ValidationData.data.role
    })

    console.log(validation)

    setData_amounts({
      "users_amount": userdata.length,
      "uploadeImages_amount": imagedata.length,
      "analyzes_amount": analyzedata.length,
    });
  
  }

  useEffect(() => {
    registerAPI()
    NotificationAPI()
    GetAnalyzesperImage().then((data) => {
      setData_analyzes(data)
    })
  }, []);

  useEffect(() => {
    var analyzedimages_count = 0;
    data_analyzes.map( images => {
      if (typeof images.analyzes !== 'undefined')
      {
        if(images.analyzes.length > 0 )
        analyzedimages_count++;
      }
    })
    setAnalyzenumber(analyzedimages_count)
  }, [data_analyzes]);


  useEffect(() => {
    console.log(Object.values(data_amounts)[0])
  }, [data_amounts]);




  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total Analysed Images</p>
              <p className="text-2xl">{analyzenumber}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsImages />
            </button>
          </div>
          {/*
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />  
          </div>
          */}
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item, index) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{Object.values(data_amounts)[index]}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Images Usages</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Images from Dataset Analysed</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Uploaded Images Analysed</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      </div>
  );
};

export default Ecommerce;


/*
<div className="flex gap-10 m-4 flex-wrap justify-center">
<div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
  <div className="flex justify-between items-center gap-2">
    <p className="text-xl font-semibold">Recent Activities</p>
  </div>
  <div className="mt-10 w-72 md:w-400">
    {recentTransactions.map((item) => (
      <div key={item.title} className="flex justify-between mt-4">
        <div className="flex gap-4">
          <button
            type="button"
            style={{
              color: item.iconColor,
              backgroundColor: item.iconBg,
            }}
            className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
          >
            {item.icon}
          </button>
          <div>
            <p className="text-md font-semibold">{item.title}</p>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        </div>
        <p className={`text-${item.pcColor}`}>{item.amount}</p>
      </div>
    ))}
  </div>
  <div className="flex justify-between items-center mt-5 border-t-1 border-color">
    {
    <div className="mt-10">
      {/* 
      <Button
        color="white"
        bgColor={currentColor}
        text="Add"
        borderRadius="10px"
      />

    </div>
          }
    <p className="text-gray-400 text-sm">36 Recent Transactions</p>
  </div>
</div>
<div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
  <div className="flex justify-between items-center gap-2 mb-10">
    <p className="text-xl font-semibold">Models Accuracy Overview</p>
    <DropDown currentMode={currentMode} />
  </div>
  <div className="md:w-full overflow-auto">
    <LineChart />
  </div>
</div>
</div>

<div className="flex flex-wrap justify-center">
<div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
  <div className="flex justify-between">
    <p className="text-xl font-semibold">Weekly Stats</p>
    <button type="button" className="text-xl font-semibold text-gray-500">
      <IoIosMore />
    </button>
  </div>

  <div className="mt-10 ">
    {weeklyStats.map((item) => (
      <div key={item.title} className="flex justify-between mt-4 w-full">
        <div className="flex gap-4">
          <button
            type="button"
            style={{ background: item.iconBg }}
            className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
          >
            {item.icon}
          </button>
          <div>
            <p className="text-md font-semibold">{item.title}</p>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        </div>

        <p className={`text-${item.pcColor}`}>{item.amount}</p>
      </div>
    ))}
    {/*
    <div className="mt-4">
      <SparkLine currentColor={currentColor} id="area-sparkLine" height="160px" type="Area" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
    </div>
    
  </div>

</div>
 MEDICALPRO BRANDING
<div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
  <div className="flex justify-between">
    <p className="text-xl font-semibold">MedicalPro Branding</p>
    <button type="button" className="text-xl font-semibold text-gray-400">
      <IoIosMore />
    </button>
  </div>
  <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
    16 APR, 2021
  </p>

  <div className="flex gap-4 border-b-1 border-color mt-6">
    {medicalproBranding.data.map((item) => (
      <div key={item.title} className="border-r-1 border-color pr-4 pb-2">
        <p className="text-xs text-gray-400">{item.title}</p>
        <p className="text-sm">{item.desc}</p>
      </div>
    ))}
  </div>
  <div className="border-b-1 border-color pb-4 mt-2">
    <p className="text-md font-semibold mb-2">Teams</p>

    <div className="flex gap-4">
      {medicalproBranding.teams.map((item) => (
        <p
          key={item.name}
          style={{ background: item.color }}
          className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
        >
          {item.name}
        </p>
      ))}
    </div>
  </div>
  <div className="mt-2">
    <p className="text-md font-semibold mb-2">Leaders</p>
    <div className="flex gap-4">
      {medicalproBranding.leaders.map((item, index) => (
        <img key={index} className="rounded-full w-8 h-8" src={item.image} alt="" />
      ))}
    </div>
  </div>
  <div className="flex justify-between items-center mt-5 border-t-1 border-color">
    <div className="mt-3">
      <Button
        color="white"
        bgColor={currentColor}
        text="Add"
        borderRadius="10px"
      />
    </div>

    <p className="text-gray-400 text-sm">36 Recent Transactions</p>
  </div>
</div>


  Daily activities
<div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
  <div className="flex justify-between">
    <p className="text-xl font-semibold">Daily Activities</p>
    <button type="button" className="text-xl font-semibold text-gray-500">
      <IoIosMore />
    </button>
  </div>
  <div className="mt-10">
    <img
      className="md:w-96 h-50 "
      src={product9}
      alt=""
    />
    <div className="mt-8">
      <p className="font-semibold text-lg">React 18 coming soon!</p>
      <p className="text-gray-400 ">By Johnathan Doe</p>
      <p className="mt-8 text-sm text-gray-400">
        This will be the small description for the news you have shown
        here. There could be some great info.
      </p>
      <div className="mt-3">
        <Button
          color="white"
          bgColor={currentColor}
          text="Read More"
          borderRadius="10px"
        />
      </div>
    </div>
  </div>
</div>
*/