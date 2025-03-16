const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Example API route
app.get('/api/test', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
