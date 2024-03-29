import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';
import { useRouter } from 'next/router';

export function Profile({gitUser}) {
  // console.log("profile");

  const [isOpen, setOpenState] = useState('');

  const [isLoading, setLoading] = useState(false);
    
  const [error, setError] = useState(null);
    
  const [dataGit, setDataGit] = useState([]);

  const rout = useRouter();
  // const gitUser = rout.query.username;
//   console.log("Profile", username);

  // const dataGit = useContext(DataContext);
  // console.log("Profile", dataGit);


  // const { dataGit, isLoading, error } = useContext(DataContext);
  // console.log("Profile", dataGit);
  // console.log("Profile", isLoading);
  // console.log("Profile", error);


  // if (isLoading) return <h1> LOADING...</h1>;

  // if (error) console.log(error);


  function getGitProfile(gitUser) {
        fetch(`https://api.github.com/users/${gitUser}`)
        .then(async (res) => {
        if(res.status === 404) {
            console.error('User Not Found. Error:');
            // rout.push("/404");
            return
        } else {
            // console.log(res);
            return await res.json();
        }
        })
        .then((dataGit) => {
          if (dataGit) {
              // console.log(dataGit);
              setDataGit(dataGit);
          }
        })
        .catch(error => {
            console.error('User Not Found. Error: ', error);
        })
    }

  // useEffect(() => {
    
  //       setLoading(true);
  //       fetch(`https://api.github.com/users/${gitUser}`)
  //       .then((dataGit) => dataGit.json())
  //       .then((dataGit) => {
  //           // console.log(dataGit.dataGit.message);
  //           setDataGit(dataGit);     
  //       })
  //       .catch((err) => {
  //           setError(err);
  //       })
  //       .finally(() => {
  //           setLoading(false)
  //       });
  //       console.log(gitUser);
  //       return gitUser;
  //   }, [gitUser]);



  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >

        <Image
            src={`https://github.com/${gitUser}.png`}
            styleSheet={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '8px',
                transition: 'ease .2s',
                hover: {
                    width: '36px',
                    height: '36px'
                }
            }}
            onClick={() => {
              getGitProfile(gitUser);
              setOpenState(!isOpen);
            }}
        />

      {isOpen && (
        <Box 
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'fixed',
            top: '30%',
            left: '20%',
            // margin: '50%',
            // padding: '50%',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: '200px',
              sm: '290px',
            },
            height: '300px',
            // right: '30px',
            // bottom: '30px',
            zIndex: '1',

            padding: '16px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
          onClick={() => setOpenState(!isOpen)}
        >

          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
              
            }}
            
          >
            {/* Github Profile */}
          </Text>

          
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              flex: 1,
              paddingTop: '1px',
              overflow: 'scroll',
            }}
          >
           
          <Image
              src={dataGit?.avatar_url}
              styleSheet={{
                  width: '85px',
                  height: '85px',
                  borderRadius: '50%',
                  justifyContent: 'space-between',
                  // display: 'inline-block',
                  // marginRight: '8px',
                  // transition: 'ease .2s',
                  // hover: {
                  //     width: '36px',
                  //     height: '36px'
                  // }
              }}

              
            />
          
            <Button

              styleSheet={{
                padding: '2px',
              
              }}

              variant='tertiary'
              // colorVariant='dark'
              tag='span'
              size='sm'                     
              iconName='comments'
          />


                 <Text variant='heading3'
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals["300"],
                        fontSize:'16px',
                    }}
                    tag="li"
                >

                       
                    <p> {dataGit?.name}  </p> 
                        <p> {dataGit?.login}</p>
                        <p> {dataGit?.bio}</p> 
                        <p> 
                         <a href={`https://${dataGit?.blog}`}  target="_blank"> 

                          {dataGit?.blog}
                          </a>
                        </p>
                        <p> {dataGit?.location}</p> 
                        <p> {dataGit?.company}</p> 
                        <p> {dataGit?.followers} followers</p> 
                        <p> {dataGit?.following} following</p> 
                        <p> {dataGit?.email}</p> 
                                
                    </Text>

          </Box>
         
        </Box>
        
      )}
       
    </Box>
    
  )
}