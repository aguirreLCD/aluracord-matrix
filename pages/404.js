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
                    justifyContent: 'space-between',

                    width: '100%', maxWidth: '700px',
                    borderRadius: '5px', padding: '32px', margin: '16px',
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',

                    backgroundColor: appConfig.theme.colors.neutrals[700],
                }}
            >

                <Image
                    styleSheet={{
                        width: '100%',

                    }}
                    src="images/404.png"
                />


                


                 <Box styleSheet={{ 
                     width: { xs: '100%', sm: '50%' }, 
                     textAlign: 'center', 
                     marginBottom: '32px'
                    
                     }} >
                   
                    <Button
                        variant='primary'
                        colorVariant='neutral'
                        label='Home'
                        href="/"
                    />
                    
                </Box>

            </Box>
        </Box>
    )
}