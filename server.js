const express = require('express');
const app = express();

app.use(express.json());

// Get from environment variables (protected)
const SECRET_KEY = process.env.SECRET_KEY;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

app.post('/send', async (req, res) => {
    const auth = req.headers['authorization'];
    const { message, username } = req.body;

    if (auth !== SECRET_KEY) {
        return res.status(403).json({ error: 'Invalid key' });
    }

    // Send to Discord
    const response = await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: message,
            username: username || 'Roblox Game'
        })
    });

    res.json({ success: response.ok });
});

app.get('/', (req, res) => {
    res.send('🛡️ Webhook Shield is Active!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
