import { ThemeProvider } from '@material-ui/core/styles';
import { QueryClient, QueryClientProvider } from "react-query";
import { injectStyle } from "react-toastify/dist/inject-style";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer} from "react-toastify";
import { Provider } from 'react-redux';
import theme from './styles/theme';
import configureStore from './redux/store';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ProfilePage from './pages/profile-page';
import Navbar from './components/bars/header/header';
import IllnessPage from './pages/illness-page';
import AnalyzesPage from './pages/analyzes-page';
import MoodPage from './pages/mood-page';
import MentalPage from './pages/mental-page';
import ResultsPage from './pages/results';
import AdminPage from './pages/admin-page';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
if (typeof window !== "undefined") {
  injectStyle();
}

export const store = configureStore();

function App() {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
    <Navbar />
    <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/register">
          <RegisterPage/>
        </Route>
        <Route path="/profile">
        <ProfilePage/>
      </Route>
      <Route path="/analyzes">
      <AnalyzesPage/>
    </Route>
    <Route path="/moods">
      <MoodPage/>
    </Route>
    <Route path="/mental">
      <MentalPage/>
    </Route>
    <Route path="/results">
    <ResultsPage/>
  </Route>
  <Route path="/admin">
  <AdminPage/>
</Route>
      <Route path="/illness">
        <IllnessPage/>
      </Route>
      </Switch>
      <ToastContainer />
      <CssBaseline />
    </ThemeProvider>
    </QueryClientProvider>
    </Provider>
  );
}

export default App;
