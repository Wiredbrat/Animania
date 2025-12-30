import { lazy } from 'react';

const Footer = lazy(() => import('./components/Footer'));
const Header = lazy(() => import('./components/Header'));
const List = lazy(() => import('./components/List'));
const Searchbar = lazy(() => import('./components/Searchbar'));
const TiltCard = lazy(() => import('./components/TiltCard'));
const Home = lazy(() => import('./templates/Home'));
const DetailPage = lazy(() => import('./templates/DetailPage'));
const Card = lazy(() => import('./components/Card'));
const Button = lazy(() => import('./components/Button'));
const Recommendation = lazy(() => import('./templates/Recommendation'));
const Characters = lazy(() => import('./templates/Characters'));
const Trending = lazy(() => import('./templates/Trending'));
const TopRated = lazy(() => import('./templates/TopRated'));
const MostPopular = lazy(() => import('./templates/MostPopular'));
const Airing = lazy(() => import('./templates/Airing'));
const Carousel = lazy(() => import('./components/Carousel'));
const Pagination = lazy(() => import('./components/Pagination'));
const Movies = lazy(() => import('./templates/Movies'));
const Upcoming = lazy(() => import('./templates/Upcoming'));
const Loader = lazy(() => import('./components/Loader'));


export { Loader, Footer, Header, List, Searchbar, TiltCard, Home, DetailPage, Card, Button, Recommendation, Characters,Airing, MostPopular, TopRated, Trending, Movies, Upcoming, Carousel, Pagination};