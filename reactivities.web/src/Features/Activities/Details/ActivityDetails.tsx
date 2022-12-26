import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../App/Models/Activity';

interface Props {
    activity: Activity;
    handleCancelSelectedActivity: () => void;
    openForm: (id: string) => void;


}


const ActivityDetails = ({ activity, handleCancelSelectedActivity, openForm }: Props) => {

    return (

        <Card fluid>
            <Image src={`Assets/Categories/${activity.category}.jpg`} />

            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{new Date(activity.date).toLocaleString()}</span>
                </Card.Meta>

                <Card.Description>
                    {activity.description}                
                </Card.Description>
            </Card.Content>

            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />

                    <Button onClick={handleCancelSelectedActivity} basic color='red' content='Close' />
                </Button.Group>

            </Card.Content>
            
        </Card>


        );


}

export default ActivityDetails;