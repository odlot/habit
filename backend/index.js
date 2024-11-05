const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// GET /habits - Get all habits
app.get('/habits', async (req, res) => {
  const habits = await prisma.habit.findMany();
  res.json(habits);
});

// POST /habits - Add a new habit
app.post('/habits', async (req, res) => {
  const { name } = req.body;
  const newHabit = await prisma.habit.create({
    data: { name },
  });
  res.status(201).json(newHabit);
});

// DELETE /habits/:id - Delete a habit by ID
app.delete('/habits/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.habit.delete({
    where: { id: parseInt(id) },
  });
  res.status(204).end();
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
