import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Issues from '../pages/Issues'
import Books from '../pages/Books'
import InterViews from '../pages/InterViews'
import Personal from '../pages/Personal';
import AddIssue from '../pages/AddIssue';
import IssueDetail from '../pages/IssueDetail';
import Search from '../pages/Search';
import BookDetail from '../pages/BookDetail';

function RouterConfig(props) {
    return (
        <Routes>
            <Route path='/issues' element={<Issues />} />
            <Route path='/addissue' element={<AddIssue />} />
            <Route path='/issue/:id' element={<IssueDetail />} />
            <Route path='/search' element={<Search />} />
            <Route path='/books' element={<Books />} />
            <Route path='/book/:id' element={<BookDetail />} />
            <Route path='/interviews' element={<InterViews />} />
            <Route path='/personal' element={<Personal />} />
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem", textAlign: 'center' }}>
                        <h2 style={{ color: "red" }}>404</h2>
                        <p>Not Found</p>
                    </main>
                }
            />
            <Route path='/' element={<Navigate to="/issues" replace />} />
        </Routes>

    );
}

export default RouterConfig;