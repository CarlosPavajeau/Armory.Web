import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { ReactElement, ReactNode, useRef, useState } from 'react';

interface MoreMenuProps {
  children: ReactNode;
}

const MoreMenu = (props: MoreMenuProps): ReactElement => {
  const { children } = props;

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Menu>
    </>
  );
};

export default MoreMenu;
