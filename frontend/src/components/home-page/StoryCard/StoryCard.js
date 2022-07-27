import { useEffect, useState } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';

const StoryCard = () => {

    const [story, setStory] = useState({});

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('http://localhost:5001/stories'); // TODO: Remove mock data
                const randomStory = response.data[Math.floor(Math.random() * response.data.length)]; // Get a random story

                randomStory.date = new Date(randomStory.date).toLocaleDateString(); // Format date to readable format
                setStory(randomStory);
            } catch (error) {
                console.error("Error: " + error);

                setStory({
                    date: "unknown",
                    place: "unknown",
                    story: "unknown"
                })
            }
        }

        fetchStories();

    }, []);

    return (
        <Card style={{ minHeight: '250px', marginBottom: '1rem' }}>
            <Card.Body>
                <Card.Title><b>{story.date} at {story.place}</b></Card.Title>
                <Card.Text>
                    <em>"{story.story}"</em>
                </Card.Text>
            </Card.Body>
            <Card.Footer className='text-center'>
                {story.fullname}
            </Card.Footer>
        </Card>
    );
}

export default StoryCard;