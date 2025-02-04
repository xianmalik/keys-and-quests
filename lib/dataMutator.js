export const mutateProperties = (properties) => {
  // console.log(properties?.['Tagline']?.rich_text);
  return {
    id: properties?.['ID']?.unique_id?.number,
    tagline: properties?.['Tagline']?.rich_text?.[0]?.plain_text,
    brandName: properties?.['Switch Brand']?.multi_select?.map(({ name }) => name),
    switchType: properties?.['Type']?.select?.name,
    lubeStatus: properties?.['Lube Status']?.select?.name,
    stemMaterial: properties?.['Stem Material']?.select?.name,
    topHousing: properties?.['Top Housing']?.select?.name,
    bottomHousing: properties?.['Bottom Housing']?.select?.name,
    actuation: properties?.['Actuation (g)']?.number,
    video: properties?.['Video']?.url,
    videoType: properties?.['Video Type']?.select?.name,
    gallery: properties?.['Gallery']?.files,
  }
}
