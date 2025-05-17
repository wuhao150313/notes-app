import { Statistic } from 'antd';

const StatisticCard = ({ title, value }) => {
  return (
    <div
      style={{
        backgroundColor: '#f0f2f5',
        padding: '20px',
        borderRadius: '8px',
        width: 'calc(100% - 50px)', // 修改为宽度减少50像素
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
      className="statistic-card" // 请在全局 CSS 中添加 .statistic-card:hover 样式
    >
      <Statistic
        title={title}
        value={
          typeof value === 'string' && value.startsWith('[')
            ? JSON.parse(value).join(', ')
            : value
        }
      />
    </div>
  );
};

export default StatisticCard;
