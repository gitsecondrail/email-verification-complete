const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let allowedEmails = [];
try {
  allowedEmails = JSON.parse(fs.readFileSync('emails.json'));
} catch (err) {
  console.error("Failed to load emails.json:", err);
}

app.post('/validate', (req, res) => {
  const email = (req.body.email || '').toLowerCase().trim();
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  if (allowedEmails.includes(email)) {
    res.json({ success: true });
  } else {
    res.status(403).json({ success: false, message: 'Unauthorized' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
