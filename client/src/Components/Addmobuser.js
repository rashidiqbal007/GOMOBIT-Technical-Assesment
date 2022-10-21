import React from 'react'
import { Row, Col, Form, Input, TimePicker, Button, InputNumber } from 'antd'
import axios from 'axios'
import toast from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import Layout from "../Components/Layout"
const Addmobuser = () => {
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const onFinish = async (values) => {
       
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

    const validateMessages = {


        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };


    return (
        <Layout>
            {/* onfi */}
            <Form layout="vertical" onFinish={onFinish}  validateMessages={validateMessages}>
                <h4>Add User</h4>

                <Row gutter={20}>
                    {/* so antd has 24 columns in total we need three for each i.e 8*3 */}
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label=" Name" name="name" rules={[{ required: true }]} hasFeedback>
                            <Input placeholder='Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Email" name="email" rules={[{ required: true, type: 'email', message: "Please enter a valid e-mail" }]} hasFeedback>
                            <Input placeholder='Email' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Cell Number" name="CellNo" rules={[{ required: true }]} hasFeedback>
                            <Input placeholder='Cell Number' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Age" name="Age" rules={[
                            {
                                required: true,
                                type: "number",
                                min: 18,
                                max: 60,
                            },
                        ]} >
                            <InputNumber placeholder='Age' />
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