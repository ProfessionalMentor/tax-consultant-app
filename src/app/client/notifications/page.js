'use client';

import { useEffect, useState } from 'react';
import { Loader2, Bell, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const res = await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });

      if (!res.ok) throw new Error('Failed to update notification');

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error('Error updating notification:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      for (const notif of notifications.filter((n) => !n.isRead)) {
        await handleMarkAsRead(notif.id);
      }
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'HEARING_REMINDER':
        return <AlertCircle className="text-blue-600" size={20} />;
      case 'CASE_UPDATE':
        return <Info className="text-blue-600" size={20} />;
      case 'DOCUMENT_UPLOADED':
        return <CheckCircle2 className="text-green-600" size={20} />;
      case 'INVOICE_GENERATED':
        return <AlertCircle className="text-orange-600" size={20} />;
      default:
        return <Bell className="text-gray-600" size={20} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-50 border-red-200';
      case 'HIGH':
        return 'bg-orange-50 border-orange-200';
      case 'MEDIUM':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-3 border-b">
        {['all', 'unread', 'read'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 font-medium transition ${
              filter === f
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'all' && ` (${notifications.length})`}
            {f === 'unread' && ` (${notifications.filter((n) => !n.isRead).length})`}
            {f === 'read' && ` (${notifications.filter((n) => n.isRead).length})`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border shadow-sm text-center">
          <Bell size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
              className={`p-4 rounded-lg border cursor-pointer transition ${getPriorityColor(
                notif.priority
              )} ${!notif.isRead ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getNotificationIcon(notif.notificationType)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">{notif.title}</h3>
                    {!notif.isRead && (
                      <span className="w-3 h-3 bg-blue-600 rounded-full mt-1 ml-2 flex-shrink-0"></span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {formatDate(notif.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
