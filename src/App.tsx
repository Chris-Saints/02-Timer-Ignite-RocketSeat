import { ThemeProvider } from 'styled-components';
import {BrowserRouter} from 'react-router-dom';

import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Router } from './Router';
import { CyclesContextProvider } from './contexts/CyclesContexts';



export function App() {


  //Aqui é onde o CyclesContextProvider esta Abraçando seus componentes filhos
  return (
  <ThemeProvider theme={defaultTheme}>
    <BrowserRouter>

      <CyclesContextProvider>
        
        <Router />
        
      </CyclesContextProvider>
      
        
    </BrowserRouter>
    <GlobalStyle />
  </ThemeProvider>
  )
}
