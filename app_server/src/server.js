import express from 'express';
import proxy from 'http-proxy-middleware';
import renderer from './helpers/renderer';

const app = express();

app.use(proxy('/auth', { target: 'http://localhost:5000', changeOrigin: true }));
app.use(proxy('/api', { target: 'http://localhost:5000', changeOrigin: true }));

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.send(renderer(req));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is up at port ${PORT}..`));