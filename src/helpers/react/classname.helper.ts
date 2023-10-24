export const cn = function (...classNames: (string | undefined | null | false)[]): string {
    return classNames.filter((className) => className).join(' ');
};