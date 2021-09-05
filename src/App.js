import {HomePage, LoginPage, ErrorPage, RegulatedRoute, Auth0Wrapper} from './routes/index.js'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

function App() {
  return (
    <Auth0Wrapper>
      <Router>
        <Switch>
          <RegulatedRoute path='/' exact>
            <HomePage />
          </RegulatedRoute>
          <Route path='/login' exact>
            <LoginPage />
          </Route>
          <Route path='*' exact>
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </Auth0Wrapper>
  );
}

export default App;
