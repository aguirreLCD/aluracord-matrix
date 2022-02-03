import { Box, Button, Image, Text } from '@skynexui/components';
import React from 'react';

import appConfig from '../config.json';

export default function Custom404() {
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
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: {
                            xs: 'column',
                            // sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '3px', margin: '6px',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >

                    <Text>
                        <Button
                            styleSheet={{ 
                                padding: '15px',
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                                marginTop: '10px',
                                fontSize: '21px',
                            }}

                            variant='primary'
                            colorVariant='dark'
                            label='Home'
                            href="/"
                            iconName='home'
                        />
                                
                    </Text>


                    <Box
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                            width: '100%', maxWidth: '700px',
                            borderRadius: '5px', padding: '10px', margin: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }}
                    > 

                    <Image
                        styleSheet={{
                            width: '100%',
                            maxWidth: '700px'                        
                        }}
                        src="images/404.png"
                    />
                    
                
                </Box>              
            </Box>
        </Box>
    )
}