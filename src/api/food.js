import axios from 'axios'
const apiUrl = "https://calorieandnutrition.netlify.app/.netlify/functions/food"



//------------------ INDEX (all items) ---------------
export const allFood = async () => {
    try {
        console.log('***** Fetching All Food *****');
        const response = await axios.get(apiUrl);
        console.log(`API Called`, response.data)
        return response.data; // Ensure only the data is returned
    } catch (error) {
        console.error('Error fetching food:', error);
        return null;
    }
};