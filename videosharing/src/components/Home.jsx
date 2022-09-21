import { Layout } from "antd";
import React from "react";
import Videos from "./Videos";
import HeaderElement from "./HeaderElement";

const { Content, Footer } = Layout;

export default () => (
    <Layout className="layout">
        <HeaderElement />
        <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content" style={{ margin: "100px auto" }}>
                <h1>Video's Catalog</h1>
                <Videos />
            </div>
        </Content>
    </Layout>
);