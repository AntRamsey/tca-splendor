import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'

export const Home = () => {

    const nav = useNavigate();

    return (
    <>
      <Button 
        variant="outline-primary"
        onClick={() => nav("/setup")}
      >
        Play Splendor
      </Button>
      <Card
        className='mt-3'
      >
        <Card.Header>
          Leaderboard
        </Card.Header>
        <Card.Body>
          Play a game to see your leaderboard...
        </Card.Body>
      </Card>
    </>
  )
};