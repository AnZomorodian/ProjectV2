import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Calendar, Calculator, Heart, Activity, Trophy, Star, Edit3, Save, Camera } from 'lucide-react';
// @ts-ignore
import userDB from '../data/user.js';
// @ts-ignore
import totalDB from '../data/total.js';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onUserUpdate: (user: any) => void;
}

export default function UserProfile({ isOpen, onClose, currentUser, onUserUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: '',
    email: '',
    bio: '',
    company: '',
    location: ''
  });
  const [userStats, setUserStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && isOpen) {
      setEditData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        bio: currentUser.profile?.bio || '',
        company: currentUser.profile?.company || '',
        location: currentUser.profile?.location || ''
      });
      
      // Load user statistics
      const stats = userDB.getUserStats();
      setUserStats(stats);
    }
  }, [currentUser, isOpen]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedUser = {
        ...currentUser,
        username: editData.username,
        email: editData.email,
        profile: {
          ...currentUser.profile,
          bio: editData.bio,
          company: editData.company,
          location: editData.location
        }
      };
      
      const result = userDB.updateProfile(updatedUser);
      if (result.success) {
        onUserUpdate(result.user);
        setIsEditing(false);
        totalDB.recordUserActivity(currentUser.id, 'profile_update', { fields: Object.keys(editData) });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getJoinDate = () => {
    if (!currentUser?.createdAt) return 'Unknown';
    return new Date(currentUser.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLastLoginDate = () => {
    if (!currentUser?.lastLogin) return 'Never';
    return new Date(currentUser.lastLogin).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isOpen || !currentUser) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-white/20 rounded-full p-4">
                  <User className="h-12 w-12" />
                </div>
                <button className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1.5 hover:bg-blue-600 transition-colors">
                  <Camera className="h-3 w-3" />
                </button>
              </div>
              <div>
                <h2 className="text-3xl font-bold">User Profile</h2>
                <p className="text-blue-100">Manage your account settings</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Profile Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>{loading ? 'Saving...' : 'Save'}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.username}
                      onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900 font-medium">{currentUser.username}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{currentUser.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      rows={3}
                      placeholder="Tell us about yourself..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg min-h-[80px]">
                      <span className="text-gray-900">{editData.bio || 'No bio added yet.'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.company}
                      onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                      placeholder="Your company or organization"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">{editData.company || 'Not specified'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      placeholder="Your location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">{editData.location || 'Not specified'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Statistics and Activity */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Activity Overview</h3>
              
              {/* Account Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">Member since</span>
                    </div>
                    <span className="font-medium text-gray-900">{getJoinDate()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Last login</span>
                    </div>
                    <span className="font-medium text-gray-900">{getLastLoginDate()}</span>
                  </div>
                </div>
              </div>

              {/* Statistics Cards */}
              {userStats && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center space-x-3">
                      <Calculator className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{userStats.totalCalculations || 0}</div>
                        <div className="text-sm text-gray-600">Calculations</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
                    <div className="flex items-center space-x-3">
                      <Heart className="h-8 w-8 text-red-600" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{userStats.favoriteFormulas || 0}</div>
                        <div className="text-sm text-gray-600">Favorites</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>Achievements</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-700">Engineering Explorer</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Unlocked</span>
                  </div>
                  {userStats?.totalCalculations >= 10 && (
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-700">Calculator Master</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Unlocked</span>
                    </div>
                  )}
                  {userStats?.favoriteFormulas >= 5 && (
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-700">Formula Collector</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Unlocked</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}