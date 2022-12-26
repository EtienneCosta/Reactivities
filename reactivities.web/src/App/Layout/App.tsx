import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import Agent from '../Api/Agent';
import { Guid } from 'guid-typescript';
import Loading from './Loading';

function App() {


    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);


    const handleSelectedActivity = (id: string) => setSelectedActivity(activities.find(x => x.id === id));

    const handleCancelSelectedActivity = () => setSelectedActivity(undefined);

    const handleFormOpen = (id?: string) => {

        id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
        setEditMode(true);
    }

    const handleFormClose = () => {
        setEditMode(false);
    }


    const handleCreateOrEdit = (activity: Activity) => {

        setSubmitting(true);

        if (activity.id === Guid.EMPTY) {

            activity.id = Guid.create().toString();
            Agent.Activities.create(activity).then(() => {

                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
                toastr.success('Operation successfully executed.');
            }).catch(() => {
                toastr.error('An error has occurred. Please try again.');
            });
        }

        else {

            Agent.Activities.update(activity).then(() => {

                activities[activities.findIndex(x => x.id === activity.id)] = activity
                setActivities(activities);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
                toastr.success('Operation successfully executed.');


            }).catch(() => {
                toastr.error('An error has occurred. Please try again.');

            });

        }

    }


    const handleDeleteActivity = (id: string) => {
        setSubmitting(true);
        Agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSelectedActivity(undefined);
            setSubmitting(false);
            toastr.success('Operation successfully executed.');


        }).catch(() => {
            toastr.error('An error has occurred. Please try again.');

        });
    }

    useEffect(() => {

        Agent.Activities.list().then(result => {
            result.forEach(r => r.date = r.date.split('T')[0]);
            setActivities(result);
            setLoading(false);
        });

    },[]);


    if (loading)
        return (<Loading content={'Loading Activities ...' } />)


  return (
      <>
          <NavBar
              openForm={handleFormOpen}
          />

          <Container style={{ marginTop: '7em' }}>
              <ActivityDashboard
                  activities={activities}
                  selectedActivity={selectedActivity}
                  handleSelectedActivity={handleSelectedActivity}
                  handleCancelSelectedActivity={handleCancelSelectedActivity}
                  editMode={editMode}
                  openForm={handleFormOpen}
                  closeForm={handleFormClose}
                  handleCreateOrEdit={handleCreateOrEdit}
                  handleDeleteActivity={handleDeleteActivity}
                  submitting={submitting}
              />

          </Container>
    </>
  );
}

export default App;
