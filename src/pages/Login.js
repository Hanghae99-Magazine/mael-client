import React, { useState } from 'react'
import { BtnConfirm } from '../components/Buttons'
import { Text } from '../components/Inputs'

const Login = () => {
    const [user,setUser] = useState({
        userid:"",
        userpwd:"",
    })
    
    const onChange = (e) => {
        const {value, name} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    const handleClick = () => {
        console.log("아이디 :", user.userid)
        console.log("비밀번호 :", user.userpwd)
    }
    console.log(user)
    return (
        <div className='login'>
            <div className='wrapper'>
                <h1 className='title'>Login</h1>
                <div className='content'>
                    <Text 
                    type="text"
                    title="아이디" 
                    placeholder="아이디를 입력해주세요" 
                    name="userid"
                    value={user.userid}
                    onChange={onChange}
                    />
                    <Text 
                    type="password"
                    title="비밀번호" 
                    placeholder="비밀번호를 입력해주세요" 
                    name="userpwd"
                    value={user.userpwd}
                    onChange={onChange}
                    />
                    <BtnConfirm title="Login" onClick={handleClick}/>
                </div>
            </div>
        </div>
    )
}

export default Login