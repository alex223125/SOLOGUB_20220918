import { Table, message, Popconfirm, Tooltip } from "antd";
import React from "react";
import { Modal } from "antd";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

const HOST_URL = "http://127.0.0.1:3000/"

class Videos extends React.Component {

    columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (text, record) => {
                return (
                    <div onClick={() => this.showModal(record)}>
                        <Tooltip title={record.title}>
                            <img
                                src={record.thumbnail}/>
                        </Tooltip>
                        <div>
                            <div>{record.title}</div>
                        </div>
                    </div>
                );}
        },
        {
            title: "Is valid",
            dataIndex: "is_valid",
            key: "is_valid",
        },
        {
            title: "Error reason",
            dataIndex: "error_reason",
            key: "error_reason",
        },
        {
            title: "Is processed",
            dataIndex: "is_processed",
            key: "is_processed",
        },
        {
            title: "Category id",
            dataIndex: "category_id",
            key: "category_id",
        },
        {
            title: "",
            key: "action",
            render: (_text, record) => (
                <Popconfirm
                    title="Are you sure delete this video?"
                    onConfirm={() => this.deleteVideo(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <a href="#" type="danger">
                        Delete{" "}
                    </a>
                </Popconfirm>
            ),
        },
    ];

    state = {
        videos: [],
        isModalOpen: false,
        modalData: []
    };

    componentDidMount() {
        this.loadVideos();
    }

    showModal = (record) => {
        console.log(`Show modal triggered`);
        this.setState({
            modalData: record,
            isModalOpen: true
        });
    };

    hideModal = () => {
        console.log(`Hide modal triggered`);
        this.setState({
            isModalOpen: false
        });
    };

    pause = () => {
        console.log(`Pause modal triggered`);
        this.player.pause();
    };

    loadVideos = () => {
        const url = `${HOST_URL}api/v1/videos/index`;

        fetch(url)
        .then((data) => {
            if (data.ok) {
                return data.json();
            }
            throw new Error("Network error.");
        })
        .then((data) => {
            data.forEach((video) => {
                const newEl = {
                    key: video.id,
                    id: video.id,
                    title: video.title,
                    clip: video.clip,
                    thumbnail: video.thumbnail,
                    is_valid: (video.is_valid || "not checked yet").toString(),
                    error_reason: video.error_reason,
                    is_processed: video.is_processed.toString(),
                    category_id: video.category_id
                };
                this.setState((prevState) => ({
                    videos: [...prevState.videos, newEl],
                }));
            });
        })
        .catch((err) => message.error("Error: " + err));
    };

    reloadVideos = () => {
        this.setState({ videos: [] });
        this.loadVideos();
    };

    deleteVideo = (id) => {
        const url = `${HOST_URL}api/v1/videos/${id}`;

        fetch(url, {
            method: "delete",
        })
            .then((data) => {
                if (data.ok) {
                    this.reloadVideos();
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .catch((err) => message.error("Error: " + err));
    };

    render() {
        return (
            <>
                <Table
                    className="table-striped-rows"
                    dataSource={this.state.videos}
                    columns={this.columns}
                    pagination={{ pageSize: 5 }}
                />

                <Modal
                    title={this.state.modalData.title}
                    open={this.state.isModalOpen}
                    footer={null}
                    onCancel={this.hideModal}
                    afterClose={this.pause}
                    bodyStyle={{ padding: 0 }}
                >
                    <Player
                        autoPlay
                        ref={ref => {
                            this.player = ref;
                        }}
                    >
                        <source
                            src={this.state.modalData.clip}
                            type="video/mp4"
                        />
                    </Player>
                </Modal>
            </>
        );
    }
}

export default Videos;