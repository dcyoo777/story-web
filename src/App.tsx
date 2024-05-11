import {BrowserRouter} from "react-router-dom";
import RootRouter from "./router/RootRouter";
import store from './redux';
import {Provider} from 'react-redux';

function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <RootRouter/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
