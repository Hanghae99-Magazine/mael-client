import React, {useState}from 'react';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const Card = (props) => {
    const {name, date, image, like, desc } = props;
    const [isToggled, setIsToggled] = useState(false)

    const handleToggle = () => {
        setIsToggled(isToggled => !isToggled)
    }
    return (
        <div className='card'>
            <div className='card-top'>
                <h2 className='nickname'>{name}</h2>
                <div className='card-date'>
                    <span>{date}</span>
                    <button onClick={() => {console.log("수정")}}>수정</button>
                </div>
            </div>
            <div 
            className='card-image'
            style={{
                backgroundImage:`url(${image})`,
                backgroundSize:"cover",
                backgroundPosition:"center"
            }}
            ></div>
            <div className='card-bottom'>
                <button className='btn-like' onClick={handleToggle}>
                    {isToggled ? <MdFavorite fontSize="28"/> : <MdFavoriteBorder fontSize="28"/>}
                    {/* <MdFavoriteBorder fontSize="28"/> */}
                </button>
                <span>좋아요 {like}개</span>
            </div>
            <div className='card-desc'>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default Card;