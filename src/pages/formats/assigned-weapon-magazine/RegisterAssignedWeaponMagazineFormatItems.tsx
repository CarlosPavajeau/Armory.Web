import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import Consola from 'consola';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CropFreeIcon from '@material-ui/icons/CropFree';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from '@material-ui/core/ListItemText';
import {
  loadingWeapon,
  loadWeapon,
  selectUiStatus as selectWeaponUiStatus,
} from 'modules/armament/weapons/Slice';
import { getWeapon } from 'modules/armament/weapons/Service';
import {
  addFormatItem,
  selectCurrentFormat,
} from 'modules/formats/assigned-weapon-magazine/Slice';
import { formStyles } from 'common/styles';
import QrReaderDialog from 'components/qr/QrReaderDialog';
import { useAppDispatch, useAppSelector, useQuery } from 'common/hooks';
import { AssignedWeaponMagazineFormatItem } from 'modules/formats/assigned-weapon-magazine/Models';
import FileSaver from 'file-saver';
import { generateAssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/Service';
import RegisterAssignedWeaponMagazineFormatItem from './RegisterAssignedWeaponMagazineFormatItem';
import AssignedWeaponMagazineFormatInfo from './components/AssignedWeaponMagazineFormatInfo';
import AssignedWeaponMagazineFormatItemInfo from './components/AssignedWeaponMagazineFormatItemInfo';

const useCustomStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(2),
    },
    list: {
      maxHeight: 300,
      position: 'relative',
      overflow: 'auto',
    },
    listTitle: {
      marginTop: theme.spacing(2),
    },
  }),
);

export type RegisterAssignedWeaponMagazineFormatItemsProps = WithStyles<
  typeof formStyles
>;

const RegisterAssignedWeaponMagazineFormatItems = (
  props: RegisterAssignedWeaponMagazineFormatItemsProps,
): ReactElement => {
  const { classes } = props;
  const customClasses = useCustomStyles();
  const dispatch = useAppDispatch();
  const format = useAppSelector(selectCurrentFormat);

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
    setOpenQrDialog(false);
    if (value != null) {
      await fetchWeapon(value);
    }
  };

  const handleClickOnOpenQrDialog = () => {
    setOpenQrDialog(true);
  };

  const handleClickOnGenerateFormat = async () => {
    if (formatId != null) {
      const result = await generateAssignedWeaponMagazineFormat(+formatId);
      FileSaver.saveAs(result, `format-${formatId}.xlsx`);
    }
  };

  const handleCloseFormatItemDialog = (
    value: AssignedWeaponMagazineFormatItem | null,
  ) => {
    setOpenItemDialog(false);
    if (format != null && value != null) {
      dispatch(addFormatItem(value));
    }
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
          <AssignedWeaponMagazineFormatInfo />
          <Divider className={customClasses.divider} />
          <Grid
            container
            justifyContent="flex-end"
            spacing={3}
            alignItems="center"
          >
            <Grid item>
              <Tooltip title="Escanear código QR">
                <IconButton
                  color="primary"
                  onClick={handleClickOnOpenQrDialog}
                  disabled={weaponUiStatus === 'loading'}
                >
                  <CropFreeIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Generar formato">
                <IconButton onClick={handleClickOnGenerateFormat}>
                  <AssignmentReturnedIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            color="textSecondary"
            className={customClasses.listTitle}
          >
            Registros agregados
          </Typography>
          <List className={customClasses.list}>
            {format?.items.map(item => {
              return (
                <>
                  <ListItem>
                    <ListItemText
                      primary={`Identificación de la tropa: ${item.troopId}`}
                      secondary={
                        <AssignedWeaponMagazineFormatItemInfo item={item} />
                      }
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </div>
      </Paper>
    </>
  );
};

export default withStyles(formStyles)(
  RegisterAssignedWeaponMagazineFormatItems,
);
