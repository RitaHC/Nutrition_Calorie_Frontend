
import React, { useEffect, useState } from 'react';
import { allFood } from '../api/food';
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";

const CalorieCounter = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFoods, setSelectedFoods] = useState({});

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

    const updateFoodCount = (food, change) => {
        setSelectedFoods((prev) => {
            const currentCount = prev[food.name]?.count || 0;
            const newCount = currentCount + change;

            if (newCount <= 0) {
                const { [food.name]: _, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [food.name]: { ...food, count: newCount }
            };
        });
    };

    const totalNutrition = Object.values(selectedFoods).reduce((totals, food) => {
        const multiplier = food.count;
        return {
            calories: totals.calories + food.calories * multiplier,
            protein_g: totals.protein_g + food.protein_g * multiplier,
            carbohydrates_total_g: totals.carbohydrates_total_g + food.carbohydrates_total_g * multiplier,
            fat_total_g: totals.fat_total_g + food.fat_total_g * multiplier,
            fiber_g: totals.fiber_g + food.fiber_g * multiplier,
            sugar_g: totals.sugar_g + food.sugar_g * multiplier,
            sodium_mg: totals.sodium_mg + food.sodium_mg * multiplier * 0.001,
            potassium_mg: totals.potassium_mg + food.potassium_mg * multiplier * 0.001,
            cholesterol_mg: totals.cholesterol_mg + food.cholesterol_mg * multiplier * 0.001,
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

    const maxNutritionValue = Math.max(
        totalNutrition.protein_g,
        totalNutrition.carbohydrates_total_g,
        totalNutrition.fat_total_g,
        totalNutrition.fiber_g,
        totalNutrition.sugar_g,
        totalNutrition.sodium_mg,
        totalNutrition.potassium_mg,
        totalNutrition.cholesterol_mg
    ) || 1;

    if (loading) return <p>Loading...</p>;

    return (
        <Container className="mb-2">
            <Row>
                {/* Left Side: Food List */}
                <Col md={6}>
                    <h2 className="text-center mb-4">Food List</h2>
                    {foods.map((food, index) => (
                        index % 3 === 0 && (
                            <Row key={index} className="py-2 border-bottom">
                                {[foods[index], foods[index + 1], foods[index + 2]].map((item, idx) =>
                                    item ? (
                                        <Col key={idx} xs={4} className="text-center">
                                            <div>
                                                <Button variant="outline-warning" onClick={() => updateFoodCount(item, 1)}>
                                                    {item.name.toUpperCase()}
                                                </Button>
                                            </div>
                                            {selectedFoods[item.name] && (
                                                <div className="mt-2">
                                                    <Button variant="outline-danger" size="sm" onClick={() => updateFoodCount(item, -1)}>
                                                        -
                                                    </Button>
                                                    <span className="mx-2">{selectedFoods[item.name]?.count} servings</span>
                                                    <Button variant="outline-success" size="sm" onClick={() => updateFoodCount(item, 1)}>
                                                        +
                                                    </Button>
                                                </div>
                                            )}
                                        </Col>
                                    ) : null
                                )}
                            </Row>
                        )
                    ))}
                </Col>

                {/* Right Side: Total Nutrition Overview (Sticky) */}
                <Col md={6} className="sticky-nutrition">
                    <h4 className="text-center">Total Nutrition Overview</h4>
                    {/* Progress Bars for Total Nutritional Values */}
                    <div className="my-3">
                        {Object.entries(totalNutrition).map(([key, value]) => (
                            <div key={key} className="mb-2">
                                <p className="mb-1"><strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value} {key.includes('mg') ? 'mg' : 'g'}</p>
                                <ProgressBar
                                    now={(value / maxNutritionValue) * 100}
                                    striped variant={getBarColor(key)}
                                    label={`${Math.round((value / maxNutritionValue) * 100)}%`}
                                />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

// Function to get different colors for each nutrient type
const getBarColor = (key) => {
    const colors = {
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

export default CalorieCounter;
