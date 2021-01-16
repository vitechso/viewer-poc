import React from "react";
import { useSelector } from 'react-redux';
import reqwest from "reqwest";

import { List, Card, message, Avatar, Spin } from "antd";
import { Image, Row, Col } from 'antd';
import { Typography, Divider, Space } from 'antd';
const { Title, Paragraph, Text } = Typography;

import InfiniteScroll from 'react-infinite-scroller';

// ABOUT: The component is infinit-scroll-ready
// Uses Antd List component from here https://ant.design/components/list/
// And WHEN we are ready for real infinite scrolling and virtualized rendering we should look there for examples! 

const EventsInstance = () => {
  const state = {
    loading: false,
    hasMore: true
  };

  const data = useSelector((state) => state.place.data);

  const fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: (res) => {
        callback(res);
      }
    });
  };

  const handleInfiniteOnLoad = () => {
    this.setState({
      loading: true
    });
    if (data.event && data.event.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  function getNameOfMonthOfYear(date) {
    //TODO: This will obviously not be enough when we have different languages but will for now!
    // Something like this might also work https://stackoverflow.com/a/34981484/1187583

    let month = new Array();
    month[0] = 'Jan';
    month[1] = 'Feb';
    month[2] = 'March';
    month[3] = 'Apr';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'Aug';
    month[8] = 'Sept';
    month[9] = 'Oct';
    month[10] = 'Nov';
    month[11] = 'Dec';
    let dt = new Date(date);
    return month[dt.getMonth()];
  }

  function getDayOfMonth(date) {
    let dt = new Date(date);
    return dt.getDate();
  }

  return (
    <div className="infinite-container">
      <Card >
        {data.event &&
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={handleInfiniteOnLoad}
            hasMore={!state.loading && state.hasMore}
            useWindow={false}
          >
            <List 
              dataSource={data.event}
              renderItem={(event) => (
                <List.Item key={event.name + Math.random()}>
                  <Row gutter={8} justify="start">
                    <Col span={4} style={{}} >
                      <Space size={-10} direction="vertical" align="start" >
                        <Title level={3} >{getNameOfMonthOfYear(event.startDate)}</Title>
                        <Title level={2}>{getDayOfMonth(event.startDate)}
                        </Title>
                      </Space>
                    </Col>
                    <Col span={12} >
                      <Row justify="start">
                        <strong>{event.name}</strong>
                      </Row>
                      <Row justify="start">
                        <Text>{event.description}</Text>
                      </Row>
                      {/* TODO: Fix but until fixed removed! This used to work but broke! */}
                      {/* <Row justify="start">
                        {event.about &&
                          event.about.map((about) => {
                            return <Text type="secondary" key={about.name}>{about.name}</Text>;
                          })
                        }
                     </Row> */}
                    </Col>
                    <Col span={8}>
                      <Row justify="start"  >
                        <Image src={event.image} />
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              )}
            >
              {state.loading && state.hasMore && (
                <div className="infinite-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>}
      </Card>
    </div>    
  );
}

export default EventsInstance;
