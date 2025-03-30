import React from 'react';

const Banner = ({ title, subtitle, backgroundImage }) => {
  const bannerStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #FF6B57 0%, #F2994A 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="banner" style={bannerStyle}>
      <div className="container">
        <div className="banner-content">
          {title && <h1 className="banner-title">{title}</h1>}
          {subtitle && <p className="banner-subtitle">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default Banner; 