'use client';

import { useEffect, useState } from 'react';
import { Loader2, Send, MessageCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !recipientId) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSendingMessage(true);
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId,
          content: newMessage,
          messageType: 'GENERAL',
        }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setNewMessage('');
      await fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-2xl border shadow-sm p-4 max-h-96 overflow-y-auto">
          <h2 className="font-bold mb-4">Conversations</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages</p>
          ) : (
            <div className="space-y-2">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedMessage?.id === msg.id
                      ? 'bg-blue-100'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <p className="font-medium text-sm truncate">
                    {msg.sender.id === msg.recipientId ? msg.recipient.name : msg.sender.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{msg.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(msg.createdAt)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail/Compose */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6">
          {selectedMessage ? (
            <div>
              <h2 className="text-xl font-bold mb-4">
                {selectedMessage.sender.id === selectedMessage.recipientId
                  ? selectedMessage.recipient.name
                  : selectedMessage.sender.name}
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4 min-h-32 max-h-96 overflow-y-auto">
                <p className="text-gray-700">{selectedMessage.content}</p>
                <p className="text-xs text-gray-400 mt-4">
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              <MessageCircle size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500">Select a message to view or compose new</p>
            </div>
          )}

          {/* Send Message Form */}
          <form onSubmit={handleSendMessage} className="border-t pt-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Send to (Lawyer/Accountant ID)</label>
                <input
                  type="text"
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  placeholder="Enter recipient ID"
                  className="w-full p-2 border rounded-lg"
                  disabled={sendingMessage}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  rows="3"
                  className="w-full p-2 border rounded-lg resize-none"
                  disabled={sendingMessage}
                />
              </div>
              <button
                type="submit"
                disabled={sendingMessage}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {sendingMessage ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
