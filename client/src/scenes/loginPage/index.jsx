import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Form from './Form';

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
    const backgroundAlt = theme.palette.background.alt;

    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={backgroundAlt}
                p="1rem 6%"
                textAlign="center">
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    Media
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? '50%' : '93%'}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={backgroundAlt}>
                <Typography variant="h5" fontWeight="500" sx={{ mb: '1.5rem' }}>
                    Welcome to Media, Media is the best.
                </Typography>
                <Form></Form>
            </Box>
        </Box>
    );
};

export default LoginPage;
