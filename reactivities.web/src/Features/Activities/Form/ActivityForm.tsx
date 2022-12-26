import { Guid } from 'guid-typescript';
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Button, Dropdown, DropdownProps, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../App/Models/Activity';

import { Categories } from '../../../App/Enums/Categories';

interface Props {
    selectedActivity: Activity | undefined;
    closeForm: () => void;
    handleCreateOrEdit: (activity: Activity) => void;
    submitting: boolean;

}

const ActivityForm = ({ selectedActivity, closeForm, handleCreateOrEdit, submitting }: Props) => {

    const initialState = selectedActivity ?? { id: Guid.EMPTY, title: '', category: '', description: '', date: '', city: '', venue: '' };

    const [activity, setActivity] = useState(initialState)

    const handleSubmit = () => {
        handleCreateOrEdit(activity);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {

        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    const handleDropDownChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        event.preventDefault();
        const { value } = data;
        activity.category = value === undefined ? '' : value.toString();
        setActivity({ ...activity });
    }


    const handleCategories = () => {

        var categories: any = [];
        Object.keys(Categories).filter((v) => isNaN(Number(v))).forEach((c) => {

            var category: any = {};
            var image: any = {}
            category.key = c;
            category.text = c;
            category.value = c;
            image.avatar = false;
            image.src = `/Assets/Categories/${c}.jpg`
            category.image = image;
            categories.push(category);

        })

        return categories;

    }




    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />

                <Dropdown
                    placeholder='Select a Category'
                    fluid
                    selection
                    options={handleCategories()}
                    name='category'
                    value={activity.category}
                    onChange={handleDropDownChange}
                    className='field'
                />

                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

            </Form>

        </Segment>
        
        );

}

export default ActivityForm;