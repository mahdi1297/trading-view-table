import HeaderComponent from './components/header/header'
import HomeView from './view'
import './assets/styles/style.scss';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <main>
          <HeaderComponent />
          <HomeView />
        </main>
      </Provider>
    </>
  )
}

export default App
