import HeaderComponent from './components/header/header.component'
import { DataContextProvider } from './context/data.context'
import HomeView from './view/view.component'

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
