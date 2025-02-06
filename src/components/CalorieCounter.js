import React, { useEffect, useState } from 'react';
import { allFood } from '../api/food';
import { Container, Row, Col, Button, ProgressBar, Form, Tabs, Tab, Card } from "react-bootstrap";

const CalorieCounter = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFoods, setSelectedFoods] = useState({});
    const [servingSizes, setServingSizes] = useState({});

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

    const updateServingSize = (food, size) => {
        setServingSizes((prev) => ({
            ...prev,
            [food.name]: size,
        }));

        setSelectedFoods((prev) => ({
            ...prev,
            [food.name]: food,
        }));
    };

    const totalNutrition = Object.keys(selectedFoods).reduce((totals, foodName) => {
        const food = selectedFoods[foodName];
        const size = servingSizes[foodName] || 100;
        const multiplier = size / 100;

        return {
            calories: totals.calories + food.calories * multiplier,
            protein_g: totals.protein_g + food.protein_g * multiplier,
            carbohydrates_total_g: totals.carbohydrates_total_g + food.carbohydrates_total_g * multiplier,
            fat_total_g: totals.fat_total_g + food.fat_total_g * multiplier,
            fiber_g: totals.fiber_g + food.fiber_g * multiplier,
            sugar_g: totals.sugar_g + food.sugar_g * multiplier,
            sodium_mg: totals.sodium_mg + food.sodium_mg * multiplier *0.001,
            potassium_mg: totals.potassium_mg + food.potassium_mg * multiplier *0.001,
            cholesterol_mg: totals.cholesterol_mg + food.cholesterol_mg * multiplier *0.001,
        };
    }, {
        calories: 0,
        protein_g: 0,
        carbohydrates_total_g: 0,
        fat_total_g: 0,
        fiber_g: 0,
        sugar_g: 0,
        sodium_mg: 0,
        potassium_mg: 0,
        cholesterol_mg: 0,
    });

    if (loading) return <p>Loading...</p>;

    const getProgressBarVariant = (key) => {
        const variants = {
            calories: "danger",
            protein_g: "success",
            carbohydrates_total_g: "success",
            fat_total_g: "warning",
            fiber_g: "success",
            sugar_g: "warning",
            sodium_mg: "warning",
            potassium_mg: "success",
            cholesterol_mg: "warning",
        };
        return variants[key] || "secondary";
    };

    return (
        <Container className="mb-4">
            <Tabs defaultActiveKey="foodList" id="calorie-counter-tabs" className="mb-3">
                <Tab eventKey="foodList" title="Food List">
                    <Row>
                        <Col md={8} className="mx-auto">
                            <h2 className="text-center mb-4">Food List</h2>
                            <Row className="g-3">
                                {foods.map((food, index) => (
                                    <Col md={4} key={index}>
                                        <Card className="shadow-sm border-0">
                                            <Card.Body className="text-center">
                                                <Card.Title className="mb-2 text-uppercase">{food.name}</Card.Title>
                                                <Button 
                                                    variant="warning" 
                                                    className="w-100" 
                                                    onClick={() => updateServingSize(food, servingSizes[food.name] || 100)}
                                                >
                                                    Add Portion (g)
                                                </Button>
                                                {selectedFoods[food.name] && (
                                                    <div className="mt-3">
                                                        <Form.Control 
                                                            type="number" 
                                                            min="1" 
                                                            value={servingSizes[food.name] || 100} 
                                                            onChange={(e) => updateServingSize(food, parseInt(e.target.value) || 1)} 
                                                        />
                                                        <span className="d-block mt-1">grams</span>
                                                    </div>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="nutritionOverview" title="Nutrition Overview">
                    <Col md={6} className="mx-auto">
                        <h4 className="text-center">Total Nutrition Overview</h4>
                        <div className="my-3">
                            {Object.entries(totalNutrition).map(([key, value]) => (
                                <div key={key} className="mb-2">
                                    <p className="mb-1"><strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value.toFixed(2)} {key.includes('mg') ? 'mg' : key === 'calories' ? '' : 'g'}</p>
                                    <ProgressBar
                                        now={value > 0 ? (value / 100) * 100 : 0}
                                        striped
                                        variant={getProgressBarVariant(key)}
                                        label={`${Math.round(value)}%`}
                                    />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default CalorieCounter;