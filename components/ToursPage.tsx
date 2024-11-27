'use client';

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getAllTours } from '@/utils/action';
import ToursList from './ToursList';

const ToursPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const {data, isPending } = useQuery({
        queryKey:['tours', searchValue],
        queryFn:()=> getAllTours(searchValue)
    })
  return (
    <>
        <form className='max-w-lg mb-12'>
            <div className='join w-full'>
                <input type='text' placeholder='Enter city or country here...' 
                className='input input-bordered join-item w-full' 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                required
                />
                <button className='brn btn-primary join-ite,' type='button'
                disabled = {isPending} onClick={() => setSearchValue('')}>
                    {isPending ? 'Please wait....' : 'reset'}
                </button>
            </div>

        </form>
        {isPending? <span className='loading'></span>:
            <ToursList data = {data} />
        }
    </>
  )
}

export default ToursPage