import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { SetupInfo } from './front-end-model';
import { useState}  from 'react'
import Form from 'react-bootstrap/Form';

export interface SetupProps {
    previousPlayers: string[];
    setSetupInfo: (info: SetupInfo) => void;
};
export const Setup: React.FC<SetupProps> = ({
    previousPlayers
    , setSetupInfo
}) => {

    const nav = useNavigate();

    const [chosenPlayers, setChosenPlayers] = useState(
        previousPlayers.map(x => ({
            name: x
            , checked: false
        }))
    );

    const [newPlayerName, setNewPlayerName] = useState("");

    const togglePlayer = (name: string) => setChosenPlayers(
        chosenPlayers.map(x => ({
            ...x
            , checked: x.name == name ? !x.checked : x.checked
        }))
    );

    const startGame = () => {
        setSetupInfo({
            start: new Date().toISOString()
            , chosenPlayers: chosenPlayers
                .filter(x => x.checked)
                .map(x => x.name)
        });
        nav("/play");
    };

    const validateAndAddNewPlayer = () => {

        //Validate first...
        if (
            newPlayerName.length == 0
            || chosenPlayers.some(x => x.name.localeCompare(newPlayerName) == 0)
        ) {
            return;
        }

        setChosenPlayers([
            ...chosenPlayers
            , {
                name: newPlayerName
                , checked: true
            }
        ]);

        setNewPlayerName("");
    };

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
                onClick={startGame}
            >
                Start Game
            </Button>
            <Form
                className='mt-5'
            >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter a new player name"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                    />
                    <Button
                        onClick={validateAndAddNewPlayer}
                    >
                        Add
                    </Button>
                </Form.Group>  
                {
                    chosenPlayers.map(x =>(
                        <Form.Check
                            inline
                            label={x.name}
                            checked={x.checked}
                            onChange={() => togglePlayer(x.name)}
                        />
                    ))
                }
            </Form>
        </>
    )
};