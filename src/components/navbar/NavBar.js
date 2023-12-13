import React,{useEffect,useState} from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';
import { IconContext } from "react-icons";
import { SidebarData } from "./SideBar";
import { SignOutService } from "../../service/Service";

const NavBar = () =>{
    const[sidebar, setSidebar]= useState(false);
    const navigate = useNavigate();
    const showSidebar = () => setSidebar(!sidebar);
    const LoggingOut = async()=>{
            const result = await SignOutService();
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('email');
            console.log(result)
            navigate('/');
    }  
    useEffect(() => {
    }, [sidebar]);
    return <>
       <IconContext.Provider value={{color:'#fff'}}>
        <div className="navbar">
            <div className="navbar-left">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
            <div className="navbar-center">
                <h1>Delta drive</h1>
            </div>
            <div className="navbar-right">
                <Link to="/" className="log-out">
                    <IoIcons.IoMdLogOut  onClick={LoggingOut}/>
                </Link>
            </div>
            
        
           
        </div>  
        <nav className={sidebar ? 'nav-bar active' : 'nav-bar'}>
            <ul className="nav-bar-items" onClick={showSidebar}>
                <li className="nav-bar-toggle">
                    <Link to="#" className="menu-bar">
                    <AiIcons.AiOutlineClose />
                    </Link>
                </li>

                {SidebarData.map((item,index) => {
                     return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path} >
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                     )
                })}


            </ul>
        </nav>
        </IconContext.Provider>
        
    </>
}

export default NavBar;