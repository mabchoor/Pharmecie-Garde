import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UseStateContext } from '../context/ContextProvider';
import Sidebar from '../components/sidebar/sidebar';
import TopBar from '../components/topbar/topbar';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import SidebarClient from '../components/sidebar/sidebarClient';
import TopBarClient from '../components/topbar/topbarClient';
import Side from '../components/shop/sideShop';
import { useState } from 'react';
import Cards from '../components/dashboard/cards';




export default function ClientLayout() {
    if (!localStorage.getItem('ACCESS_TOKEN')) {
        return <Navigate to='/auth' />
    }
    const { isAuth, sideOpen, setsideOpen } = UseStateContext();
    // check if the user in homme page
    const location = useLocation();
    const isHome = location.pathname === '/home-client';
    return (
        <div className='flex min-h-screen'>
            <SidebarClient />
            <div className="flex-1 flex flex-col">
                <TopBarClient />
                <div className='ms-12 flex flex-col'>
                    {isHome && <div className='mt-5 font-extrabold text-2xl bg-transparent w-10/12 mx-auto'>
                        <Cards />
                    </div>
                    }
                    <div className='mt-4 font-extrabold text-2xl bg-transparent'></div>
                    <Card className='w-10/12 m-auto p-2 shadow-lg h-fit mt-4'>
                        <CardBody className=''>
                            <Outlet />
                        </CardBody>
                    </Card>
                    <Side sideOpen={sideOpen} setsideOpen={setsideOpen} />
                </div>
            </div>
        </div>
    )
}
