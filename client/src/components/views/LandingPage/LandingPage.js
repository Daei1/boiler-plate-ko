import React,{useEffect}  from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { process_params } from 'express/lib/router';
function LandingPage(props){

    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => console.log(response.data))

    },[]
    )

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
        .then(response =>{
            if(response.data.success){
                props.history.push("/login")

            }else{
                console.log(response)
                alert('로그아웃실패')
            }
        })
    }


    return(
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
       , width : '100%', height:'100vh'
    }}>
        <h2>
            시작페이지 
        </h2>
        
        <button  onClick={onClickHandler}>
            로그아웃
        </button>
        </div>
    )
}

export default withRouter(LandingPage)