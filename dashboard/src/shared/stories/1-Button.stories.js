import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from 'shared/Button';

export default {
  component: Button,
  title: 'Button',
};

export const text = () => <Button label="Press Me" />;

export const emoji = () => (
  <Button onClick={action('clicked')} />
);