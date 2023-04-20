import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { GameResult } from './front-end-model';

interface PlayProps {
    addGameResultFunc: (r: GameResult) => void;
};

export const Play: React.FC<PlayProps> = ({addGameResultFunc}) => {

    const nav = useNavigate();

    const endGame = () => {

        addGameResultFunc({
            winner: "Larry"
            , players: ["Larry", "Curly", "Moe"]
        });

        nav(-2);
    };

    return (
        <>
            <h2>
                Play
            </h2>
            <p>
                Some data collection stuff...
            </p>
            <Button 
                variant="outline-primary"
                onClick={endGame}
            >
                Done
            </Button>
        </>
    )
};