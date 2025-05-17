import {
  Layout,
  Typography,
  List,
  Card,
  Carousel,
  Row,
  Col,
  Statistic,
} from 'antd';
import '@/styles/home.css';
import Navbar1 from '@/components/Navbar1';
import { useStore } from '@/store/userStore';
import { useEffect, useState, useRef } from 'react';
import { getNotes, getRandomNotes } from '@/api/noteApi';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

const getUserTitle = (noteCount) => {
  if (noteCount >= 50) return '资深作者';
  if (noteCount >= 30) return '高级作者';
  if (noteCount >= 10) return '活跃作者';
  return '初级作者';
};

const Home = () => {
  const { user } = useStore();
  const [latestNotes, setLatestNotes] = useState([]);
  const [totalNotes, setTotalNotes] = useState(0);
  const [carouselNotes, setCarouselNotes] = useState([]);

  const carouselRef = useRef(null);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const notesResponse = await getNotes(user.id);
          setLatestNotes(notesResponse.data.slice(0, 6));
          setTotalNotes(notesResponse.data.length);
          const randomNotesResponse = await getRandomNotes(user.id);
          const carouselData = randomNotesResponse.data;
          setCarouselNotes(carouselData);
        } catch (error) {
          console.error('获取数据失败:', error);
        }
      };
      fetchData();
    }
  }, [user]);

  return (
    <Layout>
      <Navbar1 />
      <Content className="p-6">
        <div className="mb-8">
          {user ? (
            <Title level={2}>欢迎，{user.nickname || user.username}</Title>
          ) : (
            <Title level={2}>欢迎来到笔记应用</Title>
          )}
        </div>

        {/* 信息统计区 */}
        {user && (
          <Row gutter={16} className="mb-8">
            <Col span={8}>
              <Card>
                <Statistic title="笔记总数" value={totalNotes} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Popover
                  trigger="click"
                  content={
                    <div>
                      <p>称号规则说明：</p>
                      <ul>
                        <li>笔记数量 ≥ 50:资深作者</li>
                        <li>笔记数量 ≥ 30:高级作者</li>
                        <li>笔记数量 ≥ 10:活跃作者</li>
                        <li>笔记数量 &lt; 10:初级作者</li>
                      </ul>
                    </div>
                  }
                >
                  <div>
                    <Statistic
                      title="用户称号"
                      value={getUserTitle(totalNotes)}
                    />
                  </div>
                </Popover>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="加入天数"
                  value={(() => {
                    if (!user || (!user.created_at && !user.createdAt))
                      return 0;
                    const createdTime = user.created_at || user.createdAt;
                    let timestamp;
                    if (typeof createdTime === 'number') {
                      timestamp =
                        createdTime > 9999999999
                          ? createdTime
                          : createdTime * 1000;
                    } else {
                      timestamp = new Date(createdTime).getTime();
                    }
                    if (isNaN(timestamp)) return 0;
                    return Math.floor(
                      (Date.now() - timestamp) / (1000 * 60 * 60 * 24),
                    );
                  })()}
                  suffix="天"
                />
              </Card>
            </Col>
          </Row>
        )}

        {/* 精选笔记轮播区 */}
        <Title level={3} className="mb-4">
          猜你想看
        </Title>
        <div className="carousel-wrapper">
          <div
            className="external-arrow left"
            onClick={() => carouselRef.current?.prev()}
          >
            <LeftOutlined />
          </div>
          <Carousel
            autoplay
            autoplaySpeed={3000}
            dots
            ref={carouselRef}
            className="carousel-container"
          >
            {carouselNotes.map((note) => (
              <div
                key={note.id}
                className="p-8 bg-white rounded-lg carousel-slide"
              >
                <Title level={4} className="carousel-title">
                  {note.title}
                </Title>
                <Text className="carousel-content">{note.content}</Text>
              </div>
            ))}
          </Carousel>
          <div
            className="external-arrow right"
            onClick={() => carouselRef.current?.next()}
          >
            <RightOutlined />
          </div>
        </div>

        {/* 最新文档展示区 */}
        <Title level={3} className="mb-4">
          最新笔记
        </Title>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={latestNotes}
          renderItem={(note) => (
            <List.Item>
              <Card
                title={note.title}
                extra={<a href={`/notes/${note.id}`}>查看</a>}
                className="latest-note-card"
              >
                <div className="note-content">
                  <Text>{note.content.substring(0, 100)}...</Text>
                </div>
                {note.tags && note.tags.length > 0 && (
                  <div className="note-tags">
                    {note.tags.map((tag) => (
                      <Text key={tag} className="mr-2 text-blue-500">
                        #{tag}
                      </Text>
                    ))}
                  </div>
                )}
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Home;
