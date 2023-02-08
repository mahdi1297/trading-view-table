import HeaderComponent from './components/header/header'
import { DataContextProvider } from './context/data.context'
import HomeView from './view'
import './assets/styles/style.scss';
import { data } from './data';
import { Sort } from './helper/sort';
import { Provider } from 'react-redux';
import store from './store';

function App() {

  return (
    <Provider store={store}>
      {/* <DataContextProvider> */}
      <main>
        <HeaderComponent />
        <HomeView />
      </main>
      {/* </DataContextProvider> */}
    </Provider>
  )
}

export default App
