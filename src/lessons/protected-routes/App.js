import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  },
};

const Public = () => <h2>Public</h2>;

const Protected = () => <h2>Protected</h2>;

const Login = (props) => {
  const [state, setState] = React.useState(() => ({
    redirectToReferrer: false,
  }));
  const { redirectToReferrer } = state;
  const { from } = props.location.state || { from: "/" };

  function login() {
    fakeAuth.authenticate(() => {
      setState({ redirectToReferrer: true });
    });
  }

  return redirectToReferrer ? (
    <Redirect to={from} />
  ) : (
    <div>
      <p>You mush be logged in from {from}.</p>
      <button onClick={login}>Login</button>
    </div>
  );
};

const AuthButton = withRouter((props) => {
  function signOut() {
    fakeAuth.signout(() => {
      props.history.push("/");
    });
  }

  return fakeAuth.isAuthenticated ? (
    <div>
      <p>You are logged in</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  ) : (
    <p>You are logged out</p>
  );
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      /*
       - props here are match, location, history 
       - whenever a component is rendered using react router,
         the component is passed an object containg routing info. 
       */
      render={(props) => {
        console.log(props);
        return fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname },
            }}
          />
        );
      }}
    />
  );
};

function App() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
            <Link to="/public">public</Link>
          </li>
          <li>
            <Link to="/protected">protected</Link>
          </li>
        </ul>
      </div>

      <Route path="/public" component={Public}></Route>
      <Route path="/login" component={Login}></Route>
      <PrivateRoute path="/protected" component={Protected}></PrivateRoute>
    </Router>
  );
}

export default App;
