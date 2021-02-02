/* eslint-disable */
import express from 'express';
// disable á eslint því import verður að vera á þessu formi (.js)
import { fetchData, formatTime, timeStamp } from './videos.js';
/* eslint-enable */
/* eslint-disable no-console */

const app = express();
app.use(express.static('public'));
// const viewsPath = new URL('./views', import.meta.url).pathname;
// viewsPath var ekki að virka
app.set('views', './views');
app.set('view engine', 'ejs');

app.locals.formatTime = (str) => formatTime(str);
app.locals.timeStamp = (str) => timeStamp(str);

app.get('/', async (req, res) => {
  const data = await fetchData();
  res.render('videos', { title: 'Forsíða', data });
});

app.get('/videos/:id?', async (req, res, next) => {
  try {
    const id = req.params.id - 1;
    const data = await fetchData();
    console.log(id);
    if (!data.videos[id]) {
      next();
    }
    res.render('video-play', { title: 'Myndband', data, id });
  } catch (e) {
    console.error(e);
  }
});

function notFoundHandler(req, res) {
  res.status(404).send('<img src = "https://http.cat/404">');
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
