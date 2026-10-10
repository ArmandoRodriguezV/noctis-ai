import { createBrowserRouter } from 'react-router-dom';
import Home from '../../presentation/pages/Home/Home';

export class Router {
    public static readonly HOME = "/";

    public static router = createBrowserRouter([
        {
            element: <Home />,
            path: this.HOME
        }
    ]);
}