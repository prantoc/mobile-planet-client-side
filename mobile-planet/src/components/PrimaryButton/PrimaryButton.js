import React from 'react';
import { Button } from 'react-bootstrap';

const PrimaryButton = ({ children, variant = "" }) => {
    return (
        <>
            <Button variant={variant}>{children}</Button>
        </>
    );
};

export default PrimaryButton;