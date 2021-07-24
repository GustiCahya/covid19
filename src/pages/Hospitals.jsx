import React from 'react';
import './Hospitals.scss';
import axios from 'axios';
import OutlinedCard from '@atoms/OutlinedCard';

export default function Hospitals({displayHospitals, getHospitals}) {
    //! Logic for Hospitals Page
    const [hospitals, setHospitals] = React.useState();
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:1234/indonesia/hospitals',
            );
            let data = result.data;
            setHospitals(data);
        };
        fetchData();
    }, []);
    React.useEffect(() => {
        getHospitals(hospitals);
    }, [hospitals, getHospitals]);
    return (
        <>
            {
                displayHospitals?.length >= 0 
                ? (
                    <div className="hospitals">
                        {displayHospitals?.map((item, index) => (
                            <OutlinedCard key={String(index)}
                                name={item.name}
                                address={item.address}
                                region={item.region}
                                phone={item.phone}
                            />
                        ))}
                    </div>
                )
                : "Loading..."
            }
        </>
    )
}
