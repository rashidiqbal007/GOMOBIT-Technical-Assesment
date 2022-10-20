import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../../src/Layout.css"

function Layout({ children }) {
    const navigate = useNavigate();
    const userMenu = [
      
        {
            name: "Add User",
            path: "/",
            icon: "ri-user-add-line",
            
        },
        {
            name: "View Users",
            path: "/viewusers",
            icon: "ri-eye-line",
        },
        

    ]

    const menuToBeRendered = userMenu;


    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className="sidebar">
                    <div className="sidebar-header">
                        GO MOBIT
                    </div>
                    {/* showing menu items in the sidebar */}
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            return (
                                <div className='d-flex menu-item'>
                                    <i className={menu.icon}></i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            )
                        })}
                        {/* logout */}
                        <div className='d-flex menu-item' onClick={() => {
                            localStorage.clear();
                            navigate('/login')
                        }

                        }>
                            <i className="ri-logout-circle-line"></i>
                            {<Link to='/login'>Logout</Link>}
                        </div>
                    </div>
                </div>
                <div className="content">
                    {/* <div className="header">
                        header
                    </div> */}
                    <div className="body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout