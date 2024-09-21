// start SERVICE_v01.01 code
// Define a City class with name and id properties
class City {
  constructor(public name: string, public id: string) {}
}

// TODO: Complete the HistoryService class
class HistoryService { // <- starter code
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const fs = require('fs');
    const data = fs.readFileSync('searchHistory.json', 'utf8');
    return JSON.parse(data);
  }

  async getHistory() {
    return await this.getCities();
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) { // <- starter code
    const fs = require('fs');
    fs.writeFileSync('searchHistory.json', JSON.stringify(cities, null, 2), 'utf8');
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() { // <- starter code
    const cities = await this.read();
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) { // <- starter code
    const cities = await this.getCities();
    const newCity = new City(city, cities.length.toString());
    cities.push(newCity);
    await this.write(cities);
    return cities;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) { // <- starter code
    const cities = await this.getCities();
    const newCities = cities.filter((city: { id: string; }) => city.id !== id);
    await this.write(newCities);
    return newCities;
  }
  async saveCity(city: string) {
    return await this.addCity(city);
  }
};

// end SERVICE_v01.01 code
export default new HistoryService();
