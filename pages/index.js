import { Box, Button, Text, TextField, Image } from '@skynexui/components';

import React, { useState, useContext } from 'react';

import { useRouter } from 'next/router';

import appConfig from '../config.json';

import { DataContext } from '../src/context/DataContext';

export default function Index() {

    const [username, setUsername] = useState('');
    // console.log("index", username);
    
    const rout = useRouter();

    const [data, setData] = useState({});

    function checkIfUserExists(username) {
        fetch(`https://api.github.com/users/${username}`)
        .then(async (res) => {
        if(res.status === 404) {
            console.error('User Not Found. Error:');
            rout.push("/404");

            return
        } else {
            // console.log(res);
            return await res.json();
        }
        })
        .then((data) => {
        if (data) {
            // console.log(data);
            setData(data);
        }
        })
        .catch(error => {
            console.error('User Not Found. Error: ', error);
        })
    }
    // console.log("index", data);

    // const dataGit = useContext(DataContext);
    // console.log("index", dataGit);

   


    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals[200],
                    backgroundImage: 'url(./images/dog.png)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '600px',
                        height: '42%',
                        borderRadius: '60px', padding: '42px', margin: '42px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[200],
                            
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={((event) => {
                            event.preventDefault();
                            checkIfUserExists(username);
                            if (username === "undefined") {
                                console.log("form", username);
                                rout.push("/404");
                            } else {
                                // rout.push('/chat');
                                rout.push(`/chat?username=${username}`);
                            }
                        }) 
                        }
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, 
                            textAlign: 'center', 
                            // marginBottom: '32px', 
                            margin: '13px'

                        }}
                    >
                        <Text
                            variant="h2"
                            styleSheet={{
                                marginBottom: '42px',
                                color: appConfig.theme.colors.neutrals['800'],                  
                                fontSize: '24px',
                                fontWeight: '600',
                                marginBottom: '13px',
                                backgroundBlendMode: 'multiply'
                            }}
                        >
                            Welcome `:)
                        </Text>

                        <Text
                            variant="body3"
                            styleSheet={{
                                marginBottom: '42px',
                                // margin: '13px',
                                // maxWidth: '700px',
                                color: appConfig.theme.colors.neutrals[700],
                                backgroundBlendMode: 'multiply'
                            }}
                        >
                            {appConfig.name}

                        </Text>

                        <TextField
                            placeholder='Type github name'
                            value={username}
                            onChange={function (event) {
                                // console.log("user type", event.target.value);
                                const username = event.target.value;
                                setUsername(username);
                                // console.log(username);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[500],
                                    mainColor: appConfig.theme.colors.neutrals[300],
                                    mainColorHighlight: appConfig.theme.colors.neutrals[300],
                                    backgroundColor: appConfig.theme.colors.neutrals[200],
                                },
                            }}
                        />

                        <Button
                            type='submit'
                            label='Enter'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals[500],
                                mainColorLight: appConfig.theme.colors.neutrals[500],
                                mainColorStrong: appConfig.theme.colors.neutrals[500],
                            }}
                            disabled={username.length < 3}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '180px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[500],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[200],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '220px',
                        }}
                    >

                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                                width: '100%'
                            }}
                            src={username.length > 2 ? `https://github.com/${username}.png` : 'images/petss.png'}
                        />

                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                padding: '3px 11px',
                                borderRadius: '60px',
                                margin: '3px',
                                width: '100%',
                                textAlign: 'center'

                            }}
                        >
                            {username.length > 2 ? username : ''}
                        </Text>

                        
                        <Text
                            variant="body4"
                            styleSheet={{
                                marginBottom: '7px',
                                padding: '7px 3px',
                                color: appConfig.theme.colors.neutrals[300],
                                textAlign: 'center',
                            }}
                        >
                           
                        </Text>

                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
