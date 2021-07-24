import React from 'react';
import './Hospitals.scss';
import axios from 'axios';
import OutlinedCard from '@atoms/OutlinedCard';

export default function Hospitals({getHospitals}) {
    //! Logic for Hospitals Page
    const [hospitals, setHospitals] = React.useState();
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:1234/indonesia/hospitals',
            );
            let data = result.data;
            console.log(data);
            setHospitals(data);
        };
        fetchData();
    }, []);
    React.useEffect(() => {
        getHospitals(hospitals);
    }, [hospitals, getHospitals]);
    return (
        <div className="hospitals">
            {hospitals?.map((item) => (
                <OutlinedCard
                    name={item.name}
                    address={item.address}
                    region={item.region}
                    phone={item.phone}
                />
            ))}
        </div>
    )
}
