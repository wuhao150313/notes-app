import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Tag, message, Select, Modal, List } from 'antd';
import { createNote } from '@/api/noteApi';
import { getCategories } from '@/api/categoryApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '@/components/Navbar1';
import { noteTemplates } from '@/config/noteTemplates';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';

const CreateNote = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [categories, setCategories] = useState([]);
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isFormReady, setIsFormReady] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const mdParser = new MarkdownIt();

  // 获取分类数据
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
        setIsFormReady(true); // 数据加载完成后标记表单为就绪状态
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        message.error('获取分类失败');
      }
    };

    fetchCategories();
  }, []);

  // 重置表单当模板弹窗打开时
  useEffect(() => {
    if (isTemplateModalVisible && isFormReady) {
      form.resetFields();
    }
  }, [isTemplateModalVisible, isFormReady, form]);

  const handleSubmit = async (values) => {
    try {
      const noteData = {
        ...values,
        tags,
        userId: user.id,
      };
      await createNote(noteData);
      message.success('笔记创建成功');
      navigate('/notes');
    } catch (error) {
      console.error('Failed to create note:', error);
      message.error('创建笔记失败');
    }
  };

  const handleInputTagChange = (e) => {
    setInputTag(e.target.value);
  };

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  const handleRemoveTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  // 应用模板函数
  const applyTemplate = (template) => {
    if (!isFormReady) return;

    try {
      form.setFieldsValue({
        title: template.title,
        content: template.content,
        categoryId: template.categoryId,
      });
      setTags([...template.tags]);
      message.success(`已应用模板: ${template.name}`);
    } catch (error) {
      console.error('应用模板失败:', error);
      message.error('应用模板时出错');
    } finally {
      setIsTemplateModalVisible(false);
    }
  };

  return (
    <>
      <Navbar1 />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1>创建笔记</h1>
          <Button
            type="link"
            onClick={() => setIsTemplateModalVisible(true)}
            disabled={!isFormReady}
          >
            不想打字，来个模板！
          </Button>
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="max-w-2xl mx-auto"
          initialValues={{
            title: '',
            content: '',
            categoryId: undefined,
          }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入笔记标题' }]}
          >
            <Input placeholder="请输入笔记标题" />
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入笔记内容' }]}
          >
            <MarkdownEditor
              value={noteContent}
              onChange={({ text }) => {
                setNoteContent(text);
                form.setFieldsValue({ content: text });
              }}
              renderHTML={(text) => mdParser.render(text)}
              style={{ height: 400 }}
            />
          </Form.Item>

          <Form.Item
            label="类型"
            name="categoryId"
            rules={[{ required: true, message: '请选择笔记类型' }]}
          >
            <Select placeholder="请选择笔记类型" loading={!isFormReady}>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="mb-4">
            <label className="block mb-2">标签</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={inputTag}
                onChange={handleInputTagChange}
                placeholder="输入标签"
                onPressEnter={handleAddTag}
              />
              <Button onClick={handleAddTag}>添加标签</Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Tag key={tag} closable onClose={() => handleRemoveTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              创建笔记
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="选择笔记模板"
          open={isTemplateModalVisible}
          onCancel={() => setIsTemplateModalVisible(false)}
          footer={null}
          width={600}
          destroyOnClose
        >
          <List
            dataSource={noteTemplates}
            renderItem={(template) => (
              <List.Item
                key={template.id}
                className="cursor-pointer hover:bg-gray-100 p-4 rounded"
                onClick={() => applyTemplate(template)}
              >
                <List.Item.Meta
                  title={template.name}
                  description={
                    <div>
                      <div>标题：{template.title}</div>
                      <div>标签：{template.tags.join(', ')}</div>
                      <div className="truncate">
                        内容预览：{template.content.substring(0, 50)}...
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Modal>
      </div>
    </>
  );
};

export default CreateNote;
