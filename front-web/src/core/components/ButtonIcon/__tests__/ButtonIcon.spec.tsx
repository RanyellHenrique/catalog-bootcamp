import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonIcon from '..';

test('should render ButtonIcon', () => {
    render(
        <ButtonIcon text="logar" />
    );

    expect(screen.getByText("logar")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
});