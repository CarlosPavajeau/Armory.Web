const translateRole = (role: string | string[] | undefined): string => {
  if (typeof role === 'undefined') {
    return '';
  }

  if (typeof role === 'string') {
    switch (role) {
      case 'Developer':
        return 'Desarollador';
      case 'SquadronLeader':
        return 'Comandante de escuadrilla';
      case 'SquadLeader':
        return 'Comandante de escuadra';
      case 'StoreLeader':
        return 'Comandante de escuadron';
      default:
        return '';
    }
  }

  return role.map(r => translateRole(r)).join(', ');
};

export default translateRole;
