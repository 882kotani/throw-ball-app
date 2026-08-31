const express = require('express');
const Pusher = require('pusher');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// いただいたPusherの情報を設定しました
const pusher = new Pusher({
	appId: '2190403',
	key: '00bff6f8110fdcd6881d',
	secret: '111d4a799c2ca17df75e',
	cluster: 'ap3',
	useTLS: true,
});

app.post('/api/throw', (req, res) => {
	const { velocity } = req.body;

	// game-channelにthrow-ballイベントを送信
	pusher.trigger('game-channel', 'throw-ball', {
		velocity: velocity || 25,
		timestamp: Date.now(),
	});

	res.json({ status: 'success' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
