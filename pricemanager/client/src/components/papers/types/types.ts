export interface PaperType {
    id: number;
    name: string;
    cost: number;
}

export interface LengthInputs {
    width: number;
    length: number;
    qty: number;
}

export interface Totals {
    netTotal: number;
    vat: number;
    discountPercentage: number;
    discount: number;
    subTotal: number;
}