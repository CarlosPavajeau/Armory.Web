import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Helmet } from 'react-helmet';
import { Paper, withStyles, WithStyles } from '@material-ui/core';
import Consola from 'consola';
import QrReaderDialog from '../../../components/qr/QrReaderDialog';
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from '../../../common/hooks';
import { formStyles } from '../../../common/styles';
import {
  loadingWeapon,
  loadWeapon,
  selectUiStatus as selectWeaponUiStatus,
} from '../../../modules/armament/weapons/Slice';
import { getWeapon } from '../../../modules/armament/weapons/Service';
import RegisterAssignedWeaponMagazineFormatItem from './RegisterAssignedWeaponMagazineFormatItem';

export type RegisterAssignedWeaponMagazineFormatItemsProps = WithStyles<
  typeof formStyles
>;

const RegisterAssignedWeaponMagazineFormatItems = (
  props: RegisterAssignedWeaponMagazineFormatItemsProps,
): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const [openQrDialog, setOpenQrDialog] = useState(false);
  const [openItemDialog, setOpenItemDialog] = useState(false);

  const weaponUiStatus = useAppSelector(selectWeaponUiStatus);
  const fetchWeapon = useCallback(
    async (weaponCode: string) => {
      try {
        dispatch(loadingWeapon());
        const result = await getWeapon(weaponCode);
        dispatch(loadWeapon(result));
      } catch (err) {
        // Ignore error
      }
    },
    [dispatch],
  );

  const query = useQuery();
  const formatId = query.get('formatId');
  useMemo(() => {
    Consola.info(formatId);
  }, [formatId]);

  useEffect(() => {
    if (weaponUiStatus === 'loaded') {
      setOpenItemDialog(true);
    }
  }, [weaponUiStatus]);

  const handleCloseQrDialog = async (value: string | null) => {
    if (value != null) {
      await fetchWeapon(value);
    }
    setOpenQrDialog(false);
  };

  const handleClickOnOpenQrDialog = () => {
    setOpenQrDialog(true);
  };

  const handleCloseFormatItemDialog = () => {
    setOpenItemDialog(false);
  };

  return (
    <>
      <Helmet>Armería | Revista de armas</Helmet>
      <Paper className={classes.paper}>
        <QrReaderDialog open={openQrDialog} onClose={handleCloseQrDialog} />
        <RegisterAssignedWeaponMagazineFormatItem
          open={openItemDialog}
          formatId={formatId}
          onClose={handleCloseFormatItemDialog}
        />
        <div className={classes.contentWrapper}>
          <Button
            onClick={handleClickOnOpenQrDialog}
            variant="contained"
            color="primary"
          >
            Escanear código QR
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default withStyles(formStyles)(
  RegisterAssignedWeaponMagazineFormatItems,
);
