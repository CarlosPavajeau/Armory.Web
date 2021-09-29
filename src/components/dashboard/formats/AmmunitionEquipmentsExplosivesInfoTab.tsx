import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Alert, Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
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
}

const AmmunitionEquipmentsExplosivesInfoTab = (
  props: AmmunitionEquipmentsExplosivesInfoTabProps,
): ReactElement => {
  const { ammunition, equipments, explosives } = props;
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
          {ammunition.map(ammunitionAndQuantity => {
            const { ammunitionLot, quantity } = ammunitionAndQuantity;
            return (
              <Typography key={ammunitionLot} variant="body1">
                Lote munición {ammunitionLot}, Cantidad: {quantity}
              </Typography>
            );
          })}
          {ammunition.length === 0 && (
            <Alert severity="info">
              No se ha seleccionado ninguna munición.
            </Alert>
          )}
        </TabPanel>
        <TabPanel value="2">
          {equipments.map(equipmentAndQuantity => {
            const { equipmentSerial, quantity } = equipmentAndQuantity;
            return (
              <Typography key={equipmentSerial} variant="body1">
                Serial: {equipmentSerial}, Cantidad: {quantity}
              </Typography>
            );
          })}
          {equipments.length === 0 && (
            <Alert severity="info">
              No se ha seleccionado ningún equipo especial o accesorio.
            </Alert>
          )}
        </TabPanel>
        <TabPanel value="3">
          {explosives.map(explosiveAndQuantity => {
            const { explosiveSerial, quantity } = explosiveAndQuantity;
            return (
              <Typography key={explosiveSerial} variant="body1">
                Serial: {explosiveSerial}, Cantidad: {quantity}
              </Typography>
            );
          })}
          {explosives.length === 0 && (
            <Alert severity="info">
              No se ha seleccionado ningún explosivo.
            </Alert>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AmmunitionEquipmentsExplosivesInfoTab;
