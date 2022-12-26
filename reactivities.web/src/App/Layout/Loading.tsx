import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    content: string;
}

const Loading = ({ content }: Props) => {

    return (

        <Dimmer active={true}>
            <Loader content={content} />
            </Dimmer>

        )

}

export default Loading;