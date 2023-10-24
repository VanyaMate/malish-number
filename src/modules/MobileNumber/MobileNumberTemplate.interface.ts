export interface IMobileNumberTemplate {
    get (number: string): Promise<string>;
}