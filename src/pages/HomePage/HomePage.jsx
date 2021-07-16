import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostItem } from '../../components/PostItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

import { userActions } from '../../actions';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

function HomePage() {
    
    const dispatch = useDispatch();
    const posts = useSelector(state => state.users);
    const totalElements = useSelector(state => state.users.totalElements);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(true);
    useEffect(() => {
        let date = moment().format("YYYY-MM-DD");  ;
        dispatch(userActions.getAllPosts(date, pageNumber));
    }, []);

    function fetchMorePost() {
        const pageNume = pageNumber + 1;
        setPageNumber(pageNume);
        if (pageNume*5 >= totalElements) {
            setIsLoadMore(false);
            return; // default page size is 5
        }
        let date = moment().format("YYYY-MM-DD");  ;
        dispatch(userActions.getAllPosts(date, pageNume));
    }

    return (
        <div>
            <div className="navbar navbar-dark bg-primary">
                <span className="navbar-toggler-icon"></span>
                <div className="dropdown">
                    <AccountCircleIcon id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item">Profile</div>
                        <Link to="/login" className="btn btn-link dropdown-item">Logout</Link>
                    </div>
                </div>
            </div>
            {posts.items && <InfiniteScroll
                dataLength={posts.items && posts.items.length}
                next={() => fetchMorePost()}
                hasMore={isLoadMore}
                loader={<h4>Loading...</h4>}
                >
                {posts.items.map((item, index) => (<PostItem key={index + item.name} post={item}/>))}
            </InfiniteScroll>}
            
        </div>
        
    );
}

export { HomePage };