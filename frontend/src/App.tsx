import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { Station, Stations, Version } from './pages';
import { fetchStationsFx } from './stations';

export default () => {
    useEffect(() => {
        void fetchStationsFx();
    }, []);

    return (<Router basename="/">
            <Routes>
                <Route path="/" element={<Navigate to={'/stations'} />} />
                <Route path="/stations" element={<Stations />} />
                <Route path="/stations/:id" element={<Station />} />
                <Route path="/version" element={<Version />} />
            </Routes>
        </Router>);
}
