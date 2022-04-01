import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterAndSort, getAllGallery, categoriesTypes, getFindGallery} from "../redux/actions/galleryActions"
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Select from 'react-select'
import './styles/SCO.css'

const SCO = ({setCurrentPage}) => {

    const items = useSelector(state => state.galleryReducer.allGallery)
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        search: '',
        category: '',
        sort: '',
    })

    // VALUES FOR REACT SELECT
    let optionCategories = [
        {value: '', label: 'Categorías'},
        {value: 'Ceramic', label: 'Ceramic'},
        {value: 'Drawing', label: 'Drawing'},
        {value: 'Painting', label: 'Painting'},
        {value: 'Sculpture', label: 'Sculpture'},
        {value: 'Wood', label: 'Wood'},
        {value: 'Textile', label: 'Textile'},
        {value: 'Metalwork', label: 'Metalwork'}
    ]

    let optionSort = [
        {value: '', label: 'Ordenar'},
        {value: 'AtoZ', label: 'A - Z'},
        {value: 'ZtoA', label: 'Z - A'},
    ]

    function handleCategories(e){setInput({...input, category:e.value})}
    function handleSort(e){setInput({...input, sort:e.value})} 

    const handleOnSearch = (string) => {
        setInput({ ...input.search, search: string })
    }

    const handleOnSelect = (item) => {
        setInput({ ...input.search, search: item.title })
    }

    const handleOnClear = () => {
        dispatch(getAllGallery())
    }

    useEffect(() => {
        
        if (input.search) {
            setCurrentPage(1)
            dispatch(getFindGallery(input.search))
        } else {
            dispatch(getAllGallery())
        }

        if(input.category || input.sort) {
            setCurrentPage(1)
            dispatch(filterAndSort(input.category, input.sort))
        }else{
            setCurrentPage(1)
            dispatch(filterAndSort(input.category, input.sort))
        }

        dispatch(categoriesTypes());
    }, [dispatch, input.search, input.category, input.sort])

    return (
        <div className='sco'>
            <label className='sco--title'>Galería</label>
            <div className='sco--components'>
                <div style={{ width: '30%' }}>
                    <ReactSearchAutocomplete
                        items={items}
                        placeholder="Buscar"
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        onClear={handleOnClear}
                        value={input.search}
                        fuseOptions={{ keys: ["title", "description"] }}
                        resultStringKeyName="title"
                        showIcon={true}
                        styling={
                            {
                                height: "34px",
                                border: "none",
                                borderRadius: "10px",
                                backgroundColor: "rgb(245, 245, 245)",
                                boxShadow: "none",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                                placeholderColor: "rgb(100, 100 ,100)"
                            }
                        }
                    />
                </div>
                <div className='sco--selects'>
                    <Select
                        defaultValue={optionCategories[0]}
                        onChange={handleCategories}
                        name="categories"
                        options={optionCategories}
                    />
                    <Select
                        defaultValue={optionSort[0]}
                        onChange={handleSort}
                        name="sort"
                        options={optionSort}
                    />
                </div>
            </div>
        </div>
    );
}

export default SCO;