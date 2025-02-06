
// // FoodList.js
// import React, { useEffect, useState } from 'react';
// import { allFood } from '../api/food'; // Assume this API call fetches all food data
// import { Container, Row, Col, Button, ProgressBar, Modal } from "react-bootstrap";
// import SearchBar from './SearchBar'; // Import SearchBar component

// const FoodList = () => {
//     const [foods, setFoods] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedFood, setSelectedFood] = useState(null);
//     const [show, setShow] = useState(false);
//     const [searchQuery, setSearchQuery] = useState(''); // State for search query

//     useEffect(() => {
//         const fetchFood = async () => {
//             const data = await allFood();
//             if (data) {
//                 setFoods(data);
//             }
//             setLoading(false);
//         };

//         fetchFood();
//     }, []);

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const handleShow = (food) => {
//         setSelectedFood(food);
//         setShow(true); // Show the modal
//     };

//     const handleClose = () => setShow(false);

//     // Filter foods based on the search query
//     const filteredFoods = foods.filter(food =>
//         food.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (loading) return <p>Loading...</p>;

//     return (
//         <Container className="mt-4">
//             <h2 className="text-center mb-4">Food List</h2>

//             {/* Use the SearchBar Component */}
//             <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

//             {/* Display Food Items in 3 Columns */}
//             {filteredFoods.length > 0 ? (
//                 <Row>
//                     {filteredFoods.map((food, index) => (
//                         <Col key={index} xs={4} className="text-center">
//                             <Button 
//                                 variant="link" 
//                                 onClick={() => handleShow(food)} // On click, show the modal with food details
//                             >
//                                 {food.name.toUpperCase()}
//                             </Button>
//                         </Col>
//                     ))}
//                 </Row>
//             ) : (
//                 <p>No results found</p>
//             )}

//             {/* Pop-up Modal */}
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Nutrition & Calories</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedFood && (
//                         <>
//                             <h4 style={{ color: `#${Math.floor(Math.random() * 16777215).toString(12)}` }}>
//                                 {selectedFood.name.toUpperCase()}
//                             </h4>
//                             <p><strong>Serving Size:</strong> {selectedFood.serving_size_g} g</p>

//                             {/* Iterate through the food's nutritional data */}
//                             {Object.entries(selectedFood).map(([key, value]) => {
//                                 if (key === "name" || key === "serving_size_g") return null; // Skip non-nutritional data
                                
//                                 const label = key.replace('_', ' ').toUpperCase();
//                                 const isMg = key.includes('mg');
//                                 const barValue = isMg ? value / 1000 : value; // Convert mg to g if necessary
//                                 const maxNutritionValue = 100; // We assume 100 as the maximum value for progress bar

//                                 return (
//                                     <div key={key} className="my-3">
//                                         <p className="mb-1"><strong>{label}:</strong> {value} {isMg ? 'mg' : 'g'}</p>
//                                         <ProgressBar
//                                             now={(barValue / maxNutritionValue) * 1000}
//                                             striped
//                                             variant={getBarColor(key)}
//                                             label={`${Math.round((barValue / maxNutritionValue) * 100)}%`}
//                                             style={{ height: '20px', width: '100%', borderRadius: '5px' }}
//                                         />
//                                     </div>
//                                 );
//                             })}
//                         </>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </Container>
//     );
// };

// const getBarColor = (key) => {
//     const colors = {
//         calories: "danger",
//         protein_g: "success",
//         carbohydrates_total_g: "primary",
//         fat_total_g: "warning",
//         fiber_g: "info",
//         sugar_g: "danger",
//         sodium_mg: "dark",
//         potassium_mg: "primary",
//         cholesterol_mg: "danger",
//     };
//     return colors[key] || "secondary";
// };

// export default FoodList;


import React, { useEffect, useState } from 'react';
import { allFood } from '../api/food';
import { Container, Row, Col, Button, ProgressBar, Modal, Card, Form } from "react-bootstrap";
import SearchBar from './SearchBar';

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFood, setSelectedFood] = useState(null);
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleShow = (food) => {
        setSelectedFood(food);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Food List</h2>

            <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

            <Row className="g-4">
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food, index) => (
                        <Col key={index} md={4} sm={6} xs={12} className="d-flex align-items-stretch">
                            <Card className="shadow-sm border-0 w-100 text-center">
                                <Card.Body>
                                    <Card.Title className="mb-2 text-uppercase">{food.name}</Card.Title>
                                    <Button 
                                        variant="warning" 
                                        className="w-100" 
                                        onClick={() => handleShow(food)}
                                    >
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center w-100">No results found</p>
                )}
            </Row>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Nutrition & Calories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedFood && (
                        <>
                            <h4 className="text-center text-primary">{selectedFood.name.toUpperCase()}</h4>
                            <p><strong>Serving Size:</strong> {selectedFood.serving_size_g} g</p>

                            {Object.entries(selectedFood).map(([key, value]) => {
                                if (key === "name" || key === "serving_size_g") return null;

                                const label = key.replace('_', ' ').toUpperCase();
                                const isMg = key.includes('mg');
                                const barValue = isMg ? value / 1000 : value;
                                const maxNutritionValue = 100;

                                return (
                                    <div key={key} className="mb-3">
                                        <p className="mb-1 fw-bold">{label}: {value} {isMg ? 'mg' : 'g'}</p>
                                        <ProgressBar
                                            now={(barValue / maxNutritionValue) * 100}
                                            striped
                                            variant={getBarColor(key)}
                                            label={`${Math.round((barValue / maxNutritionValue) * 100)}%`}
                                            className="progress-bar-custom"
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

