import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        C0C0C0: '#C0C0C0',
        D9D9D9: '#D9D9D9',
        '00A886': '#00A886',
        '727272': '#727272',
        '9F9F9F': '#9F9F9F',
        '6A6A6A': '#6A6A6A',
        F1F1F1: '#F1F1F1',
        E4E4E4: '#E4E4E4',
        '7D7D7D': '#7D7D7D',
        ECECEC: '#ECECEC',
        999899: '#999899',
        '8B8B8B': '#8B8B8B',
        '757575': '#757575',
        EDEDED: '#EDEDED',
        494949: '#494949',
        555555: '#555555',
        B1B1B1: '#B1B1B1',
        787878: '#787878',
        D1D1D1: '#D1D1D1',
        565656: '#565656',
        747474: '#747474',
        '7A7A7A': '#7A7A7A',
        '7E7E7E': '#7E7E7E',
        '181818': '#181818',
        B8B8B8: '#B8B8B8',
        383838: '#383838',
        141517: '#141517',
        DD81FD: '#DD81FD',
        FFC700: '#FFC700',
      },
      fontSize: {
        '11': [
          '1.1rem',
          {
            lineHeight: '1.593rem',
          },
        ],
        '12': [
          '1.2rem',
          {
            lineHeight: '1.6rem',
          },
        ],
        '14': [
          '1.4rem',
          {
            lineHeight: '2.027rem',
          },
        ],

        '15': [
          '1.5rem',
          {
            lineHeight: '2.172rem',
          },
        ],
        '16': [
          '1.6rem',
          {
            lineHeight: '2.179rem',
          },
        ],
        '18': [
          '1.8rem',
          {
            lineHeight: '2.178rem',
          },
        ],
        '20': [
          '2rem',
          {
            lineHeight: '2.724rem',
          },
        ],
        '21': [
          '2.1rem',
          {
            lineHeight: '2.724rem',
          },
        ],
        '24': [
          '2.4rem',
          {
            lineHeight: '3.475rem',
          },
        ],
        '31': [
          '3.1rem',
          {
            lineHeight: '4.543rem',
          },
        ],
        '35': [
          '3.5rem',
          {
            lineHeight: '5.068rem',
          },
        ],
        '37': [
          '3.7rem',
          {
            lineHeight: '5.358rem',
          },
        ],
        '54': [
          '5.4rem',
          {
            lineHeight: '7.95rem',
          },
        ],
        '60': [
          '6rem',
          {
            lineHeight: '8.688rem',
          },
        ],
      },
      fontFamily: {
        // 폰트패밀리
        roboto: ['var(--roboto)'],
      },
    },
  },
  plugins: [],
}
export default config
