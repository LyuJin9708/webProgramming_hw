import React from 'react'

const Nav = () => {
    return (
        <nav class="nav">
            <ul id="main_menu">
                <li type="none"><a href="index.html">HOMEPAGE</a></li>
                <li type="none"><a href="covid-19.htm">COVID-19</a></li>
                <li type="none"><a href="covid-condition.htm">국내 코로나 현황</a></li>
                <li type="none"><a href="covid-vaccine.htm">코로나 백신</a></li>
                <li type="none"><a href="vaccine-allergie.htm">백신 이상 반응</a></li>
                <li type="none"><a href="social-distance.htm">사회적 거리두기</a></li>
            </ul>
        </nav>
    )
}

export default Nav
