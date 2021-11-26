import {useState,useEffect} from 'react'
import axios from 'axios';
const Contents = () => {

    useEffect(() => {

        const fetchEvent = () => {
            const res =  axios.get("https://api.covid19api.com/total/dayone/country/kr")
            console.log(res)
        }

        fetchEvent()
    })
    
    return (
        <section>
          <h2>국내 코로나</h2>
          <div className='content'>


          </div>
        </section>
    )
}

export default Contents