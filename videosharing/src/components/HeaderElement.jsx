import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header: Header } = Layout;

export default function HeaderElement() {

    const navigate = useNavigate();
    const routeChangeToUpload = () => {
        let path = `upload`;
        navigate(path);
    }

    const routeChangeToDefault = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <div>
            <Header>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item onClick={routeChangeToDefault} key="1">Home</Menu.Item>
                    <Menu.Item onClick={routeChangeToUpload} key="2">Upload</Menu.Item>
                </Menu>
            </Header>
        </div>)
};