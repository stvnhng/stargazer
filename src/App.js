import React, { Component } from 'react';
import { PageHeader, Table } from 'react-bootstrap';
import './css/App.css';
import Header from './Components/Header.js';
// import Form from './Components/Form.js'
// import AccuWeather from './Components/AccuWeather.js'

const API_KEY = "2XeGHi5yf2r4wIAFYE64I1K7TZUMCuMk";

class App extends Component {
  constructor(props) {
    super(props)
    let today = new Date()
    this.state = {
      apiKey: "JebLBGYhUhpSXc9gLwPEHOZgaljXlWwLHYX8RORR",
      startDate: `${today.getFullYear()}-${today.getMonth() +1}-${today.getDate()}`,
      apiUrl: "https://api.nasa.gov/neo/rest/v1/feed",
      asteroids: []
    }
  }

    componentWillMount(){
      fetch(`${this.state.apiUrl}?start_date=${this.state.startDate}&api_key=${this.state.apiKey}`).then((rawResponse)=>{
        //rawResponse.json() returns a promise that we pass along
        return rawResponse.json()
      }).then((parsedResponse)=>{
        //when this promise resolves, we can work with our data
        let neoData = parsedResponse.near_earth_objects
        let newAsteroids = []
        Object.keys(neoData).forEach((date)=>{
          neoData[date].forEach((asteroid)=>{
            newAsteroids.push({
              id: asteroid.neo_reference_id,
              name: asteroid.name,
              date: asteroid.close_approach_data[0].close_approach_date,
              diameterMin: asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0),
              diameterMax: asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0),
              closestApproach: asteroid.close_approach_data[0].miss_distance.miles,
              velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(0),
              distance: asteroid.close_approach_data[0].miss_distance.miles
            })
          })
        })
        //state is updated when promises are resolved
        this.setState({asteroids: newAsteroids})
      })
    }

  getWeather = async () => {
    const api_call = await fetch('')
  }

  render() {
    return (
      <div className="App">
        <Header />
          <div className="meteorTable">
            <h3>Closest Meteors to Earth</h3>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Estimated Diameter (feet)</th>
                  <th>Date of Closest Approach</th>
                  <th>Distance (miles)</th>
                  <th>Velocity (mph)</th>
                </tr>
              </thead>
              <tbody>
                {this.state.asteroids.map((asteroid) => {
                  return(
                    <tr key={asteroid.id}>
                      <td>{asteroid.name}</td>
                      <td>{asteroid.diameterMin} - {asteroid.diameterMax}</td>
                      <td>{asteroid.date}</td>
                      <td>{asteroid.distance}</td>
                      <td>{asteroid.velocity}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
      );
    }
  }

export default App;
