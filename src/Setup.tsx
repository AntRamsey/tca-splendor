import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

export const Setup = () => {
    const nav = useNavigate();

    return (
        <>
            <h2>
                Setup
            </h2>
            <p>
                Some setup stuff...
            </p>
            <Button 
                variant="outline-primary"
                onClick={() => nav("/play")}
            >
                Start Game
            </Button>
        </>
    )
};