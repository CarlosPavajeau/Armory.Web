import { TabContext, TabPanel } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Page from 'components/Page';
import ChangePassword from 'pages/users/ChangePassword';
import { ReactElement, SyntheticEvent, useState } from 'react';

const Settings = (): ReactElement => {
  const [tabIndex, setTabIndex] = useState('1');
  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <Page title="Armería | Configuraciones">
      <Container>
        <Stack sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Configuraciones
          </Typography>
        </Stack>

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabIndex}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList variant="fullWidth" onChange={handleChangeTab}>
                <Tab label="Cambiar contraseña" value="1" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <ChangePassword />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
};

export default Settings;
