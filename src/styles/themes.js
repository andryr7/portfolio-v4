const commonColors = {
  blue: '#3C445E',
  red: '#3E0705',
  orange: '#A5611F'
}

export const lightTheme = {
  background: '#F2E8E6',
  main: '#191718',
  blendmode: 'normal',
  transformOrigin: 'bottom center',
  ...commonColors
}

export const darkTheme = {
  background: '#080403',
  main: '#E4E1BE',
  blendmode: 'exclusion',
  transformOrigin: 'bottom left',
  ...commonColors
}