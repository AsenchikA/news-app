export const getCurrentDate = () => new Date().toISOString().split('T')[0];

export const getIsDateValid = (date: string) => !Number.isNaN(new Date(date).getTime());
