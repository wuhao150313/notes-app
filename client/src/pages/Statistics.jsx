import React, { useState, useEffect } from 'react';
import StatisticCard from '../components/StatisticCard';
import Navbar1 from '../components/Navbar1';
import { TreeSelect, List, Spin, Layout } from 'antd';
import {
  getTotalNotes,
  getTotalWords,
  getCategoryCount,
  getTagCount,
  getTopTag,
  getRegistrationTime,
  getLastActive,
  getContinuousDays,
  getMonthlyNotesCount,
  getPeakHour,
  getAverageNoteLength,
  getUpdateFrequency,
  getAverageUpdateCount,
  getLatestUpdatedNote,
  getTopTags,
  getTopCategories,
} from '../api/statisticsApi';
import { useStore } from '@/store/userStore';

const { Content } = Layout;

const Statistics = () => {
  const { user } = useStore();
  const userId = user?.id; // 使用 store 中的用户 id

  const [stats, setStats] = useState({
    totalNotes: 0,
    totalWords: 0,
    categoryCount: 0,
    tagCount: 0,
    topTag: '',
    registrationTime: '',
    lastActive: '',
    continuousDays: 0,
    monthlyNotes: 0,
    peakHour: '',
    averageNoteLength: 0,
    updateFrequency: 0,
    averageUpdateCount: 0,
    latestUpdatedNote: '',
    tags: [], // 备用
    categories: [], // 备用
    topTags: [],
    topCategories: [],
  });
  const [loading, setLoading] = useState(true);

  // 辅助方法：将日期格式化为 YYYY年MM月DD日
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return `${d.getFullYear()}年${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}月${d.getDate().toString().padStart(2, '0')}日`;
  };

  useEffect(() => {
    if (!userId) return; // 当用户不存在时不发起请求
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const [
          notesRes,
          wordsRes,
          categoryRes,
          tagRes,
          topTagRes,
          registrationTimeRes,
          lastActiveRes,
          continuousDaysRes,
          monthlyNotesRes,
          peakHourRes,
          averageNoteLengthRes,
          updateFrequencyRes,
          averageUpdateCountRes,
          latestUpdatedNoteRes,
          topTagsRes,
          topCategoriesRes,
        ] = await Promise.all([
          getTotalNotes(userId),
          getTotalWords(userId),
          getCategoryCount(userId),
          getTagCount(userId),
          getTopTag(userId),
          getRegistrationTime(userId),
          getLastActive(userId),
          getContinuousDays(userId),
          getMonthlyNotesCount(userId),
          getPeakHour(userId),
          getAverageNoteLength(userId),
          getUpdateFrequency(userId),
          getAverageUpdateCount(userId),
          getLatestUpdatedNote(userId),
          getTopTags(userId),
          getTopCategories(userId),
        ]);

        setStats({
          totalNotes: notesRes.total || 0,
          totalWords: parseInt(wordsRes.totalWords, 10) || 0,
          categoryCount: categoryRes.categoryCount || 0,
          tagCount: tagRes.tagCount || 0,
          topTag: topTagRes.topTag || '',
          registrationTime: registrationTimeRes.registrationTime || '',
          lastActive: lastActiveRes.lastActive || '',
          continuousDays: continuousDaysRes.continuousDays || 0,
          monthlyNotes: monthlyNotesRes.monthlyCount || 0,
          peakHour: peakHourRes.peakHour || '',
          averageNoteLength:
            parseFloat(averageNoteLengthRes.averageNoteLength) || 0,
          updateFrequency: parseFloat(updateFrequencyRes.updateFrequency) || 0,
          averageUpdateCount:
            parseFloat(averageUpdateCountRes.averageUpdateCount) || 0,
          latestUpdatedNote: latestUpdatedNoteRes.latestUpdatedNote || '',
          tags: tagRes.tags || [],
          categories: categoryRes.categories || [],
          topTags: topTagsRes.topTags || [],
          topCategories: topCategoriesRes.topCategories || [],
        });
      } catch (error) {
        console.error('获取统计信息失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [userId]);

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}
      >
        <Spin size="large" tip="数据加载中..." />
      </div>
    );
  }

  return (
    <Layout>
      <Navbar1 />
      <Content className="p-6">
        <TreeSelect
          style={{ width: '100%', marginBottom: '24px' }}
          placeholder="请选择分类筛选"
        />
        {/* 统计卡片区域 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <StatisticCard title="总笔记数" value={`${stats.totalNotes}篇`} />
          <StatisticCard title="总字数" value={`${stats.totalWords}字`} />
          <StatisticCard title="分类数量" value={`${stats.categoryCount}类`} />
          <StatisticCard title="标签总数" value={`${stats.tagCount}个`} />
          <StatisticCard title="高频标签" value={stats.topTag} />
          <StatisticCard
            title="注册时间"
            value={formatDate(stats.registrationTime)}
          />
          <StatisticCard
            title="最近活跃"
            value={formatDate(stats.lastActive)}
          />
          <StatisticCard
            title="连续创作天数"
            value={`${stats.continuousDays}天`}
          />
          <StatisticCard title="本月创作量" value={`${stats.monthlyNotes}篇`} />
          <StatisticCard title="创作高峰期" value={stats.peakHour} />
          <StatisticCard
            title="单篇平均字数"
            value={`${parseFloat(stats.averageNoteLength).toFixed(1)}字`}
          />
          <StatisticCard
            title="内容更新频率"
            value={`${parseFloat(stats.updateFrequency).toFixed(1)}小时`}
          />
          <StatisticCard
            title="平均每篇更新次数"
            value={`${parseFloat(stats.averageUpdateCount).toFixed(1)}次`}
          />
          <StatisticCard title="最近更新笔记" value={stats.latestUpdatedNote} />
        </div>

        {/* TOP5展示区域 */}
        <List
          header={<div style={{ fontWeight: 'bold' }}>标签 TOP5</div>}
          bordered
          dataSource={stats.topTags}
          renderItem={(item) => (
            <List.Item>
              <span style={{ marginRight: '8px' }}>🏷️</span>
              {`${item.tag} (${item.count}次)`}
            </List.Item>
          )}
          style={{ marginBottom: '24px' }}
        />

        <List
          header={<div style={{ fontWeight: 'bold' }}>分类 TOP5</div>}
          bordered
          dataSource={stats.topCategories}
          renderItem={(item) => (
            <List.Item>
              <span style={{ marginRight: '8px' }}>📁</span>
              {`${item.category} (${item.count}次)`}
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Statistics;
