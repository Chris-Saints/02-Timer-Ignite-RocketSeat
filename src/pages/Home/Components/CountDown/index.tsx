import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContexts";

export function CountDown() {

    const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondePassed, setSecondsPassed } = useContext(CyclesContext)
    
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    
    //Aqui é toda a logica do tempo passando e Tambem quando o tempo acabar qual ação deve tomar

    useEffect(() => {
        let interval: number

        if(activeCycle) {
            interval = setInterval(() => {

                const secondsDifference = differenceInSeconds(
                    new Date(),
                    new Date(activeCycle.startDate)
                )

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished();
                    setSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                setSecondsPassed(secondsDifference);
                }
                
                
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }


    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondePassed : 0;
    
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');
    

    //Imprimir os valores colocados de tempo no titulo da aba
    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    
    }, [minutes, seconds, activeCycle])

    return( 
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}