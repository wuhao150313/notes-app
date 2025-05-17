import React, { useState, useEffect } from 'react';
import { List, Card, Carousel, Row, Col, Statistic } from 'antd';
import { useStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';

// Mock数据
const mockLatestNotes = [
  {
    id: 1,
    title: '前端开发技巧总结',
    description: '记录了一些实用的前端开发技巧和最佳实践...',
    createdAt: '2024-01-10',
  },
  {
    id: 2,
    title: 'React Hooks使用指南',
    description: '详细介绍了React Hooks的使用方法和注意事项...',
    createdAt: '2024-01-09',
  },
  {
    id: 3,
    title: 'TypeScript入门教程',
    description: '从零开始学习TypeScript的基础知识...',
    createdAt: '2024-01-08',
  },
];

const mockFeaturedNotes = [
  {
    id: 1,
    title: '深入理解JavaScript原型链',
    content:
      '原型链是JavaScript中最重要的概念之一，理解原型链对于掌握JavaScript至关重要...',
  },
  {
    id: 2,
    title: 'React性能优化实践',
    content:
      '本文总结了React应用性能优化的多种方法，包括组件优化、状态管理优化等...',
  },
  {
    id: 3,
    title: '现代CSS技巧分享',
    content: '介绍了一些现代CSS的新特性和实用技巧，帮助你写出更好的样式代码...',
  },
];

interface Note {
  id: number;
  title: string;
  description?: string;
  content?: string;
  createdAt?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [totalNotes] = useState<number>(18); // 模拟笔记总数
  const [usageTime] = useState<number>(365); // 模拟使用天数

  // 未登录跳转登录页
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  // 根据笔记数量获取称号
  const getUserTitle = (count: number): string => {
    if (count > 20) return '传奇转录员';
    if (count > 15) return '知识记录者';
    if (count > 10) return '笔记爱好者';
    return '新手上路';
  };

  return (
    <>
      <Navbar1 />
      <div className="p-6">
        {/* 最新文档板块 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">最新文档</h2>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={mockLatestNotes}
            renderItem={(item: Note) => (
              <List.Item>
                <Card
                  hoverable
                  className="shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <Card.Meta
                    title={
                      <div className="text-lg font-bold mb-2">{item.title}</div>
                    }
                    description={
                      <>
                        <p className="text-base">{item.description}</p>
                        <p className="text-gray-400 mt-2">
                          创建时间: {item.createdAt}
                        </p>
                      </>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>

        {/* 精选笔记轮播图 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">精选笔记</h2>
          <Carousel autoplay className="mb-8">
            {mockFeaturedNotes.map((note: Note) => (
              <div key={note.id} className="px-4 py-2">
                <Card hoverable className="h-64 shadow-md">
                  <Card.Meta
                    title={
                      <div className="text-xl font-bold mb-2">{note.title}</div>
                    }
                    description={
                      <div className="text-base">{note.content}</div>
                    }
                  />
                </Card>
              </div>
            ))}
          </Carousel>
        </div>

        {/* 信息统计区域 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">数据统计</h2>
          <Row gutter={32}>
            <Col span={8}>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title={<div className="text-lg font-medium">总笔记数</div>}
                  value={totalNotes}
                  suffix="篇"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title={<div className="text-lg font-medium">使用时长</div>}
                  value={usageTime}
                  suffix="天"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title={<div className="text-lg font-medium">当前称号</div>}
                  value={getUserTitle(totalNotes)}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
