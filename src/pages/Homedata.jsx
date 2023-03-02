import React from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import {SiUploaded} from 'react-icons/si';
import {IoMdAnalytics} from 'react-icons/io';
import {MdCollectionsBookmark} from 'react-icons/md';
import {RiGalleryUploadFill} from 'react-icons/ri';
import avatar from '../data/avatar.jpg';
import avatar2 from '../data/avatar2.jpg';
import avatar3 from '../data/avatar3.png';
import avatar4 from '../data/avatar4.jpg';
import product1 from '../data/product1.jpg';
import product2 from '../data/product2.jpg';
import product3 from '../data/product3.jpg';
import product4 from '../data/product4.jpg';
import product5 from '../data/product5.jpg';
import product6 from '../data/product6.jpg';
import product7 from '../data/product7.jpg';
import product8 from '../data/product8.jpg';

export const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: '103',
      percentage: '-4%',
      title: 'Users',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: '403',
      percentage: '+23%',
      title: 'Uploaded Images',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <FiBarChart />,
      amount: '423',
      percentage: '+38%',
      title: 'Analyses',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
  
      pcColor: 'green-600',
    },
  ];

  export const stackedChartData = [
    [
      { x: 'Jan', y: 111.1 },
      { x: 'Feb', y: 127.3 },
      { x: 'Mar', y: 143.4 },
      { x: 'Apr', y: 159.9 },
      { x: 'May', y: 159.9 },
      { x: 'Jun', y: 159.9 },
      { x: 'July', y: 159.9 },
    ],
    [
      { x: 'Jan', y: 111.1 },
      { x: 'Feb', y: 127.3 },
      { x: 'Mar', y: 143.4 },
      { x: 'Apr', y: 159.9 },
      { x: 'May', y: 159.9 },
      { x: 'Jun', y: 159.9 },
      { x: 'July', y: 159.9 },
    ],
  ];
  
export const stackedCustomSeries = [

    { dataSource: stackedChartData[0],
      xName: 'x',
      yName: 'y',
      name: 'Images Uploaded',
      type: 'StackingColumn',
      background: 'blue',
  
    },
  
    { dataSource: stackedChartData[1],
      xName: 'x',
      yName: 'y',
      name: 'Images Analysed',
      type: 'StackingColumn',
      background: 'red',
  
    },
  
  ];

  export const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };
  
  export const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 100,
    maximum: 400,
    interval: 100,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };


  
  export const links_admin = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'Home',
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    {
      title: 'Admin App',
      links: [
        {
          name: 'customers',
          icon: <RiContactsLine />,
        },
        {
          name: 'images',
          icon: <MdCollectionsBookmark />,
        },
        {
          name: 'analyze',
          icon: <IoMdAnalytics />,
        },
      ],
    },{
      title: 'User App',
      links: [
        {
          name: 'imagesuser',
          icon: <MdCollectionsBookmark />,
        },
        {
          name: 'analyzeuser',
          icon: <IoMdAnalytics />,
        },
        {
          name: 'imageupload',
          icon: <MdCollectionsBookmark />,
        },
        {
          name: 'imagedataset',
          icon: <RiGalleryUploadFill />,
        },
      ],
    },
  ];

  export const links_user = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'Home',
          icon: <FiShoppingBag />,
        },
      ],
    },
    {
      title: 'User App',
      links: [
        {
          name: 'imagesuser',
          icon: <MdCollectionsBookmark />,
        },
        {
          name: 'analyzeuser',
          icon: <IoMdAnalytics />,
        },
        {
          name: 'imageupload',
          icon: <MdCollectionsBookmark />,
        },
        {
          name: 'imagedataset',
          icon: <RiGalleryUploadFill />,
        },
      ],
    },

  ];