import React from 'react';
import IssueItem from '../../Issues/IssueItem';
import BookItem from '../../../components/BookItem';

function SearchItem(props) {
    return (
        <>
        {
            props.selectType === 'issue' ?   
            //问答筛选
            props.searchData.map(issueItem=>(
                <IssueItem  issueInfo={issueItem} key={issueItem._id}/>
            )) : 
            props.searchData.map(bookItem=>{
               return  <BookItem bookInfo={bookItem} key={bookItem._id} />
            })
        }
        </>
    );
}

export default SearchItem;