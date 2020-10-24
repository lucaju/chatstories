import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '..', 'build');
const app = express();

app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies

// dev tools
//dev
const loadDevTools = async () => {
	const { devTools } = await import('./dev/dev.mjs');
	devTools(app);
};

if (process.env.NODE_ENV === 'development') loadDevTools();

// static
app.use(express.static('./build'));
// app.use('/assets', express.static('./build/assets'));

// catch all
// app.get('*', (req, res) => {
// 	console.log('catch all');
// 	res.status(200).sendFile(path.join(publicPath, 'index.html'));
// });

// error
// app.use((req, res) => res.status(404).send('404: Page not Found'));
// app.use((error, req, res) => res.status(500).send('500: Internal Server Error'));

export default app;