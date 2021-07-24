import React from 'react';
import './App.scss';

import addSeparator from "@utils/addSeparator";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import IconButton from '@material-ui/core/IconButton';

import useMediaQuery from '@material-ui/core/useMediaQuery';

function App() {
  // View
  const matches = useMediaQuery('(min-width:800px)');
  const [bottomNav, setBottomNav] = React.useState();
  const [openSidebar, setOpenSidebar] = React.useState(matches);
  React.useEffect(() => {
    setOpenSidebar(matches);
  }, [matches]);
  // Logic
  const [country, setCountry] = React.useState({});
  React.useEffect(() => {
    async function fetchData(){
      let data = {
        positif: "",
        dirawat: "",
        meninggal: "",
        sembuh: ""
      }
      const response = await fetch("https://api.kawalcorona.com/indonesia/");
      data = await response.json();
      setCountry(data);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="sidebar" style={openSidebar ? {left: '0'} : {left: '-100%'}}>
        <div className="search">
          <h2>Cari Provinsi</h2>
          <TextField
            id="search"
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
                <Button variant="outlined" size="small" color="primary">
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
                <span className="item">
                  <QueryBuilderIcon className="icon"/>
                  <span className="text">
                    Update terakhir 20 Maret 2020
                  </span>
                </span>
                <span className="item">
                  <CloudQueueIcon className="icon"/>
                  <span className="text">
                    Sumber data dari Badan Nasional Penanggulangan Bencana
                  </span>
                </span>
              </div>
              <h2>Indonesia</h2>
              <div className="desc_foot">
                <ul>
                  <li>
                    <span className="label">Terkonfirmasi</span>
                    <span className="value">{addSeparator(country?.positif)} Orang</span>
                  </li>
                  <li>
                    <span className="label">Perawatan</span>
                    <span className="value">{addSeparator(country?.dirawat)} Orang</span>
                  </li>
                  <li>
                    <span className="label">Sembuh</span>
                    <span className="value" style={{color:"#4f8d6d"}}>{addSeparator(country?.sembuh)} Orang</span>
                  </li>
                  <li>
                    <span className="label">Meninggal</span>
                    <span className="value" style={{color:"#c9515b"}}>{addSeparator(country?.meninggal)} Orang</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="spreading-list">
              <h1>Daftar Provinsi yang <span>Terkonfirmasi</span></h1>
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
      <div className="fab-search">
        <IconButton 
          color="primary" 
          aria-label="search"
          onClick={() => {
            setOpenSidebar((prevItem) => !prevItem)
          }}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <BottomNavigation
        value={bottomNav}
        onChange={(event, newValue) => {
          setBottomNav(newValue);
        }}
        showLabels
        className="bottom-nav"
      >
        <BottomNavigationAction label="Penyebaran Virus" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Rumah Sakit" icon={<LocalHospitalIcon />} />
        <BottomNavigationAction label="Vaksin" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default App;
