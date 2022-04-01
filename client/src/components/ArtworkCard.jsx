import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { storageFavorites, storageShop } from '../redux/actions/storageActions'
import { NavLink } from 'react-router-dom';
import {MdFavoriteBorder, MdOutlineFavorite} from 'react-icons/md'
import {RiShoppingBag3Line, RiShoppingBag3Fill} from 'react-icons/ri'
import Img from "react-cool-img";
import './styles/ArtworkCard.css'
import 'antd/dist/antd.min.css';


const GalleryCard = (props) => {

    const dispatch = useDispatch();
    const artwork = useSelector(state => state.galleryReducer.allGallery);
    const {shop, favorites} = useSelector(state => state.storageReducer);

    const handleArtworkShop = (id) => {
        let findArtwork = artwork.find(element => element.id === Number(id))
        dispatch(storageShop(findArtwork))
    }
    
    const handleArtworkFavorite = (id) => {
        let findFavorite = artwork.find(element => element.id === Number(id))
        dispatch(storageFavorites(findFavorite))
    }

    return (
        <div className='artwork-card'>
            <div className='artwork-image--container'>
                <NavLink to={`artwork/${props.id}`}>
                <Img src={props.img} className='artwork-img'/>
                </NavLink>
                <div className='favorite-btn' onClick={() => handleArtworkFavorite(props.id)}>
                    {
                        favorites.some(fav => fav.id === props.id) ? <MdOutlineFavorite/> : <MdFavoriteBorder/>
                    }
                </div>
            </div>
            <div className='artwork-actions'>
                <NavLink to={`artwork/${props.id}`}>
                    <label className='artwork-label--title'>{props.title}</label>
                </NavLink>
                <div className='artwork-div--row'>
                    <div className='artwork-price'>
                        <label className='artwork-label--priceTitle'>Precio</label>
                        <label className='artwork-label--price'>$ {props.price}</label>
                    </div>
                    <div className='artwork-addshop' onClick={() => handleArtworkShop(props.id)}>
                        {
                            shop.some(fav => fav.id === props.id) ? <RiShoppingBag3Fill/> : <RiShoppingBag3Line/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryCard;