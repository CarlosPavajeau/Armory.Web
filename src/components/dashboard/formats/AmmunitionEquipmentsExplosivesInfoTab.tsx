import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import AmmunitionInfo from 'components/dashboard/formats/AmmunitionInfo';
import EquipmentsInfo from 'components/dashboard/formats/EquipmentsInfo';
import ExplosivesInfo from 'components/dashboard/formats/ExplosivesInfo';
import {
  AmmunitionAndQuantities,
  EquipmentsAndQuantities,
  ExplosivesAndQuantities,
} from 'modules/formats/war-material-delivery-certificate/Models';
import { ReactElement, SyntheticEvent, useState } from 'react';

interface AmmunitionEquipmentsExplosivesInfoTabProps {
  ammunition: AmmunitionAndQuantities;
  equipments: EquipmentsAndQuantities;
  explosives: ExplosivesAndQuantities;
  onDeleteAmmunition: (ammunitionToDelete: string) => void;
  onDeleteEquipment: (equipmentToDelete: string) => void;
  onDeleteExplosive: (explosiveToDelete: string) => void;
}

const AmmunitionEquipmentsExplosivesInfoTab = (
  props: AmmunitionEquipmentsExplosivesInfoTabProps,
): ReactElement => {
  const {
    ammunition,
    equipments,
    explosives,
    onDeleteAmmunition,
    onDeleteEquipment,
    onDeleteExplosive,
  } = props;
  const [tabIndex, setTabIndex] = useState('1');
  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList variant="fullWidth" onChange={handleChangeTab}>
            <Tab label="Municiones" value="1" />
            <Tab label="Equipo especial o accesorios" value="2" />
            <Tab label="Explosivos" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AmmunitionInfo
            ammunition={ammunition}
            onDeleteAmmunition={onDeleteAmmunition}
          />
        </TabPanel>
        <TabPanel value="2">
          <EquipmentsInfo
            equipments={equipments}
            onDeleteEquipment={onDeleteEquipment}
          />
        </TabPanel>
        <TabPanel value="3">
          <ExplosivesInfo
            explosives={explosives}
            onDeleteExplosive={onDeleteExplosive}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AmmunitionEquipmentsExplosivesInfoTab;
