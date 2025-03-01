import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import {Navbar, Feed, ChannelDetail, VideoDetail, SearchFeed} from './components';
import { Box } from '@mui/material';
const App = () => {
  return (
    <BrowserRouter>
      <Box sx= {{ backgroundColor: '#000'}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
