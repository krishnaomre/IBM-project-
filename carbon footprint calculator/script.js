// script.js
function calculateFootprint() {
    // Get user inputs
    const electricity = document.getElementById('electricity').value;
    const gas = document.getElementById('gas').value;
    const car = document.getElementById('car').value;
    const flights = document.getElementById('flights').value;

    // Check for empty inputs
    const emptyFields = [];
    if (!electricity) emptyFields.push('Electricity Usage');
    if (!gas) emptyFields.push('Gas Usage');
    if (!car) emptyFields.push('Car Travel');
    if (!flights) emptyFields.push('Flights');

    const resultDiv = document.getElementById('result');

    if (emptyFields.length > 0) {
        resultDiv.textContent = `Please fill out the following fields: ${emptyFields.join(', ')}.`;
        resultDiv.classList.remove('show');
        resultDiv.classList.add('error');
        return;
    }

    // Calculate carbon footprint for each activity
    const electricityFootprint = electricity * 0.92; // Average kg CO2 per kWh
    const gasFootprint = gas * 2.31; // Average kg CO2 per liter
    const carFootprint = car * 0.21; // Average kg CO2 per km
    const flightsFootprint = flights * 90; // Average kg CO2 per hour

    // Calculate total carbon footprint
    const totalFootprint = electricityFootprint + gasFootprint + carFootprint + flightsFootprint;

    // Display the result
    resultDiv.textContent = `Your monthly carbon footprint is ${totalFootprint.toFixed(2)} kg CO2.`;
    resultDiv.classList.remove('error');
    resultDiv.classList.add('show');
}
