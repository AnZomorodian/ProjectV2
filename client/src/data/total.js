// Internal Application Statistics Database
class TotalDatabase {
  constructor() {
    this.stats = JSON.parse(localStorage.getItem('solvix_total_stats') || JSON.stringify(this.getDefaultStats()));
  }

  getDefaultStats() {
    return {
      totalUsers: 0,
      totalCalculations: 0,
      popularFormulas: {},
      dailyStats: {},
      weeklyStats: {},
      monthlyStats: {},
      formulaUsage: {},
      userActivity: {},
      systemMetrics: {
        uptime: Date.now(),
        version: '1.0.0',
        lastUpdate: new Date().toISOString()
      }
    };
  }

  // Save data to localStorage
  saveData() {
    localStorage.setItem('solvix_total_stats', JSON.stringify(this.stats));
  }

  // Increment user count
  incrementUserCount() {
    this.stats.totalUsers++;
    this.saveData();
  }

  // Record calculation
  recordCalculation(formulaId, formulaName, userId = null) {
    this.stats.totalCalculations++;
    
    // Track formula popularity
    if (!this.stats.popularFormulas[formulaId]) {
      this.stats.popularFormulas[formulaId] = {
        name: formulaName,
        count: 0
      };
    }
    this.stats.popularFormulas[formulaId].count++;

    // Track formula usage
    if (!this.stats.formulaUsage[formulaId]) {
      this.stats.formulaUsage[formulaId] = [];
    }
    this.stats.formulaUsage[formulaId].push({
      timestamp: new Date().toISOString(),
      userId: userId
    });

    // Track daily stats
    const today = new Date().toDateString();
    if (!this.stats.dailyStats[today]) {
      this.stats.dailyStats[today] = {
        calculations: 0,
        uniqueUsers: new Set(),
        formulas: {}
      };
    }
    this.stats.dailyStats[today].calculations++;
    if (userId) {
      this.stats.dailyStats[today].uniqueUsers.add(userId);
    }
    if (!this.stats.dailyStats[today].formulas[formulaId]) {
      this.stats.dailyStats[today].formulas[formulaId] = 0;
    }
    this.stats.dailyStats[today].formulas[formulaId]++;

    // Convert Set to array for storage
    this.stats.dailyStats[today].uniqueUsers = Array.from(this.stats.dailyStats[today].uniqueUsers);

    this.saveData();
  }

  // Record user activity
  recordUserActivity(userId, action, details = {}) {
    if (!this.stats.userActivity[userId]) {
      this.stats.userActivity[userId] = [];
    }
    
    this.stats.userActivity[userId].push({
      action,
      details,
      timestamp: new Date().toISOString()
    });

    // Keep only last 50 activities per user
    if (this.stats.userActivity[userId].length > 50) {
      this.stats.userActivity[userId] = this.stats.userActivity[userId].slice(-50);
    }

    this.saveData();
  }

  // Get popular formulas
  getPopularFormulas(limit = 10) {
    return Object.entries(this.stats.popularFormulas)
      .sort(([,a], [,b]) => b.count - a.count)
      .slice(0, limit)
      .map(([id, data]) => ({ id, ...data }));
  }

  // Get daily statistics
  getDailyStats(days = 7) {
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      
      const dayStats = this.stats.dailyStats[dateString] || {
        calculations: 0,
        uniqueUsers: [],
        formulas: {}
      };
      
      result.push({
        date: dateString,
        calculations: dayStats.calculations,
        uniqueUsers: Array.isArray(dayStats.uniqueUsers) ? dayStats.uniqueUsers.length : 0,
        formulasUsed: Object.keys(dayStats.formulas).length
      });
    }
    return result;
  }

  // Get total statistics
  getTotalStats() {
    return {
      totalUsers: this.stats.totalUsers,
      totalCalculations: this.stats.totalCalculations,
      popularFormulas: this.getPopularFormulas(5),
      systemMetrics: this.stats.systemMetrics
    };
  }

  // Get formula analytics
  getFormulaAnalytics(formulaId) {
    const usage = this.stats.formulaUsage[formulaId] || [];
    const popularity = this.stats.popularFormulas[formulaId] || { count: 0 };
    
    // Calculate usage by day
    const usageByDay = {};
    usage.forEach(record => {
      const day = new Date(record.timestamp).toDateString();
      usageByDay[day] = (usageByDay[day] || 0) + 1;
    });

    return {
      totalUsage: popularity.count,
      recentUsage: usage.slice(-20),
      usageByDay,
      averageUsagePerDay: usage.length > 0 ? (usage.length / Object.keys(usageByDay).length) : 0
    };
  }

  // Get user engagement metrics
  getUserEngagement() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    const todayStats = this.stats.dailyStats[today] || { uniqueUsers: [], calculations: 0 };
    const yesterdayStats = this.stats.dailyStats[yesterday] || { uniqueUsers: [], calculations: 0 };
    
    return {
      activeUsersToday: Array.isArray(todayStats.uniqueUsers) ? todayStats.uniqueUsers.length : 0,
      activeUsersYesterday: Array.isArray(yesterdayStats.uniqueUsers) ? yesterdayStats.uniqueUsers.length : 0,
      calculationsToday: todayStats.calculations,
      calculationsYesterday: yesterdayStats.calculations,
      avgCalculationsPerUser: todayStats.uniqueUsers.length > 0 ? 
        (todayStats.calculations / todayStats.uniqueUsers.length).toFixed(2) : 0
    };
  }

  // Update system metrics
  updateSystemMetrics(updates) {
    this.stats.systemMetrics = { ...this.stats.systemMetrics, ...updates };
    this.saveData();
  }

  // Clear old data (cleanup function)
  cleanupOldData(daysToKeep = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    // Clean daily stats
    Object.keys(this.stats.dailyStats).forEach(dateString => {
      if (new Date(dateString) < cutoffDate) {
        delete this.stats.dailyStats[dateString];
      }
    });

    // Clean user activity
    Object.keys(this.stats.userActivity).forEach(userId => {
      this.stats.userActivity[userId] = this.stats.userActivity[userId].filter(
        activity => new Date(activity.timestamp) >= cutoffDate
      );
      if (this.stats.userActivity[userId].length === 0) {
        delete this.stats.userActivity[userId];
      }
    });

    // Clean formula usage
    Object.keys(this.stats.formulaUsage).forEach(formulaId => {
      this.stats.formulaUsage[formulaId] = this.stats.formulaUsage[formulaId].filter(
        usage => new Date(usage.timestamp) >= cutoffDate
      );
      if (this.stats.formulaUsage[formulaId].length === 0) {
        delete this.stats.formulaUsage[formulaId];
      }
    });

    this.saveData();
  }

  // Export all data
  exportData() {
    return {
      ...this.stats,
      exportDate: new Date().toISOString()
    };
  }

  // Import data
  importData(data) {
    this.stats = { ...this.getDefaultStats(), ...data };
    this.saveData();
  }

  // Reset all statistics
  resetAllStats() {
    this.stats = this.getDefaultStats();
    localStorage.removeItem('solvix_total_stats');
    this.saveData();
  }
}

// Create singleton instance
const totalDB = new TotalDatabase();

export default totalDB;