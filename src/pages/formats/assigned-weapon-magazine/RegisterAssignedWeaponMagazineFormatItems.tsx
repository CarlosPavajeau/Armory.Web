import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import { LoadingButton } from '@material-ui/lab';
import { useAppDispatch, useQuery } from 'common/hooks';
import AddAssignedWeaponMagazineFormatItemDialog from 'components/dashboard/formats/assigned-weapon-magazine/AddAssignedWeaponMagazineFormatItemDialog';
import AssignedWeaponMagazineFormatInfo from 'components/dashboard/formats/assigned-weapon-magazine/AssignedWeaponMagazineFormatInfo';
import AssignedWeaponMagazineFormatItemsInfo from 'components/dashboard/formats/assigned-weapon-magazine/AssignedWeaponMagazineFormatItemsInfo';
import ApiErrors from 'components/feedback/ApiErrors';
import Page from 'components/Page';
import QrReaderDialog from 'components/qr/QrReaderDialog';
import FileSaver from 'file-saver';
import { useWeapon } from 'modules/armament/weapons/hooks';
import { useAssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/hooks';
import { AssignedWeaponMagazineFormatItem } from 'modules/formats/assigned-weapon-magazine/Models';
import { generateAssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/Service';
import {
  addFormatItem,
  generatedAssignedWeaponMagazineFormat,
  generatingAssignedWeaponMagazineFormat,
} from 'modules/formats/assigned-weapon-magazine/Slice';
import { ReactElement, useEffect, useMemo, useState } from 'react';

const RegisterAssignedWeaponMagazineFormatItems = (): ReactElement => {
  const query = useQuery();
  const queryId = query.get('formatId');
  const formatId = useMemo(() => {
    if (queryId) {
      return +queryId;
    }
    return 0;
  }, [queryId]);
  const [format, formatUiStatus] = useAssignedWeaponMagazineFormat(formatId);

  const [scanCode, setScanCode] = useState('');
  const [weapon, weaponUiStatus] = useWeapon(scanCode);

  const dispatch = useAppDispatch();

  const [openQrDialog, setOpenQrDialog] = useState(false);
  const [openItemDialog, setOpenItemDialog] = useState(false);

  useEffect(() => {
    if (weaponUiStatus === 'loaded') {
      setOpenItemDialog(true);
    }
  }, [weaponUiStatus]);

  const handleCloseQrDialog = async (value: string | null) => {
    setOpenQrDialog(false);
    if (value != null) {
      setScanCode(value);
    }
  };

  const handleClickOnOpenQrDialog = () => {
    setOpenQrDialog(true);
  };

  const handleClickOnGenerateFormat = async () => {
    if (formatId != null) {
      dispatch(generatingAssignedWeaponMagazineFormat());
      const result = await generateAssignedWeaponMagazineFormat(+formatId);
      FileSaver.saveAs(result, `format-${formatId}.xlsx`);
      dispatch(generatedAssignedWeaponMagazineFormat());
    }
  };

  const handleCloseFormatItemDialog = (
    value: AssignedWeaponMagazineFormatItem | null,
  ) => {
    setOpenItemDialog(false);
    setScanCode('');
    if (formatId != null && value != null) {
      dispatch(addFormatItem(value));
    }
  };

  return (
    <Page title="Armería | Registro de formato de revista">
      <Container>
        <AssignedWeaponMagazineFormatInfo
          format={format}
          formatUiStatus={formatUiStatus}
        />

        <QrReaderDialog open={openQrDialog} onClose={handleCloseQrDialog} />
        <AddAssignedWeaponMagazineFormatItemDialog
          open={openItemDialog}
          formatId={formatId}
          weapon={weapon}
          onClose={handleCloseFormatItemDialog}
        />

        <ApiErrors />

        <Divider sx={{ mb: 3, mt: 2 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <LoadingButton
            variant="contained"
            onClick={handleClickOnOpenQrDialog}
            loading={weaponUiStatus === 'loading'}
            disabled={formatUiStatus === 'generating'}
            fullWidth
          >
            Escanear código QR
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={handleClickOnGenerateFormat}
            loading={formatUiStatus === 'generating'}
            disabled={weaponUiStatus === 'loading'}
            fullWidth
          >
            Generar formato
          </LoadingButton>
        </Stack>

        <Divider sx={{ mb: 3, mt: 3 }} />

        <Typography variant="h4">Registros agregados</Typography>
        <AssignedWeaponMagazineFormatItemsInfo records={format?.records} />
      </Container>
    </Page>
  );
};

export default RegisterAssignedWeaponMagazineFormatItems;
