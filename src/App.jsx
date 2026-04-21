import { useState } from 'react';
import { Calendar, Clock, MapPin, BookOpen, User } from 'lucide-react';
import { scheduleData, days, teachers } from './data/routineData';

export default function App() {
  // Try to default to the current day, otherwise fallback to Sunday
  const currentDayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const defaultDay = days.includes(currentDayName) ? currentDayName : 'Sunday';
  
  const [activeDay, setActiveDay] = useState(defaultDay);

  const todaysClasses = scheduleData.filter(c => c.day === activeDay);

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 md:p-8 selection:bg-indigo-100">
      
      {/* Header section */}
      <header className="mb-8 text-center space-y-3">
        <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
          {currentDayName === activeDay ? "Today's Schedule" : `${activeDay}'s Schedule`}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Munny's 4th Year Routine</h1>
        <p className="text-slate-500 font-medium">Govt. Rajendra College • Sociology Dept</p>
      </header>

      {/* Day Selector Navigation */}
      <nav className="flex overflow-x-auto pb-4 mb-6 gap-2 snap-x hide-scrollbar justify-start md:justify-center">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 snap-start
              ${activeDay === day 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
          >
            {day}
          </button>
        ))}
      </nav>

      {/* Class List - Now using CSS Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {todaysClasses.length > 0 ? (
          todaysClasses.map((cls) => (
            <div 
              key={cls.id} 
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 ease-in-out flex flex-col justify-between"
            >
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 items-center text-indigo-700 font-bold bg-indigo-50 px-3 py-1.5 rounded-lg w-max">
                    <Clock size={16} />
                    {cls.time}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2 leading-tight">
                    <BookOpen size={20} className="text-slate-400 shrink-0"/>
                    {cls.course}
                  </h3>
                  <p className="text-slate-500 flex items-center gap-2 font-medium text-sm">
                    <MapPin size={16} className="text-rose-400 shrink-0"/>
                    {cls.room}
                  </p>
                </div>
              </div>

              {/* Teacher Details (Always Visible) */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Course Instructor</p>
                    <p className="text-slate-800 font-bold text-sm">
                      {teachers[cls.teacherInitials]} <span className="text-slate-400 font-normal">({cls.teacherInitials})</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600 font-semibold text-lg">No classes scheduled for {activeDay}.</p>
            <p className="text-slate-400 text-sm mt-1">Enjoy your free time!</p>
          </div>
        )}
      </main>

    </div>
  );
}