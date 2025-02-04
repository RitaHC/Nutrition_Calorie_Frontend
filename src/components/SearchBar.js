// SearchBar.js
import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchQuery, onSearchChange }) => {
    return (
        <Form className="mb-4">
            <Form.Control
                type="text"
                placeholder="Search food..."
                value={searchQuery}
                onChange={onSearchChange}
            />
        </Form>
    );
};

export default SearchBar;
