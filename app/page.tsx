'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Gift, Cake, Bell, X, User } from 'lucide-react';

interface Birthday {
  id: string;
  name: string;
  date: string;
  notes: string;
  addedAt: string;
}

export default function BirthdayCalendar() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '', notes: '' });
  const [currentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBirthdays();
  }, []);

  const loadBirthdays = async () => {
    try {
      const result = await (window as any).storage.get('birthdays-list');
      if (result) {
        setBirthdays(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No birthdays found or error loading:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBirthdays = async (updatedBirthdays: Birthday[]) => {
    try {
      await (window as any).storage.set('birthdays-list', JSON.stringify(updatedBirthdays));
      setBirthdays(updatedBirthdays);
    } catch (error) {
      console.error('Error saving birthdays:', error);
    }
  };

  const addBirthday = async () => {
    if (!formData.name || !formData.date) return;

    const newBirthday: Birthday = {
      id: Date.now().toString(),
      name: formData.name,
      date: formData.date,
      notes: formData.notes,
      addedAt: new Date().toISOString()
    };

    const updated = [...birthdays, newBirthday];
    await saveBirthdays(updated);
    setFormData({ name: '', date: '', notes: '' });
    setShowAddForm(false);
  };

  const deleteBirthday = async (id: string) => {
    const updated = birthdays.filter(b => b.id !== id);
    await saveBirthdays(updated);
  };

  const getDaysUntilBirthday = (dateStr: string) => {
    const today = new Date();
    const [year, month, day] = dateStr.split('-');
    const birthday = new Date(today.getFullYear(), parseInt(month) - 1, parseInt(day));
    
    if (birthday < today) {
      birthday.setFullYear(today.getFullYear() + 1);
    }
    
    const diff = birthday.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getAge = (dateStr: string) => {
    const [year] = dateStr.split('-');
    return new Date().getFullYear() - parseInt(year);
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const upcomingBirthdays = birthdays
    .map(b => ({ ...b, daysUntil: getDaysUntilBirthday(b.date) }))
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5);

  const birthdaysThisMonth = birthdays.filter(b => {
    const [, month] = b.date.split('-');
    return parseInt(month) === currentMonth.getMonth() + 1;
  });

  const todaysBirthdays = birthdays.filter(b => getDaysUntilBirthday(b.date) === 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading birthdays...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Cake className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              Birthday Calendar
            </h1>
          </div>
          <p className="text-white/90 text-lg">Never forget a friend&apos;s special day!</p>
        </div>

        {todaysBirthdays.length > 0 && (
          <div className="bg-yellow-400 border-4 border-yellow-500 rounded-2xl p-6 mb-6 shadow-xl animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="w-8 h-8 text-yellow-900" />
              <h2 className="text-2xl font-bold text-yellow-900">🎉 Birthday Today!</h2>
            </div>
            {todaysBirthdays.map(birthday => (
              <div key={birthday.id} className="text-yellow-900 text-xl font-semibold">
                {birthday.name} is celebrating today! 🎂
              </div>
            ))}
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full bg-white hover:bg-gray-50 text-purple-600 font-bold py-4 px-6 rounded-2xl shadow-xl transition-all duration-200 flex items-center justify-center gap-3 border-4 border-white/50"
          >
            {showAddForm ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            {showAddForm ? 'Cancel' : 'Add New Birthday'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-6 border-4 border-white/50">
            <div className="mb-4">
              <label className="block text-black font-bold mb-2">Friend&apos;s Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 text-blue-600"
                placeholder="Rishav"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Birth Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 text-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Notes (Optional)</label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 text-blue-600"
                placeholder="Gift ideas, favorite things..."
              />
            </div>
            <button
              onClick={addBirthday}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg"
            >
              Save Birthday
            </button>
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-6 border-4 border-white/50">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Birthdays</h2>
          </div>
          
          {upcomingBirthdays.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Gift className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No birthdays added yet!</p>
              <p className="text-sm">Click the button above to add your first birthday.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingBirthdays.map((birthday) => (
                <div
                  key={birthday.id}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200 hover:border-purple-400 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-5 h-5 text-purple-600" />
                        <h3 className="text-xl font-bold text-gray-800">{birthday.name}</h3>
                      </div>
                      <p className="text-gray-600">{formatDate(birthday.date)}</p>
                      <p className="text-sm text-gray-500">Turning {getAge(birthday.date)} years old</p>
                      {birthday.notes && (
                        <p className="text-sm text-purple-600 mt-2">📝 {birthday.notes}</p>
                      )}
                      <div className="mt-2">
                        {birthday.daysUntil === 0 ? (
                          <span className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                            🎉 Today!
                          </span>
                        ) : birthday.daysUntil === 1 ? (
                          <span className="inline-block bg-orange-400 text-orange-900 px-3 py-1 rounded-full text-sm font-bold">
                            ⏰ Tomorrow
                          </span>
                        ) : (
                          <span className="inline-block bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                            📅 In {birthday.daysUntil} days
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteBirthday(birthday.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {birthdaysThisMonth.length > 0 && (
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-white/50 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                This Month ({currentMonth.toLocaleDateString('en-US', { month: 'long' })})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {birthdaysThisMonth.map((birthday) => (
                <div
                  key={birthday.id}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200"
                >
                  <p className="font-bold text-gray-800">{birthday.name}</p>
                  <p className="text-sm text-gray-600">{formatDate(birthday.date)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center border-2 border-white/30">
          <p className="text-white text-lg font-semibold">
            Tracking {birthdays.length} {birthdays.length === 1 ? 'birthday' : 'birthdays'} 🎂
          </p>
        </div>
      </div>
    </div>
  );
}