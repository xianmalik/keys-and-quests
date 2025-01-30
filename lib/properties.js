export const getBrandName = ({ ['Switch Brand']: brand }) => {
  return brand?.multi_select?.[0]?.name || 'N/A';
}

export const getSwitchType = ({ ["Type"]: switchType }) => {
  return switchType?.select?.name || 'N/A';
}

export const getBottomHousing = ({ ["Bottom Housing"]: bottomHousing }) => {
  return bottomHousing?.select?.name || 'N/A';
}

export const getTopHousing = ({ ["Top Housing"]: topHousing }) => {
  return topHousing?.select?.name || 'N/A';
}

export const getActuation = ({ ["Actuation (g)"]: actuation }) => {
  return actuation?.number || 'N/A';
}

export const getLubeStatus = ({ ["Lube Status"]: lubeStatus }) => {
  return lubeStatus?.select?.name || 'N/A';
}

export const getStemMaterial = ({ ["Stem Material"]: stemMaterial }) => {
  return stemMaterial?.select?.name || 'N/A';
}
