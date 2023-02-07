import HeaderComponent from './components/header/header'
import { DataContextProvider } from './context/data.context'
import HomeView from './view'
import './assets/styles/style.scss';

function App() {

  return (
    <DataContextProvider>
      <main>
        <HeaderComponent />
        <HomeView />
      </main>
    </DataContextProvider>
  )
}

export default App
