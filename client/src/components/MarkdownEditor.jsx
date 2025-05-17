import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// Initialize a markdown parser
const mdParser = new MarkdownIt();

const MarkdownEditor = ({ value, onChange }) => {
  return (
    <MdEditor
      value={value}
      style={{ height: '500px' }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={({ text }) => onChange(text)}
    />
  );
};

export default MarkdownEditor;
