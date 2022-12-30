import React from 'react';
import AuthScreen from '../AuthScreen';
import {fireEvent, render} from '@testing-library/react-native';

describe('log in form', () => {
  it('should go to dashboard pag', () => {
    const navigation = {navigate: () => {}};

    const page = render(<AuthScreen navigation={navigation} />);
    const signinButton = page.getByTestId('siginButton');

    fireEvent.press(signinButton);
    expexct(navigation.navigate).toHaveBeenCallWith('Articles');
  });
});
