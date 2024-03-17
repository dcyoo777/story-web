import React from 'react';

function SpaceComponent({ height = 20, width = 20 }) {
    return <div style={{ height, width }} />;
}

export default SpaceComponent;
