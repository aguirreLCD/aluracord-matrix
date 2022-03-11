
import { useState, useEffect, createContext } from 'react';

import { useRouter } from 'next/router';


export const DataContext = createContext();


export const DataProvider = (props) => {
    
    const router = useRouter();

    const username = router.query.username;

    // console.log("username", username);

    const [isLoading, setLoading] = useState(true);
    
    const [dataGit, setDataGit] = useState([]);

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
        .then((dataGit) => dataGit.json())
        .then((dataGit) => {
            // console.log(dataGit);
            setDataGit(dataGit);     
            // console.log(dataGit);
        })
        .finally(() => {
            setLoading(false)
        })
    }, [username]);

    return (
        <DataContext.Provider value={{dataGit}}>
            
            {props.children}

        </DataContext.Provider>


    );
}


                            
                            
// export async function getStaticProps() {

//     // Fetch data from external API
//     const response = await fetch('https://api.github.com/users/aguirreLCD');
//     const dataGit = await response.json();

//     console.log(dataGit);
//     console.log(dataGit.login);



//     return {
//         props: { 
//             dataGit: [],
//         }
//     }
   
// }