import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom'
import { GameResult, SetupInfo } from './front-end-model';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'


interface PlayProps {
    addGameResultFunc: (r: GameResult) => void;
    setupInfo: SetupInfo;
};

export const Play: React.FC<PlayProps> = ({
    addGameResultFunc
    , setupInfo
}) => {

    console.log(setupInfo);

    const [happened, setHappened] = useState(false);

    const nav = useNavigate();

    const endGame = (winner: string) => {

        addGameResultFunc({
            winner: winner
            , players: setupInfo.chosenPlayers
            , start: setupInfo.start
            , end: new Date().toISOString()
            , reallyCoolThingHappened: happened
        });

        nav(-2);
    };

    return (
        <>
            <h2>
                Play
            </h2>
            <p>
                <Form.Check
                    inline
                    label="Really cool thing happened"
                    type='switch'
                    checked={happened}
                    onChange={(e) => setHappened(e.target.checked)}
                />
            </p>

            <Accordion flush>
            {
                setupInfo.chosenPlayers.map((player, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{player}</Accordion.Header>
                        <Accordion.Body>
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
            </Accordion>
            
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