import React from 'react';
import { Bell } from 'lucide-react';

// Notifications (keep empty [] for no text)
const NOTIFICATIONS: { message: string; link?: string }[] = [];

const Marquee: React.FC = () => (
  <div className="w-full bg-[#142143] py-2 flex items-center relative overflow-hidden">
    {/* Icon */}
    <div className="flex-shrink-0 flex items-center h-full px-4">
      <Bell className="h-6 w-6 text-[#ffaf00]" />
      <p className="text-white">Notifications</p>
    </div>
    {/* Messages */}
    <div className="flex flex-nowrap whitespace-nowrap animate-marquee w-full">
      {NOTIFICATIONS.length === 0 ? (
        <span className="text-white font-semibold mx-8">&nbsp;</span>
      ) : (
        <>
          {NOTIFICATIONS.map((notice, idx) => (
            <span key={idx} className="mx-8 text-white font-semibold">
              {notice.link ? (
                <a
                  href={notice.link}
                  target={notice.link.startsWith('http') ? '_blank' : undefined}
                  rel={notice.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="underline hover:text-[#ffaf00]"
                >
                  {notice.message}
                </a>
              ) : (
                notice.message
              )}
            </span>
          ))}
          {NOTIFICATIONS.map((notice, idx) => (
            <span key={`dup-${idx}`} className="mx-8 text-white font-semibold">
              {notice.link ? (
                <a
                  href={notice.link}
                  target={notice.link.startsWith('http') ? '_blank' : undefined}
                  rel={notice.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="underline hover:text-[#ffaf00]"
                >
                  {notice.message}
                </a>
              ) : (
                notice.message
              )}
            </span>
          ))}
        </>
      )}
    </div>
    {/* CSS Animation */}
    <style>{`
      @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: flex;
        animation: marquee 20s linear infinite;
        min-width: 200%;
      }
    `}</style>
  </div>
);

const Stats: React.FC = () => (
  <>
    {/* Separate Marquee Bar (no yellow background here) */}
    <Marquee />

    {/* Yellow Background ONLY for stats */}
    <section className="bg-gradient-to-r from-[#ffaf00] to-yellow-400 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
        {[
          { number: '10000+', label: 'Enthusiastic Students' },
          { number: '10', label: 'Acres Modern Campus' },
          { number: '100+', label: 'Student Activity Every Year' },
          { number: '100+', label: 'Companies Placements' },
          { number: '10+', label: 'World Class Programs' },
        ].map((item, idx) => (
          <div key={idx}>
            <div className="text-4xl lg:text-5xl font-bold text-[#142143] mb-2">{item.number}</div>
            <div className="text-[#142143] font-semibold">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default Stats;
