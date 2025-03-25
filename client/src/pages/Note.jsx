import React, { useState, useEffect } from 'react';
import { Card, Tag } from 'antd';
import { getNote } from '@/api/noteApi';
import { useStore } from '@/store/userStore';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Note = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);

  // 未登录自动跳转
  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  // 获取笔记详情
  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const fetchedNote = await getNote(id);
        console.log(fetchedNote);
        setNote(fetchedNote.data);
      } catch (error) {
        console.error('Failed to fetch note details:', error);
        alert('获取笔记详情失败');
        navigate('/notes');
      }
    };

    fetchNoteDetails();
  }, [id, navigate]);

  if (!note) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Card className="note-card" hoverable>
        <Card.Meta title={note.title} description={note.content} />
        <div className="my-4">
          {note.tags.map((tag) => (
            <Tag color="cyan" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Note;
