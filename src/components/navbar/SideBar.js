import React from "react";
import * as FcIcons from 'react-icons/fc';
import { FaHistory } from "react-icons/fa";

export const SidebarData =[
    {
        title:'Home',
        path:'/home',
        icon:<FcIcons.FcHome className="sidebar-icon"/>,
        cName:'nav-text'
    },
    {
        title:'Ride history',
        path:'/ridehistory',
        icon:<FaHistory className="sidebar-icon"/>,
        cName:'nav-text'
    }
]

