import MainPage from "../pages/MainPage";
import Login from "../pages/Login";
import CardList from "../pages/CardList";
import CreateCard from "../pages/CreateCard";

const routes = [
  { path: "/login", component: Login, protected: false },
  { path: "/main", component: MainPage, protected: true },
  { path: "/cards", component: CardList, protected: true },
  { path: "/cards/create", component: CreateCard, protected: true },
];

export default routes;