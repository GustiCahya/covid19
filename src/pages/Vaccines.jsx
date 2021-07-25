import React from "react";
import axios from "axios";
import "./Vaccines.scss";
import dateFormat from "dateformat";
import { firestore } from "@services/firebase";
import serialize from "form-serialize";

import addSeparator from "@utils/addSeparator";

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import { Button } from "@material-ui/core";

export default function Vaccines() {
    const [item, setItem] = React.useState();
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:1234/indonesia/vaccines',
            );
            let data = result.data;
            setItem(data);
        };
        fetchData();
    }, []);
    const onSubmit = (e) => {
      e.preventDefault();
      const formData = serialize(e.target, { hash: true });
      firestore.collection("vaksinasi").add(formData).then(() => {
        alert("Anda sudah berhasil mendaftar vaksin");
      }).catch(() => {
        alert("Gagal Upload Data, Silakan coba ulang");
      });
    }
  return (
    <div className="spreading-virus">
      <div className="box">
        <h1>
          Vaksinasi <span>Covid19</span>
        </h1>
        <div className="desc_head">
          <span className="item">
            <QueryBuilderIcon className="icon" />
            <span className="text">
              Update terakhir {dateFormat(item?.lastUpdate, "dd/mm/yyyy hh:MM:ss")}
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
              <span className="label">Total Sasaran</span>
              <span className="value">
                {addSeparator(item?.totalsasaran || 0)}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <h3>Pendaftaran Vaksinasi</h3>
        <div>
          <label>Nama :</label>
          <input type="text" name="nama" />
        </div>
        <div>
          <label>Alamat :</label>
          <input type="text" name="alamat" />
        </div>
        <div>
          <label>Nomor Telepon :</label>
          <input type="text" name="nomor telepon" />
        </div>
        <Button type="submit" variant="contained" color="primary" style={{marginTop: "20px", zIndex: -1}}>Submit</Button>
      </form>
    </div>
  );
}
