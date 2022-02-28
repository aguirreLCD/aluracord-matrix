import { Box, Button, Text, TextField, Image } from '@skynexui/components';

import React from 'react';

import { useRouter } from 'next/router';

import appConfig from '../config.json';


function Title(props) {
    // console.log(props);
    // console.log(props.children);
    const Tag = props.tag || 'h1';
    // console.log(Tag)

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['800']};                   
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 13px;
                }            
            `}</style>
        </>
    );
}

export default function PaginaInicial() {

    const [username, setUsername] = React.useState('');

    const rout = useRouter();

    const [dataGit, setDataGit] = React.useState({})

    React.useEffect(() => {
        fetch((`https://api.github.com/users/${username}`) )
        .then((responseServer) => {
            return responseServer.json();
        })
        .then((responseConverted) => {
            console.log('response converted', responseConverted);
            setDataGit(responseConverted);
        })
    }, [username])

    // console.log('props git', props)
    console.log('dataGit', dataGit);
    // console.log('data git', dataGit.login);
    // console.log(dataGit.location)
    
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    // backgroundColor: appConfig.theme.colors.neutrals[300],
                    backgroundColor: appConfig.theme.colors.neutrals[100],
                    
                    // backgroundImage: username ? 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)' : 'url(./images/pet.png)',
                    backgroundImage: 'url(./images/dog.png)',

                    // backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
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
                        width: '100%', maxWidth: '700px',
                        height: '42%',
                       
                        borderRadius: '60px', padding: '42px', margin: '42px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[200],
                        
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            // console.log("submited");
                            // window.location.href = '/chat';
                            if (dataGit.name === undefined) {
                                rout.push("/404");
                            } else {
                                // rout.push('/chat');
                                rout.push(`/chat?username=${username}`);
                                // rout.push(`/chat?dataGit=${dataGit}`);
                            }
                            // {
                            //     username.length > 2 ? rout.push('/chat') : rout.push("/404");
                            //     // `https://github.com/${username}.png` ? rout.push('/404') : rout.push("/chat");
                            // }

                        }}
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
                        <Title tag="h2">Welcome `:)</Title>

                        <Text
                            variant="body3"
                            styleSheet={{
                                marginBottom: '42px',
                                // margin: '13px',
                                // maxWidth: '700px',
                                color: appConfig.theme.colors.neutrals[700]
                            }}
                        >
                            {appConfig.name}

                        </Text>

                        <TextField
                            value={username}
                            onChange={function (event) {
                                // console.log("user type", event.target.value);
                                const valor = event.target.value;
                                // console.log(valor)
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[500],
                                    mainColor: appConfig.theme.colors.neutrals[300],
                                    mainColorHighlight: appConfig.theme.colors.neutrals[200],
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
                                mainColor: appConfig.theme.colors.neutrals[600],
                                mainColorLight: appConfig.theme.colors.neutrals[600],
                                mainColorStrong: appConfig.theme.colors.neutrals[600],
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
                            borderColor: appConfig.theme.colors.neutrals[400],
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
                                backgroundColor: appConfig.theme.colors.neutrals[500],
                                padding: '3px 11px',
                                borderRadius: '60px',
                                margin: '3px',
                                width: '100%',
                                textAlign: 'center'

                            }}
                        >
                            {username.length > 2 ? username : 'Type github name'}
                        </Text>
                        
                        <Text
                            variant="body4"
                            styleSheet={{
                                marginBottom: '7px',
                                padding: '7px 3px',
                                color: appConfig.theme.colors.neutrals[200],
                                textAlign: 'center',
                            }}
                        >
                            <p>{dataGit.name}</p>
                            <p>{dataGit.company}</p>
                            
                            <p> <a styleSheet={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    cursor: 'auto', 
                                                                    
                                }}
                            
                                href={dataGit.blog} target="_blank" textDecoration="none"> {dataGit.blog}</a>   </p> 

                            <p>{dataGit.location}</p>

                            {/* <p>followers: {dataGit.followers} </p>
                            
                            <p>following: {dataGit.following} </p> */}
                            {/* {dataGit.bio} */}
                        </Text>

                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}

