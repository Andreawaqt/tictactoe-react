import { useState, useEffect } from 'react';
import Ficha from './Ficha';

function Tablero() {
    const [fichas, setFichas] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    const [turno, setTurno] = useState(0);

    const WINNERS = [
        [0, 1, 2], // Combinación horizontal superior
        [3, 4, 5], // Combinación horizontal del medio
        [6, 7, 8], // Combinación horizontal inferior
        [0, 3, 6], // Combinación vertical izquierda
        [1, 4, 7], // Combinación vertical del medio
        [2, 5, 8], // Combinación vertical derecha
        [0, 4, 8], // Combinación diagonal de izquierda a derecha
        [2, 4, 6]  // Combinación diagonal de derecha a izquierda
    ];

    const turnoHandler = () => {
        setTurno(turno === 1 ? 0 : 1);
    };

    const fichasHandler = (index) => {
        if (fichas[index] !== -1) {
            return;
        }

        let newFichas = [...fichas];
        newFichas[index] = turno;
        setFichas(newFichas);
        if (!checkWinner(newFichas)) {
            turnoHandler();
        }
    };

    const movGanador = (player) => {
        for (let i = 0; i < WINNERS.length; i++) {
            const [a, b, c] = WINNERS[i];
            const line = [fichas[a], fichas[b], fichas[c]];
            if (line.filter(ficha => ficha === player).length === 2 && line.includes(-1)) {
                return [a, b, c].find(index => fichas[index] === -1);
            }
        }
        return null;
    };

    const movcpu = () => {
        let move = movGanador(1); // Intentar ganar
        if (move === null) {
            move = movGanador(0); // Bloquear al jugador 1
        }
        if (move === null) {
            let emptyIndices = fichas
                .map((ficha, index) => (ficha === -1 ? index : null))
                .filter(index => index !== null);
            move = emptyIndices.length > 0 ? emptyIndices[0] : null; // Elegir la primera casilla vacía
        }
        if (move !== null) {
            fichasHandler(move);
        }
    };

    useEffect(() => {
        if (turno === 1) {
            movcpu();
        }
    }, [turno]);
    
    const checkWinner = (fichas) => {
        let hayGanador = false;
        for (let i = 0; i < WINNERS.length; i++) {
            const [a, b, c] = WINNERS[i];
            if (fichas[a] === 0 && fichas[b] === 0 && fichas[c] === 0) {
                alert('El jugador 1 ha ganado!');
                hayGanador = true;
                break;
            } else if (fichas[a] === 1 && fichas[b] === 1 && fichas[c] === 1) {
                alert('El jugador 2 ha ganado!');
                hayGanador = true;
                break;
            }
        }

        if (!hayGanador && !fichas.includes(-1)) {
            alert('¡Empate!');
            return true;
        }

        return hayGanador;
    };

    return (
        <div className="container">
            <div className="row">
                {fichas.map((ficha, i) => (
                    <Ficha key={i} index={i} ficha={ficha} turno={turno} fichasHandler={fichasHandler} />
                ))}
            </div>
        </div>
    );
}

export default Tablero;
