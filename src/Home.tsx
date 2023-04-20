import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Home = () => {
    return (
    <>
      <Button 
        variant="outline-primary"
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