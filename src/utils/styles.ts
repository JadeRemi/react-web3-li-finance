export const styledScrollbar = {
    overflow: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        width: 0,
        height: 0,
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'transparent',
    },
} as React.CSSProperties