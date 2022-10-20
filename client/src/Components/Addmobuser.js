import React from 'react'
import { Row, Col, Form, Input, TimePicker, Button } from 'antd'
import axios from 'axios'
import toast from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import Layout from "../Components/Layout"
const Addmobuser = () => {
    const dispatch = useDispatch();
    // const { user } = useSelector(state => state.user)
    const navigate = useNavigate();
    const onFinish = async (values) => {
        // console.log("Success",values);
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/mobuser/add-mob-user',
                {
                    ...values
                   
                }, 
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                // toast("Redirecting to Login page");
                navigate("/viewusers")

            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong")
        }
    }




    return (
        <Layout>
            {/* onfi */}
            <Form layout="vertical" onFinish={onFinish}>
                <h4>Add User</h4>

                <Row gutter={20}>
                    {/* so antd has 24 columns in total we need three for each i.e 8*3 */}
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label=" Name" name="name" rules={[{ required: true }]}>
                            <Input placeholder='Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Email" name="email" rules={[{ required: true }]}>
                            <Input placeholder='Email' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Cell Number" name="CellNo" rules={[{ required: true }]}>
                            <Input placeholder='Cell Number' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Age" name="Age" rules={[{ required: true }]}>
                            <Input placeholder='Age' />
                        </Form.Item>
                    </Col>


                </Row>

                <hr />
                <div className="d-flex justify-content-end">
                    <Button className="primary-button" htmlType='submit' >
                        Submit
                    </Button>
                </div>
            </Form>

        </Layout>
    )
}

export default Addmobuser