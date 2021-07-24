import React from 'react';
import './App.scss';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import IconButton from '@material-ui/core/IconButton';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import SpreadingVirus from './pages/SpreadingVirus';


function App() {
  // View
  const matches = useMediaQuery('(min-width:800px)');
  const [bottomNav, setBottomNav] = React.useState();
  const [openSidebar, setOpenSidebar] = React.useState(matches);
  React.useEffect(() => {
    setOpenSidebar(matches);
  }, [matches]);
  // Fetch Data
  // Country
  const [country, setCountry] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:1234/indonesia',
        );
        setCountry(result.data[0]);
      };
      fetchData();
    }, []);
  // Provinces
  const [provinces, setProvinces] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:1234/indonesia/provinces',
      );
      let data = result.data.map((item) => {
        return {
        _id: item.attributes.FID,
        provinsi: item.attributes.Provinsi,
        positif: item.attributes.Kasus_Posi,
        dirawat: item.attributes.Kasus_Posi - (item.attributes.Kasus_Semb + item.attributes.Kasus_Meni),
        sembuh: item.attributes.Kasus_Semb,
        meninggal: item.attributes.Kasus_Meni
      }});
      setProvinces(data);
      setDisplayProvinces(data);
    };
    fetchData();
  }, []);
  // Updated Data
  const [updatedData, setUpdatedData] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:1234/indonesia/updatedData',
      );
      let data = result.data;
      setUpdatedData(data);
    };
    fetchData();
  }, []);
  // Search Province
  const [displayProvinces, setDisplayProvinces] = React.useState();
  const searchProvince = (e) => {
    const value = e.target.value;
    const valReg = new RegExp(value, "gi");
    const filteredProvinces = provinces?.filter(item => {
      return item?.provinsi?.match(valReg);
    });
    setDisplayProvinces(filteredProvinces);
  }
  let tableRef = React.useRef(null);
  const searchOnFocus = () => {
    tableRef.current.scrollIntoView();
  }
  return (
    <div className="App">
      <div className="sidebar" style={openSidebar ? {left: '0'} : {left: '-100%'}}>
        <div className="sticky">
          <div className="search">
            <h2>Cari Provinsi</h2>
            <TextField
              id="search"
              placeholder="Cari"
              onChange={searchProvince}
              onFocus={searchOnFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="most-cases">
            <h2>Kasus Terbanyak</h2>
            <div className="locations">
              {
                [].concat(provinces).splice(0,3).map((item, index) => (
                  <div className="location">
                    <div className="number">{index+1}</div>
                    <div className="item">
                      <span className="title">{item.provinsi}</span>
                      <span className="sub">{item.positif}</span>
                    </div>
                  </div>
                ))
              }
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
          <SpreadingVirus
            country={country}
            updatedDataCovid={updatedData}
            displayProvinces={displayProvinces}
            tableRef={tableRef}
          />
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
