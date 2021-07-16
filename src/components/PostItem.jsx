import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { userActions } from '../actions';

function PostItem({post}) {
    const userInfo = useSelector(state => state.authentication.userInfo)
    const dispatch = useDispatch();
    const [voteCount, setVoteCount] = useState(post.voteCount);

    function votePost() {
        const requestData = {
            postId: post.publicId,
            userId: userInfo.user.publicId
        }
        dispatch(userActions.votePost(requestData));
        setVoteCount(voteCount + 1);
    }

    return (
        <div className="py-3">
            <div className="card">
                <div className="container">
                    <div className="row" style={{backgroundColor: 'rgb(144, 202, 249)', color: '#ffffff', marginBottom: '0px'}}>
                        <div className="col-8">
                            <div className="p-2">{post.name}</div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col text-center pt-2">{voteCount}</div>
                                <div className="col text-center pt-2">
                                    <ThumbUpIcon onClick={() => votePost()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="card-body bg-primary">
                <p className="card-text text-center" style={{height: '80px', color: '#ffffff'}}>{post.description}</p>
                </div>
            </div>
        </div>
    );
}

export { PostItem };