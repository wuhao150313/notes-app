import React, { useState, useEffect } from 'react';
import { List, Card, Tag } from 'antd';
import { getNotesByCategory } from '@/api/noteApi';
import { useStore } from '@/store/userStore';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar1 from '@/components/Navbar1';

const CategoryNotes = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [notes, setNotes] = useState([]);

  // 未登录跳转登录页
  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  // 根据分类获取笔记
  useEffect(() => {
    const fetchNotesByCategory = async () => {
      try {
        const fetchedNotes = await getNotesByCategory(user.id, categoryId);
        setNotes(fetchedNotes.data);
      } catch (error) {
        console.error('Failed to fetch notes by category:', error);
        alert('获取笔记失败');
      }
    };

    fetchNotesByCategory();
  }, [categoryId]);

  if (!notes) return <div>Loading...</div>;

  return (
    <>
      <Navbar1 />
      <h1>分类笔记列表</h1>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={notes}
        renderItem={(item) => (
          <Card className="bg-blue-100 m-2">
            <Card.Meta
              title={item.title}
              description={item.content.substring(0, 60) + '...'}
            />
            {item.tags && item.tags.length > 0 && (
              <div className="tags-container">
                {item.tags.map((tag) => (
                  <Tag color="cyan" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
            <a href={`/notes/${item.id}`}>查看详情</a>
          </Card>
        )}
      />
    </>
  );
};

export default CategoryNotes;
