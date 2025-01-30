export const mutateProperties = (properties) => {
  return {
    id: properties?.['ID']?.unique_id?.number,
    brandName: properties?.['Switch Brand']?.multi_select?.map(({ name }) => name),
    switchType: properties?.['Type']?.select?.name,
    lubeStatus: properties?.['Lube Status']?.select?.name,
    stemMaterial: properties?.['Stem Material']?.select?.name,
    topHousing: properties?.['Top Housing']?.select?.name,
    bottomHousing: properties?.['Bottom Housing']?.select?.name,
    actuation: properties?.['Actuation (g)']?.number,
  }
}