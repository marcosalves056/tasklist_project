import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
    :root{

        
        --color-blue-primary: #0063D7;
        --color-blue-secundary: #54a2ff;
        --color-white-primary: #FFFFFF;
        --color-white-secundary: #F4F4F5;
        --color-black-primary: #2F3640;
        --color-black-secundary: #353B48;
        --color-yellow-primary: #FBC531;
        --color-yellow-secundary: #FFF3D1;
        --color-grey-primary: #D1D1D1;
        --color-grey-secundary: #F5F5F5;
        --color-grey-tertiary: #B2B2BB;
        --color-grey-alternative: #71717A;
        --color-red-primary: #FF0000;
        --color-red-primary-hover: #CD3434;
        --color-red-secundary: #F6D0D0;
        --color-green-dark-primary: #44BD32;
        --color-green-light-primary: #10FF10;
        --color-green-light-secundary: #E3F3DF;

        --text-black-primary: #27272A;
        --text-white-primary: #F4F4F5;
        --text-on-brand-color: #FFFFFF;
        --text-grey-primary: #71717A;
        --text-grey-secundary: #D1D1D1;
        --text-red-primary: #FF0000;
        --text-green-primary: #44BD32;
        --text-blue-primary: #024089;
        --text-blue-secundary: #2BAACA;
        --text-blue-alternative: #0063D7;
    }

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    //Set the font-size in different screens-sizes - standard is 16px
    html{
        @media (max-width: 10240px){ // 10K (5760p)
            font-size: 533%; // 85.3px
        }
        @media (max-width: 7680px){ // 8K (4320p)
            font-size: 400%; // 64px
        }
        @media (max-width: 3840px){ // 4K (2160p)
            font-size: 200%; // 32px
        }
        @media (max-width: 2048px){ // 2K (1440p)
            font-size: 112.5%; // 18px
        }
        @media (max-width: 1920px){ // Full HD (1080p)
            font-size: 100%; // 16px
        }
        @media (max-width: 1280px){ // HD (720p)
            font-size: 93.75%; // 15px
        }
        @media (max-width: 720px){ // SD (480p)
            font-size: 87.5%; // 14px
        }
        @media (max-width: 640px){ // VGA (360p)
            font-size: 81.25%; // 13px
        }
        @media (max-width: 426px){ // QVGA (240p)
            font-size: 75%; // 12px
        }
    }

    body,input, textarea, button, h1, h2, h3, h4, h5, h6, span,a {
        font-family: 'Ubuntu', sans-serif;
        font-weight: 400;
    }

    a{
        text-decoration: none;
        color: var(---text-back-primary);
        
        transition: 0.2s;
    }

    body{
        background-color: var(--color-white-primary);
        -webkit-font-smoothing: antialiased;
        max-width: 100vw;
        height: 100vh; ;
        overflow: hidden;

    }

    button{
        cursor: pointer;
    }

    [disabled]{
        opacity: 0.6;
        cursor: not-allowed;
    }
    ::-webkit-scrollbar{
            height: 4px;
            justify-content: center;
            align-items: center;
            padding: none;
            margin: none;
            border-radius: 4px;
            max-width: 0.4375rem;
        }

    ::-webkit-scrollbar-track{
        background-color: var(--color-grey-secundary);
        height: 4px;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: var(--primary-color);
        border-radius: 4px;
    }

`
export const StandardStyle = createGlobalStyle`
    :root{
        --primary: #FFFFFF;
        --primary-color: #024089;
        --primary-color-hover: #0063D7;

        
    }
`

export const StyleDarkMode = createGlobalStyle`
    :root{
        --primary: #FFFFFF;
        --primary-color: #172B39;
        --primary-color-hover: #0063D7;

    }

`