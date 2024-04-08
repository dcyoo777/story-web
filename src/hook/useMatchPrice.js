import { useEffect, useState } from 'react';
import { socket } from 'action';

const useMatchPrice = (pairId = '-1', match_price) => {
    const [matchPrice, setMatchPrice] = useState('0');
    useEffect(() => {
        setMatchPrice(match_price);
    }, [match_price]);
    useEffect(() => {
        const roomName = `pair_${pairId}`;
        if (pairId !== '-1') {
            socket.emit('joinRoom', { roomName });
            socket.on('tick', match => {
                const { pair_id, match_price } = match;
                if (pair_id === pairId) {
                    setMatchPrice(match_price);
                }
            });
        }
        return () => {
            socket.emit('leaveRoom', { roomName });
        };
    }, [pairId]);
    return { matchPrice };
};

export default useMatchPrice;
