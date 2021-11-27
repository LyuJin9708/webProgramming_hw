import {useState,useEffect} from 'react' 
import axios from 'axios'; //api를 호출하는 라이브러리 axios
import { Bar, Doughnut, Line } from "react-chartjs-2" //charts에서 사용할 라이브러리형태 불러오기
import Chart from 'chart.js/auto'

const Contents = () => {

    const [confirmedData, setConfirmedData] = useState({datasets:[]}) //confirmedData define
    const [quarantinedData, setQuarantinedData] = useState({datasets:[]}) //quarantinedData define
    const [comparedData, setComparedData] = useState({datasets:[]}) //quarantinedData define

    useEffect(() => { // axios로 covid-19 data를 covid19api.com에서 받기
        
        const fetchEvents = async () => { //api data를 불러오는것이 끝나면 res에 data 입력
            const res =  await axios.get("https://api.covid19api.com/total/dayone/country/kr") //res 변수에 get함수를 이용해 data 불러옴.
            // console.log(res);
            makeData(res.data)
        }
        const makeData = (items)=>{
            const arr = items.reduce((acc, cur)=>{
                const currentDate = new Date(cur.Date); //Date 저장 변수
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();

                const confirmed = cur.Confirmed; //Confirmed 저장 변수
                const active = cur.Active; //Active 저장 변수
                const deaths = cur.Deaths; //Deaths 저장 변수
                const recovered = cur.Recovered; //Recovered 저장 변수
                // console.log(cur,year,month,date)

                const findItem = acc.find(a=>a.year===year && a.month===month);
                if(!findItem){ //만약 'a.year===year && a.month===month'(월말 데이터) 가 아니라면? -> 초기화
                    acc.push({year:year, month:month, date:date, confirmed:confirmed, active:active, deaths:deaths, recovered:recovered})
                }
                if(findItem && findItem.date < date){ //'a.year===year && a.month===month'가 있고, 날짜가 더 크다면?
                    findItem.active = active; //해당 data를 update
                    findItem.deaths = deaths;
                    findItem.year = year;
                    findItem.month = month
                    findItem.date = date;
                    findItem.recovered = recovered;
                    findItem.confirmed = confirmed;
                }

                return acc;
            }, []) //acc:누적값, cur:현재item값

            console.log(arr)

            setConfirmedData({
                labels :arr.map(a=> `${a.month+1}월`), //Template literals
                datasets : [
                    { 
                        label: "국내 누적 확진자", //label이름
                        backgroundColor: "salmon", //backgrondColor
                        fill:true, //그래프 배경색 채우기
                        data: arr.map(a=>a.confirmed)
                    },
                ]
            });
            setQuarantinedData({
                labels :arr.map(a=> `${a.month+1}월`), //Template literals
                datasets : [
                    { 
                        label: "월별 격리자 현황", //label이름
                        borderColor: "skyblue", //boderColor
                        fill:false, //그래프 배경색 채우기
                        data: arr.map(a=>a.active)
                    },
                ]
            });
            const last = arr[arr.length-5] //마지막 index만 호출 (recoverd data가 영상과는 달리 5개월전부터 update가 되지 않아 5개월전 데이터 사용.)
            setComparedData({
                labels : ["확진자","격리해제","사망"],
                datasets : [
                    { 
                        label: "누적확진, 해제, 사망 비율", //label이름
                        backgroundColor : ["#ff3d67","#059bff","#ffc233"], //backgroundColor
                        borderColor: ["#ff3d67","#059bff","#ffc233"], //boderColor
                        fill:false, //그래프 배경색 채우기
                        data: [last.confirmed, last.recovered, last.deaths] //마지막날의 누적(확진자, 회복, 사망) 데이터
                    },
                ]
            });
        }

        fetchEvents();
    }, [])
    
    return (
        <section>
            <h2>국내 코로나</h2>
            <div className='contents_home'>
                <div>
                    <Bar data={confirmedData} options={
                        {title : {display:true, text:"누적 확진자 추이", fontSize:16}}, //그래프의 제목
                        {legend : {display:true, position:"bottom"} } //그래프가 어떤것 뜻하는지
                    } />
                </div>
                <div>
                    <Line data={quarantinedData} options={
                        {title : {display:true, text:"월별 격리자 현황", fontSize:16}}, //그래프의 제목
                        {legend : {display:true, position:"bottom"} } //그래프가 어떤것 뜻하는지
                    } />
                </div>
                <div>
                    <Doughnut data={comparedData} options={
                        {title : {display:true, text:"누적확진, 해제, 사망 (`${new Date().getMonth()+1}`)", fontSize:16}}, //그래프의 제목
                        {legend : {display:true, position:"bottom"} } //그래프가 어떤것 뜻하는지
                    } />
                </div>

            </div>
        </section>
    )
}

export default Contents