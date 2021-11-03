import { LoadingButton } from '@mui/lab';
import { Collapse } from '@mui/material';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
import { AssignedWeaponMagazineFormatItem } from 'modules/formats/assigned-weapon-magazine/models';
import AssignedWeaponMagazineFormatsService from 'modules/formats/assigned-weapon-magazine/service';
import { addAssignedWeaponMagazineFormatItem } from 'modules/formats/assigned-weapon-magazine/slice';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterAssignedWeaponMagazineFormatItems = (): ReactElement => {
  const query = useQuery();
  const queryId = query.get('formatId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!queryId) {
      navigate('/dashboard');
    }
  }, [navigate, queryId]);

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
    if (scanCode && weaponUiStatus === 'idle' && weapon) {
      setOpenItemDialog(true);
    }
  }, [weaponUiStatus, weapon, scanCode]);

  const handleCloseQrDialog = async (value: string | null) => {
    setOpenQrDialog(false);
    if (value != null) {
      setScanCode(value);
    }
  };

  const handleClickOnOpenQrDialog = () => {
    setOpenQrDialog(true);
  };

  const [generatingFormat, setGeneratingFormat] = useState(false);
  const handleClickOnGenerateFormat = async () => {
    if (formatId != null) {
      setGeneratingFormat(true);
      const result = await AssignedWeaponMagazineFormatsService.generate(
        +formatId,
      );
      FileSaver.saveAs(
        result,
        `formato-revista-armamento-asignado-${formatId}.xlsx`,
      );
      setGeneratingFormat(false);
    }
  };

  const handleCloseFormatItemDialog = (
    value: AssignedWeaponMagazineFormatItem | null,
  ) => {
    setOpenItemDialog(false);
    setScanCode('');
    if (formatId != null && value != null) {
      dispatch(addAssignedWeaponMagazineFormatItem(value));
    }
  };

  return (
    <Page title="Armería | Registro de formato de revista">
      <Container>
        <AssignedWeaponMagazineFormatInfo
          format={format}
          formatUiStatus={formatUiStatus}
        />

        <ApiErrors />

        <Collapse in={!!format} timeout={500} unmountOnExit>
          {format && (
            <>
              <QrReaderDialog
                open={openQrDialog}
                onClose={handleCloseQrDialog}
              />
              <AddAssignedWeaponMagazineFormatItemDialog
                open={openItemDialog}
                formatId={formatId}
                weapon={weapon}
                onClose={handleCloseFormatItemDialog}
              />

              <Divider sx={{ mb: 3, mt: 2 }} />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <LoadingButton
                  variant="contained"
                  onClick={handleClickOnOpenQrDialog}
                  loading={weaponUiStatus === 'loading'}
                  disabled={generatingFormat}
                  fullWidth
                >
                  Escanear código QR
                </LoadingButton>
                <LoadingButton
                  variant="outlined"
                  onClick={handleClickOnGenerateFormat}
                  loading={generatingFormat}
                  disabled={weaponUiStatus === 'loading'}
                  fullWidth
                >
                  Generar formato
                </LoadingButton>
              </Stack>

              <Divider sx={{ mb: 3, mt: 3 }} />

              <Typography variant="h4">Registros agregados</Typography>
              <AssignedWeaponMagazineFormatItemsInfo
                records={format?.records}
              />
            </>
          )}
        </Collapse>
      </Container>
    </Page>
  );
};

export default RegisterAssignedWeaponMagazineFormatItems;
