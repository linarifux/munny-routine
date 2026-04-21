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
    <div className="min-h-screen max-w-4xl mx-auto p-3 sm:p-4 md:p-8 selection:bg-indigo-100">
      
      {/* Header section */}
      <header className="mb-6 md:mb-8 text-center space-y-2 md:space-y-3">
        <div className="inline-block bg-indigo-100 text-indigo-800 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full mb-1 md:mb-2">
          {currentDayName === activeDay ? "Today's Schedule" : `${activeDay}'s Schedule`}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">4th Year Class Routine</h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium">Govt. Rajendra College • Sociology Dept</p>
      </header>

      {/* Day Selector Navigation (Swipeable on mobile, hidden scrollbars natively) */}
      <nav className="flex overflow-x-auto pb-3 md:pb-4 mb-4 md:mb-6 gap-2 snap-x justify-start md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 sm:px-5 md:px-6 py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 snap-start
              ${activeDay === day 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02] md:scale-105' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
          >
            {day}
          </button>
        ))}
      </nav>

      {/* Class List - Grid system (1 column mobile, 2 columns desktop) */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {todaysClasses.length > 0 ? (
          todaysClasses.map((cls) => (
            <div 
              key={cls.id} 
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 ease-in-out flex flex-col justify-between"
            >
              
              <div>
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div className="flex gap-1.5 sm:gap-2 items-center text-indigo-700 font-bold bg-indigo-50 px-2.5 sm:px-3 py-1.5 rounded-lg w-max text-xs sm:text-sm md:text-base">
                    <Clock size={14} className="sm:w-4 sm:h-4" />
                    {cls.time}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-start gap-2 mb-1.5 sm:mb-2 leading-tight">
                    <BookOpen size={18} className="text-slate-400 shrink-0 mt-0.5 md:w-5 md:h-5"/>
                    <span>{cls.course}</span>
                  </h3>
                  <p className="text-slate-500 flex items-center gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm">
                    <MapPin size={14} className="text-rose-400 shrink-0 sm:w-4 sm:h-4"/>
                    {cls.room}
                  </p>
                </div>
              </div>

              {/* Teacher Details (Always Visible) */}
              <div className="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-50 p-2.5 sm:p-3 rounded-lg md:rounded-xl border border-slate-100">
                  <div className="bg-indigo-100 text-indigo-600 p-1.5 sm:p-2 rounded-md md:rounded-lg shrink-0">
                    <User size={16} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Course Instructor</p>
                    <p className="text-slate-800 font-bold text-xs sm:text-sm">
                      {teachers[cls.teacherInitials]} <span className="text-slate-400 font-normal">({cls.teacherInitials})</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-12 md:py-16 bg-white rounded-xl md:rounded-2xl border border-dashed border-slate-200">
            <Calendar size={40} className="mx-auto text-slate-300 mb-3 md:mb-4 md:w-12 md:h-12" />
            <p className="text-slate-600 font-semibold text-base md:text-lg">No classes scheduled for {activeDay}.</p>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Enjoy your free time!</p>
          </div>
        )}
      </main>

    </div>
  );
}