import Layout from '../Components/Layout'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from "react-hot-toast"
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { useState } from 'react';
import { message, Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

const Viewusers = () => {
    const dispatch = useDispatch();
    // initially set empty array to fetch users.
    const [mobusers, setMobusers] = useState([])
    const getMobUsersData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get("/api/mobuser/get-mob-users",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,

                    }
                });
            dispatch(hideLoading());
            // after getting response , we check if succes or error
            if (response.data.success) {
                // if success then set users to response.data.users
                setMobusers(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());

        }


    }
    useEffect(() => {
        (getMobUsersData())
    }, []);
  
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',


        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.name}
                </span>
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder='Search User'
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => { confirm() }}
                            onBlur={() => { confirm() }}
                        >

                        </Input>
                        <Button onClick={() => { confirm() }} type='primary'>
                            Search
                        </Button>
                        <Button autoFocus
                            onClick={() => { clearFilters(); confirm() }} type='danger'>
                            All
                        </Button>
                    </>
                )
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',


        },

        {
            title: 'Cell #',
            dataIndex: 'CellNo',


        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
        },
        {
            title: 'Deleted',
            dataIndex: 'isDeleted',
        },

    ];
    return (
        <Layout>
            <h1 className='page-header'>Users List</h1>

            <Table dataSource={mobusers} columns={columns} />
        </Layout>
    )
}

export default Viewusers