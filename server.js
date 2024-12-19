const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();
// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
// get
app.get('/', async (req, res) => {
    try {
      // Fetch data from Supabase
      const { data, error } = await supabase.from('employees').select('*');
  
      if (error) {
        return res.status(400).json({ message: error.message });
      }
  
      res.status(200).json({ message: 'Employees fetched successfully.', data });
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
// POST /api/employees - Add a new employee
app.post('/employees', async (req, res) => {
  const {
    name,
    employeeId,
    email,
    phone,
    department,
    dateOfJoining,
    role,
  } = req.body;

  try {
    // Insert data into Supabase
    const { data, error } = await supabase.from('employees').insert([
      {
        name,
        employee_id: employeeId,
        email,
        phone,
        department,
        date_of_joining: dateOfJoining,
        role,
      },
    ]);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: 'Employee added successfully.', data });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
