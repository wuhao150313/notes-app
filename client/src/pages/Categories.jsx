import React, { useState, useEffect } from 'react';
import { List, Card } from 'antd';
import { getCategories } from '@/api/categoryApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '@/components/Navbar1';

const Categories = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  const [categories, setCategories] = useState([]);

  // 如果未登录，跳转到登录页
  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  // 获取分类数据
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        alert('获取分类失败');
      }
    };

    fetchCategoriesData();
  }, []);

  return (
    <>
      <Navbar1 />
      <div>
        <h1>分类列表</h1>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={categories}
          renderItem={(item) => (
            <Card hoverable className="m-2">
              <Card.Meta title={item.name} />
              <a href={`/notes/categories/${item.id}`}>查看分类笔记</a>
            </Card>
          )}
        />
      </div>
    </>
  );
};

export default Categories;
