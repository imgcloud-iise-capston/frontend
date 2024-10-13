import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from './header/Header';
import SideBar from './SideBar';

const FunctionExplainRepo = () => {
  return (
    <Box style={{ display: 'flex', height: '100vh' }}>
      <SideBar />
      <Box style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Header theme="function" style={{ flexShrink: 0 }} />

        {/* Thing Upload Accordion */}
        <Accordion
          style={{
            margin: '15px 20px',
            borderRadius: '8px',
            backgroundColor: '#f7f7f7',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="thing-upload-content"
            id="thing-upload-header"
            style={{ padding: '0 20px' }}
          >
            <Typography variant="h6" style={{ fontWeight: 'bold', color: '#555' }}>
              Thing Upload
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <img
              height="300px"
              width="1400px"
              src="/img/thingUpload.png"
              alt="Thing Upload"
              style={{ borderRadius: '8px' }}
            />
          </AccordionDetails>
        </Accordion>

        {/* People Upload Accordion */}
        <Accordion
          style={{
            margin: '15px 20px',
            borderRadius: '8px',
            backgroundColor: '#f7f7f7',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="people-upload-content"
            id="people-upload-header"
            style={{ padding: '0 20px' }}
          >
            <Typography variant="h6" style={{ fontWeight: 'bold', color: '#555' }}>
              People Upload
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <img
              height="500px"
              width="1400px"
              src="/img/peopleUpload.png"
              alt="People Upload"
              style={{ borderRadius: '8px' }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default FunctionExplainRepo;

