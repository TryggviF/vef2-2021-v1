import express from 'express';
/* eslint-disable */
// disable á eslint því import verður að vera á þessu formi
import { fetchData, formatTime, timeStamp } from './src/videos.js';
/* eslint-enable */

const app = express();
app.use(express.static('public'));
// const viewsPath = new URL('./views', import.meta.url).pathname;
app.set('views', './views');
app.set('view engine', 'ejs');

app.locals.formatTime = (str) => formatTime(str);
app.locals.timeStamp = (str) => timeStamp(str);

app.get('/', async (req, res) => {
  const data = await fetchData();
  res.render('videos', { title: 'Forsíða', data });
});

app.get('/videos/:id?', async (req, res) => {
  try {
    const id = req.params.id - 1;
    const data = await fetchData();
    console.log(id);
    res.render('video-play', { title: 'Myndband', data, id });
  } catch (e) {
    console.error(e);
  }
});

function notFoundHandler(req, res) {
  res.status(404).send('404 Not Found');
}

function errorHandler(err, req, res) {
  console.error(err);
  res.status(500).send('Villa!');
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
