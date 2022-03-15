
// import { useState, useEffect, createContext } from 'react';

// import { useRouter } from 'next/router';

// export const DataContext = createContext();

// export const DataProvider = (props) => {

//     console.log("datacontext");

    
//     const router = useRouter();

//     const username = router.query.username;

//     console.log("username", username);

//     const [isLoading, setLoading] = useState(false);
    
//     const [error, setError] = useState(null);
    
//     const [dataGit, setDataGit] = useState([]);

//     useEffect(() => {
//         setLoading(true);
//         console.log("username", username);
//         fetch(`https://api.github.com/users/${username}`)
//         .then((dataGit) => dataGit.json())
//         .then((dataGit) => {
//             console.log(dataGit.message);
//             setDataGit(dataGit);     
//         })
//         .catch((err) => {
//             setError(err);
//         })
//         .finally(() => {
//             setLoading(false)
//         });
//     }, [username]);

//     return (
//         <DataContext.Provider value={{dataGit, isLoading, error, username}}>
            
//             {props.children}

//         </DataContext.Provider>


//     );
// }


                      