import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <NotLoggedin/>
  )
}

const Loggedin = () => {
    return (
        <div className='header'>
            <div className='wrap'>
                <Link to="/">
                    <h1 className='logo'>MAGAZINE</h1>
                </Link>
                <div className='btn-wrap'>
                    <Link className='hd-btn' to="register">
                        <span>알림</span>
                        <span className='hd-badge'>0</span>
                    </Link>
                    <Link className='hd-btn' to="login">로그아웃</Link>
                </div>
            </div>
        </div>
    )
}

const NotLoggedin = () => {
    return (
        <div className='header'>
            <div className='wrap'>
                <Link to="/">
                    <h1 className='logo'>MAGAZINE</h1>
                </Link>
                <div className='btn-wrap'>
                    <Link className='hd-btn' to="register">회원가입</Link>
                    <Link className='hd-btn' to="login">로그인</Link>
                </div>
            </div>
        </div>
    )
}

export default Header