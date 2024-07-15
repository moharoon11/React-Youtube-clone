import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { fetchFromAPI } from '../utils/FetchFromApi';
import { Videos, ChannelCard } from '../components';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => {
        setChannelDetail(data?.items[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching channel details:", error);
        setLoading(false);
      });

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items))
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(0, 238, 247, 1) 0%, rgba(206, 3, 184, 1) 100%, rgba(0,212,255,1) 100%)',
            zIndex: 10,
            height: '300px'
          }}
        />
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
        )}
      </Box>
      <Box display="flex" p={2}>
        <Box sx={{ mr: { sm: '100px' } }} />
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" width="100%">
            <Typography variant="h6" color="textSecondary">Loading videos...</Typography>
          </Box>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
