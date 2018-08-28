import React, { Component } from 'react';
import { PageHeader, Table } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <div>
        <img class="headerPhoto" src="./images/headerPhoto.png" alt="meteors" />
        <div className="Header">
          <div class="headerText">Stargazer</div>
          <h4><strong>Hello there!</strong><br/>I hope you stay for the night. Do you ever wonder when you'll get to see a shooting star?
          <br/>
          Well then, you're at the right place and maybe the right time!
          </h4>
        </div>
      </div>
    )
  }
}

export default Header
