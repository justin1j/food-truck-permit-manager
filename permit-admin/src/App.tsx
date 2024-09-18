import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient';
import { Login } from './Pages/Login';
import { Permits } from './Pages/Permits';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/permits' element={<Permits />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
