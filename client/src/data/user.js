// Internal User Database
class UserDatabase {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('solvix_users') || '[]');
    this.currentUser = JSON.parse(localStorage.getItem('solvix_current_user') || 'null');
    this.sessions = JSON.parse(localStorage.getItem('solvix_sessions') || '{}');
  }

  // Save data to localStorage
  saveData() {
    localStorage.setItem('solvix_users', JSON.stringify(this.users));
    localStorage.setItem('solvix_current_user', JSON.stringify(this.currentUser));
    localStorage.setItem('solvix_sessions', JSON.stringify(this.sessions));
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Register new user
  signUp(email, username, password) {
    // Check if user already exists
    const existingUser = this.users.find(user => 
      user.email === email || user.username === username
    );
    
    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Create new user
    const newUser = {
      id: this.generateId(),
      email,
      username,
      password: this.hashPassword(password), // Simple hash for demo
      createdAt: new Date().toISOString(),
      lastLogin: null,
      profile: {
        preferences: {
          theme: 'light',
          fontSize: 'medium',
          colorScheme: 'blue'
        },
        calculationHistory: [],
        favoriteFormulas: [],
        totalCalculations: 0
      }
    };

    this.users.push(newUser);
    this.saveData();
    return { success: true, user: this.sanitizeUser(newUser) };
  }

  // Sign in user
  signIn(emailOrUsername, password) {
    const user = this.users.find(u => 
      (u.email === emailOrUsername || u.username === emailOrUsername) &&
      u.password === this.hashPassword(password)
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    
    // Create session
    const sessionId = this.generateId();
    this.sessions[sessionId] = {
      userId: user.id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };

    this.currentUser = this.sanitizeUser(user);
    this.saveData();
    
    return { success: true, user: this.currentUser, sessionId };
  }

  // Sign out user
  signOut() {
    this.currentUser = null;
    this.sessions = {}; // Clear all sessions for simplicity
    this.saveData();
    return { success: true };
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.currentUser !== null;
  }

  // Update user profile
  updateProfile(updates) {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update user data
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    this.currentUser = this.sanitizeUser(this.users[userIndex]);
    this.saveData();
    
    return { success: true, user: this.currentUser };
  }

  // Add calculation to history
  addCalculation(calculation) {
    if (!this.currentUser) return;

    const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
    if (userIndex === -1) return;

    const calculationRecord = {
      id: this.generateId(),
      ...calculation,
      timestamp: new Date().toISOString()
    };

    this.users[userIndex].profile.calculationHistory.unshift(calculationRecord);
    this.users[userIndex].profile.totalCalculations++;
    
    // Keep only last 100 calculations
    if (this.users[userIndex].profile.calculationHistory.length > 100) {
      this.users[userIndex].profile.calculationHistory = 
        this.users[userIndex].profile.calculationHistory.slice(0, 100);
    }

    this.currentUser = this.sanitizeUser(this.users[userIndex]);
    this.saveData();
  }

  // Add/remove favorite formula
  toggleFavoriteFormula(formulaId) {
    if (!this.currentUser) return;

    const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
    if (userIndex === -1) return;

    const favorites = this.users[userIndex].profile.favoriteFormulas;
    const index = favorites.indexOf(formulaId);
    
    if (index === -1) {
      favorites.push(formulaId);
    } else {
      favorites.splice(index, 1);
    }

    this.currentUser = this.sanitizeUser(this.users[userIndex]);
    this.saveData();
    
    return { success: true, isFavorite: index === -1 };
  }

  // Get user statistics
  getUserStats() {
    if (!this.currentUser) return null;

    const user = this.users.find(u => u.id === this.currentUser.id);
    if (!user) return null;

    return {
      totalCalculations: user.profile.totalCalculations,
      favoriteFormulas: user.profile.favoriteFormulas.length,
      memberSince: user.createdAt,
      lastLogin: user.lastLogin
    };
  }

  // Simple password hashing (for demo purposes)
  hashPassword(password) {
    // In a real app, use proper hashing like bcrypt
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  // Remove sensitive data from user object
  sanitizeUser(user) {
    const { password, ...sanitized } = user;
    return sanitized;
  }

  // Get all users (admin function)
  getAllUsers() {
    return this.users.map(user => this.sanitizeUser(user));
  }

  // Clear all data (for testing)
  clearAllData() {
    this.users = [];
    this.currentUser = null;
    this.sessions = {};
    localStorage.removeItem('solvix_users');
    localStorage.removeItem('solvix_current_user');
    localStorage.removeItem('solvix_sessions');
  }
}

// Create singleton instance
const userDB = new UserDatabase();

export default userDB;