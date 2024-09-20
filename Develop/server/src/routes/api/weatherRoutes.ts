import { Router } from 'express';
const router = Router();

// start ROUTES_v01.01 code
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => { // <- starter code
  try {
    const city = req.body.city;
    const weather = await WeatherService.getWeather(city);
    res.send(weather);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

// TODO: GET weather data from city name
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const weather = WeatherService.getWeather(city);
    res.send(weather);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

// TODO: save city to search history
router.post('/history', async (req, res) => {
  try {
    const city = req.body.city;
    const history = await HistoryService.saveCity(city);
    res.send(history);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const history = HistoryService.getHistory();
    res.send(history);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const history = await HistoryService.removeCity(id);
    res.send(history);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

// end ROUTES_v01.01
export default router;
