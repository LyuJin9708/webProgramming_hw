import React from 'react'
import '../css/home.css'
import Header from '../components/Header'
import Nav from '../components/Nav'
import img0 from '../imges/image0.jpeg'

const home = () => {
    return (
        <>
            <Header />
            <Nav />
            <section className='home'>
                <div><h1>COVID-19 홈페이지</h1></div>
                <div>
                    <img className='homeimage' alt='배경 사진' src={img0} />
                </div>
            </section>
        </>
    )
}

export default home
