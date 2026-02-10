import type { Cycle } from "./reducer";

//No Processo do reducer vc cria primeiro as possibilidades de ações que voce precisa. Simplificando e organizando tudo nessas frases usando o enum ou um type

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

//Função para dar o sinal de quando foi criado e iniciado um novo ciclo

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
            newCycle,
        },
    }
}

//Função para dar o sinal de quando o ciclo for interrompido no meio

export function interruptCurrentCycleAction() {
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}


//Função para dar o sinal de quando o ciclo atual estiver terminado

export function markCurrentCycleAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    }
}