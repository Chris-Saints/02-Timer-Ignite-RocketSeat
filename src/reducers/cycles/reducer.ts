import { ActionTypes } from "./actions";
import { produce } from "immer"

//Interface com todas a spropriedades necessarias sobre o ciclo

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}



interface CycleState {
    cycles: Cycle[]
    activeCycleId: string | null
}



export function cyclesReducer(state: CycleState, action: any) {

        switch(action.type) {

            //Esse Case Pega o State Adiciona o Ciclo Recem Criado, adiciona ao Array de Ciclos e adiciona o ID dele no Id de ciclo Ativo

            case ActionTypes.ADD_NEW_CYCLE: {

                return produce(state, (draft) => {

                    //Adiciona o novo Ciclo ao Array de Ciclos
                    draft.cycles.push(action.payload.newCycle);

                    //O Id do ciclo ativo recebe o Id Do novo ciclo criado
                    draft.activeCycleId = action.payload.newCycle.id
                })
                
                // return {
                //     ...state,
                //     cycles: [...state.cycles, action.payload.newCycle],
                //     activeCycleId: action.payload.newCycle.id
                // }

            }

            //Esse Case pega o id do ciclo atual como referencia e guarda na const currentCycleIndex, depois verifica para não dar erro, caso seja necessario, e retorna um novo dado modificando o state com o produce apagando o id do ciclo atual, por ter terminado e preenchendo a informação sobre o horario de Interrupção do ciclo.

            case ActionTypes.INTERRUPT_CURRENT_CYCLE: {

                const currentCycleIndex = state.cycles.findIndex((cycle) => {
                    return cycle.id === state.activeCycleId
                })

                if(currentCycleIndex < 0) {
                    return state
                }

                return produce(state, (draft) => {
                    draft.activeCycleId = null
                    draft.cycles[currentCycleIndex].interruptedDate = new Date()
                })

                // return {
                // ...state,
                // cycle: state.cycles.map(cycle => {
                //     if(cycle.id === state.activeCycleId) {
                //         return {...cycle, interruptedDate: new Date() }
                //     } else {
                //         return cycle
                //     }
                //     }),
                //     activeCycleId: null
                // }
            }
             
            //Esse Case pega o id do ciclo atual como referencia e guarda na const currentCycleIndex, depois verifica para não dar erro, caso seja necessario, e retorna um novo dado modificando o state com o produce apagando o id do ciclo atual, por ter terminado e preenchendo a informação sobre o horario de termino do ciclo.

            case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {

                //Const para achar o Ciclo exato que esta ativo baseado nos ids -> A informação aqui vira o index/number
                const currentCycleIndex = state.cycles.findIndex((cycle) => {
                    return cycle.id === state.activeCycleId
                })

                //Se o index/number for menor que 0 retorna o state. Verificação de segurança
                if(currentCycleIndex < 0) {
                    return state
                }

                //OBS: O Produce importado do Immer faz com que a gente torne mutavel o que é imutavel, ou seja, uma const que é sempre uma coisa com o produce pode ser mudada. O processo é:
                return produce(state, (draft) => {
                    //O draft aqui é um rascunho do state real. Voce pega o state como base e cria um rascunho onde voce modifica o que quer e no final ele compara as diferenças e cria um novo dado a partir disso

                    //Aqui ele o id do ciclo atual, já que ele acabou
                    draft.activeCycleId = null

                    //Aqui ele anota o horario em que o ciclo atual acabou
                    draft.cycles[currentCycleIndex].finishedDate = new Date()
                })

                // return {
                // ...state,
                // cycle: state.cycles.map(cycle => {
                //     if(cycle.id === state.activeCycleId) {
                //         return {...cycle, interruptedDate: new Date() }
                //     } else {
                //         return cycle
                //     }
                //     }),
                //     activeCycleId: null
                // }
            }   

            //Se não tiver nada retorna o state
            default:
                return state
        }
    }

export { ActionTypes };
