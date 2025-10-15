// src/components/ActionMenu.tsx
import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const ActionMenu: React.FC = () => {
  const [hoverStates, setHoverStates] = useState<{ [key: string]: { color: string; isHovered: boolean } }>({});

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#', // Replace with actual Facebook URL
    },
    {
      name: 'Instagram', 
      icon: Instagram,
      href: '#', // Replace with actual Instagram URL
    },
    {
      name: 'Twitter',
      icon: Twitter, 
      href: '#', // Replace with actual Twitter URL
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: '#', // Replace with actual YouTube URL
    }
  ];

  // Add keyframes to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes socialPulse {
        0%, 100% {
          opacity: 0.3;
          transform: scale(1.25);
        }
        50% {
          opacity: 0.1;
          transform: scale(1.4);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getRandomColor = () => {
    const colors = ['#ffaf00', '#3b82f6']; // Yellow and Blue
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleMouseEnter = (socialName: string) => {
    setHoverStates(prev => ({
      ...prev,
      [socialName]: {
        color: getRandomColor(),
        isHovered: true
      }
    }));
  };

  const handleMouseLeave = (socialName: string) => {
    setHoverStates(prev => ({
      ...prev,
      [socialName]: {
        ...prev[socialName],
        isHovered: false
      }
    }));
  };

  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 z-40" style={{ left: '14px' }}>
      <div className="space-y-3">
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          const hoverState = hoverStates[social.name];
          const isHovered = hoverState?.isHovered || false;
          const hoverColor = hoverState?.color || '#142143';
          
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 transform"
              aria-label={social.name}
              onMouseEnter={() => handleMouseEnter(social.name)}
              onMouseLeave={() => handleMouseLeave(social.name)}
              style={{
                backgroundColor: isHovered ? `${hoverColor}20` : 'rgba(20, 33, 67, 0.1)',
                border: `2px solid ${isHovered ? hoverColor : 'rgba(20, 33, 67, 0.3)'}`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative flex items-center justify-center w-full h-full">
                <IconComponent 
                  className="h-5 w-5 transition-colors duration-300" 
                  style={{ 
                    color: isHovered ? hoverColor : '#142143'
                  }} 
                />
              </div>
              
              {/* Animated ring effect on hover */}
              <div 
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  border: `2px solid ${hoverColor}`,
                  opacity: isHovered ? 0.3 : 0,
                  transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                  animation: isHovered ? 'socialPulse 1s infinite' : 'none'
                }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ActionMenu;
