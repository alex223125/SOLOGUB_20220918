import { Button, Form, Input, Select } from "antd";
import React from "react";
import HeaderElement from "./HeaderElement";
import {withRouter} from './withRouter';

const { Option } = Select;
const HOST_URL = "http://127.0.0.1:3000/"

class UploadPage extends React.Component {

    routeChangeToHome = () => {
        let path = `/`;
        this.props.navigate(path)
    }

    onFinish = (e) => {
        const formData = new FormData()
        for (const property in this.state) {
            formData.append(
                property, this.state[property]
            )
        }

        const url = `${HOST_URL}api/v1/videos/`;
        fetch(url, {
            method: "post",
            body: formData,
        })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .catch((err) => console.error("Error: " + err));
        this.routeChangeToHome();
    };

    titleChangedHandler = (e) => {
        console.log(`title: ${e.target.value}`);
        this.setState({
            title: e.target.value
        })
    };

    thumbnailChangedHandler = (e) => {
        this.setState({
            thumbnail: e.target.files[0]
        })
    };

    clipChangedHandler = (e) => {
        console.log(`clip: ${e}`);
        this.setState({
            clip: e.target.files[0]
        })
    };

    handleCategoryChange = (value) => {
        console.log(`selected: ${value}`);
        this.setState({
            category: value,
        });
    };

    render() {
        return (
            <>
                <HeaderElement />
                <Form
                    labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    onFinish={this.onFinish}>


                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[
                            { required: true, message: "Please input your video's category!" },
                        ]}
                    >
                        <Select
                            defaultValue="exercise"
                            style={{
                                width: 120,
                            }}
                            onChange={this.handleCategoryChange}
                        >
                            <Option value="Exercise">Exercise</Option>
                            <Option value="Education">Education</Option>
                            <Option value="Recipe">Recipe</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="title"
                        rules={[
                            { required: true, message: "Please input your video's title!" },
                        ]}
                    >
                        <Input onChange={this.titleChangedHandler}
                               placeholder="Input your video's title" />
                    </Form.Item>

                    <Form.Item
                        name="clip"
                        label="clip"
                        rules={[
                            { required: true, message: "Please input the video!" },
                        ]}
                    >
                        <input type="file" onChange={this.clipChangedHandler} />
                    </Form.Item>


                    <Form.Item
                        name="thumbnail"
                        label="thumbnail"
                        rules={[
                            { required: true, message: "Please input the thumbnail!" },
                        ]}
                    >
                        <input type="file" onChange={this.thumbnailChangedHandler} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

export default withRouter(UploadPage);