import React from 'react'
import {Route,Link} from 'react-router-dom'
import Home from '../pages/home.js'
import Covid_19 from '../pages/covid_19.js'

const Nav = () => {
    return (
        <nav class="nav">
            <ul class="main_menu">
                <li type="none"><Link to="/">HOMEPAGE</Link></li>
                <li type="none"><Link to="/covid_19">COVID-19</Link></li>
                <li type="none"><a href="covid-condition.htm">국내 코로나 현황</a></li>
                <li type="none"><a href="covid-vaccine.htm">코로나 백신</a></li>
                <li type="none"><a href="vaccine-allergie.htm">백신 이상 반응</a></li>
                <li type="none"><a href="social-distance.htm">사회적 거리두기</a></li>
            </ul>
            <Route path="/" exact={true} component={Home} />
            <Route path="/covid_19" component={Covid_19} />
        </nav>
    )
}

export default Nav
