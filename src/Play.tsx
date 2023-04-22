import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { GameResult, SetupInfo } from './front-end-model';
import Form from 'react-bootstrap/Form';


interface PlayProps {
    addGameResultFunc: (r: GameResult) => void;
    setupInfo: SetupInfo;
};

export const Play: React.FC<PlayProps> = ({
    addGameResultFunc
    , setupInfo
}) => {

    console.log(setupInfo);

    const nav = useNavigate();

    const endGame = (winner: string) => {

        addGameResultFunc({
            winner: winner
            , players: setupInfo.chosenPlayers
            , start: setupInfo.start
            , end: new Date().toISOString()
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
            
            {
                setupInfo.chosenPlayers.map(x => (
                    <Button
                        variant="outline-primary"
                        onClick={() => endGame(x)}
                    >
                        {x} Won
                    </Button>
                ))
            }
        </>
    )
};