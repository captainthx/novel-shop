import { type GlobalThemeOverrides } from "naive-ui";

export const themeOverrides: GlobalThemeOverrides = {
    "common": {
        "primaryColor": "#AAAAAA",
        "primaryColorHover": "#A4EBF3",
        "cardColor": "#F4F9F9",
        "modalColor": "#F4F9F9",
        "fontSize": "16px"
    },
    Dropdown: {
        color: '#3F2305',
        colorActive: '#D6C6C6FF',
        optionColorHover: '#D6C6C6FF',
    },
    Switch: {
        railColorActive: '#D6C6C6FF',
    },
    Pagination: {
        buttonColorHover: '#D6C6C6FF',
    },
    Notification: {
        color: '#3F2305',
        textColor: '#000000'
    }
};


const lightThemeOverrides = {
    common: {
        primaryColor: '#000000'
    }
    // ...
};

const darkThemeOverrides = {
    common: {
        primaryColor: '#FFFFFF'
    }
};