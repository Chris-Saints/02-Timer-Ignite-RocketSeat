import { HandPalm, Play } from "phosphor-react";
import {  HomeContainer, StartCountdownButton, StopCountdownButton,  } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext} from "react";

import { NewCycleForm } from "./Components/NewCycleForm";
import { CountDown } from "./Components/CountDown";
import { CyclesContext } from "../../contexts/CyclesContexts";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a Tarefa'),
    owner: zod.string().optional(),
    minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>






export function Home() {
    const { createNewCycle, InterruptCurrentCycle, activeCycle } = useContext(CyclesContext)
    

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle (data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

   



    const task = watch('task')
    const isSubmitDisabled = !task


    return (  
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />
            
                

                {activeCycle ? (
                    <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
                    <HandPalm size={24} />
                    Interromper
                </StopCountdownButton>
                ): (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}