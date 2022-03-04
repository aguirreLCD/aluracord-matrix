
import { useState, useEffect, createContext } from 'react';
import { getStaticProps } from '.';


export const DataContext = createContext();

export const DataProvider = (props) => {

    
      
    // const [username, setUsername] = useState('');
    const [isLoading, setLoading] = useState(true);
    
    const [dataGit, setDataGit] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/users/aguirreLCD')
        .then((res) => res.json())
        .then((dataGit) => {
            // console.log(dataGit);
            setDataGit(dataGit);     
            // console.log(dataGit);
        })
        .finally(() => {
            setLoading(false)
        })
    }, []);

    return (
        <DataContext.Provider value={{dataGit, isLoading}}>
            {props.children}

        </DataContext.Provider>


    );
}


                            
                            
// export const getStaticProps = async () => {

//     // Fetch data from external API
//     const response = await fetch('https://api.github.com/users/aguirreSL');
//     const dataGit = await response.json();

//     console.log(dataGit);
//     console.log(dataGit.login);

    
    

//     // const dataGitName = data.map((item) => item.name);
//     // const dataGitBlog = data.map((item) => item.blog);
//     // const dataGitLocation = data.map((item) => item.location);


//     return {
//         props: { 
//             dataGit: dataGit
//         }
//     }
   
// }