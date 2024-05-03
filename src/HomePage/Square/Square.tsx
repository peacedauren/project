import { useEffect, useState } from 'react';
import './Square.scss'

type TSquare = {
    number: number;
    onClickCounter: VoidFunction;
    squareColor: string;
    clicked: boolean;
}

export const Square = (data: TSquare) => {

    return (
        <button className="square" style={{backgroundColor: data.clicked ? data.squareColor : "gray"}} onClick={data.onClickCounter} disabled={data.clicked}>
            <h1>{data.number}</h1>
        </button>
    );
}
