import pool from "../config/db.js";

// 获取总笔记数
export const getTotalNotes = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS total FROM notes WHERE user_id = ?",
      [userId]
    );
    res.status(200).json({ total: rows[0].total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取笔记总字数
export const getTotalWords = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT SUM(LENGTH(content)) AS totalWords FROM notes WHERE user_id = ?",
      [userId]
    );
    res.status(200).json({ totalWords: rows[0].totalWords });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取分类数量
export const getCategoryCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT COUNT(DISTINCT category_id) AS categoryCount FROM notes WHERE user_id = ?",
      [userId]
    );
    res.status(200).json({ categoryCount: rows[0].categoryCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取标签总数
export const getTagCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT COUNT(DISTINCT jt.tag) AS tagCount FROM notes CROSS JOIN JSON_TABLE(tags, '$[*]' COLUMNS(tag VARCHAR(100) PATH '$')) AS jt WHERE user_id = ?",
      [userId]
    );
    res.status(200).json({ tagCount: rows[0].tagCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取高频标签
export const getTopTag = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT jt.tag AS topTag FROM notes CROSS JOIN JSON_TABLE(tags, '$[*]' COLUMNS(tag VARCHAR(100) PATH '$')) AS jt WHERE user_id = ? GROUP BY jt.tag ORDER BY COUNT(*) DESC LIMIT 1",
      [userId]
    );
    res.status(200).json({ topTag: rows.length > 0 ? rows[0].topTag : null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取注册时间
export const getRegistrationTime = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT created_at FROM users WHERE id = ?",
      [userId]
    );
    res
      .status(200)
      .json({ registrationTime: rows.length > 0 ? rows[0].created_at : null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取最近活跃时间（最新笔记更新时间）
export const getLastActive = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1",
      [userId]
    );
    res
      .status(200)
      .json({ lastActive: rows.length > 0 ? rows[0].updated_at : null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取连续创作天数（按创建日期连续性统计）
export const getContinuousDays = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT DATE(created_at) AS createDate FROM notes WHERE user_id = ? ORDER BY created_at ASC",
      [userId]
    );
    let maxStreak = 0,
      currentStreak = 0;
    let prevDate = null;
    rows.forEach((row) => {
      const currentDate = new Date(row.createDate);
      if (!prevDate) {
        currentStreak = 1;
      } else {
        const diffTime = currentDate.getTime() - prevDate.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);
        if (diffDays >= 0.9 && diffDays <= 1.1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }
      if (currentStreak > maxStreak) maxStreak = currentStreak;
      prevDate = currentDate;
    });
    res.status(200).json({ continuousDays: maxStreak });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取本月创作量
export const getMonthlyNotesCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS monthlyCount FROM notes WHERE user_id = ? AND MONTH(created_at)=MONTH(CURRENT_DATE()) AND YEAR(created_at)=YEAR(CURRENT_DATE())",
      [userId]
    );
    res.status(200).json({ monthlyCount: rows[0].monthlyCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取创作高峰期（最多创建笔记的小时，并附 am/pm）
export const getPeakHour = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT HOUR(created_at) AS hour, COUNT(*) AS cnt FROM notes WHERE user_id = ? GROUP BY HOUR(created_at) ORDER BY cnt DESC LIMIT 1",
      [userId]
    );
    if (rows.length > 0) {
      const hour = rows[0].hour;
      const period = hour < 12 ? "am" : "pm";
      res.status(200).json({ peakHour: `${hour}${period}` });
    } else {
      res.status(200).json({ peakHour: null });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取每周偏好（最近7天内出现最多的分类名称）
export const getWeeklyPreference = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT c.name AS preferredCategory FROM notes n JOIN categories c ON n.category_id=c.id WHERE n.user_id = ? AND n.created_at>=DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) GROUP BY n.category_id ORDER BY COUNT(*) DESC LIMIT 1",
      [userId]
    );
    res.status(200).json({
      weeklyPreference: rows.length > 0 ? rows[0].preferredCategory : null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取单篇平均字数
export const getAverageNoteLength = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT IFNULL(SUM(LENGTH(content))/COUNT(*),0) AS avgLength FROM notes WHERE user_id = ?",
      [userId]
    );
    res.status(200).json({ averageNoteLength: rows[0].avgLength });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取内容更新频率（所有笔记创建时间间隔的平均小时数）
export const getUpdateFrequency = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT created_at FROM notes WHERE user_id = ? ORDER BY created_at ASC",
      [userId]
    );
    if (rows.length < 2) {
      return res.status(200).json({ updateFrequency: 0 });
    }
    let totalDiff = 0;
    for (let i = 1; i < rows.length; i++) {
      const prev = new Date(rows[i - 1].created_at);
      const curr = new Date(rows[i].created_at);
      totalDiff += (curr - prev) / (1000 * 3600);
    }
    const avgDiff = totalDiff / (rows.length - 1);
    res.status(200).json({ updateFrequency: avgDiff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取平均每篇更新次数（假设若 updated_at > created_at 则记为一次更新）
export const getAverageUpdateCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT AVG(CASE WHEN updated_at > created_at THEN 1 ELSE 0 END) AS avgUpdate FROM notes WHERE user_id = ?",
      [userId]
    );
    res.status(200).json({ averageUpdateCount: rows[0].avgUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取最近更新笔记的标题
export const getLatestUpdatedNote = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT title FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1",
      [userId]
    );
    res
      .status(200)
      .json({ latestUpdatedNote: rows.length > 0 ? rows[0].title : null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 新增：获取TOP5标签（返回5个标签及对应出现次数）
export const getTopTags = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT jt.tag AS tag, COUNT(*) AS count FROM notes CROSS JOIN JSON_TABLE(tags, '$[*]' COLUMNS(tag VARCHAR(100) PATH '$')) AS jt WHERE user_id = ? GROUP BY jt.tag ORDER BY COUNT(*) DESC LIMIT 5",
      [userId]
    );
    res.status(200).json({ topTags: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 新增：获取TOP5分类（返回5个分类及对应出现次数）
export const getTopCategories = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      "SELECT c.name AS category, COUNT(*) AS count FROM notes n JOIN categories c ON n.category_id = c.id WHERE n.user_id = ? GROUP BY c.name ORDER BY COUNT(*) DESC LIMIT 5",
      [userId]
    );
    res.status(200).json({ topCategories: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
