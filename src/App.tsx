import { Route, Switch } from 'wouter';
import './App.css';
import { UserDetail } from './pages/user-detail/user-detail';
import { UserList } from './pages/user-list/user-list';
import { Home } from './pages/home/home';
import { UserAdd } from './pages/user-add/user-add';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/about">About us</Route>
        <Route path="/" component={Home} />
        <Route path="/users" component={UserList} />
        <Route path="/users/add" component={UserAdd} />
        <Route path="/users/:id">
          {(params) => <UserDetail userId={params.id} />}
        </Route>
        <Route>404: No such page!</Route>
      </Switch>
    </>
  );
};

export default App;
