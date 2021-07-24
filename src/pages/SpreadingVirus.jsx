import React from "react";

import addSeparator from "@utils/addSeparator";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

import convertCommaToDot from '@utils/convertCommaToDot';

export default function SpreadingVirus({country, updatedDataCovid: updatedData, displayProvinces, tableRef}) {
  return (
    <div className="spreading-virus">
      <div className="box">
        <h1>
          Cek Penyebaran <span>Virus Covid19</span>
        </h1>
        <div className="desc_head">
          <span className="item">
            <QueryBuilderIcon className="icon" />
            <span className="text">
              Update terakhir {updatedData?.penambahan?.created}
            </span>
          </span>
          <span className="item">
            <CloudQueueIcon className="icon" />
            <span className="text">Sumber data dari covid19.go.id</span>
          </span>
        </div>
        <h2>Indonesia</h2>
        <div className="desc_foot">
          <ul>
            <li>
              <span className="label">Terkonfirmasi</span>
              <span className="value">
                {convertCommaToDot(country?.positif)} Orang
              </span>
              <sup style={{ color: "gray" }}>
                +{addSeparator(updatedData?.penambahan?.jumlah_positif)}
              </sup>
            </li>
            <li>
              <span className="label">Perawatan</span>
              <span className="value">
                {convertCommaToDot(country?.dirawat)} Orang
              </span>
              <sup style={{ color: "gray" }}>
                +{addSeparator(updatedData?.penambahan?.jumlah_meninggal)}
              </sup>
            </li>
            <li>
              <span className="label">Sembuh</span>
              <span className="value" style={{ color: "#4f8d6d" }}>
                {convertCommaToDot(country?.sembuh)} Orang
              </span>
              <sup style={{ color: "gray" }}>
                +{addSeparator(updatedData?.penambahan?.jumlah_sembuh)}
              </sup>
            </li>
            <li>
              <span className="label">Meninggal</span>
              <span className="value" style={{ color: "#c9515b" }}>
                {convertCommaToDot(country?.meninggal)} Orang
              </span>
              <sup style={{ color: "gray" }}>
                +{addSeparator(updatedData?.penambahan?.jumlah_dirawat)}
              </sup>
            </li>
          </ul>
        </div>
      </div>
      <div className="spreading-list">
        <h1>
          Daftar Provinsi yang <span>Terkonfirmasi</span>
        </h1>
        <TableContainer component={Paper} ref={tableRef}>
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
              {displayProvinces?.map((province, index) => (
                <TableRow key={province._id}>
                  <TableCell component="th" scope="row">
                    {index + 1}.
                  </TableCell>
                  <TableCell align="left">{province.provinsi}</TableCell>
                  <TableCell align="center">
                    {addSeparator(province.positif)}
                  </TableCell>
                  <TableCell align="center">
                    {addSeparator(province.dirawat)}
                  </TableCell>
                  <TableCell align="center" style={{ color: "#4f8d6d" }}>
                    {addSeparator(province.sembuh)}
                  </TableCell>
                  <TableCell align="center" style={{ color: "#c9515b" }}>
                    {addSeparator(province.meninggal)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
