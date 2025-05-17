import { useEffect, useState } from 'react';
import { List, Card, Tag, Button, Modal, message, Input } from 'antd';
import { getNotes, deleteNote } from '@/api/noteApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import Navbar1 from '@/components/Navbar1';
import '@/styles/notes.css';

const Notes = () => {
  const cardStyle = {
    margin: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '16px',
  };

  const navigate = useNavigate();
  const { user } = useStore();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // 未登录跳转
  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate]);

  // 拉取笔记列表
  const fetchNotes = async () => {
    try {
      const fetchNotesData = await getNotes(user.id);
      setNotes(fetchNotesData.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      alert('获取笔记失败');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 搜索筛选逻辑
  useEffect(() => {
    if (!searchText) {
      setFilteredNotes(notes);
      return;
    }
    const searchLower = searchText.toLowerCase();
    const filtered = notes.filter((note) => {
      const titleMatch = note.title.toLowerCase().includes(searchLower);
      const tagMatch = note.tags.some((tag) =>
        tag.toLowerCase().includes(searchLower),
      );
      return titleMatch || tagMatch;
    });
    setFilteredNotes(filtered);
  }, [searchText, notes]);

  // 处理删除笔记
  const handleDeleteNote = async () => {
    try {
      if (selectedNote) {
        await deleteNote(selectedNote.id);
        message.success('笔记删除成功');
        fetchNotes(); // 刷新笔记列表
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      message.error('删除笔记失败');
    } finally {
      setIsDeleteModalVisible(false);
      setSelectedNote(null);
    }
  };

  return (
    <>
      <Navbar1 />
      <div className="notes-header">
        <h1>笔记列表</h1>
        <div className="notes-header-actions">
          <Input
            placeholder="筛选标题/标签"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250, marginRight: 16 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/notes/create')}
          >
            新增笔记
          </Button>
        </div>
      </div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={filteredNotes}
        className="notes-list"
        renderItem={(item) => (
          <Card className="note-card" hoverable style={cardStyle}>
            <div className="note-card-content" style={{ padding: '16px' }}>
              <Card.Meta
                title={<div className="note-card-title">{item.title}</div>}
                description={
                  <div className="note-card-description">
                    {item.content.length <= 30
                      ? item.content
                      : `${item.content.substring(0, 30)}...`}
                  </div>
                }
              />
              <div className="note-card-tags">
                {item.tags.map((tag) => (
                  <Tag color="cyan" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
              <div className="note-card-footer" style={footerStyle}>
                <Button
                  type="link"
                  onClick={() => navigate(`/notes/${item.id}`)}
                >
                  查看详情
                </Button>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/notes/edit/${item.id}`)}
                >
                  编辑
                </Button>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    setSelectedNote(item);
                    setIsDeleteModalVisible(true);
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          </Card>
        )}
      />
      <Modal
        title="确认删除"
        open={isDeleteModalVisible}
        onOk={handleDeleteNote}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setSelectedNote(null);
        }}
        okText="确定删除"
        cancelText="取消"
      >
        <p>确定要删除笔记 {selectedNote?.title} 吗？此操作不可恢复。</p>
      </Modal>
    </>
  );
};

export default Notes;
