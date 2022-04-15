export const currencyToSymbol = (currency: string | undefined) => {
    let symbol = '';

    switch (currency) {
        case 'USD':
        case 'CAD':
            symbol = '$';
            break;
        case 'EUR':
            symbol = '€';
            break;
        case 'GBP':
            symbol = '£';
            break;

        default:
            break;
    }

    return symbol;
};
