import { HandPalm, Play } from "phosphor-react";
import {  HomeContainer, StartCountdownButton, StopCountdownButton,  } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext} from "react";
import { NewCycleForm } from "./Components/NewCycleForm";
import { CountDown } from "./Components/CountDown";
import { CyclesContext } from "../../contexts/CyclesContexts";

//Zod é uma lib de Validação de forms externa, que facilita e simplifica todo esse processo

//Essa const está sendo feito para ser uma base para a Tipagem e validação da form
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a Tarefa'), //task tem que ser uma string com minimo de lenght e com a mensagem caso não seja preenchido
    owner: zod.string().optional(), //O nome de quem fez, mas é opcional
    minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.') //O tempo do ciclo tem que ser em number e deve ter no min 5 min e no max 60 min
})

//Aqui o zod infere que o tipo NewCycleFormData possui os tipos e valores do newCycleFormValidationSchema
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>




export function Home() {

    //Importando funções e variaveis do context
    const { createNewCycle, InterruptCurrentCycle, activeCycle } = useContext(CyclesContext)
    

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema), //Aqui faz os dados passarem pelo zod, para a validação
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    //Acessando funções disponiveis pelo zod, já que newCycleForm é um Formulário
    const { handleSubmit, watch, reset } = newCycleForm


    function handleCreateNewCycle (data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task; //Define se o Botão pode ser apertado ou não


    return (  
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>

                <CountDown />
            
                {/* Se não um Outro */}
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