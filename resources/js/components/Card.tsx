import React from 'react';

interface CardProps {
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  badge?: string;
  badgeColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  onClick?: () => void;
  url?: string;
  className?: string;
  children?: React.ReactNode;
  horizontal?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Card({
  image,
  imageAlt,
  title,
  subtitle,
  description,
  header,
  footer,
  badge,
  badgeColor = 'primary',
  onClick,
  url,
  className = '',
  children,
  horizontal = false,
  shadow = 'md',
}: CardProps) {
  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  // Badge colors
  const badgeColors = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800',
  };

  const cardContentClasses = horizontal ? 'flex flex-col md:flex-row' : 'flex flex-col';

  const cardContent = (
    <div
      className={`
        bg-white dark:bg-gray-800
        rounded-lg ${shadowClasses[shadow]}
        overflow-hidden
        transition-all duration-200
        hover:shadow-lg
        ${className}
      `}
    >
      {header && <div className="p-4 border-b border-gray-200 dark:border-gray-700">{header}</div>}

      <div className={cardContentClasses}>
        {image && (
          <div className={`relative overflow-hidden ${horizontal ? 'md:w-1/3' : 'w-full'}`}>
            {badge && (
              <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${badgeColors[badgeColor]}`}>
                {badge}
              </span>
            )}
            <img
              src={image}
              alt={imageAlt || title || 'Card image'}
              className={`
                w-full object-cover
                transition-transform duration-300
                hover:scale-105
                ${horizontal ? 'h-full md:h-full' : 'h-48'}
              `}
            />
          </div>
        )}

        <div className={`p-4 ${horizontal && image ? 'md:w-2/3' : 'w-full'} flex flex-col`}>
          {badge && !image && (
            <span className={`self-start mb-2 px-2 py-1 text-xs font-semibold rounded-full ${badgeColors[badgeColor]}`}>
              {badge}
            </span>
          )}

          {title && <h3 className="font-medium text-lg mb-1 text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <h4 className="text-sm text-gray-600 dark:text-gray-300 mb-2">{subtitle}</h4>}
          {description && <p className="text-gray-700 dark:text-gray-400 text-sm">{description}</p>}
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>

      {footer && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {footer}
        </div>
      )}
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        className="block"
        onClick={(e) => onClick && (e.preventDefault(), onClick())}
      >
        {cardContent}
      </a>
    );
  }

  if (onClick) {
    return <div onClick={onClick} className="cursor-pointer">{cardContent}</div>;
  }

  return cardContent;
}
