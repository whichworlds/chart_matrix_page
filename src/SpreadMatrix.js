// SpreadMatrix.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, FormControl, InputLabel, Grid, CssBaseline, Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    // Name of the component
    MuiTableCell: {
      styleOverrides: {
        // Name of the slot
        head: {
          // Some CSS
          backgroundColor: "rgba(255,255,255,0.15)",
          color: "white",
          fontWeight: 'bold',
        },
        body: {
          // Some CSS
          fontSize: 14,
          backgroundColor: "rgba(255,255,255,0.05)",
          color: "white",
        },
      },
    },
  },
});

const contractsByExchange = {
  Binance: ['BTCUSD_PERP', 'BTCUSD_210625', 'BTCUSD_210924'], // Add more contracts as needed
  Deribit: ['BTC-PERP', 'BTC-25JUN21', 'BTC-24SEP21'], // Add more contracts as needed
  OKEx: ['BTC-USD-SWAP', 'BTC-USD-210625', 'BTC-USD-210924'], // Add more contracts as needed
  // Add more exchanges and their respective contracts as needed
};

const SpreadMatrix = () => {
  const [marginType, setMarginType] = useState('coin');
  const [exchange1, setExchange1] = useState('Binance'); // Default to Binance
  const [exchange2, setExchange2] = useState('Deribit'); // Default to Deribit
  const [contracts1, setContracts1] = useState(contractsByExchange['Binance']);
  const [contracts2, setContracts2] = useState(contractsByExchange['Deribit']);

  const headerCellStyle = {
    backgroundColor: "rgba(255,255,255,0.12)", // Adjust the color as needed
    color: "white",
    fontWeight: 'bold',
    borderRight: '1px solid rgba(255, 255, 255, 0.3)', // Add border to header cells
    };
  // Style for the body cells in the table
  const bodyCellStyle = {
    fontSize: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "white",
    borderRight: '1px solid rgba(255, 255, 255, 0.3)', // Add border to body cells
  };  


// Handlers for dropdown changes
const handleMarginChange = (event) => {
setMarginType(event.target.value);
};

const handleExchange1Change = (event) => {
const newExchange1 = event.target.value;
setExchange1(newExchange1);
setContracts1(contractsByExchange[newExchange1]);
};

const handleExchange2Change = (event) => {
const newExchange2 = event.target.value;
setExchange2(newExchange2);
setContracts2(contractsByExchange[newExchange2]);
};

return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: '24px' }}>
        <Grid container spacing={3}>
          {/* Margin Type Dropdown */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="margin-type-label">Margin Type</InputLabel>
              <Select
                labelId="margin-type-label"
                value={marginType}
                label="Margin Type"
                onChange={handleMarginChange}
              >
                <MenuItem value="coin">Coin Margined</MenuItem>
                <MenuItem value="usdt">USDT Margined</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Exchange 1 Dropdown */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="exchange1-label">Exchange 1</InputLabel>
              <Select
                labelId="exchange1-label"
                value={exchange1}
                label="Exchange 1"
                onChange={handleExchange1Change}
              >
                {Object.keys(contractsByExchange).map((exchange) => (
                  <MenuItem key={exchange} value={exchange}>{exchange}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Exchange 2 Dropdown */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="exchange2-label">Exchange 2</InputLabel>
              <Select
                labelId="exchange2-label"
                value={exchange2}
                label="Exchange 2"
                onChange={handleExchange2Change}
              >
                {Object.keys(contractsByExchange).map((exchange) => (
                  <MenuItem key={exchange} value={exchange}>{exchange}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Spread Matrix Table */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="spread matrix">
                <TableHead>
                  <TableRow>
                  {/* This cell is for alignment purposes, make it blend with the background */}
                  <TableCell align="center" style={{ ...headerCellStyle, borderRight: '1px solid rgba(255, 255, 255, 0.3)' }}></TableCell>
                  {contracts1.map((contract, index) => (
                    <TableCell
                      key={contract}
                      align="center"
                      style={index === contracts1.length - 1 ? { ...headerCellStyle, borderRight: 'none' } : headerCellStyle} // Remove border for the last header cell
                    >
                      {contract}
                    </TableCell>
                  ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contracts2.map((contractRow) => (
                    <TableRow key={contractRow}>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        style={headerCellStyle} // Apply header style for the first column to match header cells
                      >
                        {contractRow}
                      </TableCell>
                      {contracts1.map((contractColumn, colIndex) => (
                        <TableCell
                          key={`${contractRow}-${contractColumn}`}
                          align="center"
                          style={colIndex === contracts1.length - 1 ? { ...bodyCellStyle, borderRight: 'none' } : bodyCellStyle} // Remove border for the last body cell in each row
                        >
                          {/* Placeholder for the actual spread value */}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default SpreadMatrix;
