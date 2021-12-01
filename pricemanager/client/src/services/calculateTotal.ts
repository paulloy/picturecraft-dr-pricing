import { roundValue } from "./roundValue";


const convert = require('convert-length');

export const calculateTotals = (
    selectedPaper = [],
    lengthInputs = {
        width: 0,
        length: 0,
        qty: 0
    },
    lengthUnit = 'inches'
) => {
    // return null if no paper is selected
    if (selectedPaper.length === 0) {
        let calculatedTotals = {
            netTotal: 0,
            vat: 0,
            discountPercentage: 0,
            discount: 0,
            subTotal: 0
        }
        return calculatedTotals;
    }

    let { width, length, qty } = lengthInputs;
    // Cost of paper is the price of a 16" x 20" print (includes VAT)
    const standardArea = 16 * 20;
    // cost of selected paper (remove VAT by dividing by 1.2) divided by the standard area
    const costPerUnitArea = (selectedPaper[0].cost / 1.2 ) / standardArea; 

    // if selected, convert cm into inches
    if (lengthUnit === 'cm') {
        width = convert(width, 'cm', 'in');
        length = convert(length, 'cm', 'in');
    }

    let discountPercentage;
    // Discount is dependant on quantity
    if (qty >= 50) {
        discountPercentage = 0.2
    } else if (qty >= 20) {
        discountPercentage = 0.1;
    } else if (qty >= 10) {
        discountPercentage = 0.05;
    } else {
        discountPercentage = 0;
    }

    // Net Total = Product of the image area (width * length) and costPerUnitArea and quantity
    let netTotal = roundValue((width * length) * costPerUnitArea) * qty;
    
    // discount is the product of netTotal & discountPercentage, unless the latter variable is 0
    let discount;
    if (discountPercentage !== 0) {
        discount = roundValue(netTotal * discountPercentage);
    } else {
        discount = 0;
    }
    // USE CHANGE: discountPercentage is multiplied by 100 so it can be displayed on the UI. e.g. 0.2 becomes 20%
    discountPercentage = discountPercentage * 100;

    let vat = roundValue((netTotal - discount) * 0.2);
    let subTotal = (netTotal - discount) + vat;

    let calculatedTotals = {
        netTotal: netTotal,
        vat: vat,
        discountPercentage: discountPercentage,
        discount: discount,
        subTotal: subTotal
    };

    return calculatedTotals;
}