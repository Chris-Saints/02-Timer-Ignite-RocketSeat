
import { FormContainer, MinuteAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContexts";

export function NewCycleForm() {

    const {activeCycle } = useContext(CyclesContext)

    const { register } = useFormContext() //Register serve como name do form


    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>

            <TaskInput 
                id="task"
                list="task-suggestions"
                disabled = {!!activeCycle}
                placeholder="Dê um nome para o seu projeto"
                {...register('task')}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1" />
                <option value="Projeto 2" />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinuteAmountInput 
                type="number" 
                id="minutesAmount" 
                placeholder="00"
                step={5}
                min={5}
                max={60}
                disabled = {!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}