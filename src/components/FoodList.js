import React, { useEffect, useState } from 'react';
import { allFood } from '../api/food';

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p>Loading...</p>;

    return (
        <ul>
            {foods.map((food, index) => (
                <li key={index}>{food.name} - {food.calories} kcal</li>
            ))}
        </ul>
    );
};

export default FoodList;
