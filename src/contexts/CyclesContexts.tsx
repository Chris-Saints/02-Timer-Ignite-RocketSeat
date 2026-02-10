import { createContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { cyclesReducer, type Cycle } from '../reducers/cycles/reducer'
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondePassed: number
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    InterruptCurrentCycle: () => void
}


interface CyclesContextProviderProps {
    children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType)


//Children representa os componentes que vão ser filho do Provider e receberão suas propriedades
export function CyclesContextProvider({ children }: CyclesContextProviderProps) {


    //Acessa todas os Cases do cycleReducer e inicializa ele
    const useCycle = () => useReducer(cyclesReducer,

    //Esse é o Estado Inicial do Reducer, representa o Formato do que vai ter dentro dele
    {
        cycles: [],
        activeCycleId: null
    }, 


    //Essa é a parte de Inicialização do Reducer, que Recupera os Dados Salvos no LocalStorage e salva no valor inicial do Reducer
    (initialState) => {
        const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }

        return initialState
    })


    //cycleState é um nome criado agora ele possui o valor inicial do reducer
    const [cyclesState, dispatch] = useCycle()

    
    //Uma desestruturação do cycleState, Fazendo a gente Acessarr as propriedades que ele possui
    const { cycles, activeCycleId } = cyclesState
    

    //Apenas para achar o Ciclo Ativo a Partir do seu ID
    const activeCycle = cycles.find((cycle) => cycle.id === 
    activeCycleId);
  

    //Um State para Guardar quantos segundos se passara
    const [ amountSecondePassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            )
        }

        return 0
    })

    //Use Effect para cada vez que o cyclesState for mudado, adicionar e salvar no localStorage
    useEffect(() => {

        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)

    }, [cyclesState])


    //Essas São funções Criadas para os Componentes filhos poderem usar

    function markCurrentCycleAsFinished() { 
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {

        //O id do novo ciclo é o horario que ele foi criado
        const id = String(new Date().getTime())

        //Usa as informações do data para preencher as propriedades necessarias
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        //Ativa a Função do Reducer
        dispatch(addNewCycleAction(newCycle))
        //E seta os Seconds Passed Para Zero
        setAmountSecondsPassed(0)

    }

    function InterruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }


    //Agora ele pega tudo que foi pré-Setado e Deixa disponivel para os componentes filhos
    return(
        <CyclesContext.Provider 
            value={{ 
                activeCycle, 
                activeCycleId, 
                markCurrentCycleAsFinished, 
                amountSecondePassed, 
                setSecondsPassed,
                createNewCycle,
                InterruptCurrentCycle,
                cycles
            }}
        >
            {children}
       </CyclesContext.Provider>
    )
}
