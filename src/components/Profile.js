import React, { useContext } from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';
import { useRouter } from 'next/router';
import { DataContext } from '../../pages/DataContext';


export function Profile(props) {
  const [isOpen, setOpenState] = React.useState('');

  const rout = useRouter();
  const username = rout.query.username;
//   console.log("Profile", username);

  const dataGit = useContext(DataContext);
//   console.log("Profile", dataGit);

  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
        styleSheet={{
          borderRadius: '50%',
          padding: '0 3px 0 0',
          minWidth: '50px',
          minHeight: '50px',
          fontSize: '20px',
          marginBottom: '8px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[300],
          filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
          hover: {
            filter: 'grayscale(0)',
          }
        }}
        // label=""
        iconName='user'
        onClick={() => setOpenState(!isOpen)}
      />
      {isOpen && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: '200px',
              sm: '290px',
            },
            height: '300px',
            right: '30px',
            bottom: '30px',
            padding: '16px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
            }}
          >
            Profile
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              flex: 1,
              paddingTop: '16px',
              overflow: 'scroll',
            }}
          >
           
               <Image
                        src={dataGit.dataGit?.avatar_url}
                        styleSheet={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                            transition: 'ease .2s',
                            hover: {
                                width: '36px',
                                height: '36px'
                            }
                        }}
                    />
                 <Text variant='heading3'
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals["000"],
                        // fontWeight: 'bold',
                        fontSize:'1rem',
                        // border: '1px solid',

                    }}
                    tag="li"
                >


                      
                       


                        <p> {dataGit.dataGit?.name}</p>
                        <p> {dataGit.dataGit?.login}</p>
                        <p> {dataGit.dataGit?.bio}</p> 
                        <p> {dataGit.dataGit?.blog}</p>
                        <p> {dataGit.dataGit?.location}</p> 
                        <p> {dataGit.dataGit?.company}</p> 
                        <p> {dataGit.dataGit?.followers}</p> 
                        <p> {dataGit.dataGit?.following}</p> 
                        <p> {dataGit.dataGit?.email}</p> 
                        {/* <p> {dataGit.dataGit?.created_at}</p>  */}

                                
                    </Text>



          </Box>
        </Box>
      )}
    </Box>
  )
}