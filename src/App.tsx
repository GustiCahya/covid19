import React from 'react';
import './App.scss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import addSeparator from "@utils/addSeparator";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <div className="search-province">
          <h2>Cari Provinsi</h2>
          <TextField
            id="searchProvince"
            placeholder="Cari"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="nearest-vaccine">
          <h2>Vaksin Terdekat</h2>
          <div className="locations">
            <div className="location">
              <div className="number">1.</div>
              <div className="item">
                <span className="title">Rumah Sakit</span>
                <Button variant="contained" size="small" color="primary">
                  Daftar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="header">
            <ul>
              <li><a className="selected" href="/">Dashboard</a></li>
              <li><a href="/">Rumah Sakit</a></li>
              <li><a href="/">Vaksin</a></li>
            </ul>
        </div>
        <div className="content">
          <div className="spreading-virus">
            <div className="box">
              <h1>Cek Penyebaran <span>Virus Covid19</span></h1>
              <div className="desc_head">
                <span>
                  icon
                  Update terakhir 20 Maret 2020
                </span>
                <span>
                  icon
                  Sumber data dari Badan Nasional Penanggulangan Bencana
                </span>
              </div>
              <h2>Indonesia</h2>
              <div className="desc_foot">
                <ul>
                  <li>
                    <span className="label">Terkonfirmasi</span>
                    <span className="value">450 Orang</span>
                  </li>
                  <li>
                    <span className="label">Perawatan</span>
                    <span className="value">450 Orang</span>
                  </li>
                  <li>
                    <span className="label">Sembuh</span>
                    <span className="value">450 Orang</span>
                  </li>
                  <li>
                    <span className="label">Meninggal</span>
                    <span className="value">450 Orang</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="spreading-list">
              <h1>Daftar Provinsi yang Terkonfirmasi</h1>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell align="left">Provinsi</TableCell>
                      <TableCell align="center">Terkonfirmasi</TableCell>
                      <TableCell align="center">Perawatan</TableCell>
                      <TableCell align="center">Sembuh</TableCell>
                      <TableCell align="center">Meninggal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key="row.name">
                      <TableCell component="th" scope="row">
                        1.
                      </TableCell>
                      <TableCell align="left">Jakarta</TableCell>
                      <TableCell align="center">{addSeparator(1000)}</TableCell>
                      <TableCell align="center">{addSeparator(1000)}</TableCell>
                      <TableCell align="center">{addSeparator(1000)}</TableCell>
                      <TableCell align="center">{addSeparator(1000)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
