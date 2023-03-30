import {Navbar, Welcome, Footer, Services, Transactions} from './components';

const App = () => {

  return (
    <div>
      Hello
      <div>
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
    </div>
  )
}

export default App
