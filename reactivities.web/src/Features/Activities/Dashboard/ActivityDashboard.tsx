import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../App/Models/Activity';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';
import ActivityList from './ActivityList';



interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    handleSelectedActivity: (id: string) => void;
    handleCancelSelectedActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    handleCreateOrEdit: (activity: Activity) => void;
    handleDeleteActivity: (id: string) => void;
    submitting: boolean;
    
}

const ActivityDashboard = ({ activities, selectedActivity, handleSelectedActivity, handleCancelSelectedActivity, editMode, openForm, closeForm, handleCreateOrEdit, handleDeleteActivity, submitting }: Props) => {

    return (

        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    handleSelectedActivity={handleSelectedActivity}
                    handleDeleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>

            <Grid.Column width='6'>
                {
                    selectedActivity &&
                    !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        handleCancelSelectedActivity={handleCancelSelectedActivity}
                        openForm={openForm}
                    />
                }


                {
                 editMode &&

                    <ActivityForm
                        selectedActivity={selectedActivity}
                        closeForm={closeForm}
                        handleCreateOrEdit={handleCreateOrEdit}
                        submitting={submitting}
                />
                }
            </Grid.Column>

        </Grid>

        );
}


export default ActivityDashboard;