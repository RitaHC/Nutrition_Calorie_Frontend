import React, { useEffect, useState } from 'react';
import { allFood } from '../api/food';

import { Container, Row, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap"

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFood, setSelectedFood] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchFood = async () => {
            const data = await allFood();
            if (data) {
                setFoods(data);
            }
            setLoading(false);
        };

        fetchFood();
    }, []);

    const handleShow = (food) => {
        setSelectedFood(food);
        setShow(true);
    };

    // Add Colorful Bars to the elements
        const getBarStyle = (value, color) => ({
          width: `${Math.min(value, 100)}%`, // Cap width at 100%
          backgroundColor: color,
          height: '20px',
          borderRadius: '5px',
          margin: '5px 0',
        });

    const handleClose = () => setShow(false);

    if (loading) return <p>Loading...</p>;

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Food List</h2>

            {/* Grid Header */}
           

            {/* Display Food Items in 3 Columns */}
            {foods.map((food, index) => (
                index % 3 === 0 && (
                    <Row key={index} className="py-2 border-bottom">
                        <Col xs={4} className="text-center">
                            {foods[index] && (
                                <Button variant="link" onClick={() => handleShow(foods[index])}>
                                    {foods[index].name.toUpperCase()}
                                </Button>
                            )}
                        </Col>
                        <Col xs={4} className="text-center">
                            {foods[index + 1] && (
                                <Button variant="link" onClick={() => handleShow(foods[index + 1])}>
                                    {foods[index + 1].name.toUpperCase()}
                                </Button>
                            )}
                        </Col>
                        <Col xs={4} className="text-center">
                            {foods[index + 2] && (
                                <Button variant="link" onClick={() => handleShow(foods[index + 2])}>
                                    {foods[index + 2].name.toUpperCase()}
                                </Button>
                            )}
                        </Col>
                    </Row>
                )
            ))}


            {/* Pop-up Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nutrition & Calories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedFood && (
                        <>
                            <h4 style={{color: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>{selectedFood.name.toUpperCase()}</h4>
                            <p></p>
                            <p><strong>Serving Size:</strong > {selectedFood.serving_size_g} g </p>
                            <p><strong>Calories:</strong> {selectedFood.calories} kcal</p>
                            <div style={getBarStyle(selectedFood.calories, 'darkred')}></div>
                            <p><strong>Protein (in g):</strong> {selectedFood.protein_g}</p>
                            <div style={getBarStyle(selectedFood.protein_g, 'darkgreen')}></div>
                            <p><strong>Carbohydrates (in g):</strong> {selectedFood.carbohydrates_total_g}</p>
                            <div style={getBarStyle(selectedFood.carbohydrates_total_g, 'aquamarine')}></div>
                            <p><strong>Fat (in g):</strong> {selectedFood.fat_total_g}</p>
                            <div style={getBarStyle(selectedFood.fat_total_g, 'darkolivegreen')}></div>
                            <p><strong>Fiber (in g):</strong> {selectedFood.fiber_g}</p>
                            <div style={getBarStyle(selectedFood.fiber_g, 'chartreuse')}></div>
                            <p><strong>Sugar (in g):</strong> {selectedFood.sugar_g} </p>
                            <div style={getBarStyle(selectedFood.sugar_g, 'lightseagreen')}></div>
                            <p><strong>Sodium (in g):</strong> {selectedFood.sodium_mg} </p>
                            <div style={getBarStyle(selectedFood.sodium_mg, 'mediumseagreen')}></div>
                            <p><strong>Potassium (in g):</strong> {selectedFood.potassium_mg * 0.001}</p>
                            <div style={getBarStyle(selectedFood.potassium_mg * 0.001, 'darkseagreen')}></div>
                            <p><strong>Cholestrol (in g):</strong> {selectedFood.cholesterol_mg * 0.001} </p>
                            <div style={getBarStyle(selectedFood.cholesterol_mg * 0.001, 'darkorange')}></div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default FoodList;
