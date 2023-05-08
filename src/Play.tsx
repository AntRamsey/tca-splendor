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
    addGameResultFunc,
    setupInfo
}) => {

    console.log(setupInfo);

    const [happened, setHappened] = useState(false);

    const [mostCards, setMostCards] = useState(0);

    const nav = useNavigate();

    const endGame = (winner: string) => {

        addGameResultFunc({
            winner: winner,
            players: setupInfo.chosenPlayers,
            start: setupInfo.start,
            end: new Date().toISOString(),
            mostCardsOwned: mostCards
        });

        nav(-2);
    };

    const handleCardChange = (playerName: string, value: number) => {
        // You can implement this function to update the number of cards for a player
        console.log(`Number of cards for ${playerName}: ${value}`);

        if (value > mostCards)
            setMostCards(value);
        
    };

    const handlePointsChange = (playerName: string, value: number) => {
        // You can implement this function to update the number of points for a player
        console.log(`Number of points for ${playerName}: ${value}`);

        if (value >= setupInfo.scoreToWin)
            endGame(playerName);
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
                {setupInfo.chosenPlayers.map((player, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{player}</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId={`cards-${index}`}>
                                    <Form.Label>Number of Cards</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue="0"
                                        onChange={(e) => handleCardChange(player, parseInt(e.target.value))}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId={`points-${index}`}>
                                    <Form.Label>Number of Points</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue="0"
                                        onChange={(e) => handlePointsChange(player, parseInt(e.target.value))}
                                    />
                                </Form.Group>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
};