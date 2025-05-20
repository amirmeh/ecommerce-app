'use client';

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  className?: string;
  duration?: number;
  timing?: string;
  delay?: number;
  iteration?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

const ShineKeyframes: React.FC = () => (
  <style jsx>{`
    @keyframes shine {
      0% {
        background-position: 120%;
      }
      100% {
        background-position: -80%;
      }
    }
  `}</style>
);

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  className = '',
  duration = 5,
  timing = 'linear',
  delay = 0,
  iteration = 'infinite',
  direction = 'normal',
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {text}
      {!disabled && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '120%',
            WebkitBackgroundClip: 'text',
            animation: `shine ${duration}s ${timing} ${delay}s ${iteration} ${direction}`,
          }}
        >
          {text}
        </span>
      )}
      {!disabled && <ShineKeyframes />}
    </span>
  );
};
