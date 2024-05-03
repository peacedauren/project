import { useEffect, useState } from 'react'
import { Square } from '../Square/Square'
import './Field.scss'

type TSquare = {
    number: number,
    clicked: boolean;
}


export const Field = () => {
    const nullField: TSquare[] = [
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
        {number: 0, clicked: false},
    ];

    const [field, setField] = useState<TSquare[]>(nullField);
    const [clickCounter, setClickCounter] = useState<number>(0);

    const RandomSquare = () => {
        return Math.floor(Math.random() * 35 + 1);
    };

    const RandomId = () => {
        return Math.floor(Math.random() * Date.now());
    }

    const onNewGameHandler = () => {
        const random = RandomSquare();
        const copyField = nullField;
        copyField[random].number = 2;
        console.log(copyField);
        setField([...copyField]);
        setClickCounter(0);
    }

    useEffect(() => {
        onNewGameHandler();
    }, [0])

    const onClickCounterHandler = (index: number) => {
        setClickCounter(prev => (prev + 1));
        const copyField = field;
        copyField[index].clicked = true;
        if(field[index].number === 0) {
            copyField[index].number = 1;
            setField([...copyField]);
        } else if(field[index].number === 2) {
            copyField[index].number === 3;
            setField([...copyField]);
        }
    }

    return(
        <div className="field">
            <div className="gaming-field">
                {
                    field.map((square, index) => (
                        square.number === 1
                        ?
                            <Square 
                                key={RandomId()} 
                                number={square.number} 
                                onClickCounter={() => onClickCounterHandler(index)}
                                squareColor='red'
                                clicked={square.clicked}
                            />
                        : 
                            <Square 
                                key={RandomId()} 
                                number={square.number} 
                                onClickCounter={() => onClickCounterHandler(index)} 
                                squareColor='green'
                                clicked={square.clicked}
                            />
                    ))
                }
            </div>
            <div className="attempt">{clickCounter}</div>
            <button onClick={onNewGameHandler}>New Game</button>
        </div>
    )
}