import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React, { useContext } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { Profile } from '../src/components/Profile';


const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export default function ChatPage() {

    function listenMessage(response) {
        return supabaseClient
            .from('messages')
            .on('INSERT', (liveResponse) => {
                // console.log('live res new ', liveResponse.new);
                response(liveResponse);
                // response(liveResponse.new);
                // console.log('live res ', liveResponse);
            })
            .on('DELETE', (liveResponse) => {
                // console.log('live response to del', liveResponse);
                // console.log('old', liveResponse.old);
                // console.log(liveResponse.old.id);               
                response(liveResponse.old.id);
            })
            .subscribe();
    }
    
    const router = useRouter();
    const loggedUser = router.query.username;

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
                // console.log('data', data)
                setMessageList(data);
            });

        const subscription = listenMessage((response) => {
            // if INSERT else DELETE  
            if (response.eventType === "INSERT") {
                // console.log('New msg: ', response);
                // console.log('messageList: ', messageList);

                setMessageList((currentListValue) => {
                    // console.log('current list value: ', currentListValue);
                    return [
                        response.new,
                        ...currentListValue,
                    ]
                });
            } else {
                setMessageList((currentListValue) => 
                    currentListValue.filter((value) => value.id !== response)
                );
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    // logic to send msg
    function handleNewMessage(newMessage) {
        // each msg  = object
        const message = {
            // id: messageList.length + 1,
            from: loggedUser,
            text: newMessage,
        };

        supabaseClient
            .from('messages')
            .insert([
                message
            ])
            .then(({ data }) => {
                console.log('creating msg', data);
                // setMessageList([
                //     data[0],
                //     ...messageList,
                // ]);
            });

        setMessage('');
    }

    return (
        
        <Box styleSheet={{
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[900],
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
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header loggedUser={loggedUser} />
                
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        // width: '700px',
                        maxWidth: '700px',
                        backgroundBlendMode: 'difference',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList messages={messageList} loggedUser={loggedUser}  />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'flex-start',
                        }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleNewMessage(message);
                        }}
                    >

                        <TextField
                            value={message}
                            onChange={(event) => {
                                const value = event.target.value;
                                setMessage(value);
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
                                width: '90%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[600],
                                marginRight: '12px',
                                // color: message.from == props.loggedUser ? appConfig.theme.colors.neutrals["100"] : appConfig.theme.colors.neutrals["300"],
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

                        {/* CallBack */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                // console.log('save sticker in db', sticker);
                                handleNewMessage(`:sticker:${sticker}`);
                            }}
                        />


                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header({ loggedUser }) {
    return (
        <>
            <Box styleSheet={{ 
                // width: '700px',
                maxWidth: '700px',
                marginBottom: '16px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                color: appConfig.theme.colors.neutrals["gray2"],
                }} >

                <Box styleSheet={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                    }}>
                   <a href={`https://github.com/${loggedUser}`} target="_blank">  

                    <Image
                        src={`https://github.com/${loggedUser}.png`}
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
                    />
                     </a> 

                </Box>

                <Button
                    buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals[500],
                                mainColorLight: appConfig.theme.colors.neutrals[500],
                                mainColorStrong: appConfig.theme.colors.neutrals[500],
                    }}
                    // variant='tertiary'
                    // colorVariant='light'
                    label='Logout'
                    href="/"
                />

            </Box>
        </>
    )
}

function MessageList(props) {

    async function handleDeleteMessage(old) {
        await supabaseClient
            .from('messages')
            .delete()
            .match({id: old})
            // .eq('id', old)
            .then(() => {
                // console.log('old del', old);
                console.log('del', old);
            });
    }

    return (
       
        <Box
            tag="ul"
            styleSheet={{
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                overflow: 'scroll',
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
                            backgroundColor: message.from == props.loggedUser ? appConfig.theme.colors.neutrals["500"] : appConfig.theme.colors.neutrals["600"],
                            // alignItems: message.from == props.loggedUser ? 'flex-end' : 'flex-start',   
                            color: message.from == props.loggedUser ? appConfig.theme.colors.neutrals["gray2"] : appConfig.theme.colors.neutrals["gray1"],
                            borderRadius: '5px',
                            padding: '8px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals["700"],
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
                                    width: '25px',
                                    height: '25px',
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
                                    marginLeft: '5px',
                                    color: message.from == props.loggedUser ? appConfig.theme.colors.neutrals["100"] : appConfig.theme.colors.neutrals["200"],
                                }}
                                tag="span"
                            >
                                {new Date(message.created_at).toLocaleString('da-DK', {dateStyle: 'short',timeStyle: 'short'})}
                            </Text>

                            <Button
                                tag="span"
                                iconName='github'
                                variant='tertiary'
                                size='xs'
                                colorVariant='light'
                                href={`https://github.com/${message.from}`}

                            />


                           <Button
                                tag="span"
                                iconName='addressCard'
                                variant='tertiary'
                                size='xs'
                                colorVariant='light'
                                href={`https://github.com/${message.from}`}
                            />



                                        
                            <Button
                                variant='tertiary'
                                colorVariant='dark'
                                size='xs' 
                                tag='span'
                                iconName='trash'
                                buttonColors={{
                                    mainColor: appConfig.theme.colors.neutrals['000'],
                                }}
                                onClick={() => { 
                                    handleDeleteMessage(message.id);
                                }}
                                disabled={message.from != props.loggedUser}
                            />



                        <Profile gitUser={message.from}></Profile>


                        </Box>
                        {message.text.startsWith(':sticker:')
                            ? (
                                <Image src={message.text.replace(':sticker:', '')}
                                 styleSheet={{
                                        width: '300px',
                                 }}                                
                                />
                            )
                            : (
                                message.text
                        )}




                    </Text>
                );
            })}
        </Box>
     
    )
}


