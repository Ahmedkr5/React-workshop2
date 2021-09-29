import React, { Suspense ,useState} from "react";
import styled from "styled-components";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import UpdateProduct from "./components/Update";
const Welcome = React.lazy(() => import("./views/Welcome"));
const Products = React.lazy(() => import("./views/Products"));
const ProductDetail = React.lazy(() => import("./views/ProductDetail"));

function App() {

  const [connectedUser, setConnectedUser] = useState(null);

  return (
    <>
    <UserContext.Provider value={[connectedUser, setConnectedUser]}>
    <Header></Header>
    <AppFrame className="App">
    <BrowserRouter basename="/">
    <Suspense fallback={<p>...Loading page please wait</p>}>
    {connectedUser ? (
    <Switch>
    <Route
    path="/welcome"
    render={(props) => <Welcome {...props} />}
    ></Route>
    <Route
    path="/products"
    render={(props) => <Products {...props} />}
    ></Route>
    <Route
    path="/product/:name"
    render={(props) => <ProductDetail {...props} />}
    ></Route>
    <Route
path="/update/:id"
render={(props) => <UpdateProduct {...props} />}
></Route>
    <Route
    exact
    render={() => (
    <p>Default rendered page! Welcome {connectedUser.name}</p>
    )}
    ></Route>
    </Switch>
    ) : (
      <Switch>
      <Route
      path="/welcome"
      render={(props) => <Welcome {...props} />}
      ></Route>
      <Route
      path="/login"
      render={(props) => <Welcome {...props} />}
      ></Route>
      <Route
      path="/products"
      render={(props) => <Products {...props} />}
      ></Route>
      <Route
      path="/product/:name"
      render={(props) => <ProductDetail {...props} />}
      ></Route>
<Route
exact
render={() => <p>You are not logged in!</p>}
></Route>
</Switch>
)}
</Suspense>
</BrowserRouter>
</AppFrame>
</UserContext.Provider>
</>
  );
}
const AppFrame = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;
export default App;
