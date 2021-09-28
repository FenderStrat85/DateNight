import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';

const LogoutButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={23}
      // color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
    />
  );
};

export default LogoutButton;
