import React, { useState, useEffect, useRef } from 'react';
import useApi from 'components/utils/useApi';
import UIInfiniteScroll from 'components/UI/InfiniteScroll/InfiniteScroll';
import {Link} from 'react-router-dom';
import UIButton from 'components/UI/Button/Button';
import PromotionList from 'components/Promotion/List/PromotionList';
import './PromotionSearch.css';


const baseParams = {
    _embed: 'comments',
    _order: 'desc',
    _sort: 'id',
    _limit: 3,
};


const PromotionSearch = () => {
    const [page, setPage] = useState(1);
    const mountRef = useRef(null);
    const [search, setSearch] = useState('');
    const [load, loadInfo] = useApi({
        debounceDelay: 300,
        url: '/promotions',
        method: 'get',
    });

    useEffect(() => {
        load({
            debounced: mountRef.current,
            params: {
                ...baseParams,
                _page: 1,
                title_like: search || undefined,
            },
        });

        if(!mountRef.current){
            mountRef.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    function fetchMore() {
        const newPage = page + 1;
        load({
            isFetchMore: true,
            params: {
                ...baseParams,
                _page: newPage,
                title_like: search || undefined,
            },
            updateRequestInfo: (newRequestInfo, prevRequestInfo) => ({
                ...newRequestInfo,
                data: [...prevRequestInfo.data, ...newRequestInfo.data],
            }),
        });
        setPage(newPage);
    }

    return (
        <div className="promotion-search">
            <header className="promotion-seacrh__header">
                <h1>{`Gatry Clone`}</h1>
                <UIButton
                    component={Link}
                    theme="contained-green"
                    to="/create">{`Nova Promoção`}
                </UIButton>
            </header>
            <input 
                className="promotion-search__input" 
                type="search"
                placeholder="Buscar"
                value={search}
                onChange={(event)=> setSearch(event.target.value)}
            />
            
            <PromotionList 
                key={loadInfo.id} 
                promotions={loadInfo.data} 
                loading={loadInfo.loading}
                error={loadInfo.error}
                refetch={()=>{
                    load({
                        params: baseParams,
                    });
                }}
            />
            {loadInfo.data && !loadInfo.loading && loadInfo.data?.length < loadInfo.total && (
                <UIInfiniteScroll fetchMore={fetchMore}/>
            )}
        </div>
    );
};

export default PromotionSearch;
