import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../App/Models/Activity';



interface Props {
    activities: Activity[];
    handleSelectedActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
    submitting: boolean;

}

const ActivityList = ({ activities, handleSelectedActivity, handleDeleteActivity, submitting }: Props) => {


    const [targetActivity, setTargetActivity] = useState('');


    const handleDeleteTargetActivity = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {

        setTargetActivity(e.currentTarget.name);
        handleDeleteActivity(id);

    }

    return (

        <Segment>
            <Item.Group divided>

                    {
                        activities.length > 0 ?
                            activities.map(activity => (
                                <Item key={activity.id}>

                                    <Item.Content>
                                        <Item.Header as='a'>{activity.title}</Item.Header>
                                        <Item.Meta>{new Date(activity.date).toLocaleString()}</Item.Meta>
                                        <Item.Description>
                                            <div>{activity.description}</div>
                                            <div>{activity.city}, {activity.venue}</div>

                                        </Item.Description>

                                        <Item.Extra>
                                            <Button onClick={() => handleSelectedActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                                            <Button loading={submitting && targetActivity === activity.id} name={activity.id} onClick={(e) => handleDeleteTargetActivity(e, activity.id)} floated='right' content='Delete' color='red'></Button>
                                            <Label basic content={activity.category}></Label>
                                        </Item.Extra>


                                    </Item.Content>
                                </Item>



                            )) :

                        <Item>
                            <Item.Content className='empty-item-content'>No Results Founded</Item.Content>
                        </Item>                    
                }

            </Item.Group>

        </Segment>

        )

}



export default ActivityList;