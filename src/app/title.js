import React, { useState } from 'react';

const titleStyle = {
  fontWeight: 800,
  marginLeft: 'auto',
  marginRight: 'auto'
};

export const Title = () => (
  <div className="align-center">
    <h1 className="txt-h1 title" style={titleStyle}>Chill City</h1>
  </div>
);

