import React, { useState, useEffect } from 'react';
import { Card, Tag, Button, Space, Modal } from 'antd';
import { getNote, deleteNote } from '@/api/noteApi';
import { useStore } from '@/store/userStore';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar1 from '@/components/Navbar1';

const Note = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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

  // 处理删除笔记
  const handleDeleteNote = async () => {
    try {
      await deleteNote(note._id);
      setIsDeleteModalVisible(false);
      navigate('/notes');
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('删除笔记失败');
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <>
      <Navbar1 />
      <Card className="note-card" hoverable>
        <div className="note-card-content">
          <Card.Meta title={note.title} description={note.content} />
          <div className="note-card-tags">
            {note.tags.map((tag) => (
              <Tag color="cyan" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className="note-card-footer">
          <Space>
            <Button
              type="primary"
              onClick={() => navigate(`/notes/${note._id}/edit`)}
            >
              编辑
            </Button>
            <Button danger onClick={() => setIsDeleteModalVisible(true)}>
              删除
            </Button>
          </Space>
        </div>
      </Card>

      <Modal
        title="确认删除"
        open={isDeleteModalVisible}
        onOk={handleDeleteNote}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="确定删除"
        cancelText="暂时不用"
      >
        <p>是否要删除笔记：{note.title}？</p>
      </Modal>
    </>
  );
};

export default Note;
