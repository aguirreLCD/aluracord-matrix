import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4Nzc4OSwiZXhwIjoxOTU4ODYzNzg5fQ.brk1eqpTGAjuj8nOsNF2PV3h3w_TdGiP17yE4g3u9Eo';
const SUPABASE_URL = 'https://vwqmratpfheywhgczkir.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {

    const router = useRouter();
    const { username } = router.query;
    console.log(username)

    // keep the msg
    const [message, setMessage] = React.useState('');

    // list of msg
    const [messageList, setMessageList] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('messages')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('data', data)
                setMessageList(data);
            });
    }, []); 

    console.log()

    // logic to send msg
    function handleNewMessage(newMessage) {
        // each msg  = object
        const message = {
            // id: messageList.length + 1,
            from: username,
            text: newMessage,
        };

        supabaseClient
            .from('messages')
            .insert([
                message              
            ])
            .then(({ data }) => {
                console.log('creating msg', data);
                setMessageList([
                    data[0],
                    ...messageList,
                ]);
                setMessage('');
            });       
    }


    //  logic to del msg
    // function handleDeleteMessage(id) {
    //     supabaseClient
    //         .from('messages')
    //         .delete()
    //         .eq('id', id)
    //         .then(({ data }) => {
    //             console.log('del msg', data)
    //             const newList = messageList.filter(
    //                 (message) => message.id != id
    //              );
    //             setMessageList(newList);
    //         });  
    // }



      // logic delete msg
    // function handleDeleteMessage(mensagemAtual) {

    //     const msgId = mensagemAtual.id;
    //     console.log(msgId);

    //     const messagesListFiltered = listaDeMensagens.filter((mensagem) => {
    //         return mensagem.id != msgId
    //     });
    //     setListaDeMensagens(messagesListFiltered); 
    // }


    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* <MessageList messages={messageList} handleDeleteMessage={handleDeleteMessage}  /> */}
                    <MessageList messages={messageList}  />
                    
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleNewMessage(message);
                        }}
                    >

                        <TextField
                            value={message}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMessage(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNewMessage(message);
                                }
                            }}
                            placeholder="Insert your message here..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Button
                            type='submit'
                            label='Send'
                            // fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            disabled={message.length < 1}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // const handleDeleteMessage = props.handleDeleteMessage;
    // console.log(props);

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>

                            {/* <Button                            
                                styleSheet={{
                                    borderRadius: '25%',
                                    marginLeft: '20px'
                                }}
                                variant='tertiary'
                                colorVariant='dark'
                                size='xs'
                                label='Delete'
                                buttonColors={{
                                    mainColor: appConfig.theme.colors.neutrals['000'],
                                }}                                
                                onClick={(event) => {
                                    event.preventDefault()
                                    handleDeleteMessage(message)
                                }}
                            /> */}

                        </Box>
                        {message.text}
                    </Text>
                );
            })}
        </Box>
    )
}