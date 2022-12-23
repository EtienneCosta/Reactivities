import React, { useEffect, useState } from 'react';
import './App.css';
import { List, Header } from 'semantic-ui-react';
import axios from 'axios';

function App() {


    const [activities, setActivities] = useState([]);


    useEffect(() => {
        axios.get('https://localhost:7282/Reactivities/Api/Activities/List')
            .then((res) => {
                setActivities(res.data)
            })
    },[]);



  return (
      <div>
          <Header as='h2' content='Reactivities' icon='users'  />

              <List>
                  {activities.map((activity:any) => {
                      return (
                          <List.Item key={activity.id}>{activity.title} - {activity.description} - {activity.venue}</List.Item>
                      );
                  })}
              </List>


    </div>
  );
}

export default App;
