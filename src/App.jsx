import React from "react";
import "./App.scss";

import addSeparator from "@utils/addSeparator";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PeopleIcon from "@material-ui/icons/People";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import IconButton from "@material-ui/core/IconButton";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import SpreadingVirus from "@pages/SpreadingVirus";
import Hospitals from "@pages/Hospitals";
import Vaccines from "@pages/Vaccines";

function App() {
  // View
  const matches = useMediaQuery("(min-width:800px)");
  const [nav, setNav] = React.useState(0);
  const [openSidebar, setOpenSidebar] = React.useState(matches);
  React.useEffect(() => {
    setOpenSidebar(matches);
  }, [matches]);

  // Province
  const [provinces, setProvinces] = React.useState([]);
  const [tableRef, setTableRef] = React.useState(null);
  const [displayProvinces, setDisplayProvinces] = React.useState([]);
  const searchProvince = (e) => {
    const value = e.target.value;
    const valReg = new RegExp(value, "gi");
    const filteredProvinces = provinces?.filter((item) => {
      return item?.provinsi?.match(valReg);
    });
    setDisplayProvinces(filteredProvinces);
  };
  React.useEffect(() => {
    setDisplayProvinces(() => provinces);
  }, [provinces]);
  const searchOnFocus = () => {
    tableRef.current.scrollIntoView();
  };

  // Hospitals
  const [hospitals, setHospitals] = React.useState([]);
  const [displayHospitals, setDisplayHospitals] = React.useState([]);
  const searchHospitals = (e) => {
    const value = e?.target?.value;
    const valReg = new RegExp(value, "gi");
    const filteredData = hospitals?.filter((item) => {
      return item?.address?.match(valReg);
    });
    setDisplayHospitals(filteredData);
  };
  React.useEffect(() => {
    setDisplayHospitals(() => hospitals);
  }, [hospitals]);

  // Handle Search
  const [titleSearch, setTitleSearch] = React.useState("Cari");
  const [placeholderSearch, setPlaceholderSearch] = React.useState("Cari");
  React.useEffect(() => {
    if(nav === 0){
      setTitleSearch("Cari Provinsi");
      setPlaceholderSearch("Cari");
    }else if(nav === 1){
      setTitleSearch("Cari Rumah Sakit");
      setPlaceholderSearch("Masukkan lokasi anda");
    }else if(nav === 2){
      setTitleSearch("Cari");
      setPlaceholderSearch("Cari");
    }
  },[nav]);

  return (
    <div className="App">
      <div
        className="sidebar"
        style={openSidebar ? { left: "0" } : { left: "-100%" }}
      >
        <div className="sticky">
          {
            nav === 2 
            ? null
            : <div className="search">
                <h2>{titleSearch}</h2>
                <TextField
                  id="search"
                  placeholder={placeholderSearch}
                  onChange={(e) => {
                    if(nav === 0){
                      searchProvince(e);
                    }else if(nav === 1){
                      searchHospitals(e);
                    }else if(nav === 2){
                      
                    }
                  }}
                  onFocus={(e) => {
                    if(nav === 0){
                      searchOnFocus(e);
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
          }
          <div className="most-cases">
            <h2>Kasus Terbanyak</h2>
            <div className="locations">
              {[]
                .concat(provinces)
                .splice(0, 3)
                .map((item, index) => (
                  <div className="location">
                    <div className="number">{index + 1}</div>
                    <div className="item">
                      <span className="title">{item.provinsi}</span>
                      <span className="sub">{addSeparator(item.positif)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="header">
          <ul>
            <li>
              <a
                className={nav === 0 ? "selected" : ""}
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setNav(0);
                }}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                className={nav === 1 ? "selected" : ""}
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setNav(1);
                }}
              >
                Rumah Sakit
              </a>
            </li>
            <li>
              <a
                className={nav === 2 ? "selected" : ""}
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setNav(2);
                }}
              >
                Vaksin
              </a>
            </li>
          </ul>
        </div>
        <div className="content">
          {
            (nav === 0)
            ? <SpreadingVirus
                displayProvinces={displayProvinces}
                getProvinces={(provinces) => {
                  setProvinces(provinces);
                }}
                getTableRef={(tableRef) => {
                  setTableRef(tableRef);
                }}
              />
            : (nav === 1)
            ? <Hospitals
                displayHospitals={displayHospitals}
                getHospitals={(hospitals) => {
                  setHospitals(hospitals);
                }}
              />
            : (nav === 2)
            ? <Vaccines />
            : null
          }
        </div>
      </div>
      <div className="fab-search">
        <IconButton
          color="primary"
          aria-label="search"
          onClick={() => {
            setOpenSidebar((prevItem) => !prevItem);
          }}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <BottomNavigation
        value={nav}
        onChange={(event, newValue) => {
          setNav(newValue);
        }}
        showLabels
        className="bottom-nav"
      >
        <BottomNavigationAction
          label="Penyebaran Virus"
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
          label="Rumah Sakit"
          icon={<LocalHospitalIcon />}
        />
        <BottomNavigationAction label="Vaksin" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default App;
