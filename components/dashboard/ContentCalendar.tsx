'use client';

import { useState, useMemo } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, addDays, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Instagram, Youtube, Video, X, Check, Trash2, Edit2, Clock } from 'lucide-react';
import { usePosts } from '@/lib/hooks/useData';
import { ContentPost, Platform } from '@/lib/database.types';

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<ContentPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<ContentPost> | null>(null);

  const { posts, addPost, updatePost, deletePost } = usePosts();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-3.5 h-3.5" />;
      case 'youtube': return <Youtube className="w-3.5 h-3.5" />;
      case 'tiktok': return <Video className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'idea': return 'bg-slate-700/50 text-slate-300 border-slate-600';
      case 'planned': return 'bg-yellow-900/30 text-yellow-300 border-yellow-800/50';
      case 'scripted': return 'bg-blue-900/30 text-blue-300 border-blue-800/50';
      case 'filmed': return 'bg-purple-900/30 text-purple-300 border-purple-800/50';
      case 'published': return 'bg-green-900/30 text-green-300 border-green-800/50';
      default: return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'text-pink-400';
      case 'youtube': return 'text-red-400';
      case 'tiktok': return 'text-cyan-400';
      default: return 'text-slate-400';
    }
  };

  const handleAddPost = (date: Date) => {
    setEditingPost({
      platform: 'instagram',
      post_type: 'post',
      title: '',
      status: 'idea',
      scheduled_date: date.toISOString(),
      hashtags: [],
    });
    setIsModalOpen(true);
  };

  const handleEditPost = (post: ContentPost) => {
    setEditingPost({ ...post });
    setIsModalOpen(true);
  };

  const handleSavePost = () => {
    if (!editingPost || !editingPost.title) return;

    if (editingPost.id) {
      // Update existing
      updatePost(editingPost.id, editingPost);
    } else {
      // Create new
      addPost({
        user_id: 'demo-user-001',
        platform: editingPost.platform as Platform,
        post_type: editingPost.post_type as ContentPost['post_type'],
        title: editingPost.title,
        caption: editingPost.caption,
        hashtags: editingPost.hashtags || [],
        scheduled_date: editingPost.scheduled_date!,
        scheduled_time: editingPost.scheduled_time,
        status: editingPost.status as ContentPost['status'],
        notes: editingPost.notes,
      });
    }

    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
      setSelectedPost(null);
    }
  };

  const handleStatusChange = (post: ContentPost, newStatus: ContentPost['status']) => {
    updatePost(post.id, { status: newStatus });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
            <button onClick={prevMonth} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={goToToday} className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">
              Today
            </button>
            <button onClick={nextMonth} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button
          onClick={() => handleAddPost(new Date())}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-slate-700 bg-slate-900/80">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-3 text-center text-sm font-medium text-slate-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-slate-800/30 gap-px">
        {days.map((day) => {
          const dayPosts = posts.filter(post => isSameDay(new Date(post.scheduled_date), day));
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <div
              key={day.toString()}
              className={`min-h-[120px] bg-slate-900/50 p-2 relative group transition-colors hover:bg-slate-800/50 ${!isCurrentMonth ? 'opacity-40' : ''
                }`}
            >
              {/* Date number */}
              <div className={`text-sm font-medium mb-2 w-7 h-7 flex items-center justify-center ${isToday
                  ? 'bg-blue-600 text-white rounded-full'
                  : 'text-slate-300'
                }`}>
                {format(day, 'd')}
              </div>

              {/* Posts */}
              <div className="space-y-1.5 overflow-y-auto max-h-[80px]">
                {dayPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handleEditPost(post)}
                    className={`text-xs p-1.5 rounded border cursor-pointer hover:brightness-110 transition-all ${getStatusStyle(post.status)}`}
                  >
                    <div className={`flex items-center gap-1 ${getPlatformColor(post.platform)}`}>
                      {getPlatformIcon(post.platform)}
                      <span className="font-medium truncate">{post.title}</span>
                    </div>
                  </div>
                ))}
                {dayPosts.length > 3 && (
                  <div className="text-xs text-slate-500 text-center">
                    +{dayPosts.length - 3} more
                  </div>
                )}
              </div>

              {/* Hover Add Button */}
              <button
                onClick={() => handleAddPost(day)}
                className="absolute bottom-2 right-2 p-1.5 rounded-full bg-blue-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-blue-500"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">
                {editingPost.id ? 'Edit Post' : 'Schedule New Post'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['instagram', 'tiktok', 'youtube'] as Platform[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setEditingPost({ ...editingPost, platform: p })}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${editingPost.platform === p
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                    >
                      {getPlatformIcon(p)}
                      <span className="capitalize">{p}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="Post title..."
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={editingPost.scheduled_date?.split('T')[0] || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, scheduled_date: new Date(e.target.value).toISOString() })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
                  <input
                    type="time"
                    value={editingPost.scheduled_time || '10:00'}
                    onChange={(e) => setEditingPost({ ...editingPost, scheduled_time: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {(['idea', 'planned', 'scripted', 'filmed', 'published'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setEditingPost({ ...editingPost, status })}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${editingPost.status === status
                          ? getStatusStyle(status)
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'
                        }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Notes (optional)</label>
                <textarea
                  value={editingPost.notes || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, notes: e.target.value })}
                  placeholder="Add any notes..."
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-slate-700 bg-slate-900/50">
              {editingPost.id ? (
                <button
                  onClick={() => handleDeletePost(editingPost.id!)}
                  className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              ) : (
                <div />
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePost}
                  disabled={!editingPost.title}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors"
                >
                  <Check className="w-4 h-4" />
                  {editingPost.id ? 'Save' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
