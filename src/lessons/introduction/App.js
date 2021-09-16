import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Home = () => <div>HOME</div>;

const Dashboard = () => <div>DASHBOARD</div>;

const Topic = (props) => {
  console.log(props);
  return <div>{props.match.params.topicId}</div>;
};

const Topics = ({ match }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.url}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.url}
        render={() => <p>Please select a topic. </p>}
      ></Route>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <Route exact path="/" component={Home}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/topics" component={Topics}></Route>
    </Router>
  );
}

export default App;
