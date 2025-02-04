import React, { useEffect, useState } from 'react';
import { allFood } from '../api/food';
import { Container, Row, Col, Button, ProgressBar, Modal } from "react-bootstrap";

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

    const handleClose = () => setShow(false);

    if (loading) return <p>Loading...</p>;

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Food List</h2>

            

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
                            <h4 style={{ color: `#${Math.floor(Math.random() * 16777215).toString(12)}` }}>{selectedFood.name.toUpperCase()}</h4>
                            <p><strong>Serving Size:</strong> {selectedFood.serving_size_g} g </p>

                            {/* Iterate through the food's nutritional data */}
                            {Object.entries(selectedFood).map(([key, value]) => {
                                if (key === "name" || key === "serving_size_g") return null; // Skip non-nutritional data
                                
                                const label = key.replace('_', ' ').toUpperCase();
                                const isMg = key.includes('mg');
                                const barValue = isMg ? value / 1000 : value; // Convert mg to g if necessary
                                const maxNutritionValue = 100; // We assume 100 as the maximum value for progress bar

                                return (
                                    <div key={key} className="my-3">
                                        <p className="mb-1"><strong>{label}:</strong> {value} {isMg ? 'mg' : 'g'}</p>
                                        <ProgressBar
                                            now={(barValue / maxNutritionValue) * 1000}
                                            striped
                                            variant={getBarColor(key)}
                                            label={`${Math.round((barValue / maxNutritionValue) * 100)}%`}
                                            style={{ height: '20px', width: '100%', borderRadius: '5px' }}
                                        />
                                    </div>
                                );
                            })}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
*
        </Container>
    );
};


const getBarColor = (key) => {
    const colors = {
        calories: "danger",
        protein_g: "success",
        carbohydrates_total_g: "primary",
        fat_total_g: "warning",
        fiber_g: "info",
        sugar_g: "danger",
        sodium_mg: "dark",
        potassium_mg: "primary",
        cholesterol_mg: "danger",
    };
    return colors[key] || "secondary";
};

export default FoodList;
