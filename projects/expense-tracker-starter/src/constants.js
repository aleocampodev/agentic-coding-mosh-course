export const CATEGORIES = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

export const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;