
import { useState, useEffect, createContext } from 'react';

import { useRouter } from 'next/router';


export const DataContext = createContext();


export const DataProvider = (props) => {
    
    const router = useRouter();

    const username = router.query.username;

    // console.log("username", username);

    const [isLoading, setLoading] = useState(false);
    
    const [error, setError] = useState(null);
    
    const [dataGit, setDataGit] = useState([]);


    useEffect(() => {
        setLoading(true);

        fetch(`https://api.github.com/users/${username}`)
        .then((dataGit) => dataGit.json())
        .then((dataGit) => {
            // console.log(dataGit);
            setDataGit(dataGit);     
            // console.log(dataGit);
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setLoading(false)
        });
    }, [username]);

    return (
        <DataContext.Provider value={{dataGit, isLoading, error}}>
            
            {props.children}

        </DataContext.Provider>


    );
}


                      