import React from 'react';
import PropTypes from 'prop-types';

const s = Object();

s.root = {
  border: '1px solid',
  height: 150,
  backgroundColor: '#383838',
  justifyContent: 'center',
  display: 'flex',
};

s.title = {
  color: 'white',
  alignSelf: 'center',
};

class Menu extends React.Component {
  render() {
    return (
      <div style={s.root}>
        <h1 style={s.title}>Cainelli Labs</h1>
      </div>
    );
  }
}

Menu.propTypes = {
  name: PropTypes.string,
};

Menu.defaultProps = {
  name: '',
};

export default Menu;
