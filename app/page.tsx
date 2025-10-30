'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Gift, Cake, Bell, X, User } from 'lucide-react';
import { sdk } from '@farcaster/miniapp-sdk'; // ✅ add this import

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

  // ✅ Tell Farcaster SDK when the app is ready
  useEffect(() => {
    sdk.actions.ready(); 
  }, []);

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
      addedAt: new Date().toISOString(),
    };

    const updated = [...birthdays, newBirthday];
    await saveBirthdays(updated);
    setFormData({ name: '', date: '', notes: '' });
    setShowAddForm(false);
  };

  const deleteBirthday = async (id: string) => {
    const updated = birthdays.filter((b) => b.id !== id);
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
    .map((b) => ({ ...b, daysUntil: getDaysUntilBirthday(b.date) }))
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5);

  const birthdaysThisMonth = birthdays.filter((b) => {
    const [, month] = b.date.split('-');
    return parseInt(month) === currentMonth.getMonth() + 1;
  });

  const todaysBirthdays = birthdays.filter((b) => getDaysUntilBirthday(b.date) === 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading birthdays...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-4">
      {/* ✅ Your full UI code remains the same */}
      {/* Everything else unchanged */}
    </div>
  );
}
