import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Landing from '../components/Landing'
import Categories from '../components/SCO';
import ArtworkCard from '../components/ArtworkCard'
import Pagination from '../components/Pagination'
import { useSelector, useDispatch } from 'react-redux'
import { getAllGallery } from '../redux/actions/galleryActions'
import { Spin } from 'antd';
import 'antd/dist/antd.min.css'
import './styles/Home.css'

const Home = () => {

    const dispatch = useDispatch()
    const { allGallery, filteredGallery } = useSelector(state => state.galleryReducer)

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;
    const renderGallery = filteredGallery?.length > 0 ? filteredGallery : allGallery
    const currentArtwork = filteredGallery?.length > 0 ? filteredGallery.length : allGallery.length
    const total = Math.ceil(currentArtwork / postsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    useEffect(() => {
        dispatch(getAllGallery())
    }, [dispatch])


return (
    <div className='home'>
        <NavBar/>
        <div className='home--container'>
            <Landing/>
            <Categories setCurrentPage={setCurrentPage}/>
            {
                renderGallery?.length === 0 ?
                <div className='loading'>
                    <Spin tip="Loading" size='large'/> 
                </div> :
                <div className='grid--gallery'>
                    {
                        renderGallery?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map(art => (
                            <ArtworkCard 
                                img={art.images} 
                                title={art.title.length > 20 ? art.title.slice(0, 30) + "..." : art.title}
                                price={art.price} 
                                id={art.id} 
                                key={art.id}
                            />
                        )) 
                    }
                </div>
            }
            <Pagination total={total} handlePageChange={handlePageChange} currentPage={currentPage}/>
        </div>
    </div>);
}

export default Home;