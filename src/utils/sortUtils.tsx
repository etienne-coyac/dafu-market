import type { OrderType } from "../types/order";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (orderBy === "dateHeureRetrait") {
        const parseDateTime = (row: any): number => {
            const raw = row.dateHeureRetrait ?? "1970-01-01 00:00:00";
            const isoString = raw.replace(" ", "T");
            const parsedDate = new Date(isoString);
            return parsedDate.getTime();
        };

        const aDate = parseDateTime(a);
        const bDate = parseDateTime(b);

        return bDate - aDate; // Descending
    }

    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (bValue < aValue) return -1;
    if (bValue > aValue) return 1;
    return 0;
}

function getComparator<Key extends keyof any>(
    order: OrderType,
    orderBy: Key
): (
    a: { [key in Key]: number | string | Date },
    b: { [key in Key]: number | string | Date }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
export { getComparator };