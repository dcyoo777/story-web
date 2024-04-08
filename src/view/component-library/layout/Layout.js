import { Outlet } from 'react-router-dom';
import './Layout.scss';

function Layout() {
    return (
        <div id={'layout'}>
            <main>
                <div className='layout-container'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
