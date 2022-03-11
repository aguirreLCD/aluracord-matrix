
import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React, { useContext } from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';

import { DataContext } from './DataContext';

export default function Profile() {
  
  const rout = useRouter();
  const username = rout.query.username;
//   console.log("profile", username);

  const dataGit = useContext(DataContext);
//   console.log("profile", dataGit);

  return (
        
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[700],
                // backgroundImage: 'url(./images/pet.png)',
                // backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'normal',
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[300],
                    backgroundImage: 'url(./images/pet.png)',
                    // backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    height: '95%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        // width: '50%',
                        maxWidth: '600px',
                        backgroundColor: appConfig.theme.colors.neutrals["gray9"],
                        // backgroundBlendMode: 'difference',
                        flexDirection: 'column',
                        borderRadius: '15px',
                        padding: '13px',
                    }}
                >

                  <Image
                        src={dataGit.dataGit.avatar_url}
                        styleSheet={{
                            width: '200px',
                            height: '200px',
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
                 <Text variant='heading3' >


                      
                       


                        <p> Name: {dataGit.dataGit?.name}</p>
                        <p> Alias: {dataGit.dataGit?.login}</p>
                        <p> Site: {dataGit.dataGit?.blog}</p>
                        <p> Location: {dataGit.dataGit?.location}</p> 
                        <p> Followers: {dataGit.dataGit?.followers}</p> 
                        <p> Following: {dataGit.dataGit?.following}</p> 
                        <p> email: {dataGit.dataGit?.email}</p> 
                        <p> Create at: {dataGit.dataGit?.created_at}</p> 
                        <p> Bio: {dataGit.dataGit?.bio}</p> 
                        <p> Company: {dataGit.dataGit?.company}</p> 

                                
                    </Text>



                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            // console.log("submited");
                            // window.location.href = '/chat';
                            rout.push(`/chat?username=${username}`);
                            // rout.push("/chat");
                            }
                        }
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            width: { xs: '100%', sm: '50%' }, 
                            textAlign: 'center', 
                            // marginBottom: '32px', 
                            margin: '13px'

                        }}
                    >
                        
                        <Button

                            styleSheet={{ 
                                padding: '15px',
                                // backgroundColor: appConfig.theme.colors.neutrals[700],
                                marginTop: '10px',
                                fontSize: '21px',
                            }}
                            type='submit'
                            label='Chat'
                            // iconName='arrowLeft'
                            iconName='tag'

                            // fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals[500],
                                mainColorLight: appConfig.theme.colors.neutrals[500],
                                mainColorStrong: appConfig.theme.colors.neutrals[500],
                            }}
                        />

                        <Button
                            styleSheet={{ 
                                padding: '15px',
                                // backgroundColor: appConfig.theme.colors.neutrals[700],
                                marginTop: '10px',
                                fontSize: '21px',
                            }}

                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals[500],
                                mainColorLight: appConfig.theme.colors.neutrals[500],
                                mainColorStrong: appConfig.theme.colors.neutrals[500],
                            }}
                            type='button'

                            variant='primary'
                            colorVariant='dark'
                            label='Home'
                            href="/"
                            iconName='home'
                        />
                   
                </Box>
                </Box>
            </Box>
        </Box>
    )
    

      
 

}