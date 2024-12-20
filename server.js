const express = require('express');
const cors = require('cors'); // Ensure this is required after installation

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/simulate', (req, res) => {
    const { temperature, h2sConcentration, efficiency } = req.body;

    // Default values
    const pressure = 50; // atm
    const maintenanceEnergy = 0.1; // J/g/day
    const energyContent = 20; // J/g

    // Step 1: Calculate ΔG (kJ/mol)
    const deltaG = 798.2 + (0.0592 * pressure) - (0.0063 * pressure);

    // Step 2: Calculate BP (g/m²/day)
    const biomassProduction = (deltaG * 0.3) / maintenanceEnergy;

    // Step 3: Calculate EO (J/m²/day)
    const energyOutput = biomassProduction * energyContent;

    // Return results as JSON
    res.json({
        deltaG: parseFloat(deltaG.toFixed(2)), // ΔG in kJ/mol
        biomassProduction: parseFloat(biomassProduction.toFixed(2)), // BP in g/m²/day
        energyOutput: parseFloat(energyOutput.toFixed(2)), // EO in J/m²/day
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
