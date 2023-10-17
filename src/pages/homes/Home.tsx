// import './Home.scss'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default function Home() {

    return (
        <div className='home_page'>
            <div className='home_page_content'>
                {/* Header */}
                <NavBar />

                {/* Body */}
                <div className='home_page_content_body'>
                    <Outlet />
                </div>


                {/* Footer */}
                <Footer />
            </div>

        </div>
    )
}
